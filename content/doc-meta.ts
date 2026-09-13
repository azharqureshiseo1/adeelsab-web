import type { Locale } from '@/lib/i18n';

/* =============================================================================
   Metadata for every Seller Hub doc and blog post.

   Kept separate from content/docs.ts on purpose: docs.ts statically imports the
   MDX bodies, so anything importing it pulls the full text of every article
   into its bundle. Index pages are client components and only ever need titles,
   so they import this file instead and stay small.
============================================================================= */

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  updatedAt: string;
  /** Rough reading time in minutes. */
  minutes: number;
  /** Which locales have a written body. Gaps are tracked in CONTENT-TODO.md. */
  locales: Locale[];
  /** Section anchors, in order, for the table of contents. */
  toc: Array<{ id: string; label: string }>;
};

export const sellerHubMeta: DocMeta[] = [
  {
    slug: 'getting-started',
    title: 'Getting started on AdeelSab',
    description:
      'What you need before you register, what happens on your onboarding call, and what your first week of selling looks like.',
    audience: 'All sellers',
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en', 'ur'],
    toc: [
      { id: 'before-you-register', label: 'Before you register' },
      { id: 'the-onboarding-call', label: 'The onboarding call' },
      { id: 'your-first-listings', label: 'Your first listings' },
      { id: 'your-first-order', label: 'Your first order' },
      { id: 'getting-paid', label: 'Getting paid' },
      { id: 'common-mistakes-in-week-one', label: 'Common mistakes in week one' },
    ],
  },
  {
    slug: 'how-to-list-products',
    title: 'How to list a product properly',
    description:
      'Titles, descriptions, specifications, pricing and stock. What a listing needs to rank, sell, and not come back as a return.',
    audience: 'Local sellers',
    updatedAt: '2026-09-14',
    minutes: 7,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'what-a-listing-is-for', label: 'What a listing is for' },
      { id: 'the-title', label: 'The title' },
      { id: 'the-description', label: 'The description' },
      { id: 'specifications', label: 'Specifications' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'stock-and-weight', label: 'Stock and weight' },
      { id: 'a-worked-example', label: 'A worked example' },
    ],
  },
  {
    slug: 'product-photography-with-a-phone',
    title: 'Product photography with a phone',
    description:
      'You do not need a camera or a studio. Daylight, a plain background and five minutes produce photographs good enough to sell from.',
    audience: 'Local sellers',
    updatedAt: '2026-09-14',
    minutes: 5,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-you-need', label: 'What you need' },
      { id: 'the-light', label: 'The light' },
      { id: 'the-background', label: 'The background' },
      { id: 'the-shots-to-take', label: 'The shots to take' },
      { id: 'settings-and-editing', label: 'Settings and editing' },
      { id: 'what-gets-a-listing-rejected', label: 'What gets a listing rejected' },
    ],
  },
  {
    slug: 'packaging-guide',
    title: 'Packaging guide: shipping without damage',
    description:
      'How to pack for Pakistani courier conditions so that parcels arrive intact, and what to do about fragile, liquid and high-value items.',
    audience: 'All sellers',
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'why-packaging-is-a-cost-decision', label: 'Why packaging is a cost decision' },
      { id: 'the-basic-parcel', label: 'The basic parcel' },
      { id: 'by-product-type', label: 'By product type' },
      { id: 'labelling', label: 'Labelling' },
      { id: 'what-not-to-do', label: 'What not to do' },
      { id: 'a-packing-checklist', label: 'A packing checklist' },
    ],
  },
  {
    slug: 'returns-and-disputes',
    title: 'Returns and disputes',
    description:
      'When a buyer can return something, who pays in each case, how a dispute is decided, and what evidence protects you.',
    audience: 'All sellers',
    updatedAt: '2026-09-14',
    minutes: 6,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'the-three-kinds-of-return', label: 'The three kinds of return' },
      { id: 'who-pays', label: 'Who pays' },
      { id: 'how-a-dispute-is-decided', label: 'How a dispute is decided' },
      { id: 'evidence-that-protects-you', label: 'Evidence that protects you' },
      { id: 'items-that-cannot-be-returned', label: 'Items that cannot be returned' },
      { id: 'if-you-disagree-with-an-outcome', label: 'If you disagree with an outcome' },
    ],
  },
  {
    slug: 'reducing-rto-in-cod',
    title: 'Reducing RTO in a cash-on-delivery business',
    description:
      'Why parcels get refused at the door in Pakistan, what each refusal actually costs you, and the handful of changes that remove most of them.',
    audience: 'All sellers',
    updatedAt: '2026-09-14',
    minutes: 8,
    locales: ['en', 'ur'],
    toc: [
      { id: 'what-rto-actually-costs', label: 'What RTO actually costs' },
      { id: 'why-parcels-get-refused', label: 'Why parcels get refused' },
      { id: 'fix-the-listing', label: 'Fix the listing' },
      { id: 'confirm-before-dispatch', label: 'Confirm before dispatch' },
      { id: 'manage-the-delivery-window', label: 'Manage the delivery window' },
      { id: 'measure-it', label: 'Measure it' },
    ],
  },
  {
    slug: 'ntn-and-tax-basics',
    title: 'NTN and tax basics for online sellers',
    description:
      'What an NTN is, whether you need one to sell online, what the Active Taxpayer List changes about your payouts, and how to register.',
    audience: 'Local sellers',
    updatedAt: '2026-09-14',
    minutes: 7,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'the-short-answer', label: 'The short answer' },
      { id: 'what-an-ntn-is', label: 'What an NTN is' },
      { id: 'the-active-taxpayer-list', label: 'The Active Taxpayer List' },
      { id: 'how-to-register', label: 'How to register' },
      { id: 'what-records-to-keep', label: 'What records to keep' },
      { id: 'what-about-sales-tax', label: 'What about sales tax?' },
    ],
  },
];

