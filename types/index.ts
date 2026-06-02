export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  updatedAt?: string;
  author: string;
  coverImage?: string;
  readingTime: number;
  featured?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  faq?: FAQItem[];
  relatedSlugs?: string[];
  keywords?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  language: string;
  keywords: string[];
}
