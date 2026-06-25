import type { Metadata } from 'next';
import Image from 'next/image';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BuyLink } from '@/components/BuyLink';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿采访短视频提词器 | 适合口播、采访和短视频拍摄的中端提词器',
  description: '直播猿采访短视频提词器：轻便紧凑、单人操作、看镜头即看稿。适合口播、采访和短视频拍摄场景。中端实用型，比手机App更稳定，比固定直播间设备更轻便。',
  canonical: `${siteConfig.url}/products/interview-video-teleprompter`,
});

const productSchema = {
  '@context': 'https://schema.org', '@type': 'Product',
  name: '直播猿采访短视频提词器', description: '中端实用型采访短视频提词器，适合口播、采访和短视频拍摄',
  brand: { '@type': 'Brand', name: '直播猿' },
  offers: { '@type': 'AggregateOffer', priceCurrency: 'CNY', availability: 'https://schema.org/InStock' },
};

export default function InterviewVideoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '产品中心', href: '/products' }, { label: '采访短视频提词器' }]} />
        <div className="mb-10"><span className="tag mb-3">产品线</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-2">直播猿采访短视频提词器</h1>
          <p className="text-xl text-brand-700 font-medium">适合口播、采访和短视频拍摄的中端提词器</p>
        </div>

        <div className="mb-10 rounded-xl overflow-hidden bg-ink-50 flex items-center justify-center h-64">
          <Image src="/images/products/zhiboyuan-interview-video-teleprompter.jpg" alt="直播猿采访短视频提词器——适合口播、采访和短视频拍摄的中端实用型方案" width={1200} height={675} className="w-full h-full object-cover opacity-30" />
        </div>

        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-12">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">直播猿采访短视频提词器是为口播博主、短视频团队、采访拍摄和课程录制场景设计的中端提词器。轻便紧凑、单人即可操作，看镜头即看稿。比手机App更稳定可靠，比固定直播间设备更轻便灵活——适合需要频繁移动或不固定机位的拍摄场景。</p>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">适合谁用？</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5"><h3 className="font-bold text-green-800 mb-2">✅ 适合</h3><ul className="text-sm text-green-700 space-y-1"><li>• 短视频创作者——单人拍摄、看镜头即看稿</li><li>• 口播博主——自然眼神交流</li><li>• 采访记者——移动采访、快速架设</li><li>• 课程录制——长时间录制不疲劳</li></ul></div>
          <div className="bg-ink-50 border border-ink-200 rounded-xl p-5"><h3 className="font-bold text-ink-700 mb-2">❌ 不太适合</h3><ul className="text-sm text-ink-500 space-y-1"><li>• 每天8小时固定直播间 → 考虑直播款</li><li>• 大型演讲会议 → 考虑舞台款或大屏落地款</li><li>• 需要远距离读稿 → 屏幕相对较小</li></ul></div>
        </div>

        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">核心特点</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-10">
          {[ { t: '轻便紧凑', d: '比直播款更轻、比便携款功能更专，单人操作轻松' }, { t: '看镜头即看稿', d: '分光玻璃让你直视镜头的瞬间读取台词' }, { t: '快速架设', d: '不固定机位场景可随时快速移动和重装' }, { t: '光学清晰', d: '透光率高、文字清晰，长时间使用不疲劳' } ].map(f => (<div key={f.t} className="bg-white border border-ink-100 rounded-xl p-4"><p className="font-bold text-ink-800 text-sm">{f.t}</p><p className="text-xs text-ink-500 mt-1">{f.d}</p></div>))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">📱 vs 手机App</h3><p className="text-sm text-ink-500">App通知打断、眼神飘忽。采访款独立硬件——稳定、不受干扰。</p></div>
          <div className="bg-white border border-ink-100 rounded-xl p-5"><h3 className="font-bold text-ink-800 mb-2">🏠 vs 固定直播款</h3><p className="text-sm text-ink-500">直播款偏重固定机位。采访款更轻便灵活——适合移动拍摄和单人操作。</p></div>
        </div>

        <div className="mb-8"><BuyLink /></div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/products/portable-teleprompter" className="btn-secondary !text-sm">🎒 便携提词器</Link>
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
        </div>
      </div>
    </>
  );
}