export const blogMeta: DocMeta[] = [
  {
    slug: 'how-to-start-selling-online-in-pakistan',
    title: 'How to start selling online in Pakistan: a 2026 guide',
    description:
      'A practical guide for shop owners and wholesalers: what you need, what it costs, how delivery and cash on delivery work, and the mistakes that cost new sellers money.',
    audience: 'Local sellers',
    updatedAt: '2026-09-14',
    minutes: 11,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'who-this-is-for', label: 'Who this is for' },
      { id: 'what-you-actually-need', label: 'What you actually need' },
      { id: 'where-to-sell', label: 'Where to sell' },
      { id: 'what-it-costs', label: 'What it costs' },
      { id: 'delivery-and-cash-on-delivery', label: 'Delivery and cash on delivery' },
      { id: 'pricing-for-online', label: 'Pricing for online' },
      { id: 'your-first-thirty-days', label: 'Your first thirty days' },
      { id: 'mistakes-that-cost-money', label: 'Mistakes that cost money' },
    ],
  },
  {
    slug: 'reselling-without-capital',
    title: 'Reselling without capital: a complete guide',
    description:
      'How reselling actually works in Pakistan, what margins to expect, where resellers lose money, and how a published-margin model differs from an informal WhatsApp arrangement.',
    audience: 'Resellers',
    updatedAt: '2026-09-14',
    minutes: 9,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'what-reselling-is', label: 'What reselling is' },
      { id: 'what-you-need', label: 'What you need' },
      { id: 'where-the-margin-comes-from', label: 'Where the margin comes from' },
      { id: 'the-problem-with-informal-deals', label: 'The problem with informal deals' },
      { id: 'choosing-products', label: 'Choosing products' },
      { id: 'where-resellers-lose-money', label: 'Where resellers lose money' },
      { id: 'is-it-worth-it', label: 'Is it worth it?' },
    ],
  },
  {
    slug: 'dropshipping-in-pakistan',
    title: 'Dropshipping in Pakistan: does it still work?',
    description:
      'An honest look at dropshipping for the Pakistani market in 2026 - what works, what the cash-on-delivery model does to the economics, and who should not bother.',
    audience: 'Dropshippers',
    updatedAt: '2026-09-14',
    minutes: 9,
    locales: ['en'], // TODO: Urdu translation outstanding
    toc: [
      { id: 'the-short-answer', label: 'The short answer' },
      { id: 'what-changed', label: 'What changed' },
      { id: 'the-cash-on-delivery-problem', label: 'The cash-on-delivery problem' },
      { id: 'the-real-economics', label: 'The real economics' },
      { id: 'what-works-now', label: 'What works now' },
      { id: 'what-you-need-to-start', label: 'What you need to start' },
      { id: 'who-should-not-bother', label: 'Who should not bother' },
    ],
  },
];

export function findDocMeta(collection: DocMeta[], slug: string): DocMeta | undefined {
  return collection.find((doc) => doc.slug === slug);
}
