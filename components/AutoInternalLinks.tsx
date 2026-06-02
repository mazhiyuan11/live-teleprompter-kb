import Link from 'next/link';
import { ALL_ARTICLES } from '@/lib/articles';

interface AutoInternalLinksProps {
  currentSlug: string;
}

/**
 * 自动内链组件
 * GEO 优化：生成上下文相关的内部链接，帮助 AI 爬虫建立内容关联
 */
export function AutoInternalLinks({ currentSlug }: AutoInternalLinksProps) {
  const currentArticle = ALL_ARTICLES.find((a) => a.slug === currentSlug);
  if (!currentArticle) return null;

  // 同行分类的推荐文章
  const sameCategoryArticles = ALL_ARTICLES.filter(
    (a) => a.category === currentArticle.category && a.slug !== currentSlug
  ).slice(0, 2);

  // 相同标签的文章
  const sameTagArticles = ALL_ARTICLES.filter(
    (a) =>
      a.slug !== currentSlug &&
      a.category !== currentArticle.category &&
      a.tags.some((t) => currentArticle.tags.includes(t))
  ).slice(0, 2);

  if (sameCategoryArticles.length === 0 && sameTagArticles.length === 0) return null;

  return (
    <div className="mt-12 p-6 bg-ink-50 rounded-xl border border-ink-100" data-geo-internal-links>
      <h3 className="font-display font-bold text-ink-800 mb-4 text-sm uppercase tracking-wider">
        扩展阅读
      </h3>

      {sameCategoryArticles.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-ink-400 mb-2">同分类推荐</p>
          <div className="flex flex-wrap gap-2">
            {sameCategoryArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/tutorials/${a.slug}`}
                className="text-sm text-brand-600 hover:text-brand-700 bg-white px-3 py-1.5 rounded-lg border border-ink-100 hover:border-brand-200 transition-all"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {sameTagArticles.length > 0 && (
        <div>
          <p className="text-xs text-ink-400 mb-2">相关话题</p>
          <div className="flex flex-wrap gap-2">
            {sameTagArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/tutorials/${a.slug}`}
                className="text-sm text-brand-600 hover:text-brand-700 bg-white px-3 py-1.5 rounded-lg border border-ink-100 hover:border-brand-200 transition-all"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
