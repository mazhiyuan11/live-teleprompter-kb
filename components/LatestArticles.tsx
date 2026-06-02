import Link from 'next/link';
import { getLatestArticles } from '@/lib/articles';
import { ArticleCard } from './ArticleCard';

export function LatestArticles() {
  const articles = getLatestArticles(4);

  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
              最新文章
            </h2>
            <p className="text-ink-500 mt-2 text-sm">
              持续更新提词器相关知识和技巧
            </p>
            <div className="section-divider" />
          </div>
          <Link
            href="/tutorials"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            全部文章
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
