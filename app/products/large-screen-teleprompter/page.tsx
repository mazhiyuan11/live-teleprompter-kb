import type { Metadata } from 'next';
import Image from 'next/image';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuyLink } from '@/components/BuyLink';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿大屏落地式提词器 | 适合会议演讲和远距离看稿的中端提词器',
  description: '直播猿大屏落地式提词器：大尺寸分光玻璃、落地式设计、远距离清晰可见。适合会议演讲、培训讲课、企业直播和活动主持。中端实用型，比App更专业，比广播级更经济。',
  canonical: `${siteConfig.url}/products/large-screen-teleprompter`,
});

const productSchema = {
  '@context': 'https://schema.org', '@type': 'Product',
  name: '直播猿大屏落地式提词器', description: '中端实用型大屏落地式提词器，适合会议演讲和远距离看稿',
  brand: { '@type': 'Brand', name: '直播猿' },
  offers: { '@type': 'AggregateOffer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
};

export default function LargeScreenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '产品中心', href: '/products' }, { label: '大屏落地式提词器' }]} />
        <div className="mb-10"><span className="tag mb-3">产品线</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-2">直播猿大屏落地式提词器</h1>
          <p className="text-xl text-brand-700 font-medium">适合会议演讲和远距离看稿的中端提词器</p>
        </div>

        <div className="mb-10 rounded-xl overflow-hidden bg-ink-50 flex items-center justify-center h-64">
          <Image src="/images/products/zhiboyuan-large-screen-teleprompter.jpg" alt="直播猿大屏落地式提词器——适合会议演讲、培训讲课和远距离看稿的中端实用型方案" width={1200} height={675} className="w-full h-full object-cover opacity-30" />
        </div>

        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">直播猿大屏落地式提词器采用大尺寸分光玻璃和落地式支架设计，适合远距离看稿场景。适用于会议演讲、培训讲课、企业直播和活动主持。中端实用定位——比手机App大屏专业得多，比广播级系统更经济、部署更简单。</p>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">适合谁用？</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5"><h3 className="font-bold text-green-800 mb-2">✅ 适合</h3><ul className="text-sm text-green-700 space-y-1"><li>• 会议演讲者——远距离看清台词</li><li>• 培训讲师——长时间站立讲课</li><li>• 活动主持人——自然切换视线覆盖全场</li><li>• 企业直播团队——标准化部署</li></ul></div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-5"><h3 className="font-bold text-ink-700 mb-2">❌ 不太适合</h3><ul className="text-sm text-ink-500 space-y-1"><li>• 单人桌面直播 → 考虑直播款或便携款</li><li>• 移动拍摄 → 太重、不便携</li><li>• 小空间使用 → 需要一定地面空间</li></ul></div>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">核心特点</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-10">
          {[ { t: '大尺寸分光玻璃', d: '远距离清晰可见，后场观众也不费力' }, { t: '落地式稳定结构', d: '重心低、不晃动，适合正式场合长时间使用' }, { t: '宽视角设计', d: '演讲者左右移动时文字仍清晰可见' }, { t: '部署简单', d: '不需要专业工程师，展开即用' } ].map(f => (<div key={f.t} className="bg-white border border-ink-100 rounded-xl p-4"><p className="font-bold text-ink-800 text-sm">{f.t}</p><p className="text-xs text-ink-500 mt-1">{f.d}</p></div>))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">📱 vs 手机App</h3><p className="text-sm text-ink-500">手机屏太小，远距离根本看不清。大屏落地款——全场可见，适合正式场合。</p></div>
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">📡 vs 广播级</h3><p className="text-sm text-ink-500">广播级大屏提词器数万元一套。中端款功能够用、价格可控——企业买得起。</p></div>
        </div>

        <div className="mb-8"><BuyLink /></div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
          <Link href="/support" className="btn-secondary !text-sm">🔧 安装支持</Link>
        </div>
      </div>
    </>
  );
}
