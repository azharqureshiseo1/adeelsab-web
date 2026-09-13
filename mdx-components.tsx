import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

/**
 * Shared MDX element mapping. Typography comes from the `.prose-as` class on
 * the article wrapper, so this file only handles behaviour that markdown cannot
 * express on its own - internal links routed through next/link, and headings
 * given ids so the table of contents can anchor to them.
 */
function slugify(children: React.ReactNode): string {
  return String(children)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => <h2 id={slugify(children)}>{children}</h2>,
    h3: ({ children }) => <h3 id={slugify(children)}>{children}</h3>,
    a: ({ href = '', children }) => {
      const internal = href.startsWith('/');
      if (internal) return <Link href={href}>{children}</Link>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table>{children}</table>
      </div>
    ),
    ...components,
  };
}
