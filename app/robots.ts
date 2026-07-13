import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: [],
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
