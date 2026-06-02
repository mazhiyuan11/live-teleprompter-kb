import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Build JSON-LD structured data
  const schemaItems = items
    .filter((item) => item.href)
    .map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.label,
      item: `https://live-teleprompter.cn${item.href}`,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: schemaItems,
          }),
        }}
      />
      <nav aria-label="面包屑导航" className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && (
              <svg className="w-3 h-3 text-ink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-600 font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
