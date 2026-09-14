<?php
/**
 * AdeelSab waitlist endpoint.
 *
 * The site is a static export, so there is no Node server to post to. Hostinger
 * runs PHP on every plan, including shared hosting, so this file ships next to
 * the static HTML and receives the waitlist form.
 *
 * DEPLOYMENT: the storage directory MUST live outside public_html, otherwise
 * leads.csv is downloadable by anyone who guesses the URL. See DEPLOY.md.
 */

declare(strict_types=1);

// -----------------------------------------------------------------------------
// Configuration - edit these three values on deployment.
// -----------------------------------------------------------------------------

/** TODO: the address that receives lead notifications. */
const NOTIFY_EMAIL = 'leads@adeelsab.com';

/** Only this origin may post here. Must match the live site exactly. */
const ALLOWED_ORIGIN = 'https://www.adeelsab.com';

/**
 * Absolute path to a directory OUTSIDE the web root.
 * On Hostinger shared hosting public_html sits at ~/public_html, so ~/storage
 * is a sibling of it and is not web-servable.
 */
const STORAGE_DIR = __DIR__ . '/../../storage';

const RATE_LIMIT_MAX = 5;      // submissions ...
const RATE_LIMIT_WINDOW = 3600; // ... per this many seconds, per IP

// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Scoped CORS: same-origin posts do not need it, but an explicit allow makes the
// www / non-www case predictable instead of silently failing in the browser.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === ALLOWED_ORIGIN) {
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/** Emits a JSON response and stops. */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

// 1. POST only ----------------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

// 2. Parse the body -----------------------------------------------------------
$raw = file_get_contents('php://input') ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    // Fall back to a normal form post, so the endpoint still works if JavaScript
    // is unavailable and the form is submitted natively.
    $data = $_POST;
}
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'invalid_body']);
}

/** Trims, strips control characters and caps length. */
function clean($value, int $max = 500): string
{
    if (!is_scalar($value)) {
        return '';
    }
    $string = trim((string) $value);
    $string = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $string) ?? '';
    return mb_substr($string, 0, $max);
}

// 3. Honeypot -----------------------------------------------------------------
// A person never sees this field. Anything that fills it is a bot. We return a
// success shape so the bot does not learn it was filtered.
if (clean($data['website'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

// 4. Collect and validate -----------------------------------------------------
$name         = clean($data['name'] ?? '', 120);
$whatsappRaw  = clean($data['whatsapp'] ?? '', 30);
$city         = clean($data['city'] ?? '', 60);
$businessType = clean($data['businessType'] ?? '', 60);
$category     = clean($data['category'] ?? '', 80);
$volume       = clean($data['volume'] ?? '', 60);
$message      = clean($data['message'] ?? '', 2000);
$source       = clean($data['source'] ?? 'unknown', 60);
$locale       = clean($data['locale'] ?? 'en', 5);

/** Normalises a Pakistani mobile number to 03XXXXXXXXX, or null. */
function normalise_pk_phone(string $raw): ?string
{
    $digits = preg_replace('/[^\d+]/', '', $raw) ?? '';
    $digits = preg_replace('/^\+/', '00', $digits) ?? '';

    if (preg_match('/^03\d{9}$/', $digits)) {
        return $digits;
    }
    if (preg_match('/^0092(3\d{9})$/', $digits, $m)) {
        return '0' . $m[1];
    }
    if (preg_match('/^92(3\d{9})$/', $digits, $m)) {
        return '0' . $m[1];
    }
    if (preg_match('/^3\d{9}$/', $digits)) {
        return '0' . $digits;
    }
    return null;
}

$errors = [];
if (mb_strlen($name) < 2)                    $errors[] = 'name';
$whatsapp = normalise_pk_phone($whatsappRaw);
if ($whatsapp === null)                      $errors[] = 'whatsapp';
if ($city === '')                            $errors[] = 'city';
if ($businessType === '')                    $errors[] = 'businessType';
if ($category === '')                        $errors[] = 'category';
if ($volume === '')                          $errors[] = 'volume';

if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation_failed', 'fields' => $errors]);
}

// 5. Storage ------------------------------------------------------------------
if (!is_dir(STORAGE_DIR)) {
    @mkdir(STORAGE_DIR, 0750, true);
}
if (!is_dir(STORAGE_DIR) || !is_writable(STORAGE_DIR)) {
    error_log('[adeelsab] storage directory is missing or not writable: ' . STORAGE_DIR);
    respond(500, ['ok' => false, 'error' => 'storage_unavailable']);
}

// 6. Rate limit by IP ---------------------------------------------------------
// File-based and intentionally simple: a shared host has no Redis, and this only
// needs to stop casual flooding, not a determined attacker.
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rateFile = STORAGE_DIR . '/rate-' . sha1($ip) . '.json';
$now = time();
$hits = [];

if (is_file($rateFile)) {
    $stored = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($stored)) {
        $hits = array_values(array_filter(
            $stored,
            static fn($ts) => is_int($ts) && ($now - $ts) < RATE_LIMIT_WINDOW
        ));
    }
}

if (count($hits) >= RATE_LIMIT_MAX) {
    respond(429, ['ok' => false, 'error' => 'rate_limited']);
}

$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

// 7. Append the lead ----------------------------------------------------------
$csvPath = STORAGE_DIR . '/leads.csv';
$isNew = !is_file($csvPath);

$handle = @fopen($csvPath, 'a');
if ($handle === false) {
    error_log('[adeelsab] could not open leads.csv for writing');
    respond(500, ['ok' => false, 'error' => 'storage_unavailable']);
}

if (flock($handle, LOCK_EX)) {
    if ($isNew) {
        fputcsv($handle, [
            'timestamp', 'name', 'whatsapp', 'city', 'business_type',
            'category', 'monthly_volume', 'message', 'source', 'locale', 'ip',
        ]);
    }

    fputcsv($handle, [
        gmdate('c', $now),
        $name,
        // Leading apostrophe stops spreadsheets dropping the leading zero.
        "'" . $whatsapp,
        $city,
        $businessType,
        $category,
        $volume,
        $message,
        $source,
        $locale,
        $ip,
    ]);

    fflush($handle);
    flock($handle, LOCK_UN);
}
fclose($handle);
@chmod($csvPath, 0640);

// 8. Notify -------------------------------------------------------------------
// Best effort: a failed mail() must never cost us a lead that is already saved.
$subject = sprintf('New AdeelSab lead: %s (%s)', $name, $city);
$body = implode("\n", [
    'Name:            ' . $name,
    'WhatsApp:        ' . $whatsapp,
    'City:            ' . $city,
    'Business type:   ' . $businessType,
    'Category:        ' . $category,
    'Monthly volume:  ' . $volume,
    'Source page:     ' . $source,
    'Language:        ' . $locale,
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
    '',
    'Received: ' . gmdate('c', $now) . ' UTC',
]);

$headers = implode("\r\n", [
    'From: AdeelSab Website <no-reply@adeelsab.com>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

@mail(NOTIFY_EMAIL, $subject, $body, $headers);

respond(200, ['ok' => true]);
