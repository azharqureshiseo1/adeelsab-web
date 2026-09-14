import type { Copy } from '@/lib/i18n';

/* =============================================================================
   content/site.ts - the single source of truth for every user-facing string,
   number and data table on the site.

   RULES
   1. No hardcoded copy in components. Everything routes through here so the
      Urdu pass is a data edit, not a refactor.
   2. Every `ur` key is structurally present. An empty string falls back to
      English at render time and is tracked in CONTENT-TODO.md.
   3. Numbers marked `TODO:` are placeholders. Never invent traction metrics -
      the platform is pre-launch and has no sellers, orders or GMV to report.
============================================================================= */

const t = (en: string, ur = ''): Copy => ({ en, ur });

/* -----------------------------------------------------------------------------
   1. Business configuration - all placeholders live here, nowhere else.
----------------------------------------------------------------------------- */

export const config = {
  brand: 'AdeelSab',
  domain: 'adeelsab.com',

  /** TODO: confirm target launch date - drives all "launching soon" copy. */
  launchWindow: t('Launching Q1 2027', 'لانچ — پہلی سہ ماہی 2027'),

  /** TODO: confirm. Own fleet runs in Lahore only at launch; everywhere else
   *  is carried by the courier partners. */
  ownFleetCities: ['Lahore'],

  /** TODO: confirm. Hand-updated - never a fake live counter. */
  foundingSeller: {
    cap: 500,
    registered: 0,
    commissionHolidayMonths: 3,
  },

  /** TODO: confirm merchant settlement timeline and minimum payout. */
  payout: {
    days: 7,
    minimumPkr: 1000,
    rails: ['Bank transfer', 'JazzCash', 'Easypaisa'],
  },

  contact: {
    /**
     * TODO: replace with the real WhatsApp support number before launch.
     * Digits only, country code first (923XXXXXXXXX). This is a demo value and
     * the button on every page currently opens a chat with a number that is
     * not ours.
     */
    whatsapp: '923001234567',
    whatsappPrefill: 'Assalam-o-alaikum, I want to sell on AdeelSab.',
    supportEmail: 'support@adeelsab.com', // TODO: confirm
    businessEmail: 'business@adeelsab.com', // TODO: confirm
    addressLines: [
      'TODO: office address line 1',
      'TODO: office address line 2',
      'Lahore, Punjab, Pakistan',
    ],
    hours: t('Monday to Saturday, 10:00 - 19:00 PKT', 'پیر تا ہفتہ، صبح 10 تا شام 7 بجے'),
  },

  legal: {
    /** Incorporation number issued by the SECP. */
    secp: '0353167',
    entity: 'AdeelSab (Private) Limited',
    /** Displayed in uppercase where the registered name is quoted formally. */
    entityFormal: 'ADEELSAB (PRIVATE) LIMITED',
    /** TODO: NTN not yet issued/confirmed. Not rendered while empty. */
    ntn: '',
  },

  /** Empty entries are not rendered, so a missing handle never links nowhere. */
  social: {
    facebook: 'https://www.facebook.com/adeelsab.pk',
    instagram: 'https://www.instagram.com/adeelsab.pk',
    tiktok: 'https://www.tiktok.com/@adeelsab.pk',
    threads: 'https://www.threads.com/@adeelsab.pk',
  },

  /** The agency credited in the footer. */
  developer: {
    name: 'Refine Core Private Limited',
    url: 'https://refinecore.pk',
  },

  /** TODO: confirm whether a mobile app exists at launch. Gates footer + CTA blocks. */
  mobileAppAtLaunch: false,
};

export const waUrl = `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(
  config.contact.whatsappPrefill,
)}`;

/* -----------------------------------------------------------------------------
   2. Navigation
----------------------------------------------------------------------------- */

export type NavItem = { label: Copy; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
  {
    label: t('Sell With Us', 'ہمارے ساتھ فروخت کریں'),
    href: '/sell',
    children: [
      { label: t('For Local Sellers', 'مقامی دکانداروں کے لیے'), href: '/sell/local-sellers' },
      { label: t('For Resellers', 'ری سیلرز کے لیے'), href: '/sell/resellers' },
      { label: t('For Dropshippers', 'ڈراپ شپرز کے لیے'), href: '/sell/dropshippers' },
      { label: t('Reseller-Enabled Listings', 'ری سیلر لسٹنگ'), href: '/reseller-listings' },
      { label: t('Pricing & Commissions', 'قیمت اور کمیشن'), href: '/pricing' },
      { label: t('Payouts & Settlement', 'ادائیگی'), href: '/payouts' },
    ],
  },
  { label: t('Delivery', 'ڈیلیوری'), href: '/delivery' },
  { label: t('Pricing', 'قیمت'), href: '/pricing' },
  { label: t('Seller Hub', 'سیلر ہب'), href: '/seller-hub' },
  { label: t('About', 'ہمارے بارے میں'), href: '/about' },
];

export const footerNav: Array<{ title: Copy; links: NavItem[] }> = [
  {
    title: t('Sell With Us', 'ہمارے ساتھ فروخت کریں'),
    links: [
      { label: t('Founding Seller Program', 'فاؤنڈنگ سیلر پروگرام'), href: '/founding-seller' },
      { label: t('For Local Sellers', 'مقامی دکانداروں کے لیے'), href: '/sell/local-sellers' },
      { label: t('For Resellers', 'ری سیلرز کے لیے'), href: '/sell/resellers' },
      { label: t('For Dropshippers', 'ڈراپ شپرز کے لیے'), href: '/sell/dropshippers' },
      { label: t('How It Works', 'یہ کیسے کام کرتا ہے'), href: '/how-it-works' },
    ],
  },
  {
    title: t('Platform', 'پلیٹ فارم'),
    links: [
      { label: t('Delivery & Coverage', 'ڈیلیوری اور کوریج'), href: '/delivery' },
      { label: t('Pricing & Commissions', 'قیمت اور کمیشن'), href: '/pricing' },
      { label: t('Payouts & Settlement', 'ادائیگی'), href: '/payouts' },
      { label: t('Reseller-Enabled Listings', 'ری سیلر لسٹنگ'), href: '/reseller-listings' },
    ],
  },
  {
    title: t('Resources', 'وسائل'),
    links: [
      { label: t('Seller Hub', 'سیلر ہب'), href: '/seller-hub' },
      { label: t('Blog', 'بلاگ'), href: '/blog' },
      { label: t('Contact & Support', 'رابطہ'), href: '/contact' },
      { label: t('Careers', 'ملازمتیں'), href: '/careers' },
    ],
  },
  {
    title: t('Company', 'کمپنی'),
    links: [
      { label: t('About Us', 'ہمارے بارے میں'), href: '/about' },
      { label: t('Privacy Policy', 'پرائیویسی پالیسی'), href: '/legal/privacy' },
      { label: t('Terms of Use', 'شرائط استعمال'), href: '/legal/terms' },
      { label: t('Seller Agreement', 'سیلر معاہدہ'), href: '/legal/seller-agreement' },
    ],
  },
];

/* -----------------------------------------------------------------------------
   3. Global / shared copy
----------------------------------------------------------------------------- */

export const common = {
  becomeFoundingSeller: t('Become a Founding Seller', 'فاؤنڈنگ سیلر بنیں'),
  howItWorks: t('How it works', 'یہ کیسے کام کرتا ہے'),
  learnMore: t('Learn more', 'مزید جانیے'),
  joinWaitlist: t('Join the waitlist', 'ویٹ لسٹ میں شامل ہوں'),
  whatsappUs: t('WhatsApp us', 'واٹس ایپ کریں'),
  talkOnWhatsApp: t('Talk to us on WhatsApp', 'واٹس ایپ پر بات کریں'),
  readMore: t('Read more', 'مزید پڑھیں'),
  backHome: t('Back to home', 'ہوم پیج پر واپس'),
  langToggle: t('اردو', 'EN'),
  langToggleAria: t('Switch to Urdu', 'Switch to English'),
  menu: t('Menu', 'مینو'),
  close: t('Close', 'بند کریں'),
  comingSoon: t('Coming soon', 'جلد آ رہا ہے'),
  waitlistOpen: t('Waitlist open', 'ویٹ لسٹ کھلی ہے'),
  nowOnboarding: t('Now onboarding', 'اب رجسٹریشن جاری ہے'),
  phase2: t('Phase 2', 'فیز 2'),
  onThisPage: t('On this page', 'اس صفحے پر'),
  minRead: t('min read', 'منٹ کا مطالعہ'),
  updated: t('Updated', 'اپ ڈیٹ'),
};

/* -----------------------------------------------------------------------------
   4. Home page
----------------------------------------------------------------------------- */

export const home = {
  meta: {
    title: 'AdeelSab - Sell across Pakistan. We handle the rest.',
    description:
      'AdeelSab is a Pakistani marketplace for local sellers, resellers and dropshippers. Own fleet in-city, nationwide delivery via TCS, Leopards, PostEx and M&P. Join the Founding Seller Program before launch.',
  },

  hero: {
    eyebrow: t('Launching soon · Pakistan', 'جلد لانچ ہو رہا ہے · پاکستان'),
    title: t(
      'Sell across Pakistan. We handle the rest.',
      'پورے پاکستان میں فروخت کریں۔ باقی سب ہم سنبھالیں گے۔',
    ),
    sub: t(
      'List your products once. We deliver nationwide, collect cash on delivery, and settle your money on a fixed schedule.',
      'اپنی مصنوعات ایک بار درج کریں۔ ہم پورے ملک میں ڈیلیوری کرتے ہیں، کیش آن ڈیلیوری وصول کرتے ہیں، اور مقررہ وقت پر رقم ادا کرتے ہیں۔',
    ),
    imageAlt: t(
      'A shop owner in Lahore packing an order for dispatch',
      'لاہور میں ایک دکاندار آرڈر پیک کر رہا ہے',
    ),
  },

  threePaths: {
    title: t('Three ways to sell with AdeelSab', 'ایڈیل صاحب کے ساتھ فروخت کے تین طریقے'),
    sub: t(
      'Pick the one that matches your business. Each has its own onboarding.',
      'وہ طریقہ منتخب کریں جو آپ کے کاروبار کے مطابق ہو۔ ہر ایک کا اپنا طریقہ کار ہے۔',
    ),
  },

  capability: {
    title: t('What we can do on day one', 'پہلے دن سے ہماری صلاحیت'),
    note: t(
      'We are pre-launch, so these are capabilities - not traffic or sales figures. We will publish real numbers when we have them.',
      'ہم ابھی لانچ سے پہلے ہیں، اس لیے یہ ہماری صلاحیتیں ہیں — فروخت کے اعداد و شمار نہیں۔ حقیقی اعداد و شمار دستیاب ہوتے ہی شائع کیے جائیں گے۔',
    ),
  },

  howItWorks: {
    title: t('How selling works', 'فروخت کیسے ہوتی ہے'),
    sub: t('Four steps from registration to payment.', 'رجسٹریشن سے ادائیگی تک چار مراحل۔'),
  },

  resellerBlock: {
    title: t('Reseller-Enabled Listings', 'ری سیلر لسٹنگ'),
    sub: t(
      'The mechanism that lets one seller stock be sold by hundreds of people - with the margin agreed upfront.',
      'وہ طریقہ جس سے ایک بیچنے والے کا مال سینکڑوں لوگ فروخت کر سکتے ہیں — منافع پہلے سے طے شدہ۔',
    ),
    sellerTitle: t('For sellers', 'بیچنے والوں کے لیے'),
    sellerBody: t(
      'Mark a listing as reseller-enabled and set the margin you are willing to pay. Hundreds of resellers can then sell your stock. You pay nothing upfront and nothing for marketing - only the agreed margin on a completed sale.',
      'اپنی لسٹنگ کو ری سیلر کے لیے کھولیں اور منافع مقرر کریں۔ پھر سینکڑوں ری سیلر آپ کا مال بیچ سکتے ہیں۔ آپ صرف مکمل فروخت پر طے شدہ منافع ادا کرتے ہیں۔',
    ),
    resellerTitle: t('For resellers', 'ری سیلرز کے لیے'),
    resellerBody: t(
      'Every reseller-enabled product shows its margin before you list it. No negotiation, no minimum order, no inventory, no capital. You sell; we ship from the seller and pay you your margin.',
      'ہر پروڈکٹ کا منافع لسٹ کرنے سے پہلے نظر آتا ہے۔ نہ سودے بازی، نہ کم از کم آرڈر، نہ اسٹاک، نہ سرمایہ۔ آپ بیچیں، مال بیچنے والے سے روانہ ہوتا ہے اور منافع آپ کو ملتا ہے۔',
    ),
  },

  delivery: {
    title: t(
      'Delivery your customers already trust',
      'وہ ڈیلیوری جس پر آپ کے گاہک پہلے ہی اعتماد کرتے ہیں',
    ),
    sub: t(
      `Our own riders in ${config.ownFleetCities.join(', ')}. TCS, Leopards, PostEx and M&P everywhere else in Pakistan.`,
      `ہمارے اپنے رائیڈرز ${config.ownFleetCities.join('، ')} میں۔ باقی پورے پاکستان میں TCS، Leopards، PostEx اور M&P۔`,
    ),
    cta: t('See coverage, timelines and rates', 'کوریج، اوقات اور ریٹ دیکھیں'),
  },

  program: {
    title: t('The Founding Seller Program', 'فاؤنڈنگ سیلر پروگرام'),
    sub: t(
      'We are signing our first merchants before launch. Joining early costs nothing and is worth a great deal.',
      'ہم لانچ سے پہلے اپنے پہلے تاجروں کو شامل کر رہے ہیں۔ جلد شامل ہونا مفت ہے اور بہت فائدہ مند۔',
    ),
    cta: t('Apply to the programme', 'پروگرام کے لیے درخواست دیں'),
  },

  trust: {
    title: t('Who you are dealing with', 'آپ کس کے ساتھ کام کر رہے ہیں'),
    sub: t(
      'A new platform asking for your trust owes you its details in full.',
      'ایک نیا پلیٹ فارم جو آپ کا اعتماد مانگتا ہے، اسے اپنی مکمل تفصیلات دینی چاہییں۔',
    ),
  },

  faq: {
    title: t('The questions every merchant asks', 'ہر تاجر کے سوالات'),
    sub: t('Answered plainly, including the uncomfortable ones.', 'صاف جواب — مشکل سوالات سمیت۔'),
  },

  finalCta: {
    title: t('Be one of the first 500 sellers', 'پہلے 500 بیچنے والوں میں شامل ہوں'),
    sub: t(
      'Reduced commission, free listing creation, and a named person who answers your WhatsApp in Urdu.',
      'کم کمیشن، مفت لسٹنگ، اور ایک مخصوص شخص جو اردو میں آپ کے واٹس ایپ کا جواب دے۔',
    ),
  },
};

