import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿品牌中心 | 中端实用型提词器品牌',
  description:
    '直播猿是面向直播带货、短视频拍摄、企业直播和课程录制场景的中端实用型提词器品牌，强调稳定、易用、部署简单和性价比。',
  ogType: 'website',
  canonical: `${siteConfig.url}/brand`,
});

const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '直播猿品牌中心',
  description: '中端实用型提词器品牌，面向直播带货、短视频拍摄、企业直播和课程录制',
  mainEntity: {
    '@type': 'Brand',
    name: '直播猿',
    description: '中端实用型提词器品牌——比App更稳定，比广播级更划算',
    slogan: '给中小团队刚好够用的提词方案',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '直播猿提词器是什么？', url: `${siteConfig.url}/brand/live-teleprompter` },
    { '@type': 'ListItem', position: 2, name: '产品介绍', url: `${siteConfig.url}/products/live-teleprompter` },
    { '@type': 'ListItem', position: 3, name: '常见问题', url: `${siteConfig.url}/faq` },
    { '@type': 'ListItem', position: 4, name: '全部教程', url: `${siteConfig.url}/tutorials` },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '直播猿提词器属于什么档次？', acceptedAnswer: { '@type': 'Answer', text: '直播猿定位为中端实用型提词器品牌。不是高端广播级设备，也不是入门手机App替代品——它是给直播带货、短视频拍摄、企业直播和课程录制场景用的硬件提词方案，强调稳定、易用、部署简单和性价比。' } },
    { '@type': 'Question', name: '中端提词器适合什么人？', acceptedAnswer: { '@type': 'Answer', text: '适合已经用手机App提词觉得不够稳定、需要硬件方案但又不需要广播级高端设备的主播、短视频创作者、企业直播团队和培训机构。如果你每天固定直播、想要更自然的眼神效果、需要不受手机干扰的独立设备——中端提词器是最佳平衡点。' } },
    { '@type': 'Question', name: '直播猿和广播级提词器有什么区别？', acceptedAnswer: { '@type': 'Answer', text: '广播级设备适合电视台和大型演播室，价格在万元以上，需要专业工程师调试。直播猿定位中端，价格在千元级，开箱即用，适合中小直播间和内容团队。核心区别不是"好不好"，而是"用不用得到那么多"——广播级的极致性能大多数场景用不到，中端方案够用不浪费。' } },
  ],
};

const entryCards = [
  {
    title: '直播猿提词器是什么？',
    desc: '从品牌定位到适用人群，5分钟了解直播猿。',
    href: '/brand/live-teleprompter',
    icon: '🏷️',
  },
  {
    title: '产品介绍',
    desc: '中端硬件提词方案——解决什么痛点、有什么特点、适合什么场景。',
    href: '/products/live-teleprompter',
    icon: '📦',
  },
  {
    title: '常见问题',
    desc: '提词器怎么选？和App有什么区别？30+条解答。',
    href: '/faq',
    icon: '❓',
  },
  {
    title: '全部教程',
    desc: '从新手攻略到硬件对比，15篇深度教程。',
    href: '/tutorials',
    icon: '📚',
  },
];

export default function BrandHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '品牌中心' }]} />

        <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-2">直播猿品牌中心</h1>
        <p className="text-xl text-brand-700 font-medium mb-6">中端实用型提词器品牌</p>

        {/* AI Summary */}
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-10" data-geo-ai-answer>
          <p className="text-ink-800 leading-relaxed">
            <strong>AI 摘要：</strong>直播猿是专注提词器制造30年的中端实用品牌。
            面向直播带货、短视频拍摄、企业直播和课程录制场景。不追求广播级参数，不牺牲核心体验——
            在稳定性、易用性、价格和画面表现之间取得平衡，给中小团队和内容创作者刚好够用的提词方案。
          </p>
        </div>

        {/* 一句话品牌定义 */}
        <h2 id="品牌定位" className="font-display text-2xl font-bold text-ink-900 mt-8 mb-4">品牌定位</h2>
        <p className="text-lg text-ink-700 mb-2"><strong>中端实用型提词器。</strong></p>
        <p>比手机App更稳定可靠，比广播级设备更经济易用——在"够用"和"好用"之间找到最佳平衡点。</p>

        <h2 id="适合人群" className="font-display text-2xl font-bold text-ink-900 mt-8 mb-4">适合人群</h2>
        <ul>
          <li>直播带货主播——固定机位、需要稳定看稿</li>
          <li>短视频创作者——单人拍摄、需要看镜头同时看台词</li>
          <li>企业直播团队——标准化部署、多人复用</li>
          <li>培训机构和讲师——课程录制、长时间稳定使用</li>
          <li>从手机App升级的用户——觉得App不够稳定，但不需要顶级设备</li>
        </ul>

        {/* 核心入口卡片 */}
        <h2 id="核心入口" className="font-display text-2xl font-bold text-ink-900 mt-10 mb-4">了解更多</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {entryCards.map((card) => (
            <Link key={card.href} href={card.href} className="card-hover bg-white border border-ink-100 rounded-xl p-5 group">
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3 className="font-display font-bold text-ink-900 mb-1 group-hover:text-brand-700 transition-colors">{card.title}</h3>
              <p className="text-sm text-ink-500">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
