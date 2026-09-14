import type { ComponentType } from 'react';
import { blogMeta, findDocMeta, sellerHubMeta } from './doc-meta';
import type { DocMeta } from './doc-meta';

/* =============================================================================
   Body registry for Seller Hub docs and blog posts.

   Bodies are statically imported so the bundler can typecheck and tree-shake
   them, and no filesystem access happens at request time - the site is a static
   export. Metadata lives in content/doc-meta.ts so that index pages can list
   articles without pulling every article body into their bundle.

   To add an article: write the .mdx file, add its metadata to doc-meta.ts, then
   add one entry to the map below.
============================================================================= */

import GettingStarted from './seller-hub/getting-started.mdx';
import GettingStartedUr from './seller-hub/getting-started.ur.mdx';
import HowToList from './seller-hub/how-to-list-products.mdx';
import HowToListUr from './seller-hub/how-to-list-products.ur.mdx';
import Photography from './seller-hub/product-photography-with-a-phone.mdx';
import PhotographyUr from './seller-hub/product-photography-with-a-phone.ur.mdx';
import Packaging from './seller-hub/packaging-guide.mdx';
import PackagingUr from './seller-hub/packaging-guide.ur.mdx';
import Returns from './seller-hub/returns-and-disputes.mdx';
import ReturnsUr from './seller-hub/returns-and-disputes.ur.mdx';
import ReducingRto from './seller-hub/reducing-rto-in-cod.mdx';
import ReducingRtoUr from './seller-hub/reducing-rto-in-cod.ur.mdx';
import NtnBasics from './seller-hub/ntn-and-tax-basics.mdx';
import NtnBasicsUr from './seller-hub/ntn-and-tax-basics.ur.mdx';

import StartSelling from './blog/how-to-start-selling-online-in-pakistan.mdx';
import StartSellingUr from './blog/how-to-start-selling-online-in-pakistan.ur.mdx';
import ResellingGuide from './blog/reselling-without-capital.mdx';
import ResellingGuideUr from './blog/reselling-without-capital.ur.mdx';
import Dropshipping from './blog/dropshipping-in-pakistan.mdx';
import DropshippingUr from './blog/dropshipping-in-pakistan.ur.mdx';

type MdxComponent = ComponentType<Record<string, unknown>>;
type Bodies = { Content: MdxComponent; ContentUr?: MdxComponent };

export type DocEntry = DocMeta & Bodies;

const SELLER_HUB_BODIES: Record<string, Bodies> = {
  'getting-started': { Content: GettingStarted, ContentUr: GettingStartedUr },
  'how-to-list-products': { Content: HowToList, ContentUr: HowToListUr },
  'product-photography-with-a-phone': { Content: Photography, ContentUr: PhotographyUr },
  'packaging-guide': { Content: Packaging, ContentUr: PackagingUr },
  'returns-and-disputes': { Content: Returns, ContentUr: ReturnsUr },
  'reducing-rto-in-cod': { Content: ReducingRto, ContentUr: ReducingRtoUr },
  'ntn-and-tax-basics': { Content: NtnBasics, ContentUr: NtnBasicsUr },
};

const BLOG_BODIES: Record<string, Bodies> = {
  'how-to-start-selling-online-in-pakistan': { Content: StartSelling, ContentUr: StartSellingUr },
  'reselling-without-capital': { Content: ResellingGuide, ContentUr: ResellingGuideUr },
  'dropshipping-in-pakistan': { Content: Dropshipping, ContentUr: DropshippingUr },
};

export function getSellerHubDoc(slug: string): DocEntry | undefined {
  const meta = findDocMeta(sellerHubMeta, slug);
  const bodies = SELLER_HUB_BODIES[slug];
  return meta && bodies ? { ...meta, ...bodies } : undefined;
}

export function getBlogPost(slug: string): DocEntry | undefined {
  const meta = findDocMeta(blogMeta, slug);
  const bodies = BLOG_BODIES[slug];
  return meta && bodies ? { ...meta, ...bodies } : undefined;
}
