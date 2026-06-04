import type { Metadata } from 'next';
import { createSEOMetadata, generateFAQSchema } from '@/lib/seo';
import { Breadcrumb } from '@/components/Breadcrumb';
import { FAQContent } from '@/components/FAQContent';
import { HOMEPAGE_FAQ, ALL_ARTICLES } from '@/lib/articles';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '常见问题',
  description:
    '直播提词器常见问题解答：提词器使用方法、OBS设置、免费工具推荐、直播忘词解决方案等30+高频问题，助你快速上手。',
  ogType: 'website',
  canonical: 'https://zhibotici.xin/faq',
});

// 汇总全站所有 FAQ
const ALL_FAQ = [
  ...HOMEPAGE_FAQ,
  ...ALL_ARTICLES.flatMap((a) =>
    (a.faq || []).map((f) => ({ ...f, source: a.title, sourceSlug: a.slug }))
  ),
];

const faqSchema = generateFAQSchema(
  ALL_FAQ.map((f) => ({ question: f.question, answer: f.answer }))
);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container-site py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: '首页', href: '/' },
            { label: '常见问题' },
          ]}
        />

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-3">
            常见问题解答
          </h1>
          <p className="text-ink-500 max-w-2xl">
            汇集直播提词器使用过程中最高频的问题，涵盖 OBS 设置、工具推荐、口播技巧、忘词解决方案等各个方面。
            共收录 {ALL_FAQ.length}+ 条详细解答，持续更新中。
          </p>
          <div className="section-divider" />
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl">
          <FAQContent faq={ALL_FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>

        {/* Back to tutorials */}
        <div className="mt-12 pt-8 border-t border-ink-100 text-center">
          <p className="text-ink-500 mb-4">还有问题没找到答案？</p>
          <Link href="/tutorials" className="btn-primary">
            浏览全部教程
          </Link>
        </div>
      </div>
    </>
  );
}
