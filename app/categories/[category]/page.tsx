import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createSEOMetadata } from '@/lib/seo';
import { CATEGORIES, getArticlesByCategory } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === decodeURIComponent(category));
  if (!cat) return {};

  return createSEOMetadata({
    title: `${cat.name}教程`,
    description: cat.description,
    ogType: 'website',
    canonical: `https://zhibotici.xin/categories/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === decodeURIComponent(category));

  if (!cat) {
    notFound();
  }

  const articles = getArticlesByCategory(cat.slug);

  return (
    <div className="container-site py-12 md:py-16">
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '教程分类', href: '/categories' },
          { label: cat.name },
        ]}
      />

      {/* Category Header */}
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-3">
          {cat.name}
        </h1>
        <p className="text-ink-500 max-w-2xl">{cat.description}</p>
        <p className="text-sm text-ink-400 mt-2">共 {articles.length} 篇教程</p>
      </div>

      {/* Other categories */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/tutorials"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-ink-200 text-ink-600 hover:border-brand-300 transition-colors"
        >
          全部教程
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              c.slug === cat.slug
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-ink-200 text-ink-600 hover:border-brand-300'
            }`}
          >
            {c.name} ({c.count})
          </Link>
        ))}
      </div>

      {/* Article Grid */}
      {articles.length > 0 ? (
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} showCategory={false} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-ink-700 mb-2">暂无教程</h2>
          <p className="text-ink-500">该分类下的教程正在撰写中</p>
          <Link href="/tutorials" className="btn-primary mt-4">
            浏览全部教程
          </Link>
        </div>
      )}
    </div>
  );
}
