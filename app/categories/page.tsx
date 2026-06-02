import type { Metadata } from 'next';
import Link from 'next/link';
import { createSEOMetadata } from '@/lib/seo';
import { CATEGORIES, getArticlesByCategory } from '@/lib/articles';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = createSEOMetadata({
  title: '教程分类',
  description:
    '按分类浏览直播提词器教程：OBS提词、工具推荐、口播技巧、常见问题、AI提词。找到你需要的知识内容。',
  ogType: 'website',
  canonical: 'https://live-teleprompter.cn/categories',
});

export default function CategoriesPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '教程分类' },
        ]}
      />

      {/* Page Header */}
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-3">
          教程分类
        </h1>
        <p className="text-ink-500 max-w-2xl">
          按主题分类浏览所有提词器教程，每个分类下都有系统化的知识内容。
        </p>
        <div className="section-divider" />
      </div>

      {/* Category Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const articles = getArticlesByCategory(cat.slug);
          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="card-hover bg-white border border-ink-100 rounded-xl p-6 group"
            >
              <h3 className="font-display font-bold text-xl text-ink-900 mb-2 group-hover:text-brand-700 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-4">
                {cat.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-600">
                  {articles.length} 篇教程
                </span>
                <svg
                  className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
