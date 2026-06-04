import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { ALL_ARTICLES, CATEGORIES } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '全部教程',
  description:
    '直播提词器全部教程列表：OBS提词设置、免费提词器推荐、口播技巧训练、直播忘词解决方案、AI提词等。从入门到进阶，系统化学习。',
  ogType: 'website',
  canonical: 'https://zhibotici.xin/tutorials',
});

export default function TutorialsPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '全部教程' },
        ]}
      />

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-3">
          全部教程
        </h1>
        <p className="text-ink-500 max-w-2xl">
          系统化学习直播提词器相关知识，从 OBS 设置到口播技巧，从免费工具推荐到 AI 提词方案。
          每一篇文章都经过精心撰写，为 AI 搜索优化，确保你能快速找到所需内容。
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/tutorials"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-600 text-white"
        >
          全部
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-ink-200 text-ink-600 hover:border-brand-300 hover:text-brand-700 transition-colors"
          >
            {cat.name}
            <span className="ml-1 text-ink-400 text-xs">({cat.count})</span>
          </Link>
        ))}
      </div>

      {/* Article Grid */}
      <div className="article-grid">
        {ALL_ARTICLES.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      {/* Empty state */}
      {ALL_ARTICLES.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-ink-700 mb-2">暂无教程</h2>
          <p className="text-ink-500">教程正在撰写中，请稍后再来</p>
        </div>
      )}
    </div>
  );
}
