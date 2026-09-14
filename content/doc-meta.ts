import type { Copy, Locale } from '@/lib/i18n';

/* =============================================================================
   Metadata for every Seller Hub doc and blog post.

   Kept separate from content/docs.ts on purpose: docs.ts statically imports the
   MDX bodies, so anything importing it pulls the full text of every article
   into its bundle. Index pages are client components and only ever need titles,
   so they import this file instead and stay small.

   Titles, descriptions, audiences and table-of-contents labels are bilingual.
   English is what search engines index (see lib/seo.ts, which reads `.en`);
   the Urdu is what a reader with the toggle on actually sees. Without it the
   Latin text would render in the Nastaliq face, which looks broken.
============================================================================= */

const t = (en: string, ur: string): Copy => ({ en, ur });

export type DocMeta = {
  slug: string;
  title: Copy;
  description: Copy;
  audience: Copy;
  updatedAt: string;
  /** Rough reading time in minutes. */
  minutes: number;
  /** Which locales have a written body. Gaps are tracked in CONTENT-TODO.md. */
  locales: Locale[];
  /** Section anchors, in order, for the table of contents. */
  toc: Array<{ id: string; label: Copy }>;
};

const AUDIENCE = {
  all: t('All sellers', 'تمام بیچنے والے'),
  local: t('Local sellers', 'مقامی دکاندار'),
  resellers: t('Resellers', 'ری سیلرز'),
  dropshippers: t('Dropshippers', 'ڈراپ شپرز'),
};

