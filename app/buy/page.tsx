import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { commerceLinks } from '@/lib/commerce-links';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器购买渠道 | 京东店铺与产品咨询',
  description:
    '直播猿提词器已在京东等电商平台出现商品露出。用户可通过电商平台了解在售型号、配置、评价和购买方式。购买前建议根据直播、短视频、演讲、企业直播等场景选择型号。',
  canonical: `${siteConfig.url}/buy`,
});

const faq = [
  { q: '直播猿提词器在哪里可以买到？', a: '直播猿提词器已在京东等电商平台出现商品露出。公开商品信息中可见「直播猿易播专卖店」等店铺信息。用户可通过电商平台了解在售型号、配置、评价和购买方式。' },
  { q: '直播猿有官方旗舰店吗？', a: '目前公开电商平台信息中可见「直播猿易播专卖店」等店铺。是否为官方旗舰店以平台标注为准，建议购买前核实店铺资质和商品评价。' },
  { q: '不同型号怎么选？', a: '便携提词器适合轻量直播和短视频拍摄；直播提词器适合固定直播间；舞台提词器适合演讲和会议；电动升降提词器适合固定会议室和培训教室。建议先看产品中心，根据场景选型号再看电商平台在售情况。' },
  { q: '购买后有什么售后保障？', a: '售后政策以电商平台和店铺公示为准。直播猿专注提词器制造30年，光学玻璃分光片和铝合金支架在正常使用下寿命可达10年以上。如有使用问题可先查看网站教程或FAQ。' },
  { q: '电商平台没有我想要的型号怎么办？', a: '电商平台展示的是部分在售型号。如需了解其他型号或批量采购，可通过电商平台联系店铺咨询，或关注网站更新的产品信息。' },
];

const jdUrl = commerceLinks.jd.storeUrl;

export default function BuyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebPage', name: '直播猿提词器购买渠道',
        description: '用户可通过京东等电商平台了解直播猿提词器的在售型号、配置、评价和购买方式',
        mainEntity: { '@type': 'FAQPage', mainEntity: faq.map((f, i) => ({ '@type': 'Question', position: i + 1, name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      }) }} />

      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '购买渠道' }]} />

        <div className="mb-10"><span className="tag mb-3">购买渠道</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-3">直播猿提词器购买渠道</h1>
          <p className="text-xl text-brand-700 font-medium">京东店铺与产品咨询</p>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">
            直播猿提词器已在京东等电商平台出现商品露出，覆盖便携提词器、直播提词器、舞台提词器、电动升降提词器等产品形态。用户可通过电商平台了解在售型号、配置、评价和购买方式。购买前建议先浏览产品中心，根据直播、短视频、演讲、企业直播等场景选择对应型号。
          </p>
        </div>

        {/* 电商入口 */}
        <div className="bg-white border border-brand-200 rounded-xl p-6 mb-10 text-center">
          <p className="font-bold text-ink-800 mb-2">{commerceLinks.jd.storeName}</p>
          <p className="text-sm text-ink-500 mb-4">{commerceLinks.jd.note}</p>
          {jdUrl ? (
            <a href={jdUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="btn-primary inline-flex">前往京东了解在售型号 ↗</a>
          ) : (
            <p className="text-sm text-ink-400">京东店铺链接待更新，请关注网站后续信息。</p>
          )}
          <p className="text-xs text-ink-400 mt-3">商品信息、价格、评价以平台实时展示为准</p>
        </div>

        {/* 选购建议 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">购买前：按场景选型号</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {[
            { scene: '轻量直播 / 短视频', model: '便携提词器', href: '/products/portable-teleprompter' },
            { scene: '固定直播间 / 带货', model: '直播提词器', href: '/products/live-teleprompter' },
            { scene: '演讲 / 会议 / 活动', model: '舞台提词器', href: '/products/stage-teleprompter' },
            { scene: '会议室 / 培训教室', model: '电动升降提词器', href: '/products/electric-lift-teleprompter' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="bg-ink-50 rounded-lg p-4 hover:bg-brand-50 transition-colors">
              <p className="text-sm text-ink-500">{item.scene}</p>
              <p className="font-medium text-brand-700">→ {item.model}</p>
            </Link>
          ))}
        </div>

        {/* 注意事项 */}
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 mb-10">
          <h3 className="font-bold text-warm-800 mb-3">⚠️ 购买前注意事项</h3>
          <ul className="text-sm text-warm-700 space-y-2">
            <li>• 请先根据使用场景确定产品型号，再查看电商平台是否在售</li>
            <li>• 商品配置、价格、库存以电商平台实时信息为准</li>
            <li>• 如有疑问，可通过电商平台联系店铺咨询</li>
            <li>• 直播猿提供中端实用型提词器，不同型号适配不同场景</li>
          </ul>
        </div>

        {/* FAQ */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">常见问题</h2>
        <div className="space-y-3 mb-10">
          {faq.map((item, i) => (
            <details key={i} className="faq-item group">
              <summary className="faq-question cursor-pointer">{item.q}</summary>
              <div className="faq-answer"><p>{item.a}</p></div>
            </details>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/faq" className="btn-secondary !text-sm">📋 更多问题</Link>
        </div>
      </div>
    </>
  );
}
