import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id, ...props }) => (
      <h1 id={id} className="text-3xl font-bold text-ink-900 mt-12 mb-6 font-display scroll-mt-24" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2 id={id} className="text-2xl font-bold text-ink-900 mt-10 mb-4 font-display scroll-mt-24 border-b border-ink-100 pb-2" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3 id={id} className="text-xl font-semibold text-ink-800 mt-8 mb-3 font-display scroll-mt-24" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, id, ...props }) => (
      <h4 id={id} className="text-lg font-semibold text-ink-700 mt-6 mb-2 font-display scroll-mt-24" {...props}>
        {children}
      </h4>
    ),
    p: (props) => (
      <p className="text-ink-700 leading-relaxed mb-5 text-[1.05rem]" {...props} />
    ),
    a: ({ href, ...props }) => (
      <a href={href} className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-500 transition-colors" {...props} />
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-ink-700" {...props} />
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-ink-700" {...props} />
    ),
    li: (props) => (
      <li className="leading-relaxed" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-brand-300 bg-brand-50/50 pl-5 py-3 pr-4 my-6 rounded-r-lg text-ink-700 italic" {...props} />
    ),
    code: (props) => (
      <code className="bg-ink-100 text-ink-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-ink-950 text-ink-50 p-5 rounded-xl overflow-x-auto my-6 text-sm leading-relaxed" {...props} />
    ),
    table: (props) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    th: (props) => (
      <th className="border border-ink-200 bg-ink-50 px-4 py-2 text-left font-semibold text-ink-800" {...props} />
    ),
    td: (props) => (
      <td className="border border-ink-200 px-4 py-2 text-ink-700" {...props} />
    ),
    hr: (props) => (
      <hr className="my-10 border-ink-100" {...props} />
    ),
    ...components,
  };
}