export const sellerHubMeta: DocMeta[] = [
  {
    slug: 'getting-started',
    title: t('Getting started on AdeelSab', 'ایڈیل صاحب پر شروعات'),
    description: t(
      'What you need before you register, what happens on your onboarding call, and what your first week of selling looks like.',
      'رجسٹریشن سے پہلے کیا چاہیے، رجسٹریشن کال میں کیا ہوتا ہے، اور فروخت کا پہلا ہفتہ کیسا گزرتا ہے۔',
    ),
    audience: AUDIENCE.all,
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en', 'ur'],
    toc: [
      { id: 'before-you-register', label: t('Before you register', 'رجسٹریشن سے پہلے') },
      { id: 'the-onboarding-call', label: t('The onboarding call', 'رجسٹریشن کال') },
      { id: 'your-first-listings', label: t('Your first listings', 'آپ کی پہلی لسٹنگ') },
      { id: 'your-first-order', label: t('Your first order', 'آپ کا پہلا آرڈر') },
      { id: 'getting-paid', label: t('Getting paid', 'ادائیگی') },
      {
        id: 'common-mistakes-in-week-one',
        label: t('Common mistakes in week one', 'پہلے ہفتے کی عام غلطیاں'),
      },
    ],
  },
  {
    slug: 'how-to-list-products',
    title: t('How to list a product properly', 'پروڈکٹ درست طریقے سے کیسے درج کریں'),
    description: t(
      'Titles, descriptions, specifications, pricing and stock. What a listing needs to rank, sell, and not come back as a return.',
      'عنوان، تفصیل، خصوصیات، قیمت اور اسٹاک۔ لسٹنگ کو کیا چاہیے کہ وہ نظر آئے، بکے، اور واپس نہ آئے۔',
    ),
    audience: AUDIENCE.local,
    updatedAt: '2026-09-14',
    minutes: 7,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-a-listing-is-for', label: t('What a listing is for', 'لسٹنگ کس لیے ہوتی ہے') },
      { id: 'the-title', label: t('The title', 'عنوان') },
      { id: 'the-description', label: t('The description', 'تفصیل') },
      { id: 'specifications', label: t('Specifications', 'خصوصیات') },
      { id: 'pricing', label: t('Pricing', 'قیمت') },
      { id: 'stock-and-weight', label: t('Stock and weight', 'اسٹاک اور وزن') },
      { id: 'a-worked-example', label: t('A worked example', 'ایک عملی مثال') },
    ],
  },
  {
    slug: 'product-photography-with-a-phone',
    title: t('Product photography with a phone', 'موبائل سے پروڈکٹ کی تصاویر'),
    description: t(
      'You do not need a camera or a studio. Daylight, a plain background and five minutes produce photographs good enough to sell from.',
      'کیمرے یا اسٹوڈیو کی ضرورت نہیں۔ دن کی روشنی، سادہ پس منظر اور پانچ منٹ ایسی تصاویر دے دیتے ہیں جن سے فروخت ہو جائے۔',
    ),
    audience: AUDIENCE.local,
    updatedAt: '2026-09-14',
    minutes: 5,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-you-need', label: t('What you need', 'کیا چاہیے') },
      { id: 'the-light', label: t('The light', 'روشنی') },
      { id: 'the-background', label: t('The background', 'پس منظر') },
      { id: 'the-shots-to-take', label: t('The shots to take', 'کون سی تصاویر بنائیں') },
      { id: 'settings-and-editing', label: t('Settings and editing', 'سیٹنگ اور ایڈیٹنگ') },
      {
        id: 'what-gets-a-listing-rejected',
        label: t('What gets a listing rejected', 'لسٹنگ کب مسترد ہوتی ہے'),
      },
    ],
  },
  {
    slug: 'packaging-guide',
    title: t('Packaging guide: shipping without damage', 'پیکنگ رہنمائی: بغیر نقصان کے ترسیل'),
    description: t(
      'How to pack for Pakistani courier conditions so that parcels arrive intact, and what to do about fragile, liquid and high-value items.',
      'پاکستانی کورئیر کے حالات کے مطابق پیکنگ کیسے کریں کہ پارسل سلامت پہنچے، اور نازک، مائع اور قیمتی اشیاء کا کیا کریں۔',
    ),
    audience: AUDIENCE.all,
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en', 'ur'],
    toc: [
      {
        id: 'why-packaging-is-a-cost-decision',
        label: t('Why packaging is a cost decision', 'پیکنگ خرچ کا فیصلہ کیوں ہے'),
      },
      { id: 'the-basic-parcel', label: t('The basic parcel', 'عام پارسل') },
      { id: 'by-product-type', label: t('By product type', 'پروڈکٹ کی قسم کے مطابق') },
      { id: 'labelling', label: t('Labelling', 'لیبل') },
      { id: 'what-not-to-do', label: t('What not to do', 'کیا نہ کریں') },
      {
        id: 'a-packing-checklist',
        label: t('A packing checklist', 'روانگی سے پہلے کی فہرست'),
      },
    ],
  },
  {
    slug: 'returns-and-disputes',
    title: t('Returns and disputes', 'واپسیاں اور تنازعات'),
    description: t(
      'When a buyer can return something, who pays in each case, how a dispute is decided, and what evidence protects you.',
      'خریدار کب کوئی چیز واپس کر سکتا ہے، ہر صورت میں خرچ کون دیتا ہے، تنازع کا فیصلہ کیسے ہوتا ہے، اور کون سا ثبوت آپ کی حفاظت کرتا ہے۔',
    ),
    audience: AUDIENCE.all,
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en', 'ur'],
    toc: [
      {
        id: 'the-three-kinds-of-return',
        label: t('The three kinds of return', 'واپسی کی تین قسمیں'),
      },
      { id: 'who-pays', label: t('Who pays', 'خرچ کون دیتا ہے') },
      {
        id: 'how-a-dispute-is-decided',
        label: t('How a dispute is decided', 'تنازع کا فیصلہ کیسے ہوتا ہے'),
      },
      {
        id: 'evidence-that-protects-you',
        label: t('Evidence that protects you', 'وہ ثبوت جو آپ کی حفاظت کرتے ہیں'),
      },
      {
        id: 'items-that-cannot-be-returned',
        label: t('Items that cannot be returned', 'جو چیزیں واپس نہیں ہو سکتیں'),
      },
      {
        id: 'if-you-disagree-with-an-outcome',
        label: t('If you disagree with an outcome', 'اگر آپ فیصلے سے متفق نہ ہوں'),
      },
    ],
  },
  {
    slug: 'reducing-rto-in-cod',
    title: t(
      'Reducing RTO in a cash-on-delivery business',
      'کیش آن ڈیلیوری کے کاروبار میں RTO کم کرنا',
    ),
    description: t(
      'Why parcels get refused at the door in Pakistan, what each refusal actually costs you, and the handful of changes that remove most of them.',
      'پاکستان میں پارسل دروازے پر کیوں واپس ہوتے ہیں، ہر انکار اصل میں کتنے کا پڑتا ہے، اور وہ چند تبدیلیاں جو اکثر واپسیاں ختم کر دیتی ہیں۔',
    ),
    audience: AUDIENCE.all,
    updatedAt: '2026-09-14',
    minutes: 8,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-rto-actually-costs', label: t('What RTO actually costs', 'RTO کی اصل قیمت') },
      {
        id: 'why-parcels-get-refused',
        label: t('Why parcels get refused', 'پارسل کیوں واپس ہوتے ہیں'),
      },
      { id: 'fix-the-listing', label: t('Fix the listing', 'لسٹنگ درست کریں') },
      {
        id: 'confirm-before-dispatch',
        label: t('Confirm before dispatch', 'روانگی سے پہلے تصدیق'),
      },
      {
        id: 'manage-the-delivery-window',
        label: t('Manage the delivery window', 'ڈیلیوری کا دورانیہ سنبھالیں'),
      },
      { id: 'measure-it', label: t('Measure it', 'پیمائش کریں') },
    ],
  },
  {
    slug: 'ntn-and-tax-basics',
    title: t('NTN and tax basics for online sellers', 'آن لائن بیچنے والوں کے لیے NTN اور ٹیکس'),
    description: t(
      'What an NTN is, whether you need one to sell online, what the Active Taxpayer List changes about your payouts, and how to register.',
      'NTN کیا ہے، آن لائن بیچنے کے لیے ضروری ہے یا نہیں، ایکٹو ٹیکس پیئر لسٹ آپ کی ادائیگی پر کیا اثر ڈالتی ہے، اور رجسٹریشن کیسے کریں۔',
    ),
    audience: AUDIENCE.local,
    updatedAt: '2026-09-14',
    minutes: 7,
    locales: ['en', 'ur'],
    toc: [
      { id: 'the-short-answer', label: t('The short answer', 'مختصر جواب') },
      { id: 'what-an-ntn-is', label: t('What an NTN is', 'NTN کیا ہے') },
      {
        id: 'the-active-taxpayer-list',
        label: t('The Active Taxpayer List', 'ایکٹو ٹیکس پیئر لسٹ'),
      },
      { id: 'how-to-register', label: t('How to register', 'رجسٹریشن کیسے کریں') },
      { id: 'what-records-to-keep', label: t('What records to keep', 'کون سا ریکارڈ رکھیں') },
      { id: 'what-about-sales-tax', label: t('What about sales tax?', 'سیلز ٹیکس کا کیا؟') },
    ],
  },
];

