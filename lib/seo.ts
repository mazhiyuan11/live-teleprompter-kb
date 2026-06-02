import { siteConfig } from './site-config';
import type { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  canonical?: string;
  noIndex?: boolean;
}

export function createSEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  canonical,
  noIndex,
}: SEOProps = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaKeywords = keywords || siteConfig.keywords;
  const url = canonical || siteConfig.url;

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: author ? [{ name: author }] : [{ name: siteConfig.author }],
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.language,
      type: ogType,
      images: [
        {
          url: ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage || siteConfig.ogImage],
    },
  };

  return metadata;
}

export function generateArticleSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author,
  image,
  faq,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  image?: string;
  faq?: { question: string; answer: string }[];
}) {
  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
        width: 1200,
        height: 630,
      },
    }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'zh-CN',
  };

  if (faq && faq.length > 0) {
    return [
      baseSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ];
  }

  return baseSchema;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  };
}
