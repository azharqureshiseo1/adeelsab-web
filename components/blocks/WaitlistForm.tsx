'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, TriangleAlert } from 'lucide-react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { trackEvent } from '@/lib/analytics';
import { normalisePkPhone } from '@/lib/utils';
import {
  businessTypes,
  common,
  form as formCopy,
  formCities,
  productCategories,
  volumeRanges,
  waUrl,
} from '@/content/site';

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '/api/submit.php';

type Fields = {
  name: string;
  whatsapp: string;
  city: string;
  businessType: string;
  category: string;
  volume: string;
  message: string;
  /** Honeypot. A real person never sees or fills this. */
  website: string;
};

const EMPTY: Fields = {
  name: '',
  whatsapp: '',
  city: '',
  businessType: '',
  category: '',
  volume: '',
  message: '',
  website: '',
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'pending' | 'success' | 'error';

export function WaitlistForm({
  source = 'unknown',
  compact = false,
  defaultBusinessType,
}: {
  /** Which page the submission came from, recorded with the lead. */
  source?: string;
  /** Drops the optional message field, for inline placements. */
  compact?: boolean;
  defaultBusinessType?: string;
}) {
  const { t, locale } = useLanguage();
  const [values, setValues] = useState<Fields>({
    ...EMPTY,
    businessType: defaultBusinessType ?? '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    // Clear the error as soon as the person starts fixing the field.
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = t(formCopy.errors.name);
    if (!normalisePkPhone(values.whatsapp)) next.whatsapp = t(formCopy.errors.whatsapp);
    if (!values.city) next.city = t(formCopy.errors.city);
    if (!values.businessType) next.businessType = t(formCopy.errors.businessType);
    if (!values.category) next.category = t(formCopy.errors.category);
    if (!values.volume) next.volume = t(formCopy.errors.volume);
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so the person is not hunting for it.
      const first = Object.keys(found)[0];
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      trackEvent('waitlist_validation_failed', { source, fields: Object.keys(found).join(',') });
      return;
    }

    setStatus('pending');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          whatsapp: normalisePkPhone(values.whatsapp),
          source,
          locale,
        }),
      });

      const data: unknown = await response.json().catch(() => null);
      const ok =
        response.ok && typeof data === 'object' && data !== null && (data as { ok?: boolean }).ok;

      if (!ok) throw new Error('submission rejected');

      setStatus('success');
      trackEvent('waitlist_submit', { source, city: values.city, type: values.businessType });
    } catch {
      // Never lose a lead silently: the error state offers WhatsApp, which
      // reaches the same team and converts better than a retry in this market.
      setStatus('error');
      trackEvent('waitlist_error', { source });
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center md:p-8">
        <CheckCircle2 aria-hidden strokeWidth={1.75} className="mx-auto h-10 w-10 text-brand-500" />
        <h3 className="t-h3 mt-4">{t(formCopy.successTitle)}</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-500">{t(formCopy.successBody)}</p>
        <ButtonLink
          href={waUrl}
          variant="whatsapp"
          size="lg"
          className="mt-6"
          onClick={() => trackEvent('whatsapp_click', { location: 'waitlist_success' })}
        >
          {t(common.talkOnWhatsApp)}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {status === 'error' ? (
        <div
          role="alert"
          className="flex gap-3 rounded-[10px] border border-[#F0C2BC] bg-[#FDF2F1] p-4"
        >
          <TriangleAlert aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0 text-[#C42B1C]" />
          <div className="text-sm">
            <p className="font-semibold text-ink-900">{t(formCopy.errorTitle)}</p>
            <p className="mt-1 text-ink-500">{t(formCopy.errorBody)}</p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { location: 'waitlist_error' })}
              className="mt-2 inline-block font-semibold text-brand-600 underline underline-offset-2"
            >
              {t(common.talkOnWhatsApp)}
            </a>
          </div>
        </div>
      ) : null}

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label htmlFor="website-field">Website</label>
        <input
          id="website-field"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => set('website', event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="name"
          label={t(formCopy.name)}
          placeholder={t(formCopy.namePlaceholder)}
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event) => set('name', event.target.value)}
        />
        <Input
          name="whatsapp"
          type="tel"
          inputMode="tel"
          dir="ltr"
          label={t(formCopy.whatsapp)}
          placeholder={t(formCopy.whatsappPlaceholder)}
          autoComplete="tel"
          required
          value={values.whatsapp}
          error={errors.whatsapp}
          onChange={(event) => set('whatsapp', event.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          name="city"
          label={t(formCopy.city)}
          placeholder={t(formCopy.cityPlaceholder)}
          required
          value={values.city}
          error={errors.city}
          onChange={(event) => set('city', event.target.value)}
          options={formCities.map((city) => ({ value: city, label: city }))}
        />
        <Select
          name="businessType"
          label={t(formCopy.businessType)}
          placeholder={t(formCopy.businessTypePlaceholder)}
          required
          value={values.businessType}
          error={errors.businessType}
          onChange={(event) => set('businessType', event.target.value)}
          options={businessTypes.map((type) => ({ value: type.en, label: t(type) }))}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          name="category"
          label={t(formCopy.category)}
          placeholder={t(formCopy.categoryPlaceholder)}
          required
          value={values.category}
          error={errors.category}
          onChange={(event) => set('category', event.target.value)}
          options={productCategories.map((category) => ({ value: category.en, label: t(category) }))}
        />
        <Select
          name="volume"
          label={t(formCopy.volume)}
          placeholder={t(formCopy.volumePlaceholder)}
          required
          value={values.volume}
          error={errors.volume}
          onChange={(event) => set('volume', event.target.value)}
          options={volumeRanges.map((range) => ({ value: range.en, label: t(range) }))}
        />
      </div>

      {!compact ? (
        <Textarea
          name="message"
          label={t(formCopy.message)}
          placeholder={t(formCopy.messagePlaceholder)}
          value={values.message}
          onChange={(event) => set('message', event.target.value)}
        />
      ) : null}

      <Button type="submit" size="lg" block disabled={status === 'pending'}>
        {status === 'pending' ? t(formCopy.submitting) : t(formCopy.submit)}
        {status === 'pending' ? null : (
          <ArrowRight aria-hidden strokeWidth={1.75} className="h-5 w-5 rtl:rotate-180" />
        )}
      </Button>

      <p className="text-center text-sm text-ink-400">{t(formCopy.privacy)}</p>
    </form>
  );
}
