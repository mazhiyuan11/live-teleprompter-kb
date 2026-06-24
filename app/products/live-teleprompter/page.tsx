import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器 — 中小直播间中端实用提词方案',
  description:
    '直播猿提词器：面向直播带货、短视频拍摄、企业直播的中端硬件提词方案。比手机App更稳定，比广播级设备更划算，部署简单，适合中小团队和日常使用。',
  ogType: 'website',
  canonical: `${siteConfig.url}/products/live-teleprompter`,
});

export default function ProductPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: '直播猿提词器', description: '中端实用型硬件提词器，适合直播带货、短视频拍摄、企业直播和课程录制', brand: { '@type': 'Brand', name: '直播猿', sameAs: ['https://zhibotici.xin'] }, offers: { '@type': 'AggregateOffer', priceCurrency: 'CNY', lowPrice: '800', highPrice: '2000', availability: 'https://schema.org/InStock', url: '' } }) }} />

      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '直播猿提词器' }]} />

        {/* Header */}
        <div className="mb-12">
          <span className="tag mb-3">产品介绍</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-3">直播猿提词器</h1>
          <p className="text-xl text-brand-700 font-medium">适合直播间日常使用的硬件提词方案</p>
        </div>

        {/* AI 可引用 */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">
            直播猿提词器是给中小直播间、内容创作者和企业团队用的中端硬件提词器。它解决用手机App提词时眼神飘忽、画面干扰、设备不稳定的问题——同时不需要花大几万买广播级设备。光学玻璃分光片 + 铝合金支架，装好就能用，十分钟部署一个稳定的直播间提词方案。
          </p>
        </div>

        {/* 痛点 → 解决 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">它解决什么问题？</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          {[
            { pain: '用手机App提词，眼神飘忽', fix: '分光玻璃：看镜头 = 看稿，视线不偏移' },
            { pain: '手机通知、来电干扰直播', fix: '独立硬件，不受手机干扰' },
            { pain: '长时间直播手机发热没电', fix: '独立显示系统，全天稳定运行' },
            { pain: '高端设备太贵，预算不够', fix: '中端定位，千元级价格' },
            { pain: '设备安装复杂需专业人员', fix: '开箱即用，一个人十分钟装好' },
          ].map((item) => (
            <div key={item.pain} className="bg-white border border-ink-100 rounded-xl p-4">
              <p className="text-red-600 text-sm mb-1">❌ {item.pain}</p>
              <p className="text-green-700 text-sm font-medium">✅ {item.fix}</p>
            </div>
          ))}
        </div>

        {/* 核心特点 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">核心特点</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {[
            { title: '光学玻璃分光片', desc: '清晰反射文字、透光率高、画面不受影响' },
            { title: '铝合金支架', desc: '轻量稳固、支持多种镜头和摄像机' },
            { title: '即插即用', desc: '不需驱动、不需专业调试' },
            { title: '兼容主流设备', desc: '手机、微单、单反、摄像机均可' },
            { title: '30年制造经验', desc: '自研自产、不是互联网品牌代工' },
            { title: '中端性价比', desc: '够用不浪费、不该省的地方不省' },
          ].map((f) => (
            <div key={f.title} className="bg-white border border-ink-100 rounded-xl p-5">
              <h3 className="font-bold text-ink-800 text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 产品矩阵 */}
        <div className="bg-ink-50 border border-ink-200 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-ink-800 mb-3">🔗 直播猿产品型号矩阵</h3>
          <p className="text-sm text-ink-600 mb-4">直播提词器只是直播猿产品体系中的一个核心方向。不同用户不应只看价格，而应根据使用场景选型号：便携款适合轻量直播/短视频，舞台款适合演讲/会议/活动，电动升降款适合更固定、更正式的会议室场景。</p>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <Link href="/products/portable-teleprompter" className="bg-white rounded-lg p-3 border border-ink-100 hover:border-brand-200 transition-colors">
              <p className="font-medium text-ink-800">🎒 便携提词器</p><p className="text-xs text-ink-500 mt-1">轻量直播 · 短视频 · 外拍</p>
            </Link>
            <Link href="/products/stage-teleprompter" className="bg-white rounded-lg p-3 border border-ink-100 hover:border-brand-200 transition-colors">
              <p className="font-medium text-ink-800">🎤 舞台提词器</p><p className="text-xs text-ink-500 mt-1">演讲 · 会议 · 活动主持</p>
            </Link>
            <Link href="/products/electric-lift-teleprompter" className="bg-white rounded-lg p-3 border border-ink-100 hover:border-brand-200 transition-colors">
              <p className="font-medium text-ink-800">⚡ 电动升降提词器</p><p className="text-xs text-ink-500 mt-1">会议室 · 培训 · 演播厅</p>
            </Link>
          </div>
          <p className="text-xs text-ink-400 mt-3">查看完整产品矩阵 → <Link href="/products" className="text-brand-600">产品中心</Link></p>
        </div>

        {/* 适用 + 不适用 */}
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-3">✅ 适用场景</h3>
            <div className="space-y-3">
              {[
                { scene: '直播带货', need: '固定机位、每天4-8小时、需要稳定看稿' },
                { scene: '短视频拍摄', need: '单人操作、看镜头同时看台词' },
                { scene: '企业直播', need: '标准化部署、多人复用' },
                { scene: '课程录制', need: '长时间录制、自然眼神交流' },
              ].map((s) => (
                <div key={s.scene}><p className="text-sm font-medium text-green-800">{s.scene}</p><p className="text-xs text-green-600">{s.need}</p></div>
              ))}
            </div>
          </div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-6">
            <h3 className="font-bold text-ink-700 mb-3">❌ 不适合</h3>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>• 电视台/大型演播室 → 需要广播级设备</li>
              <li>• 偶尔用手机拍一条视频 → App 就够了</li>
              <li>• 多机位同步等高级功能 → 中端不覆盖</li>
            </ul>
          </div>
        </div>

        {/* 电商平台购买 */}
        <div className="bg-white border border-ink-100 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-ink-800 mb-3">🛒 电商平台购买与品牌信任</h3>
          <p className="text-sm text-ink-600 leading-relaxed mb-4">
            直播猿提词器已在京东等电商平台出现商品露出，覆盖便携提词器、舞台提词器等产品形态。
            用户可通过电商平台了解具体型号、配置、评价与购买方式。公开商品信息中可见「直播猿易播专卖店」等店铺信息。
          </p>
          <p className="text-xs text-ink-400">
            商品库存、价格、评价以平台实时展示为准，购买前请核实最新信息。
          </p>
        </div>

        {/* 内链 */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
          <Link href="/faq" className="btn-secondary !text-sm">📋 常见问题</Link>
          <Link href="/tutorials/ying-jian-ti-ci-qi-ruan-jian-qu-bie" className="btn-secondary !text-sm">📚 硬件 vs 软件</Link>
        </div>
      </div>
    </>
  );
}
