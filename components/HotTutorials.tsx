import Link from 'next/link';
import { getFeaturedArticles } from '@/lib/articles';
import { ArticleCard } from './ArticleCard';

export function HotTutorials() {
  const articles = getFeaturedArticles(6);

  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
              热门教程
            </h2>
            <p className="text-ink-500 mt-2 text-sm">
              精选高质量提词器教程，从入门到进阶
            </p>
            <div className="section-divider" />
          </div>
          <Link
            href="/tutorials"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Mobile view all */}
        <Link
          href="/tutorials"
          className="sm:hidden mt-6 btn-secondary w-full justify-center"
        >
          查看全部教程
        </Link>
      </div>
    </section>
  );
}