/* -----------------------------------------------------------------------------
   5. Structured data - paths, capabilities, steps, FAQs
----------------------------------------------------------------------------- */

export type PathCard = {
  id: 'local-sellers' | 'resellers' | 'dropshippers';
  href: string;
  icon: 'store' | 'repeat' | 'truck';
  badge: Copy;
  badgeTone: 'active' | 'waitlist' | 'soon';
  title: Copy;
  promise: Copy;
  bullets: Copy[];
  emphasis?: boolean;
};

export const paths: PathCard[] = [
  {
    id: 'local-sellers',
    href: '/sell/local-sellers',
    icon: 'store',
    badge: common.nowOnboarding,
    badgeTone: 'active',
    emphasis: true,
    title: t('Local sellers & wholesalers', 'مقامی دکاندار اور ہول سیلر'),
    promise: t(
      'You have the stock. We give it the whole country.',
      'مال آپ کے پاس ہے۔ ہم اسے پورے ملک تک پہنچاتے ہیں۔',
    ),
    bullets: [
      t('We create your listings from your photos, free', 'آپ کی تصاویر سے ہم مفت لسٹنگ بناتے ہیں'),
      t(
        'Cash on delivery collected and remitted to you',
        'کیش آن ڈیلیوری جمع کر کے آپ کو ادا کی جاتی ہے',
      ),
      t('Onboarding call in Urdu', 'اردو میں رجسٹریشن کال'),
    ],
  },
  {
    id: 'resellers',
    href: '/sell/resellers',
    icon: 'repeat',
    badge: common.waitlistOpen,
    badgeTone: 'waitlist',
    title: t('Resellers', 'ری سیلرز'),
    promise: t(
      'Sell other people stock. Keep a published margin.',
      'دوسروں کا مال بیچیں۔ طے شدہ منافع رکھیں۔',
    ),
    bullets: [
      t('No inventory and no upfront capital', 'نہ اسٹاک، نہ ابتدائی سرمایہ'),
      t('Every margin is published before you list', 'ہر منافع لسٹ کرنے سے پہلے ظاہر ہوتا ہے'),
      t(
        'Catalogue is being built - join the waitlist',
        'کیٹلاگ تیار ہو رہا ہے — ویٹ لسٹ میں شامل ہوں',
      ),
    ],
  },
  {
    id: 'dropshippers',
    href: '/sell/dropshippers',
    icon: 'truck',
    badge: common.comingSoon,
    badgeTone: 'soon',
    title: t('Dropshippers', 'ڈراپ شپرز'),
    promise: t(
      'Run your own storefront. We hold and ship the stock.',
      'اپنا اسٹور چلائیں۔ مال ہم رکھتے اور بھیجتے ہیں۔',
    ),
    bullets: [
      t('Real-time stock sync', 'ریئل ٹائم اسٹاک اپ ڈیٹ'),
      t('White-label packaging', 'آپ کے نام کی پیکنگ'),
      t('Shopify and WooCommerce integration', 'Shopify اور WooCommerce انٹیگریشن'),
    ],
  },
];

export type Capability = {
  value: Copy;
  label: Copy;
  icon: 'truck' | 'map' | 'banknote' | 'clock' | 'messageCircle';
};

export const capabilities: Capability[] = [
  {
    icon: 'truck',
    // TODO: confirm launch cities. Named rather than counted — "1 city" reads
    // as a limitation, "Lahore" reads as a fact the reader can act on.
    value: t(config.ownFleetCities.join(' · '), config.ownFleetCities.join(' · ')),
    label: t('AdeelSab Couriers, our own fleet', 'ایڈیل صاحب کورئیرز — ہماری اپنی فلیٹ'),
  },
  {
    icon: 'map',
    value: t('Nationwide', 'ملک بھر'),
    label: t('Delivery via TCS, Leopards, PostEx and M&P', 'TCS، Leopards، PostEx اور M&P کے ذریعے ڈیلیوری'),
  },
  {
    icon: 'banknote',
    value: t('COD', 'کیش آن ڈیلیوری'),
    label: t('Cash on delivery accepted across Pakistan', 'پورے پاکستان میں کیش آن ڈیلیوری'),
  },
  {
    icon: 'clock',
    // TODO: confirm payout timeline
    value: t(`${config.payout.days} days`, `${config.payout.days} دن`),
    label: t('From delivery to money in your account', 'ڈیلیوری سے آپ کے اکاؤنٹ تک'),
  },
  {
    icon: 'messageCircle',
    value: t('Urdu', 'اردو'),
    label: t('Support in Urdu, on WhatsApp', 'اردو میں واٹس ایپ سپورٹ'),
  },
];

export type Step = { title: Copy; body: Copy };

export const howItWorksSteps: Step[] = [
  {
    title: t('Register', 'رجسٹر کریں'),
    body: t(
      'Send us your name, WhatsApp number and what you sell. We call you back in Urdu and set up your account.',
      'اپنا نام، واٹس ایپ نمبر اور کاروبار بتائیں۔ ہم اردو میں کال کر کے آپ کا اکاؤنٹ بنا دیں گے۔',
    ),
  },
  {
    title: t('List your products', 'مصنوعات درج کریں'),
    body: t(
      'Add products yourself, or send us your photographs and we will build the listings for you at no charge.',
      'خود مصنوعات درج کریں، یا ہمیں تصاویر بھیجیں — ہم مفت لسٹنگ بنا دیں گے۔',
    ),
  },
  {
    title: t('An order arrives', 'آرڈر آتا ہے'),
    body: t(
      'You pack it. Our rider collects it in-city, or a courier picks it up for the rest of Pakistan.',
      'آپ پیک کریں۔ شہر میں ہمارا رائیڈر، باقی ملک کے لیے کورئیر اٹھا لے گا۔',
    ),
  },
  {
    title: t('You get paid', 'ادائیگی ملتی ہے'),
    body: t(
      `Cash or card, we collect it. Your money reaches your bank, JazzCash or Easypaisa within ${config.payout.days} days of delivery.`,
      `رقم ہم وصول کرتے ہیں۔ ڈیلیوری کے ${config.payout.days} دن کے اندر آپ کے بینک، جاز کیش یا ایزی پیسہ میں پہنچ جاتی ہے۔`,
    ),
  },
];

export type Faq = { q: Copy; a: Copy };

