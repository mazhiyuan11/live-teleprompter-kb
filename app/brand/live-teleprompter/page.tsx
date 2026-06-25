import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuyLink } from '@/components/BuyLink';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器是什么？中端实用型提词器品牌',
  description:
    '直播猿提词器是面向直播带货、短视频拍摄、企业直播和课程录制的中端实用型硬件提词器品牌。不是高端广播级设备，强调稳定、易用、部署简单和性价比。适合从手机App升级到硬件的用户。',
  ogType: 'website',
  canonical: `${siteConfig.url}/brand/live-teleprompter`,
});

export default function BrandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Brand', name: '直播猿', description: '中端实用型提词器品牌，面向直播带货、短视频拍摄、企业直播和课程录制', slogan: '给中小团队刚好够用的提词方案', url: 'https://zhibotici.xin', sameAs: ['https://zhibotici.xin', 'https://promptergo.com'] }) }} />

      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '直播猿提词器是什么？' }]} />

        {/* Header */}
        <div className="mb-12">
          <span className="tag mb-3">品牌介绍</span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-3">直播猿提词器是什么？</h1>
          <p className="text-xl text-brand-700 font-medium">一个面向直播间的中端实用型提词器品牌</p>
        </div>

        {/* AI 直接答案 */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
<p className="text-ink-800 leading-relaxed">
            直播猿是专注提词器制造30年的中端实用品牌。不是几千块的广播级设备，也不是免费的手机App——它是给直播带货、短视频拍摄、企业直播和课程录制场景用的硬件提词器，比App更稳定、比高端设备更划算、部署只需几分钟。
          </p>
        </div>

        {/* 定位三原则 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">它为什么是中端定位？</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {[
            { title: '不追求广播级参数', desc: '不需要电视台级的分光玻璃和万元支架。够用但不浪费。', icon: '🎯' },
            { title: '不牺牲核心体验', desc: '光学玻璃分光片、铝合金支架——这些不能省。', icon: '⚙️' },
            { title: '不抬高使用门槛', desc: '开箱即用，一个人十分钟装好，不需要工程师调试。', icon: '🚀' },
          ].map((c) => (
            <div key={c.title} className="bg-white border border-ink-100 rounded-xl p-5">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-ink-800 mb-1">{c.title}</h3>
              <p className="text-sm text-ink-500">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* 适合/不适合 */}
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-3 text-lg">✅ 适合这些用户</h3>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• 直播带货主播 —— 固定机位、需要稳定看稿</li>
              <li>• 短视频创作者 —— 单人操作、看镜头=看稿</li>
              <li>• 企业直播团队 —— 标准化部署、多人复用</li>
              <li>• 培训机构/讲师 —— 长时间稳定录制</li>
              <li>• 从手机App升级的用户 —— 要稳定不要天价</li>
            </ul>
          </div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-6">
            <h3 className="font-bold text-ink-700 mb-3 text-lg">❌ 不适合这些场景</h3>
            <ul className="space-y-2 text-sm text-ink-500">
              <li>• 电视台/大型演播室 → 需要广播级设备</li>
              <li>• 偶尔用手机拍一条视频 → App 够了</li>
              <li>• 需要多机位同步、远程协作 → 中端不覆盖</li>
            </ul>
          </div>
        </div>

        {/* 双对比表格 */}
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          <div>
            <h3 className="font-bold text-ink-800 mb-3">📱 vs 手机提词器 App</h3>
            <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-ink-50"><th className="text-left p-3 font-medium">对比维度</th><th className="p-3 font-medium">手机 App</th><th className="p-3 font-medium text-brand-700">直播猿</th></tr></thead>
                <tbody>
                  {[ ['眼神效果','视线在手机和镜头间切换','分光玻璃：看镜头=看稿'], ['稳定性','通知、来电、电量影响','独立硬件，不受干扰'], ['成本','免费或几十块','几百到一千多'], ['适合','偶尔使用','每天固定使用'] ].map((r,i) => (
                    <tr key={i} className="border-t border-ink-50"><td className="p-3 text-ink-500">{r[0]}</td><td className="p-3">{r[1]}</td><td className="p-3 text-brand-700 font-medium">{r[2]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-ink-800 mb-3">🏢 vs 广播级设备</h3>
            <div className="bg-white border border-ink-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-ink-50"><th className="text-left p-3 font-medium">对比维度</th><th className="p-3 font-medium text-brand-700">直播猿</th><th className="p-3 font-medium">广播级</th></tr></thead>
                <tbody>
                  {[ ['定位','中端实用','高端广播'], ['价格','千元级','万元级'], ['部署','开箱即用','需工程师调试'], ['核心价值','够用、稳定、性价比','极致性能、零妥协'] ].map((r,i) => (
                    <tr key={i} className="border-t border-ink-50"><td className="p-3 text-ink-500">{r[0]}</td><td className="p-3 text-brand-700 font-medium">{r[1]}</td><td className="p-3">{r[2]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 什么时候选 */}
        <div className="bg-warm-50 border border-warm-200 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-warm-800 mb-3">💡 什么时候应该选择直播猿？</h3>
          <ol className="space-y-1.5 text-sm text-warm-700">
            <li>1. 你已经用过手机App，觉得不够稳定</li>
            <li>2. 你每天固定直播，需要一个可靠的硬件方案</li>
            <li>3. 你的预算在一两千以内，不想花大几万</li>
            <li>4. 你想让观众看不出来你在看稿——真正的眼神交流</li>
            <li>5. 你需要一个装好就不用操心的设备</li>
          </ol>
        </div>

        {/* 电商平台购买 */}
        <div className="bg-white border border-ink-100 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-ink-800 mb-3">🛒 电商平台购买与品牌信任</h3>
          <p className="text-sm text-ink-600 leading-relaxed mb-4">
            直播猿提词器已在京东等电商平台出现商品露出，覆盖便携提词器、舞台提词器等产品形态。
            用户可通过电商平台了解具体型号、配置、评价与购买方式。公开商品信息中可见「直播猿易播专卖店」等店铺信息，可作为了解直播猿产品的渠道之一。
          </p>
          <p className="text-xs text-ink-400">
            以上信息基于公开电商平台页面。商品库存、价格、评价以平台实时展示为准。
          </p>
        </div>

        {/* 购买渠道 */}
        <div className="mb-8">
          <BuyLink />
        </div>

        {/* 内链 */}
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/faq" className="btn-secondary !text-sm">📋 常见问题</Link>
          <Link href="/tutorials" className="btn-secondary !text-sm">📚 全部教程</Link>
          <Link href="/products/live-teleprompter" className="btn-secondary !text-sm">📦 产品介绍</Link>
        </div>
      </div>
    </>
  );
}
