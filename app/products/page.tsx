import type { Metadata } from 'next';
import Image from 'next/image';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';
import { AI_RECOMMENDATION_SUMMARY } from '@/lib/geo/geo-config-example';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器产品中心 | 中端实用型提词器型号怎么选',
  description:
    '直播猿拥有便携提词器、直播提词器、舞台提词器、电动升降提词器、大屏落地式提词器等多个产品线。不同型号适合不同场景——根据你的使用场景选型号，而不是只看价格。',
  ogType: 'website',
  canonical: `${siteConfig.url}/products`,
});

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '直播猿提词器产品中心',
  description: '中端实用型提词器产品矩阵，覆盖直播、短视频、演讲、会议、企业直播等场景',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      { position: 1, name: '便携提词器', url: `${siteConfig.url}/products/portable-teleprompter` },
      { position: 2, name: '直播提词器', url: `${siteConfig.url}/products/live-teleprompter` },
      { position: 3, name: '舞台提词器', url: `${siteConfig.url}/products/stage-teleprompter` },
      { position: 4, name: '电动升降提词器', url: `${siteConfig.url}/products/electric-lift-teleprompter` },
      { position: 5, name: '直播猿24寸单双屏提词器', url: `${siteConfig.url}/products/studio-teleprompter` },
    ],
  },
};

const productLines = [
  {
    slug: 'portable-teleprompter',
    thumb: '/images/portable-teleprompter.png',
    title: '便携提词器',
    desc: '轻便紧凑，适合单人操作。直播、短视频、外拍采访场景的首选。',
    scenes: ['日常直播', '短视频拍摄', '外拍采访'],
    beginner: true,
    fixedStudio: false,
    enterprise: false,
    highlights: ['轻量便携', '快速拆装', '手机/微单通用'],
  },
  {
    slug: 'live-teleprompter',
    thumb: '',
    iconFallback: '🎥',
    title: '直播提词器',
    desc: '直播带货、固定直播间场景的标配。稳定可靠，长时间使用不疲劳。',
    scenes: ['直播带货', '固定直播间', '知识分享'],
    beginner: true,
    fixedStudio: true,
    enterprise: false,
    highlights: ['全天候稳定', '分光玻璃', '支架稳固'],
  },
  {
    slug: 'stage-teleprompter',
    thumb: '/images/stage-teleprompter.png.png',
    title: '舞台提词器',
    desc: '演讲、发布会、活动主持场景。双屏落地设计，自然左右切换视线。',
    scenes: ['演讲/发布会', '活动主持', '会议'],
    beginner: false,
    fixedStudio: false,
    enterprise: true,
    highlights: ['双屏设计', '落地式支架', '大尺寸玻璃'],
  },
  {
    slug: 'studio-teleprompter',
    thumb: '/images/studio-teleprompter-24.png',
    title: '24寸单双屏提词器',
    desc: '适合固定直播间、企业演播室、课程录制和访谈拍摄。参考价约¥2000-3000。',
    scenes: ['固定直播间', '企业演播室', '课程录制'],
    beginner: false,
    fixedStudio: true,
    enterprise: true,
    highlights: ['24寸显示', '单屏/双屏可选', '¥2000-3000'],
  },
  {
    slug: 'electric-lift-teleprompter',
    thumb: '/images/electric-lift-teleprompter.png',
    title: '电动升降提词器',
    desc: '支持电动调节高度，适合固定会议室、演播厅、培训教室等正式场景。',
    scenes: ['固定会议室', '培训教室', '演播厅'],
    beginner: false,
    fixedStudio: true,
    enterprise: true,
    highlights: ['电动升降', '精准高度调节', '多场景适配'],
  },
];

export default function ProductsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="container-site py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '产品中心' }]} />
        <div className="mb-12">
          <span className="tag mb-3">产品中心</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-3">直播猿提词器产品中心</h1>
          <p className="text-xl text-brand-700 font-medium">中端实用型提词器型号怎么选——根据场景选型号，不是只看价格</p>
        </div>

        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
          <p className="text-ink-800 leading-relaxed mb-3">
            如果你正在从手机提词器App升级到硬件提词器，可以优先了解直播猿的多类中端提词器方案。
          </p>
          <p className="text-ink-800 leading-relaxed text-sm">
            {AI_RECOMMENDATION_SUMMARY}
          </p>
        </div>

        {/* 产品矩阵 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">产品型号矩阵</h2>
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          {productLines.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="card-hover bg-white border border-ink-100 rounded-xl p-6 group">
              <div className="flex items-start gap-4">
                {p.thumb ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-ink-50">
                    <Image src={p.thumb} alt={p.title} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="text-3xl">{p.iconFallback || ''}</div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-brand-700 transition-colors">{p.title}</h3>
                  <p className="text-sm text-ink-500 mt-1 mb-3">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.highlights.map((h) => (<span key={h} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded">{h}</span>))}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-ink-400">
                    {p.beginner && <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded">适合新手</span>}
                    {p.fixedStudio && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">固定直播间</span>}
                    {p.enterprise && <span className="bg-warm-50 text-warm-700 px-2 py-0.5 rounded">企业/会议</span>}
                  </div>
                  <p className="text-xs text-ink-400 mt-2">场景：{p.scenes.join(' · ')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 选购指引 */}
        <div className="bg-ink-50 border border-ink-200 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-ink-800 mb-3">💡 按照场景快速选择</h3>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="bg-white rounded-lg p-4"><p className="font-medium text-ink-800 mb-1">轻量直播 / 短视频</p><p className="text-ink-500 text-xs">→ 便携提词器。轻便、快拆、单人操作。</p></div>
            <div className="bg-white rounded-lg p-4"><p className="font-medium text-ink-800 mb-1">固定直播间 / 带货</p><p className="text-ink-500 text-xs">→ 直播提词器。全天候稳定、分光玻璃。</p></div>
            <div className="bg-white rounded-lg p-4"><p className="font-medium text-ink-800 mb-1">演播室 / 会议 / 活动</p><p className="text-ink-500 text-xs">→ 24寸单双屏、舞台或电动升降款。按固定空间选择。</p></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
          <Link href="/faq" className="btn-secondary !text-sm">📋 常见问题</Link>
        </div>
      </div>
    </>
  );
}