export const homeFaqs: Faq[] = [
  {
    q: t('What commission do you charge?', 'آپ کتنا کمیشن لیتے ہیں؟'),
    a: t(
      'Commission is charged per category and is published in full on our Pricing page - no clicking required, and no fee exists that is not on that table. Founding Sellers pay a reduced rate for their first months.',
      'کمیشن ہر کیٹیگری کے حساب سے ہے اور ہمارے پرائسنگ صفحے پر مکمل درج ہے۔ اس فہرست کے علاوہ کوئی فیس نہیں۔ فاؤنڈنگ سیلرز پہلے مہینوں میں کم شرح ادا کرتے ہیں۔',
    ),
  },
  {
    q: t('When do I get my money?', 'مجھے رقم کب ملے گی؟'),
    a: t(
      `Settlement runs ${config.payout.days} days after a delivery is confirmed, to your bank account, JazzCash or Easypaisa. The minimum payout is ${config.payout.minimumPkr} rupees.`,
      `ڈیلیوری کی تصدیق کے ${config.payout.days} دن بعد ادائیگی ہوتی ہے — بینک، جاز کیش یا ایزی پیسہ میں۔`,
    ),
  },
  {
    q: t('What happens if a customer refuses the parcel?', 'اگر گاہک پارسل لینے سے انکار کر دے؟'),
    a: t(
      'That is a return to origin (RTO). The parcel comes back to you and an RTO charge applies - it is stated openly on our Delivery page, with the figure. We do not hide it, and we publish guidance on reducing RTO because it costs us both.',
      'یہ RTO کہلاتا ہے۔ پارسل آپ کو واپس آتا ہے اور RTO چارج لگتا ہے — جو ہمارے ڈیلیوری صفحے پر کھل کر درج ہے۔ ہم اسے چھپاتے نہیں۔',
    ),
  },
  {
    q: t('Who pays the shipping cost?', 'ڈیلیوری خرچ کون دیتا ہے؟'),
    a: t(
      'You choose per listing: absorb it yourself, pass it to the customer, or split it. Whichever you pick is shown to the customer before checkout.',
      'یہ آپ ہر لسٹنگ پر طے کرتے ہیں: خود برداشت کریں، گاہک سے لیں، یا آدھا آدھا۔ گاہک کو خریداری سے پہلے یہ نظر آتا ہے۔',
    ),
  },
  {
    q: t('Is cash on delivery available everywhere?', 'کیا کیش آن ڈیلیوری ہر جگہ دستیاب ہے؟'),
    a: t(
      'Yes - across Pakistan, through our own fleet in our launch cities and through our courier partners elsewhere. Most orders in this market are COD and we have built for that.',
      'جی ہاں — پورے پاکستان میں، لانچ شہروں میں اپنی فلیٹ اور باقی جگہ کورئیر پارٹنرز کے ذریعے۔',
    ),
  },
  {
    q: t('What if my stock does not sell?', 'اگر میرا مال نہ بکے تو؟'),
    a: t(
      'Nothing happens to it - your stock stays with you. We hold no inventory, charge no listing fee and no monthly fee. If nothing sells, you pay us nothing.',
      'کچھ نہیں — مال آپ ہی کے پاس رہتا ہے۔ ہم اسٹاک نہیں رکھتے، نہ لسٹنگ فیس نہ ماہانہ فیس۔ کچھ نہ بکے تو کوئی ادائیگی نہیں۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   6. Founding Seller Program
----------------------------------------------------------------------------- */

export const foundingSeller = {
  meta: {
    title: 'Founding Seller Program - AdeelSab',
    description:
      'Join the first 500 merchants on AdeelSab. Reduced commission for your first months, free listing creation, priority support in Urdu and featured placement at launch.',
  },
  hero: {
    eyebrow: t('Pre-launch programme', 'لانچ سے پہلے کا پروگرام'),
    title: t('Become a Founding Seller', 'فاؤنڈنگ سیلر بنیں'),
    sub: t(
      'We are selecting the first merchants to build the catalogue with us. It costs nothing to join and it changes what you pay for a long time afterwards.',
      'ہم پہلے تاجروں کا انتخاب کر رہے ہیں جو ہمارے ساتھ کیٹلاگ بنائیں گے۔ شامل ہونا مفت ہے اور اس کا فائدہ عرصے تک رہتا ہے۔',
    ),
  },
  what: {
    title: t('What the programme is', 'یہ پروگرام کیا ہے'),
    body: t(
      `AdeelSab is built but not yet open to buyers. Before we launch, we need a catalogue worth shopping. The Founding Seller Program is our offer to the first ${config.foundingSeller.cap} merchants who commit stock before we go live: better terms, more help, and a permanent record that you were here first.`,
      `ایڈیل صاحب تیار ہے مگر ابھی گاہکوں کے لیے نہیں کھلا۔ لانچ سے پہلے ہمیں ایک بھرپور کیٹلاگ چاہیے۔ یہ پروگرام ان پہلے ${config.foundingSeller.cap} تاجروں کے لیے ہے جو لانچ سے پہلے شامل ہوتے ہیں۔`,
    ),
  },
  benefits: {
    title: t('What you get', 'آپ کو کیا ملتا ہے'),
  },
  who: {
    title: t('Who it is for', 'یہ کن کے لیے ہے'),
    body: t(
      'Retail shop owners, wholesalers and small manufacturers anywhere in Pakistan who already hold stock and can pack an order within 24 hours. You do not need a website, a company, or any experience selling online.',
      'پاکستان بھر کے دکاندار، ہول سیلر اور چھوٹے مینوفیکچرر جن کے پاس مال موجود ہے اور جو 24 گھنٹے میں آرڈر پیک کر سکتے ہیں۔ ویب سائٹ، کمپنی یا آن لائن تجربہ ضروری نہیں۔',
    ),
  },
  need: {
    title: t('What we need from you', 'ہمیں آپ سے کیا چاہیے'),
  },
  timeline: {
    title: t('The road to launch', 'لانچ تک کا سفر'),
  },
  form: {
    title: t('Apply now', 'ابھی درخواست دیں'),
    sub: t(
      'Two minutes. We reply on WhatsApp, in Urdu, within one working day.',
      'دو منٹ۔ ہم ایک کاروباری دن کے اندر واٹس ایپ پر اردو میں جواب دیتے ہیں۔',
    ),
  },
  counter: {
    // Hand-updated from config.foundingSeller.registered. Never a fake live counter.
    label: t('merchants registered so far', 'اب تک رجسٹرڈ تاجر'),
    of: t('of', 'میں سے'),
  },
};

export const foundingBenefits: Array<{ icon: string; title: Copy; body: Copy }> = [
  {
    icon: 'percent',
    title: t(
      `Zero commission for ${config.foundingSeller.commissionHolidayMonths} months`,
      `${config.foundingSeller.commissionHolidayMonths} ماہ تک صفر کمیشن`,
    ),
    body: t(
      // TODO: confirm commission holiday length and whether it is zero or reduced
      `You keep the full sale value, less shipping, for your first ${config.foundingSeller.commissionHolidayMonths} months after launch. Standard category rates apply afterwards.`,
      `لانچ کے بعد پہلے ${config.foundingSeller.commissionHolidayMonths} ماہ آپ پوری رقم رکھتے ہیں، صرف ڈیلیوری خرچ منہا۔`,
    ),
  },
  {
    icon: 'camera',
    title: t('Free listing creation', 'مفت لسٹنگ'),
    body: t(
      'Send us your photographs on WhatsApp. We write the titles, descriptions and specifications and build the listings for you. This is the single biggest barrier for most shop owners, and we remove it.',
      'واٹس ایپ پر تصاویر بھیجیں۔ ہم عنوان، تفصیل اور خصوصیات لکھ کر آپ کی لسٹنگ بنا دیتے ہیں۔',
    ),
  },
  {
    icon: 'headset',
    title: t('A named account manager', 'مخصوص اکاؤنٹ منیجر'),
    body: t(
      'Not a ticket queue. One person, by name, reachable on WhatsApp in Urdu during business hours.',
      'کوئی ٹکٹ سسٹم نہیں۔ ایک مخصوص شخص، نام کے ساتھ، کاروباری اوقات میں واٹس ایپ پر اردو میں دستیاب۔',
    ),
  },
  {
    icon: 'star',
    title: t('Featured placement at launch', 'لانچ پر نمایاں جگہ'),
    body: t(
      'Your products appear in our launch campaigns, category pages and the first emails we send to buyers.',
      'آپ کی مصنوعات ہماری لانچ مہم، کیٹیگری صفحات اور پہلی ای میلز میں شامل ہوں گی۔',
    ),
  },
  {
    icon: 'badge',
    title: t('The Founding Seller badge', 'فاؤنڈنگ سیلر بیج'),
    body: t(
      'A permanent mark on your storefront showing customers you were one of the first. It does not expire.',
      'آپ کے اسٹور پر مستقل نشان کہ آپ پہلے تاجروں میں سے تھے۔ یہ کبھی ختم نہیں ہوتا۔',
    ),
  },
];

export const foundingRequirements: Copy[] = [
  t(
    'At least 10 products you can list and keep in stock',
    'کم از کم 10 مصنوعات جو آپ لسٹ کر کے اسٹاک میں رکھ سکیں',
  ),
  t('Ability to pack an order within 24 hours', '24 گھنٹے میں آرڈر پیک کرنے کی صلاحیت'),
  t('CNIC and a bank, JazzCash or Easypaisa account', 'شناختی کارڈ اور بینک، جاز کیش یا ایزی پیسہ اکاؤنٹ'),
  t('Photographs of your products - a phone camera is fine', 'مصنوعات کی تصاویر — موبائل کیمرہ کافی ہے'),
  t('A WhatsApp number you actually answer', 'ایسا واٹس ایپ نمبر جس کا آپ جواب دیتے ہوں'),
];

export const foundingTimeline: Array<{ when: Copy; what: Copy }> = [
  {
    when: t('Now', 'ابھی'),
    what: t(
      'Applications open. We call every applicant and confirm their categories.',
      'درخواستیں کھلی ہیں۔ ہم ہر درخواست گزار کو کال کر کے کیٹیگری کی تصدیق کرتے ہیں۔',
    ),
  },
  {
    when: t('Onboarding', 'رجسٹریشن'),
    what: t(
      'Account created, listings built from your photographs, packaging and dispatch walked through.',
      'اکاؤنٹ بنتا ہے، آپ کی تصاویر سے لسٹنگ تیار ہوتی ہے، اور پیکنگ و ترسیل سمجھائی جاتی ہے۔',
    ),
  },
  {
    when: t('Catalogue gate', 'کیٹلاگ کا مرحلہ'),
    what: t(
      'We open the reseller channel only once there is enough stock for resellers to actually sell. Sending resellers to an empty catalogue would waste the channel.',
      'ری سیلر چینل صرف اس وقت کھلے گا جب کیٹلاگ میں کافی مال ہو۔ خالی کیٹلاگ پر ری سیلر بھیجنا نقصان دہ ہے۔',
    ),
  },
  {
    when: config.launchWindow,
    what: t(
      'Launch. Buyers arrive, your listings are live, and Founding Seller terms begin.',
      'لانچ۔ گاہک آتے ہیں، آپ کی لسٹنگ لائیو ہوتی ہے، اور فاؤنڈنگ سیلر شرائط شروع ہوتی ہیں۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   7. Sell hub + audience pages
----------------------------------------------------------------------------- */

export const sellHub = {
  meta: {
    title: 'Sell With Us - AdeelSab',
    description:
      'Three ways to sell on AdeelSab: as a local seller with your own stock, as a reseller with no inventory, or as a dropshipper running your own storefront.',
  },
  title: t('Sell with AdeelSab', 'ایڈیل صاحب کے ساتھ فروخت کریں'),
  sub: t(
    'Whether you own the stock, resell somebody else, or run your own storefront - there is a route for you.',
    'چاہے مال آپ کا ہو، آپ دوسروں کا بیچیں، یا اپنا اسٹور چلائیں — آپ کے لیے راستہ موجود ہے۔',
  ),
  sequencingNote: {
    title: t('Why local sellers come first', 'مقامی دکاندار پہلے کیوں'),
    body: t(
      'AdeelSab holds no inventory of its own. Every product on the platform belongs to a third-party seller. That means resellers cannot sell anything until local sellers have supplied the stock - so we are building the supply side first, and we are saying so rather than pretending the catalogue is already full.',
      'ایڈیل صاحب کا اپنا کوئی اسٹاک نہیں۔ پلیٹ فارم پر ہر پروڈکٹ کسی تیسرے فریق کا ہے۔ اس لیے جب تک مقامی دکاندار مال فراہم نہ کریں، ری سیلر کچھ نہیں بیچ سکتے۔ ہم پہلے سپلائی بنا رہے ہیں اور یہ بات چھپا نہیں رہے۔',
    ),
  },
};

export const localSellers = {
  meta: {
    title: 'For Local Sellers - AdeelSab',
    description:
      'Sell your shop stock across Pakistan. Free listing creation, full commission table, RTO policy stated plainly, fixed payout schedule, and onboarding in Urdu.',
  },
  hero: {
    eyebrow: common.nowOnboarding,
    title: t('Your shop, open to all of Pakistan', 'آپ کی دکان، پورے پاکستان کے لیے'),
    sub: t(
      'You already have the stock and you already know your products. We handle the website, the delivery, the cash collection and the paperwork.',
      'مال اور مصنوعات کی سمجھ آپ کے پاس ہے۔ ویب سائٹ، ڈیلیوری، رقم کی وصولی اور کاغذی کارروائی ہم سنبھالتے ہیں۔',
    ),
  },
  objections: {
    title: t('The six things shop owners ask us', 'دکاندار جو چھ باتیں پوچھتے ہیں'),
    sub: t(
      'In the order they get asked, answered with numbers rather than promises.',
      'اسی ترتیب میں جس میں پوچھی جاتی ہیں، وعدوں کے بجائے اعداد کے ساتھ۔',
    ),
  },
  onboarding: {
    title: t('How you get started', 'شروعات کیسے کریں'),
  },
  bring: {
    title: t('What to have ready', 'کیا تیار رکھیں'),
    sub: t('Five minutes of preparation.', 'پانچ منٹ کی تیاری۔'),
  },
  reassurance: {
    title: t('We will call you in Urdu', 'ہم آپ کو اردو میں کال کریں گے'),
    body: t(
      'You do not have to fill in anything complicated or understand any English. Send your name and number, and a person will call and walk you through it in Urdu.',
      'آپ کو کچھ پیچیدہ بھرنے یا انگریزی سمجھنے کی ضرورت نہیں۔ نام اور نمبر بھیجیں، ایک شخص کال کر کے اردو میں سب سمجھا دے گا۔',
    ),
  },
};

export const localSellerObjections: Array<{ q: Copy; a: Copy; link?: { label: Copy; href: string } }> =
  [
    {
      q: t('Selling online is complicated', 'آن لائن بیچنا مشکل ہے'),
      a: t(
        'It is, if you have to do it alone. You do not. Send your product photographs on WhatsApp and we write the titles, descriptions and specifications and build the listings for you, free. Your onboarding call is in Urdu and you can ask the same question as many times as you like.',
        'اگر اکیلے کرنا پڑے تو مشکل ہے۔ مگر آپ اکیلے نہیں۔ واٹس ایپ پر تصاویر بھیجیں، ہم عنوان، تفصیل اور خصوصیات لکھ کر مفت لسٹنگ بنا دیتے ہیں۔ رجسٹریشن کال اردو میں ہوتی ہے۔',
      ),
    },
    {
      q: t('Returns will cost me', 'واپسی مجھے مہنگی پڑے گی'),
      a: t(
        'Some will. When a customer refuses a parcel it returns to you and an RTO charge applies. We publish that charge on the Delivery page rather than burying it, and we publish a guide on cutting RTO - accurate photographs, correct sizing, and a confirmation call before dispatch typically remove most of it.',
        'کچھ واپسیاں ہوں گی۔ جب گاہک پارسل نہ لے تو وہ آپ کو واپس آتا ہے اور RTO چارج لگتا ہے۔ ہم یہ چارج ڈیلیوری صفحے پر کھل کر بتاتے ہیں اور اسے کم کرنے کا طریقہ بھی۔',
      ),
      link: { label: t('See RTO charges', 'RTO چارجز دیکھیں'), href: '/delivery#rto' },
    },
    {
      q: t('There will be hidden commissions', 'کمیشن چھپے ہوئے ہوں گے'),
      a: t(
        'There are not. The full commission table by category is on our Pricing page, visible without signing up or clicking through. Every fee that exists is on that page, and we state explicitly that there are no others.',
        'ایسا نہیں ہے۔ ہر کیٹیگری کا مکمل کمیشن ہمارے پرائسنگ صفحے پر موجود ہے — بغیر رجسٹریشن کے۔ جو فیس ہے وہ اسی صفحے پر ہے۔',
      ),
      link: { label: t('See the commission table', 'کمیشن کی فہرست دیکھیں'), href: '/pricing' },
    },
    {
      q: t('When do I get my money?', 'مجھے رقم کب ملے گی؟'),
      a: t(
        `${config.payout.days} days after the delivery is confirmed, into your bank account, JazzCash or Easypaisa. Cash on delivery is collected by us and remitted on the same schedule. The minimum payout is ${config.payout.minimumPkr} rupees.`,
        `ڈیلیوری کی تصدیق کے ${config.payout.days} دن بعد آپ کے بینک، جاز کیش یا ایزی پیسہ اکاؤنٹ میں۔ کیش آن ڈیلیوری ہم وصول کر کے اسی وقت میں ادا کرتے ہیں۔`,
      ),
      link: { label: t('See the payout schedule', 'ادائیگی کا شیڈول دیکھیں'), href: '/payouts' },
    },
    {
      q: t('Will it reach my customers?', 'کیا یہ میرے گاہکوں تک پہنچے گا؟'),
      a: t(
        `Our own riders cover ${config.ownFleetCities.join(', ')}. Everywhere else in Pakistan is covered by TCS, Leopards, PostEx and M&P - the same couriers your customers already receive parcels from. Gilgit, Turbat, Chitral: yes.`,
        `ہمارے اپنے رائیڈرز ${config.ownFleetCities.join('، ')} میں ہیں۔ باقی پورے پاکستان میں TCS، Leopards، PostEx اور M&P — وہی کورئیر جن سے آپ کے گاہک پہلے ہی پارسل لیتے ہیں۔`,
      ),
      link: { label: t('See the coverage map', 'کوریج نقشہ دیکھیں'), href: '/delivery' },
    },
    {
      q: t('Do I need an NTN?', 'کیا مجھے NTN چاہیے؟'),
      a: t(
        'You can register and start selling without one. An NTN affects your tax treatment and the withholding applied to your payouts, so it is worth having - we have written a plain-Urdu guide explaining what it is, whether you need one, and how to get it.',
        'آپ اس کے بغیر رجسٹر ہو کر بیچ سکتے ہیں۔ NTN آپ کے ٹیکس اور ادائیگی پر اثر ڈالتا ہے، اس لیے رکھنا بہتر ہے۔ ہم نے آسان اردو میں رہنمائی لکھی ہے۔',
      ),
      link: {
        label: t('Read the NTN guide', 'NTN رہنمائی پڑھیں'),
        href: '/seller-hub/ntn-and-tax-basics',
      },
    },
  ];

export const onboardingSteps: Step[] = [
  {
    title: t('Send your details', 'اپنی تفصیلات بھیجیں'),
    body: t(
      'Fill the short form or message us on WhatsApp. Name, number, city, what you sell.',
      'مختصر فارم بھریں یا واٹس ایپ کریں۔ نام، نمبر، شہر، اور آپ کیا بیچتے ہیں۔',
    ),
  },
  {
    title: t('We call you', 'ہم آپ کو کال کرتے ہیں'),
    body: t(
      'A person calls in Urdu within one working day, confirms your categories and answers your questions.',
      'ایک کاروباری دن کے اندر ایک شخص اردو میں کال کر کے کیٹیگری کی تصدیق اور سوالات کا جواب دیتا ہے۔',
    ),
  },
  {
    title: t('Account and verification', 'اکاؤنٹ اور تصدیق'),
    body: t(
      'We set up your seller account with your CNIC and payout details. No fee.',
      'ہم آپ کے شناختی کارڈ اور ادائیگی کی تفصیلات سے اکاؤنٹ بناتے ہیں۔ کوئی فیس نہیں۔',
    ),
  },
  {
    title: t('Listings built', 'لسٹنگ تیار'),
    body: t(
      'Send photographs; we build the listings. You approve them before anything goes live.',
      'تصاویر بھیجیں، ہم لسٹنگ بناتے ہیں۔ لائیو ہونے سے پہلے آپ منظوری دیتے ہیں۔',
    ),
  },
  {
    title: t('Ready for launch', 'لانچ کے لیے تیار'),
    body: t(
      'Your shop sits ready. The day we open to buyers, your products are already there.',
      'آپ کی دکان تیار رہتی ہے۔ جس دن گاہکوں کے لیے کھلتے ہیں، آپ کی مصنوعات پہلے سے موجود ہوتی ہیں۔',
    ),
  },
];

export const bringItems: Array<{ title: Copy; body: Copy }> = [
  {
    title: t('CNIC', 'شناختی کارڈ'),
    body: t('A photograph of both sides. Required to verify a seller account.', 'دونوں طرف کی تصویر۔ سیلر اکاؤنٹ کی تصدیق کے لیے ضروری۔'),
  },
  {
    title: t('Payout details', 'ادائیگی کی تفصیلات'),
    body: t(
      'Bank account title and IBAN, or your JazzCash / Easypaisa number.',
      'بینک اکاؤنٹ ٹائٹل اور IBAN، یا جاز کیش / ایزی پیسہ نمبر۔',
    ),
  },
  {
    title: t('Product photographs', 'مصنوعات کی تصاویر'),
    body: t(
      'A phone camera and daylight are enough. Our photography guide shows you how.',
      'موبائل کیمرہ اور دن کی روشنی کافی ہے۔ ہماری رہنمائی میں طریقہ موجود ہے۔',
    ),
  },
  {
    title: t('Your price list', 'قیمتوں کی فہرست'),
    body: t(
      'Whatever form it is in - a notebook photograph is fine.',
      'کسی بھی شکل میں — کاپی کی تصویر بھی چلے گی۔',
    ),
  },
];

export const resellers = {
  meta: {
    title: 'For Resellers - AdeelSab',
    description:
      'Sell without inventory or capital. Every reseller-enabled product publishes its margin upfront. The catalogue is being built - join the waitlist and we will notify you the day it opens.',
  },
  hero: {
    eyebrow: common.waitlistOpen,
    title: t('Sell without stock, without capital', 'بغیر اسٹاک، بغیر سرمائے کے فروخت'),
    sub: t(
      'Pick products from our catalogue, sell them wherever you already have customers, and keep a margin that was published before you started.',
      'ہمارے کیٹلاگ سے مصنوعات منتخب کریں، جہاں آپ کے گاہک ہیں وہیں بیچیں، اور وہ منافع رکھیں جو پہلے سے طے شدہ تھا۔',
    ),
  },
  honesty: {
    title: t('Read this before you join', 'شامل ہونے سے پہلے یہ پڑھیں'),
    body: t(
      'The catalogue is being built right now. There is not yet enough stock for you to run a reselling business on, and we are not going to pretend otherwise. Join the waitlist and we will message you on WhatsApp the day there is enough catalogue to be worth your time - not before.',
      'کیٹلاگ ابھی تیار ہو رہا ہے۔ فی الحال اتنا مال نہیں کہ آپ ری سیلنگ کا کاروبار چلا سکیں، اور ہم اس کے برعکس دعویٰ نہیں کریں گے۔ ویٹ لسٹ میں شامل ہوں — جس دن کیٹلاگ آپ کے وقت کے قابل ہوگا، ہم واٹس ایپ کریں گے۔',
    ),
  },
  zeroInvestment: {
    title: t('Why it takes no money to start', 'شروع کرنے کے لیے رقم کیوں نہیں چاہیے'),
    body: t(
      'You never buy the stock. The seller holds it, packs it and ships it. You bring the customer. When the order is delivered and paid for, your margin is settled to you on the same schedule as any seller. If a product does not sell, you have lost nothing but the time spent posting it.',
      'آپ مال کبھی نہیں خریدتے۔ مال بیچنے والے کے پاس رہتا ہے، وہی پیک اور روانہ کرتا ہے۔ آپ گاہک لاتے ہیں۔ ڈیلیوری اور ادائیگی کے بعد آپ کا منافع اسی شیڈول پر ادا ہوتا ہے۔',
    ),
  },
  margins: {
    title: t('How published margins work', 'طے شدہ منافع کیسے کام کرتا ہے'),
    body: t(
      'Every seller decides, listing by listing, whether resellers may sell that product and what margin they will pay. You see that number before you commit anything. There is no negotiation, no minimum order and no relationship to manage.',
      'ہر بیچنے والا ہر لسٹنگ پر خود طے کرتا ہے کہ ری سیلر اسے بیچ سکتے ہیں یا نہیں اور کتنا منافع دیں گے۔ یہ عدد آپ کو پہلے ہی نظر آتا ہے۔ نہ سودے بازی، نہ کم از کم آرڈر۔',
    ),
  },
  calculator: {
    title: t('Work out your margin', 'اپنا منافع نکالیں'),
    sub: t(
      'Enter a product price and the published margin to see what you keep on each sale.',
      'پروڈکٹ کی قیمت اور طے شدہ منافع درج کریں تاکہ فی فروخت آپ کی آمدنی معلوم ہو۔',
    ),
    priceLabel: t('Product price', 'پروڈکٹ کی قیمت'),
    marginLabel: t('Published margin', 'طے شدہ منافع'),
    qtyLabel: t('Sales per month', 'ماہانہ فروخت'),
    perSale: t('You keep, per sale', 'فی فروخت آپ کی آمدنی'),
    perMonth: t('Estimated monthly earnings', 'تخمینی ماہانہ آمدنی'),
    disclaimer: t(
      'An illustration, not a forecast. Actual margins vary by product and are set by the seller.',
      'یہ صرف ایک مثال ہے، پیش گوئی نہیں۔ اصل منافع ہر پروڈکٹ پر مختلف ہوتا ہے اور بیچنے والا مقرر کرتا ہے۔',
    ),
  },
  categories: {
    title: t('Categories we are building first', 'وہ کیٹیگریاں جو پہلے بن رہی ہیں'),
    sub: t(
      'Where our first Founding Sellers are concentrated. This will widen before launch.',
      'جہاں ہمارے پہلے فاؤنڈنگ سیلرز موجود ہیں۔ لانچ سے پہلے یہ فہرست بڑھے گی۔',
    ),
  },
};

export const dropshippers = {
  meta: {
    title: 'For Dropshippers - AdeelSab',
    description:
      'Coming in Phase 2: real-time stock sync, white-label packaging, a tracking API and Shopify and WooCommerce integrations. Leave your email and we will tell you when it is ready.',
  },
  hero: {
    eyebrow: common.phase2,
    title: t('Dropshipping integrations are coming', 'ڈراپ شپنگ انٹیگریشن جلد آ رہی ہے'),
    sub: t(
      'We are building the supply side and the delivery network first. Integrations follow once there is a catalogue worth syncing.',
      'ہم پہلے سپلائی اور ڈیلیوری نیٹ ورک بنا رہے ہیں۔ انٹیگریشن اس کے بعد آئے گی جب کیٹلاگ قابلِ ذکر ہو۔',
    ),
  },
  whatsComing: { title: t('What is coming', 'کیا آ رہا ہے') },
  capture: {
    title: t('Tell us you want it', 'ہمیں بتائیں کہ آپ کو یہ چاہیے'),
    sub: t(
      'Leave your details and we will contact you when the integration work begins. It also tells us which platform to build for first.',
      'اپنی تفصیلات چھوڑیں، انٹیگریشن کا کام شروع ہوتے ہی ہم رابطہ کریں گے۔ اس سے ہمیں یہ بھی پتہ چلے گا کہ پہلے کون سا پلیٹ فارم بنانا ہے۔',
    ),
  },
};

export const dropshipperFeatures: Array<{ icon: string; title: Copy; body: Copy }> = [
  {
    icon: 'refresh',
    title: t('Real-time stock sync', 'ریئل ٹائم اسٹاک'),
    body: t(
      'Stock levels push to your storefront as they change, so you stop selling what is no longer there.',
      'اسٹاک کی تعداد تبدیل ہوتے ہی آپ کے اسٹور پر اپ ڈیٹ ہوتی ہے۔',
    ),
  },
  {
    icon: 'package',
    title: t('White-label packaging', 'آپ کے نام کی پیکنگ'),
    body: t(
      'Parcels arrive with your branding, not ours. Your customer stays your customer.',
      'پارسل آپ کی برانڈنگ کے ساتھ پہنچتے ہیں، ہماری نہیں۔',
    ),
  },
  {
    icon: 'code',
    title: t('Tracking API', 'ٹریکنگ API'),
    body: t(
      'Order creation, status webhooks and tracking numbers you can surface in your own interface.',
      'آرڈر بنانا، اسٹیٹس ویب ہکس اور ٹریکنگ نمبر جو آپ اپنے سسٹم میں دکھا سکیں۔',
    ),
  },
  {
    icon: 'plug',
    title: t('Shopify and WooCommerce', 'Shopify اور WooCommerce'),
    body: t(
      'Apps for both, so you do not need a developer to connect a catalogue.',
      'دونوں کے لیے ایپ، تاکہ کیٹلاگ جوڑنے کے لیے ڈویلپر کی ضرورت نہ ہو۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   8. Reseller-enabled listings explainer
----------------------------------------------------------------------------- */

export const resellerListings = {
  meta: {
    title: 'Reseller-Enabled Listings - AdeelSab',
    description:
      'How consent-and-margin works on AdeelSab: a seller marks a listing as reseller-enabled and sets the margin; resellers see that margin published upfront and sell with zero inventory.',
  },
  hero: {
    eyebrow: t('How the model works', 'ماڈل کیسے کام کرتا ہے'),
    title: t('One seller stock. Hundreds of sales people.', 'ایک بیچنے والے کا مال۔ سینکڑوں بیچنے والے۔'),
    sub: t(
      'Nobody may resell a merchant product without that merchant agreeing to it and setting the margin. That consent is built into the listing itself.',
      'کوئی بھی کسی تاجر کا مال اس کی رضامندی اور طے شدہ منافع کے بغیر نہیں بیچ سکتا۔ یہ اجازت لسٹنگ میں ہی شامل ہے۔',
    ),
  },
  flow: { title: t('The three steps', 'تین مراحل') },
  sides: { title: t('What each side gets', 'ہر فریق کو کیا ملتا ہے') },
  fairness: {
    title: t('Why we built it this way', 'ہم نے یہ طریقہ کیوں اپنایا'),
    body: t(
      'On most platforms, reselling is an informal arrangement negotiated over WhatsApp, and it falls apart when the margin is disputed after a sale. Putting consent and margin inside the listing makes the terms a matter of record before anybody sells anything. Neither side can change them after the fact.',
      'زیادہ تر پلیٹ فارمز پر ری سیلنگ واٹس ایپ پر غیر رسمی طے ہوتی ہے اور فروخت کے بعد منافع پر تنازع ہو جاتا ہے۔ اجازت اور منافع کو لسٹنگ میں شامل کر کے شرائط پہلے ہی ریکارڈ ہو جاتی ہیں۔',
    ),
  },
};

export const resellerFlow: Step[] = [
  {
    title: t('The seller opts in', 'بیچنے والا اجازت دیتا ہے'),
    body: t(
      'While creating a listing, the seller answers one question: may resellers sell this product? If yes, they set the margin percentage they will pay.',
      'لسٹنگ بناتے وقت بیچنے والے سے ایک سوال ہوتا ہے: کیا ری سیلر یہ پروڈکٹ بیچ سکتے ہیں؟ اگر ہاں، تو وہ منافع کی شرح مقرر کرتے ہیں۔',
    ),
  },
  {
    title: t('The margin is published', 'منافع ظاہر ہو جاتا ہے'),
    body: t(
      'The product appears in the reseller catalogue with that margin shown. No reseller has to ask, and no seller has to negotiate.',
      'پروڈکٹ ری سیلر کیٹلاگ میں اسی منافع کے ساتھ ظاہر ہوتا ہے۔ نہ پوچھنے کی ضرورت، نہ سودے بازی کی۔',
    ),
  },
  {
    title: t('A sale settles both sides', 'فروخت پر دونوں کو ادائیگی'),
    body: t(
      'The reseller brings the customer, the seller ships the product, and on delivery the margin goes to the reseller and the balance to the seller - automatically, on the standard payout schedule.',
      'ری سیلر گاہک لاتا ہے، بیچنے والا مال بھیجتا ہے، اور ڈیلیوری پر منافع ری سیلر کو اور باقی رقم بیچنے والے کو خودکار طور پر ادا ہوتی ہے۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   9. Delivery & coverage
----------------------------------------------------------------------------- */

export const delivery = {
  meta: {
    title: 'Delivery & Coverage - AdeelSab',
    description:
      'Own fleet inside our launch cities, nationwide coverage through TCS, Leopards, PostEx and M&P. Full rate card, COD remittance schedule and RTO charges stated openly.',
  },
  hero: {
    eyebrow: t('Delivery & coverage', 'ڈیلیوری اور کوریج'),
    title: t('Where we deliver, how fast, and what it costs', 'ہم کہاں، کتنی جلدی اور کتنے میں پہنچاتے ہیں'),
    sub: t(
      `Our own riders in ${config.ownFleetCities.join(', ')}, and Pakistan-wide coverage through the couriers your customers already know.`,
      `${config.ownFleetCities.join('، ')} میں ہمارے اپنے رائیڈرز، اور پورے پاکستان میں وہ کورئیر جنہیں آپ کے گاہک پہلے سے جانتے ہیں۔`,
    ),
  },
  map: {
    title: t('Coverage', 'کوریج'),
    ownFleet: t('Own fleet', 'اپنی فلیٹ'),
    partnerNetwork: t('Courier partner network', 'کورئیر پارٹنر نیٹ ورک'),
    note: t(
      `${config.ownFleetCities.join(', ')} gets same-day and next-day delivery under our direct control, carried by AdeelSab Couriers. Everywhere else in Pakistan is served by our courier partners.`,
      `${config.ownFleetCities.join('، ')} میں اسی دن یا اگلے دن ڈیلیوری ہماری براہِ راست نگرانی میں، ایڈیل صاحب کورئیرز کے ذریعے۔ باقی پورے پاکستان میں کورئیر پارٹنرز۔`,
    ),
  },
  timelines: { title: t('Delivery timelines', 'ڈیلیوری کے اوقات') },
  partners: {
    title: t('Our courier partners', 'ہمارے کورئیر پارٹنرز'),
    sub: t(
      'You may not know us yet. You do know them.',
      'ہو سکتا ہے آپ ہمیں نہ جانتے ہوں۔ انہیں آپ ضرور جانتے ہیں۔',
    ),
  },
  rates: {
    title: t('Shipping rates', 'ڈیلیوری کے ریٹ'),
    sub: t(
      'Weight-banded and flat. No fuel surcharge, no peak-season adjustment, no handling fee.',
      'وزن کے حساب سے مقررہ۔ نہ فیول سرچارج، نہ سیزن ایڈجسٹمنٹ، نہ ہینڈلنگ فیس۔',
    ),
  },
  whoPays: {
    title: t('Who pays for shipping', 'ڈیلیوری خرچ کون دیتا ہے'),
    sub: t('You choose, per listing.', 'آپ ہر لسٹنگ پر خود طے کرتے ہیں۔'),
  },
  cod: {
    title: t('Cash on delivery', 'کیش آن ڈیلیوری'),
    body: t(
      `COD is available across Pakistan. We collect the cash, deduct shipping and commission, and remit the balance to you on the standard ${config.payout.days}-day settlement cycle. There is no separate COD fee beyond the rates on this page.`,
      `کیش آن ڈیلیوری پورے پاکستان میں دستیاب ہے۔ ہم رقم وصول کرتے ہیں، ڈیلیوری اور کمیشن منہا کر کے باقی رقم ${config.payout.days} دن کے شیڈول پر ادا کرتے ہیں۔ اس صفحے پر درج ریٹ کے علاوہ کوئی الگ COD فیس نہیں۔`,
    ),
  },
  rto: {
    title: t('Return to origin (RTO)', 'واپسی برائے اصل (RTO)'),
    body: t(
      'When a customer refuses a parcel or cannot be reached, the parcel is returned to you and an RTO charge applies. We are stating this plainly because it is the single largest cost surprise for new online sellers, and finding out about it afterwards is worse than the charge itself.',
      'جب گاہک پارسل لینے سے انکار کرے یا رابطہ نہ ہو، تو پارسل آپ کو واپس آتا ہے اور RTO چارج لگتا ہے۔ ہم یہ کھل کر بتا رہے ہیں کیونکہ نئے آن لائن بیچنے والوں کے لیے یہ سب سے بڑا غیر متوقع خرچ ہے۔',
    ),
    reduce: t(
      'RTO is reducible. Accurate photographs, honest descriptions, correct sizing and a confirmation call before dispatch remove most of it. We have written a guide.',
      'RTO کم کیا جا سکتا ہے۔ درست تصاویر، سچی تفصیل، صحیح سائز اور روانگی سے پہلے تصدیقی کال زیادہ تر RTO ختم کر دیتی ہے۔ ہم نے رہنمائی لکھی ہے۔',
    ),
  },
  returnPickup: { title: t('How a return comes back to you', 'واپسی آپ تک کیسے پہنچتی ہے') },
};

export type City = {
  name: string;
  province: string;
  /** True only where AdeelSab Couriers carries the parcel itself. */
  ownFleet: boolean;
  lat: number;
  lon: number;
};

/**
 * Real coordinates. CoverageMap projects them with the same Mercator transform
 * used to generate the outline, so a city can be added or promoted to own-fleet
 * here without anyone touching the SVG.
 */
export const cities: City[] = [
  { name: 'Lahore', province: 'Punjab', ownFleet: true, lat: 31.5204, lon: 74.3587 },
  { name: 'Karachi', province: 'Sindh', ownFleet: false, lat: 24.8607, lon: 67.0011 },
  { name: 'Islamabad', province: 'Federal', ownFleet: false, lat: 33.6844, lon: 73.0479 },
  { name: 'Rawalpindi', province: 'Punjab', ownFleet: false, lat: 33.5651, lon: 73.0169 },
  { name: 'Faisalabad', province: 'Punjab', ownFleet: false, lat: 31.418, lon: 73.079 },
  { name: 'Multan', province: 'Punjab', ownFleet: false, lat: 30.1575, lon: 71.5249 },
  { name: 'Peshawar', province: 'KP', ownFleet: false, lat: 34.0151, lon: 71.5805 },
  { name: 'Quetta', province: 'Balochistan', ownFleet: false, lat: 30.1798, lon: 66.975 },
  { name: 'Hyderabad', province: 'Sindh', ownFleet: false, lat: 25.396, lon: 68.3578 },
  { name: 'Sialkot', province: 'Punjab', ownFleet: false, lat: 32.4945, lon: 74.5229 },
  { name: 'Gujranwala', province: 'Punjab', ownFleet: false, lat: 32.1877, lon: 74.1945 },
  { name: 'Sargodha', province: 'Punjab', ownFleet: false, lat: 32.0836, lon: 72.6711 },
  { name: 'Bahawalpur', province: 'Punjab', ownFleet: false, lat: 29.3956, lon: 71.6836 },
  { name: 'Sukkur', province: 'Sindh', ownFleet: false, lat: 27.7052, lon: 68.8574 },
  { name: 'Abbottabad', province: 'KP', ownFleet: false, lat: 34.1688, lon: 73.2215 },
  { name: 'Gilgit', province: 'Gilgit-Baltistan', ownFleet: false, lat: 35.9208, lon: 74.3144 },
  { name: 'Turbat', province: 'Balochistan', ownFleet: false, lat: 26.0031, lon: 63.045 },
  { name: 'Gwadar', province: 'Balochistan', ownFleet: false, lat: 25.1264, lon: 62.3225 },
];

export const deliveryTimelines: Array<{ zone: Copy; time: Copy; by: Copy }> = [
  {
    zone: t('Within an own-fleet city', 'اپنی فلیٹ والے شہر کے اندر'),
    time: t('Same day to next day', 'اسی دن یا اگلے دن'), // TODO: confirm
    by: t('AdeelSab Couriers', 'ایڈیل صاحب کورئیرز'),
  },
  {
    zone: t('Major cities', 'بڑے شہر'),
    time: t('2 to 3 working days', '2 سے 3 کاروباری دن'), // TODO: confirm
    by: t('TCS / Leopards / PostEx / M&P', 'TCS / Leopards / PostEx / M&P'),
  },
  {
    zone: t('Rest of Pakistan', 'باقی پاکستان'),
    time: t('3 to 5 working days', '3 سے 5 کاروباری دن'), // TODO: confirm
    by: t('TCS / Leopards / PostEx / M&P', 'TCS / Leopards / PostEx / M&P'),
  },
  {
    zone: t('Remote and northern areas', 'دور دراز اور شمالی علاقے'),
    time: t('5 to 7 working days', '5 سے 7 کاروباری دن'), // TODO: confirm
    by: t('TCS / Leopards / M&P', 'TCS / Leopards / M&P'),
  },
];

/** TODO: every figure in this table needs confirming against commercial terms. */
export const rateCard: Array<{ band: string; inCity: string; major: string; rest: string }> = [
  { band: 'Up to 0.5 kg', inCity: 'Rs. 120', major: 'Rs. 180', rest: 'Rs. 220' },
  { band: '0.5 - 1 kg', inCity: 'Rs. 150', major: 'Rs. 220', rest: 'Rs. 270' },
  { band: '1 - 2 kg', inCity: 'Rs. 190', major: 'Rs. 280', rest: 'Rs. 340' },
  { band: '2 - 5 kg', inCity: 'Rs. 260', major: 'Rs. 390', rest: 'Rs. 470' },
  { band: '5 - 10 kg', inCity: 'Rs. 420', major: 'Rs. 620', rest: 'Rs. 740' },
  { band: 'Each additional kg', inCity: 'Rs. 35', major: 'Rs. 55', rest: 'Rs. 70' },
];

export const rateCardHeads = {
  band: t('Weight band', 'وزن'),
  inCity: t('Within own-fleet city', 'اپنے شہر میں'),
  major: t('Major cities', 'بڑے شہر'),
  rest: t('Rest of Pakistan', 'باقی پاکستان'),
};

export const whoPaysOptions: Array<{ title: Copy; body: Copy }> = [
  {
    title: t('You absorb it', 'آپ برداشت کریں'),
    body: t(
      'Shipping is deducted from your settlement. The customer sees free delivery, which lifts conversion - build the cost into your price.',
      'ڈیلیوری خرچ آپ کی ادائیگی سے کٹتا ہے۔ گاہک کو مفت ڈیلیوری نظر آتی ہے جس سے فروخت بڑھتی ہے — خرچ اپنی قیمت میں شامل کر لیں۔',
    ),
  },
  {
    title: t('The customer pays', 'گاہک ادا کرے'),
    body: t(
      'Shipping is added at checkout and collected with the order. Your settlement is unaffected.',
      'ڈیلیوری خرچ خریداری کے وقت شامل ہو کر وصول ہوتا ہے۔ آپ کی ادائیگی متاثر نہیں ہوتی۔',
    ),
  },
  {
    title: t('Split it', 'آدھا آدھا'),
    body: t(
      'You set a contribution; the customer pays the remainder. Common on higher-value items.',
      'آپ ایک حصہ دیتے ہیں، باقی گاہک۔ مہنگی اشیاء پر عام ہے۔',
    ),
  },
];

export const returnSteps: Step[] = [
  {
    title: t('Delivery fails', 'ڈیلیوری ناکام'),
    body: t(
      'The customer refuses the parcel, is unreachable after three attempts, or the address is wrong.',
      'گاہک پارسل لینے سے انکار کرے، تین کوششوں کے بعد رابطہ نہ ہو، یا پتہ غلط ہو۔',
    ),
  },
  {
    title: t('You are notified', 'آپ کو اطلاع'),
    body: t(
      'A WhatsApp message tells you the order is being returned and why.',
      'واٹس ایپ پیغام سے آپ کو وجہ سمیت اطلاع دی جاتی ہے کہ آرڈر واپس ہو رہا ہے۔',
    ),
  },
  {
    title: t('Parcel travels back', 'پارسل واپس آتا ہے'),
    body: t(
      'The courier or our rider returns it to your pickup address on the normal route.',
      'کورئیر یا ہمارا رائیڈر معمول کے راستے سے اسے آپ کے پتے پر واپس لاتا ہے۔',
    ),
  },
  {
    title: t('Settled on your statement', 'حساب میں شامل'),
    body: t(
      'The RTO charge appears as a line on your next settlement, with the order number against it.',
      'RTO چارج آپ کی اگلی ادائیگی میں آرڈر نمبر کے ساتھ ایک لائن کے طور پر نظر آتا ہے۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   10. Pricing & payouts
----------------------------------------------------------------------------- */

export const pricing = {
  meta: {
    title: 'Pricing & Commissions - AdeelSab',
    description:
      'The complete AdeelSab commission table by category, every fee that exists, and an explicit statement that there are no others. No listing fee, no monthly fee, no setup fee.',
  },
  hero: {
    eyebrow: t('Pricing', 'قیمت'),
    title: t('Every fee, on one page', 'ہر فیس، ایک ہی صفحے پر'),
    sub: t(
      'You should not have to sign up to find out what something costs. Here is the entire commercial arrangement.',
      'قیمت جاننے کے لیے رجسٹر کرنا نہیں چاہیے۔ یہ رہا مکمل تجارتی معاہدہ۔',
    ),
  },
  table: {
    title: t('Commission by category', 'کیٹیگری کے مطابق کمیشن'),
    note: t(
      'Commission is charged on the product price only, never on the shipping the customer paid.',
      'کمیشن صرف پروڈکٹ کی قیمت پر لگتا ہے، گاہک کے ادا کردہ ڈیلیوری خرچ پر کبھی نہیں۔',
    ),
  },
  noOtherFees: {
    title: t('There are no other fees', 'اس کے علاوہ کوئی فیس نہیں'),
    body: t(
      'No listing fee. No monthly or annual fee. No setup fee. No fee to have your listings created for you. No fee to withdraw your money. If a charge is not named on this page or the delivery page, it does not exist.',
      'نہ لسٹنگ فیس، نہ ماہانہ یا سالانہ فیس، نہ سیٹ اپ فیس، نہ لسٹنگ بنوانے کی فیس، نہ رقم نکلوانے کی فیس۔ جو چارج اس صفحے یا ڈیلیوری صفحے پر درج نہیں، وہ موجود نہیں۔',
    ),
  },
  founding: {
    title: t('Founding Seller rates', 'فاؤنڈنگ سیلر کی شرح'),
    body: t(
      `Merchants who join before launch pay no commission for their first ${config.foundingSeller.commissionHolidayMonths} months, after which the category rates above apply.`,
      `لانچ سے پہلے شامل ہونے والے تاجر پہلے ${config.foundingSeller.commissionHolidayMonths} ماہ کوئی کمیشن ادا نہیں کرتے، بعد ازاں اوپر درج شرح لاگو ہوتی ہے۔`,
    ),
  },
};

/** TODO: confirm every commission percentage before launch. */
export const commissions: Array<{ category: Copy; rate: string; note: Copy }> = [
  {
    category: t('Fashion & apparel', 'کپڑے اور فیشن'),
    rate: '10%',
    note: t('Includes footwear and accessories', 'جوتے اور لوازمات شامل'),
  },
  {
    category: t('Mobile & electronics', 'موبائل اور الیکٹرانکس'),
    rate: '5%',
    note: t('Lower rate reflects thin margins', 'کم منافع کی وجہ سے کم شرح'),
  },
  {
    category: t('Home & kitchen', 'گھر اور باورچی خانہ'),
    rate: '9%',
    note: t('Excludes large appliances', 'بڑے آلات شامل نہیں'),
  },
  {
    category: t('Beauty & personal care', 'بیوٹی اور پرسنل کیئر'),
    rate: '12%',
    note: t('Sealed and unexpired stock only', 'صرف سیل بند اور معیاد کے اندر مال'),
  },
  {
    category: t('Health & supplements', 'صحت اور سپلیمنٹس'),
    rate: '10%',
    note: t('Documentation required', 'دستاویزات لازمی'),
  },
  {
    category: t('Books & stationery', 'کتابیں اور اسٹیشنری'),
    rate: '8%',
    note: t('', ''),
  },
  {
    category: t('Sports & outdoor', 'کھیل اور آؤٹ ڈور'),
    rate: '10%',
    note: t('', ''),
  },
  {
    category: t('Groceries & packaged food', 'گروسری اور پیکڈ فوڈ'),
    rate: '7%',
    note: t('Non-perishable only at launch', 'لانچ پر صرف غیر خراب ہونے والی اشیاء'),
  },
  {
    category: t('Toys & baby', 'کھلونے اور بچوں کا سامان'),
    rate: '10%',
    note: t('', ''),
  },
  {
    category: t('Everything else', 'دیگر تمام'),
    rate: '10%',
    note: t('Default rate', 'عام شرح'),
  },
];

export const commissionHeads = {
  category: t('Category', 'کیٹیگری'),
  rate: t('Commission', 'کمیشن'),
  note: t('Notes', 'وضاحت'),
};

export const payouts = {
  meta: {
    title: 'Payouts & Settlement - AdeelSab',
    description:
      'When AdeelSab pays sellers, how the money reaches you, the minimum payout threshold, and the hold and dispute policy - stated in full.',
  },
  hero: {
    eyebrow: t('Payouts', 'ادائیگی'),
    title: t('When you get paid, and how', 'آپ کو ادائیگی کب اور کیسے ملتی ہے'),
    sub: t(
      'Settlement speed matters more than commission rate to most merchants. Here is ours, without qualification.',
      'زیادہ تر تاجروں کے لیے ادائیگی کی رفتار کمیشن سے زیادہ اہم ہے۔ یہ رہا ہمارا طریقہ، بغیر کسی شرط کے۔',
    ),
  },
  schedule: { title: t('The settlement cycle', 'ادائیگی کا دورانیہ') },
  rails: {
    title: t('Where the money goes', 'رقم کہاں جاتی ہے'),
    sub: t(
      'Whichever you choose, the timing is the same.',
      'آپ جو بھی منتخب کریں، وقت ایک جیسا رہتا ہے۔',
    ),
  },
  deductions: { title: t('What is deducted', 'کیا منہا ہوتا ہے') },
  holds: {
    title: t('Holds and disputes', 'روک اور تنازعات'),
    body: t(
      'A payment can be held only for a specific, stated reason: an open customer dispute on that order, a suspected counterfeit or safety issue, or an unverified payout account. You are told the reason and the order number on the day the hold is placed, and a held payment is released within two working days of the matter being resolved.',
      'ادائیگی صرف ایک واضح وجہ سے روکی جا سکتی ہے: اس آرڈر پر گاہک کا کھلا تنازع، نقلی یا غیر محفوظ مال کا شبہ، یا غیر تصدیق شدہ ادائیگی اکاؤنٹ۔ روک کے دن ہی آپ کو وجہ اور آرڈر نمبر بتایا جاتا ہے، اور معاملہ حل ہونے کے دو کاروباری دن کے اندر رقم جاری کر دی جاتی ہے۔',
    ),
  },
};

export const payoutDeductions: Array<{ item: Copy; detail: Copy }> = [
  {
    item: t('Category commission', 'کیٹیگری کمیشن'),
    detail: t('On the product price only, per the pricing table.', 'صرف پروڈکٹ کی قیمت پر، پرائسنگ فہرست کے مطابق۔'),
  },
  {
    item: t('Shipping', 'ڈیلیوری'),
    detail: t(
      'Only if you chose to absorb it on that listing.',
      'صرف اس صورت میں جب آپ نے اس لسٹنگ پر خرچ خود برداشت کرنے کا انتخاب کیا ہو۔',
    ),
  },
  {
    item: t('RTO charge', 'RTO چارج'),
    detail: t('Only on parcels that were returned to you.', 'صرف ان پارسلز پر جو آپ کو واپس آئے۔'),
  },
  {
    item: t('Reseller margin', 'ری سیلر منافع'),
    detail: t(
      'Only on sales made by a reseller, at the rate you published.',
      'صرف ری سیلر کی کی گئی فروخت پر، اسی شرح سے جو آپ نے مقرر کی۔',
    ),
  },
  {
    item: t('Withholding tax', 'ود ہولڈنگ ٹیکس'),
    detail: t(
      'Where the law requires it. The rate depends on whether you are on the Active Taxpayer List.',
      'جہاں قانون کا تقاضا ہو۔ شرح کا انحصار اس پر ہے کہ آپ ایکٹو ٹیکس پیئر لسٹ میں ہیں یا نہیں۔',
    ),
  },
];

/* -----------------------------------------------------------------------------
   11. How it works
----------------------------------------------------------------------------- */

export const howItWorks = {
  meta: {
    title: 'How It Works - AdeelSab',
    description:
      'From registration to settlement: how selling on AdeelSab works for local sellers, resellers and dropshippers, step by step.',
  },
  hero: {
    eyebrow: t('How it works', 'یہ کیسے کام کرتا ہے'),
    title: t('From your shelf to their door', 'آپ کے شیلف سے ان کے دروازے تک'),
    sub: t(
      'The whole process, with nothing left out and nobody assumed to have done this before.',
      'پورا طریقہ کار، کچھ چھوڑے بغیر — اور یہ فرض کیے بغیر کہ آپ نے پہلے یہ کام کیا ہے۔',
    ),
  },
  forSellers: { title: t('If you have your own stock', 'اگر مال آپ کا اپنا ہے') },
  forResellers: { title: t('If you are reselling', 'اگر آپ ری سیلنگ کر رہے ہیں') },
  money: {
    title: t('How the money moves', 'رقم کیسے منتقل ہوتی ہے'),
    checkoutLabel: t('How your customers can pay', 'آپ کے گاہک کیسے ادائیگی کر سکتے ہیں'),
    body: t(
      'A customer pays by cash on delivery or card. We receive the money, deduct commission, shipping where you chose to absorb it, and any reseller margin. What remains reaches your account on the settlement cycle. Every deduction appears as a separate line against the order number - there is no combined figure you cannot break down.',
      'گاہک کیش آن ڈیلیوری یا کارڈ سے ادائیگی کرتا ہے۔ ہم رقم وصول کر کے کمیشن، ڈیلیوری (اگر آپ نے برداشت کی ہو) اور ری سیلر منافع منہا کرتے ہیں۔ باقی رقم ادائیگی کے دورانیے پر آپ کے اکاؤنٹ میں پہنچتی ہے۔ ہر کٹوتی آرڈر نمبر کے ساتھ الگ لائن میں نظر آتی ہے۔',
    ),
  },
};

export const resellerHowSteps: Step[] = [
  {
    title: t('Browse reseller-enabled products', 'ری سیلر مصنوعات دیکھیں'),
    body: t(
      'Filter the catalogue to products whose sellers have opted in, and read the published margin on each.',
      'کیٹلاگ میں وہ مصنوعات چھانٹیں جن کے مالکان نے اجازت دی ہو، اور ہر ایک پر طے شدہ منافع پڑھیں۔',
    ),
  },
  {
    title: t('Share them with your customers', 'اپنے گاہکوں کو بھیجیں'),
    body: t(
      'WhatsApp, Facebook, Instagram, a shop counter - wherever your customers already are.',
      'واٹس ایپ، فیس بک، انسٹاگرام، یا دکان کا کاؤنٹر — جہاں بھی آپ کے گاہک ہوں۔',
    ),
  },
  {
    title: t('The seller ships it', 'مال بیچنے والا بھیجتا ہے'),
    body: t(
      'You never touch the stock. The seller packs and dispatches; delivery and COD collection are ours.',
      'آپ مال کو ہاتھ تک نہیں لگاتے۔ بیچنے والا پیک اور روانہ کرتا ہے؛ ڈیلیوری اور رقم کی وصولی ہماری ذمہ داری ہے۔',
    ),
  },
  {
    title: t('Your margin is settled', 'آپ کا منافع ادا ہوتا ہے'),
    body: t(
      `On the same ${config.payout.days}-day cycle as everyone else, to your bank, JazzCash or Easypaisa.`,
      `باقی سب کی طرح اسی ${config.payout.days} دن کے دورانیے پر، آپ کے بینک، جاز کیش یا ایزی پیسہ میں۔`,
    ),
  },
];

/* -----------------------------------------------------------------------------
   12. Seller Hub
----------------------------------------------------------------------------- */

export const sellerHub = {
  meta: {
    title: 'Seller Hub - AdeelSab',
    description:
      'Practical guides for selling online in Pakistan: listing products, phone photography, packaging, returns and disputes, reducing RTO, and NTN and tax basics.',
  },
  hero: {
    eyebrow: t('Seller Hub', 'سیلر ہب'),
    title: t('Everything we know, written down', 'جو کچھ ہم جانتے ہیں، لکھا ہوا'),
    sub: t(
      'Guides written for shop owners selling online for the first time. Free, and you do not need an account to read them.',
      'ان دکانداروں کے لیے رہنمائی جو پہلی بار آن لائن بیچ رہے ہیں۔ مفت، اور پڑھنے کے لیے اکاؤنٹ کی ضرورت نہیں۔',
    ),
  },
  ctaTitle: t('Ready to start?', 'شروع کرنے کے لیے تیار؟'),
  ctaBody: t(
    'Reading is useful. Selling is better. Join the Founding Seller Program and we will walk you through all of this on a call.',
    'پڑھنا مفید ہے، بیچنا بہتر۔ فاؤنڈنگ سیلر پروگرام میں شامل ہوں اور ہم کال پر یہ سب سمجھا دیں گے۔',
  ),
};

/* -----------------------------------------------------------------------------
   13. About, careers, contact
----------------------------------------------------------------------------- */

export const about = {
  meta: {
    title: 'About AdeelSab',
    description:
      'Why we are building a marketplace for Pakistani shop owners, what we have built so far, and who is behind it.',
  },
  hero: {
    eyebrow: t('About us', 'ہمارے بارے میں'),
    title: t('Built for the shop, not the boardroom', 'دکان کے لیے بنایا گیا، بورڈ روم کے لیے نہیں'),
    sub: t(
      'AdeelSab exists because the people with the best stock in Pakistan are usually the least equipped to sell it online.',
      'ایڈیل صاحب اس لیے بنا کہ پاکستان میں بہترین مال رکھنے والے اکثر آن لائن بیچنے کے لیے کم سے کم تیار ہوتے ہیں۔',
    ),
  },
  story: {
    title: t('Why we are building this', 'ہم یہ کیوں بنا رہے ہیں'),
    body: t(
      'Walk through any wholesale market in Pakistan and you will find traders with deep stock, real supplier relationships and decades of product knowledge - who cannot get any of it onto the internet. The barrier is rarely ambition. It is a listing form in English, a photograph that will not upload, a delivery network they do not have, and a payment they are not sure will arrive. We decided to remove those four things rather than build another catalogue.',
      'پاکستان کی کسی بھی ہول سیل مارکیٹ میں جائیں تو آپ کو ایسے تاجر ملیں گے جن کے پاس گہرا اسٹاک، حقیقی سپلائر تعلقات اور برسوں کا تجربہ ہے — مگر وہ اسے انٹرنیٹ پر نہیں لا سکتے۔ رکاوٹ عزم نہیں، بلکہ انگریزی کا فارم، تصویر جو اپ لوڈ نہیں ہوتی، ڈیلیوری نیٹ ورک جو ان کے پاس نہیں، اور ادائیگی جس کا یقین نہیں۔ ہم نے یہ چار رکاوٹیں ہٹانے کا فیصلہ کیا۔',
    ),
  },
  mission: {
    title: t('What we are trying to do', 'ہمارا مقصد'),
    body: t(
      'Make it possible for a shop owner in Faisalabad with no website, no English and no delivery contract to sell to a customer in Gilgit, and be paid for it on a date they can plan around.',
      'فیصل آباد کے ایسے دکاندار کے لیے، جس کے پاس نہ ویب سائٹ ہے نہ انگریزی نہ ڈیلیوری معاہدہ، گلگت کے گاہک کو بیچنا ممکن بنانا — اور مقررہ تاریخ پر ادائیگی یقینی بنانا۔',
    ),
  },
  building: { title: t('What we have built', 'ہم نے کیا بنایا ہے') },
  team: {
    title: t('The people behind it', 'اس کے پیچھے لوگ'),
    body: t(
      'A small team in Lahore. We answer our own WhatsApp.',
      'لاہور میں ایک چھوٹی ٹیم۔ ہم اپنا واٹس ایپ خود سنبھالتے ہیں۔',
    ),
  },
};

export const aboutBuilt: Array<{ title: Copy; body: Copy }> = [
  {
    title: t('The marketplace platform', 'مارکیٹ پلیس پلیٹ فارم'),
    body: t(
      'Built and tested. Seller accounts, listings, orders, settlements and the reseller mechanism are all working. We are holding launch until there is a catalogue worth opening.',
      'بن چکا اور آزمایا جا چکا۔ سیلر اکاؤنٹ، لسٹنگ، آرڈر، ادائیگی اور ری سیلر نظام سب کام کر رہے ہیں۔ ہم لانچ اس وقت تک روک رہے ہیں جب تک کیٹلاگ قابلِ ذکر نہ ہو۔',
    ),
  },
  {
    title: t('AdeelSab Couriers, our own fleet', 'ایڈیل صاحب کورئیرز — ہماری اپنی فلیٹ'),
    body: t(
      `Our own riders in ${config.ownFleetCities.join(', ')}, under our direct control rather than subcontracted.`,
      `${config.ownFleetCities.join('، ')} میں ہمارے اپنے رائیڈرز، ہماری براہِ راست نگرانی میں۔`,
    ),
  },
  {
    title: t('National courier relationships', 'ملک گیر کورئیر تعلقات'),
    body: t(
      'Working arrangements with TCS, Leopards, PostEx and M&P so that every address in Pakistan is reachable from day one.',
      'TCS، Leopards، PostEx اور M&P کے ساتھ معاہدے تاکہ پہلے دن سے پاکستان کا ہر پتہ قابلِ رسائی ہو۔',
    ),
  },
  {
    title: t('A support desk that speaks Urdu', 'اردو بولنے والا سپورٹ ڈیسک'),
    body: t(
      'On WhatsApp, during business hours, staffed by people rather than an automated menu.',
      'واٹس ایپ پر، کاروباری اوقات میں، خودکار مینو کے بجائے اصل لوگوں کے ساتھ۔',
    ),
  },
];

export const careers = {
  meta: {
    title: 'Careers - AdeelSab',
    description:
      'Open roles at AdeelSab in Lahore. Early-stage work with direct contact with Pakistani merchants.',
  },
  hero: {
    eyebrow: t('Careers', 'ملازمتیں'),
    title: t('Work on something with a customer you can visit', 'ایسے کام کا حصہ بنیں جس کا گاہک آپ خود جا کر مل سکیں'),
    sub: t(
      'We are small, pre-launch, and hiring for the roles that decide whether this works.',
      'ہم چھوٹی ٹیم ہیں، لانچ سے پہلے، اور ان عہدوں کے لیے بھرتی کر رہے ہیں جن پر کامیابی کا انحصار ہے۔',
    ),
  },
  culture: { title: t('How we work', 'ہم کیسے کام کرتے ہیں') },
  openRoles: { title: t('Open roles', 'دستیاب عہدے') },
  noRoles: {
    title: t('No open roles right now', 'اس وقت کوئی عہدہ خالی نہیں'),
    body: t(
      'We are always looking. Send your CV and tell us what you would want to work on.',
      'ہم ہمیشہ تلاش میں رہتے ہیں۔ اپنا CV بھیجیں اور بتائیں کہ آپ کس کام میں دلچسپی رکھتے ہیں۔',
    ),
  },
  general: {
    title: t('Nothing here fits?', 'کچھ مناسب نہیں ملا؟'),
    body: t(
      'Send your CV anyway. We read all of them.',
      'پھر بھی اپنا CV بھیجیں۔ ہم سب پڑھتے ہیں۔',
    ),
  },
  apply: t('Apply', 'درخواست دیں'),
};

/** TODO: confirm the live vacancy list before publishing. */
export const openRoles: Array<{
  title: Copy;
  location: Copy;
  type: Copy;
  body: Copy;
}> = [
  {
    title: t('Merchant Onboarding Executive', 'مرچنٹ آن بورڈنگ ایگزیکٹو'),
    location: t('Lahore - field and office', 'لاہور — فیلڈ اور دفتر'),
    type: t('Full time', 'کل وقتی'),
    body: t(
      'Visit wholesale markets, sign up shop owners, and walk them through their first listings in Urdu. Fluent Urdu essential; a motorbike helps.',
      'ہول سیل مارکیٹوں کا دورہ کریں، دکانداروں کو شامل کریں، اور اردو میں ان کی پہلی لسٹنگ بنوائیں۔ روانی سے اردو لازمی؛ موٹر سائیکل مددگار۔',
    ),
  },
  {
    title: t('Catalogue & Listings Associate', 'کیٹلاگ اور لسٹنگ ایسوسی ایٹ'),
    location: t('Lahore - office', 'لاہور — دفتر'),
    type: t('Full time', 'کل وقتی'),
    body: t(
      'Turn merchant photographs into finished listings: titles, descriptions, specifications, categories. Attention to detail matters more than experience.',
      'تاجروں کی تصاویر کو مکمل لسٹنگ میں بدلیں: عنوان، تفصیل، خصوصیات، کیٹیگری۔ تجربے سے زیادہ باریک بینی اہم ہے۔',
    ),
  },
  {
    title: t('Fleet & Operations Coordinator', 'فلیٹ اور آپریشنز کوآرڈینیٹر'),
    location: t('Lahore', 'لاہور'),
    type: t('Full time', 'کل وقتی'),
    body: t(
      'Run daily dispatch for our own riders, manage courier handovers, and chase down the orders that go wrong.',
      'اپنے رائیڈرز کی روزانہ ترسیل چلائیں، کورئیر حوالگی سنبھالیں، اور مسئلے والے آرڈرز کا پیچھا کریں۔',
    ),
  },
];

export const culturePoints: Array<{ title: Copy; body: Copy }> = [
  {
    title: t('Talk to merchants directly', 'تاجروں سے براہِ راست بات'),
    body: t(
      'Everyone here, whatever their role, spends time with actual shop owners. Decisions made without that go badly.',
      'یہاں ہر شخص، چاہے کوئی بھی عہدہ ہو، اصل دکانداروں کے ساتھ وقت گزارتا ہے۔ اس کے بغیر کیے گئے فیصلے ناکام ہوتے ہیں۔',
    ),
  },
  {
    title: t('Say the number', 'عدد بتائیں'),
    body: t(
      'We publish our commission, our RTO charge and our payout timeline. We talk to each other the same way.',
      'ہم اپنا کمیشن، RTO چارج اور ادائیگی کا وقت شائع کرتے ہیں۔ آپس میں بھی اسی طرح بات کرتے ہیں۔',
    ),
  },
  {
    title: t('Urdu first', 'اردو پہلے'),
    body: t(
      'Our customers work in Urdu. Anything we build that only works in English is not finished.',
      'ہمارے گاہک اردو میں کام کرتے ہیں۔ جو چیز صرف انگریزی میں چلے، وہ نامکمل ہے۔',
    ),
  },
  {
    title: t('Small team, wide scope', 'چھوٹی ٹیم، وسیع کام'),
    body: t(
      'Nobody has one narrow job. If you want a fixed remit and a large org chart, this is the wrong place.',
      'یہاں کسی کا کام محدود نہیں۔ اگر آپ کو مقررہ ذمہ داری اور بڑا ادارہ چاہیے تو یہ جگہ مناسب نہیں۔',
    ),
  },
];

export const contact = {
  meta: {
    title: 'Contact & Support - AdeelSab',
    description:
      'Reach AdeelSab on WhatsApp for merchant support, or by email for business enquiries. Office address and hours in Pakistan Standard Time.',
  },
  hero: {
    eyebrow: t('Contact', 'رابطہ'),
    title: t('Talk to a person', 'کسی شخص سے بات کریں'),
    sub: t(
      'WhatsApp is the fastest way to reach us, and the person replying speaks Urdu.',
      'واٹس ایپ سب سے تیز طریقہ ہے، اور جواب دینے والا شخص اردو بولتا ہے۔',
    ),
  },
  merchantSupport: {
    title: t('Merchant support', 'تاجروں کے لیے سپورٹ'),
    body: t(
      'Questions about selling, listings, orders, delivery or payouts.',
      'فروخت، لسٹنگ، آرڈر، ڈیلیوری یا ادائیگی سے متعلق سوالات۔',
    ),
  },
  business: {
    title: t('Business enquiries', 'کاروباری رابطہ'),
    body: t(
      'Partnerships, courier and payment integrations, press and anything else.',
      'شراکت داری، کورئیر اور ادائیگی انٹیگریشن، میڈیا اور دیگر امور۔',
    ),
  },
  office: { title: t('Our office', 'ہمارا دفتر') },
  mapPlaceholder: t(
    'Map placeholder - embed added once the office address is confirmed.',
    'نقشہ — دفتر کے پتے کی تصدیق کے بعد شامل کیا جائے گا۔',
  ),
};

/* -----------------------------------------------------------------------------
   14. Waitlist form
----------------------------------------------------------------------------- */

export const form = {
  name: t('Full name', 'پورا نام'),
  namePlaceholder: t('e.g. Muhammad Adeel', 'مثلاً محمد عدیل'),
  whatsapp: t('WhatsApp number', 'واٹس ایپ نمبر'),
  whatsappPlaceholder: t('03XX XXXXXXX', '03XX XXXXXXX'),
  city: t('City', 'شہر'),
  cityPlaceholder: t('Select your city', 'اپنا شہر منتخب کریں'),
  businessType: t('What describes you?', 'آپ کیا کرتے ہیں؟'),
  businessTypePlaceholder: t('Select one', 'ایک منتخب کریں'),
  category: t('What do you sell?', 'آپ کیا بیچتے ہیں؟'),
  categoryPlaceholder: t('Select a category', 'کیٹیگری منتخب کریں'),
  volume: t('Approximate monthly sales', 'تخمینی ماہانہ فروخت'),
  volumePlaceholder: t('Select a range', 'حد منتخب کریں'),
  message: t('Anything else? (optional)', 'کچھ اور؟ (اختیاری)'),
  messagePlaceholder: t(
    'Tell us about your shop or ask us a question',
    'اپنی دکان کے بارے میں بتائیں یا سوال پوچھیں',
  ),
  submit: t('Join the Founding Seller Program', 'فاؤنڈنگ سیلر پروگرام میں شامل ہوں'),
  submitting: t('Sending…', 'بھیجا جا رہا ہے…'),
  privacy: t(
    'We use your number to contact you about selling on AdeelSab. We do not sell your details to anybody.',
    'ہم آپ کا نمبر صرف ایڈیل صاحب پر فروخت کے سلسلے میں رابطے کے لیے استعمال کرتے ہیں۔ آپ کی تفصیلات کسی کو فروخت نہیں کی جاتیں۔',
  ),
  successTitle: t('We have your details', 'آپ کی تفصیلات موصول ہو گئیں'),
  successBody: t(
    'Someone will call you on WhatsApp in Urdu within one working day. If you would rather not wait, message us now.',
    'ایک کاروباری دن کے اندر کوئی آپ کو واٹس ایپ پر اردو میں کال کرے گا۔ انتظار نہ کرنا چاہیں تو ابھی پیغام بھیجیں۔',
  ),
  errorTitle: t('That did not go through', 'پیغام نہیں پہنچا'),
  errorBody: t(
    'Something went wrong on our side. Please send us the same details on WhatsApp - it reaches the same team.',
    'ہماری طرف سے کوئی مسئلہ ہوا۔ براہِ کرم یہی تفصیلات واٹس ایپ پر بھیج دیں — وہ اسی ٹیم تک پہنچتی ہیں۔',
  ),
  errors: {
    name: t('Please enter your name', 'براہِ کرم اپنا نام درج کریں'),
    whatsapp: t(
      'Enter a Pakistani mobile number, for example 03001234567',
      'پاکستانی موبائل نمبر درج کریں، مثلاً 03001234567',
    ),
    city: t('Please select your city', 'براہِ کرم اپنا شہر منتخب کریں'),
    businessType: t('Please select one', 'براہِ کرم ایک منتخب کریں'),
    category: t('Please select a category', 'براہِ کرم کیٹیگری منتخب کریں'),
    volume: t('Please select a range', 'براہِ کرم حد منتخب کریں'),
  },
};

export const formCities: string[] = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Sialkot',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sukkur',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Gilgit',
  'Other',
];

export const businessTypes: Copy[] = [
  t('Local seller / shop owner', 'مقامی دکاندار'),
  t('Wholesaler', 'ہول سیلر'),
  t('Reseller', 'ری سیلر'),
  t('Dropshipper', 'ڈراپ شپر'),
  t('Manufacturer', 'مینوفیکچرر'),
  t('Other', 'دیگر'),
];

export const volumeRanges: Copy[] = [
  t('Not selling yet', 'ابھی فروخت شروع نہیں کی'),
  t('Under Rs. 50,000 per month', 'ماہانہ 50,000 روپے سے کم'),
  t('Rs. 50,000 - 200,000', '50,000 - 200,000 روپے'),
  t('Rs. 200,000 - 1,000,000', '200,000 - 1,000,000 روپے'),
  t('Over Rs. 1,000,000', '1,000,000 روپے سے زیادہ'),
];

export const productCategories: Copy[] = commissions.map((c) => c.category);

/* -----------------------------------------------------------------------------
   15. Legal
----------------------------------------------------------------------------- */

export const legal = {
  lastUpdated: t('Last updated 14 September 2026', 'آخری بار اپ ڈیٹ: 14 ستمبر 2026'),
  reviewNotice: t(
    'This document is a working draft prepared for the pre-launch site and has not yet been reviewed by a lawyer qualified in Pakistan. It must be reviewed before launch.',
    'یہ دستاویز لانچ سے پہلے کی ابتدائی مسودہ ہے اور ابھی پاکستانی قانون دان سے نظرثانی نہیں کرائی گئی۔ لانچ سے پہلے نظرثانی ضروری ہے۔',
  ),
};

/* -----------------------------------------------------------------------------
   16. 404
----------------------------------------------------------------------------- */

export const notFound = {
  title: t('This page does not exist', 'یہ صفحہ موجود نہیں'),
  sub: t(
    'The link may be old, or we may have moved something. Here is where most people are going.',
    'ہو سکتا ہے لنک پرانا ہو یا ہم نے کچھ منتقل کر دیا ہو۔ زیادہ تر لوگ یہاں جاتے ہیں۔',
  ),
};
