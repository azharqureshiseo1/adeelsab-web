/**
 * Module shape for MDX content files.
 *
 * Article metadata lives in content/doc-meta.ts rather than in frontmatter, so
 * an MDX file only ever exports its rendered body. This declaration exists so
 * that body is typed as a component rather than `any`.
 */
declare module '*.mdx' {
  import type { ComponentType } from 'react';

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
