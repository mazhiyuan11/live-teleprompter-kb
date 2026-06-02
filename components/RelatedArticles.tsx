import Link from 'next/link';
import { getRelatedArticles } from '@/lib/articles';

interface RelatedArticlesProps {
  currentSlug: string;
}

export function RelatedArticles({ currentSlug }: RelatedArticlesProps) {
  const articles = getRelatedArticles(currentSlug);

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-ink-100">
      <h2 className="font-display text-xl font-bold text-ink-900 mb-6">
        相关文章
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/tutorials/${article.slug}`}
            className="card-hover bg-ink-50 border border-ink-100 rounded-xl p-4 group"
          >
            <span className="tag mb-2 inline-block">{article.category}</span>
            <h3 className="font-medium text-ink-800 group-hover:text-brand-700 transition-colors text-sm leading-snug line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-ink-400 mt-1">{article.readingTime} 分钟阅读</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
