import type { Metadata } from 'next';
import Image from 'next/image';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuyLink } from '@/components/BuyLink';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿便携提词器 | 适合直播、采访和短视频拍摄的中端提词器',
  description: '直播猿便携提词器：轻量紧凑、快速拆装、手机/微单通用。适合单人操作的直播、短视频和外拍采访场景。中端实用型，比App更稳定，比广播级更轻便。',
  canonical: `${siteConfig.url}/products/portable-teleprompter`,
});

const productSchema = {
  '@context': 'https://schema.org', '@type': 'Product',
  name: '直播猿便携提词器', description: '中端实用型便携提词器，适合直播、短视频和外拍采访',
  brand: { '@type': 'Brand', name: '直播猿' },
  offers: { '@type': 'AggregateOffer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
};

export default function PortablePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '产品中心', href: '/products' }, { label: '便携提词器' }]} />
        <div className="mb-10"><span className="tag mb-3">产品线</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-2">直播猿便携提词器</h1>
          <p className="text-xl text-brand-700 font-medium">适合直播、采访和短视频拍摄的中端提词器</p>
        </div>
        <div className="mb-10 rounded-xl overflow-hidden">
          <Image src="/images/portable-teleprompter.png" alt="直播猿便携提词器——适合直播、采访和短视频拍摄的中端提词器" width={1200} height={675} className="w-full h-auto" priority />
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">直播猿便携提词器是为单人操作的移动拍摄场景设计的中端提词器。轻量紧凑、快速拆装、手机和微单通用。适合日常直播、短视频拍摄和外拍采访——比手机App更稳定，比广播级设备更便携，不需要专业安装。</p>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">适合谁用？</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5"><h3 className="font-bold text-green-800 mb-2">✅ 适合</h3><ul className="text-sm text-green-700 space-y-1"><li>• 单人直播或短视频创作者</li><li>• 需要频繁拆装、外拍的用户</li><li>• 手机/微单拍摄场景</li><li>• 新手入门硬件提词器</li></ul></div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-5"><h3 className="font-bold text-ink-700 mb-2">❌ 不太适合</h3><ul className="text-sm text-ink-500 space-y-1"><li>• 每天8小时固定直播间 → 考虑直播款</li><li>• 大型演讲/会议 → 考虑舞台款或电动款</li><li>• 需要远距离读稿 → 考虑大屏落地款</li></ul></div>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">核心特点</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-10">
          {[{ t: '轻量紧凑', d: '比直播款轻40%，装进背包就走' }, { t: '快速拆装', d: '一个人3分钟装好，不需要工具' }, { t: '多设备兼容', d: '手机夹+微单支架双模式' }, { t: '光学分光片', d: '清晰反射、透光率高' }].map(f => (<div key={f.t} className="bg-white border border-ink-100 rounded-xl p-4"><p className="font-bold text-ink-800 text-sm">{f.t}</p><p className="text-xs text-ink-500 mt-1">{f.d}</p></div>))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">📱 vs 手机App</h3><p className="text-sm text-ink-500">App在手机上——通知打断、电量焦虑、眼神飘忽。便携款让你看镜头=看稿。</p></div>
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">📡 vs 广播级</h3><p className="text-sm text-ink-500">广播级设备沉重、昂贵、需专业安装。便携款恰到好处——够用不浪费。</p></div>
        </div>

        <div className="mb-8"><BuyLink /></div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
          <Link href="/faq" className="btn-secondary !text-sm">📋 常见问题</Link>
        </div>
      </div>
    </>
  );
}