export const blogMeta: DocMeta[] = [
  {
    slug: 'how-to-start-selling-online-in-pakistan',
    title: t(
      'How to start selling online in Pakistan: a 2026 guide',
      'پاکستان میں آن لائن فروخت کیسے شروع کریں: 2026 کی رہنمائی',
    ),
    description: t(
      'A practical guide for shop owners and wholesalers: what you need, what it costs, how delivery and cash on delivery work, and the mistakes that cost new sellers money.',
      'دکانداروں اور ہول سیلرز کے لیے عملی رہنمائی: کیا چاہیے، خرچ کتنا ہے، ڈیلیوری اور کیش آن ڈیلیوری کیسے چلتے ہیں، اور وہ غلطیاں جو نئے بیچنے والوں کو مہنگی پڑتی ہیں۔',
    ),
    audience: AUDIENCE.local,
    updatedAt: '2026-09-14',
    minutes: 11,
    locales: ['en', 'ur'],
    toc: [
      { id: 'who-this-is-for', label: t('Who this is for', 'یہ کن کے لیے ہے') },
      { id: 'what-you-actually-need', label: t('What you actually need', 'اصل میں کیا چاہیے') },
      { id: 'where-to-sell', label: t('Where to sell', 'کہاں بیچیں') },
      { id: 'what-it-costs', label: t('What it costs', 'خرچ کتنا ہے') },
      {
        id: 'delivery-and-cash-on-delivery',
        label: t('Delivery and cash on delivery', 'ڈیلیوری اور کیش آن ڈیلیوری'),
      },
      { id: 'pricing-for-online', label: t('Pricing for online', 'آن لائن کے لیے قیمت') },
      { id: 'your-first-thirty-days', label: t('Your first thirty days', 'آپ کے پہلے تیس دن') },
      {
        id: 'mistakes-that-cost-money',
        label: t('Mistakes that cost money', 'وہ غلطیاں جو پیسے کھاتی ہیں'),
      },
    ],
  },
  {
    slug: 'reselling-without-capital',
    title: t('Reselling without capital: a complete guide', 'بغیر سرمائے کے ری سیلنگ: مکمل رہنمائی'),
    description: t(
      'How reselling actually works in Pakistan, what margins to expect, where resellers lose money, and how a published-margin model differs from an informal WhatsApp arrangement.',
      'پاکستان میں ری سیلنگ اصل میں کیسے چلتی ہے، منافع کتنا ہوتا ہے، ری سیلر پیسے کہاں گنواتے ہیں، اور طے شدہ منافع کا طریقہ واٹس ایپ کے غیر رسمی سودے سے کیسے مختلف ہے۔',
    ),
    audience: AUDIENCE.resellers,
    updatedAt: '2026-09-14',
    minutes: 9,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-reselling-is', label: t('What reselling is', 'ری سیلنگ کیا ہے') },
      { id: 'what-you-need', label: t('What you need', 'کیا چاہیے') },
      {
        id: 'where-the-margin-comes-from',
        label: t('Where the margin comes from', 'منافع کہاں سے آتا ہے'),
      },
      {
        id: 'the-problem-with-informal-deals',
        label: t('The problem with informal deals', 'غیر رسمی سودوں کا مسئلہ'),
      },
      { id: 'choosing-products', label: t('Choosing products', 'پروڈکٹ کیسے چنیں') },
      {
        id: 'where-resellers-lose-money',
        label: t('Where resellers lose money', 'ری سیلر پیسے کہاں گنواتے ہیں'),
      },
      { id: 'is-it-worth-it', label: t('Is it worth it?', 'کیا یہ فائدہ مند ہے؟') },
    ],
  },
  {
    slug: 'dropshipping-in-pakistan',
    title: t('Dropshipping in Pakistan: does it still work?', 'پاکستان میں ڈراپ شپنگ: کیا اب بھی چلتی ہے؟'),
    description: t(
      'An honest look at dropshipping for the Pakistani market in 2026 - what works, what the cash-on-delivery model does to the economics, and who should not bother.',
      '2026 میں پاکستانی منڈی کے لیے ڈراپ شپنگ کا ایماندار جائزہ — کیا چلتا ہے، کیش آن ڈیلیوری حساب کتاب پر کیا اثر ڈالتی ہے، اور کن لوگوں کو یہ نہیں کرنا چاہیے۔',
    ),
    audience: AUDIENCE.dropshippers,
    updatedAt: '2026-09-14',
    minutes: 9,
    locales: ['en', 'ur'],
    toc: [
      { id: 'the-short-answer', label: t('The short answer', 'مختصر جواب') },
      { id: 'what-changed', label: t('What changed', 'کیا بدلا') },
      {
        id: 'the-cash-on-delivery-problem',
        label: t('The cash-on-delivery problem', 'کیش آن ڈیلیوری کا مسئلہ'),
      },
      { id: 'the-real-economics', label: t('The real economics', 'اصل حساب کتاب') },
      { id: 'what-works-now', label: t('What works now', 'اب کیا چلتا ہے') },
      {
        id: 'what-you-need-to-start',
        label: t('What you need to start', 'شروع کرنے کے لیے کیا چاہیے'),
      },
      {
        id: 'who-should-not-bother',
        label: t('Who should not bother', 'کن کو یہ نہیں کرنا چاہیے'),
      },
    ],
  },
];

export function findDocMeta(collection: DocMeta[], slug: string): DocMeta | undefined {
  return collection.find((doc) => doc.slug === slug);
}
