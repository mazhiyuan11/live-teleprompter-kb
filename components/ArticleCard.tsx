import Link from 'next/link';
import type { ArticleMeta } from '@/types';

interface ArticleCardProps {
  article: ArticleMeta;
  showCategory?: boolean;
}

export function ArticleCard({ article, showCategory = true }: ArticleCardProps) {
  return (
    <article className="card-hover bg-white border border-ink-100 rounded-xl overflow-hidden group">
      <Link href={`/tutorials/${article.slug}`} className="block p-5">
        {/* Category + Difficulty */}
        {showCategory && (
          <div className="flex items-center gap-2 mb-3">
            <span className="tag">{article.category}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              article.difficulty === 'beginner'
                ? 'bg-green-50 text-green-700'
                : article.difficulty === 'intermediate'
                ? 'bg-warm-50 text-warm-700'
                : 'bg-red-50 text-red-700'
            }`}>
              {article.difficulty === 'beginner' ? '入门' : article.difficulty === 'intermediate' ? '进阶' : '高级'}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display font-bold text-lg text-ink-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 mb-4">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-ink-400">
          <div className="flex items-center gap-3">
            <time dateTime={article.date}>
              {article.date}
            </time>
            <span>·</span>
            <span>{article.readingTime} 分钟阅读</span>
          </div>
          {article.featured && (
            <span className="tag-warm">推荐</span>
          )}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-ink-50">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-ink-400 bg-ink-50 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
