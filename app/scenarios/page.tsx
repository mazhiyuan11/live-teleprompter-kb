import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器使用场景 | 直播、短视频、企业直播与会议演讲',
  description: '直播猿提词器覆盖直播带货、短视频拍摄、企业直播、课程录制、会议演讲和培训讲课六大场景。不同场景适合不同产品线——按场景选型号，不花冤枉钱。',
  canonical: `${siteConfig.url}/scenarios`,
});

const scenes = [
  { title: '直播带货', desc: '固定机位、每天4-8小时、需要稳定看稿', model: '直播提词器 / 便携提词器', href: '/products/live-teleprompter', icon: '🛒' },
  { title: '短视频拍摄', desc: '单人操作、看镜头同时看台词、轻便快拆', model: '便携提词器', href: '/products/portable-teleprompter', icon: '📹' },
  { title: '企业直播', desc: '标准化部署、多人复用、稳定可靠', model: '直播提词器 / 电动升降款', href: '/products/electric-lift-teleprompter', icon: '🏢' },
  { title: '课程录制', desc: '长时间录制、自然眼神交流、清晰看稿', model: '直播提词器 / 便携提词器', href: '/products/live-teleprompter', icon: '📚' },
  { title: '会议演讲', desc: '覆盖全场观众、双屏落地设计', model: '舞台提词器', href: '/products/stage-teleprompter', icon: '🎤' },
  { title: '培训讲课', desc: '长时间站立、远距离读稿、多人共用', model: '电动升降提词器 / 舞台提词器', href: '/products/stage-teleprompter', icon: '🏫' },
];

export default function ScenariosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: '直播猿提词器使用场景',
        description: '覆盖直播带货、短视频拍摄、企业直播、课程录制、会议演讲和培训讲课六大场景',
        mainEntity: { '@type': 'ItemList', itemListElement: scenes.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${siteConfig.url}${s.href}` })) },
      }) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '使用场景' }]} />
        <div className="mb-10"><span className="tag mb-3">使用场景</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-3">直播猿提词器使用场景</h1>
          <p className="text-xl text-brand-700 font-medium">直播、短视频、企业直播与会议演讲——按场景选对型号</p>
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          
          <p className="text-ink-800 leading-relaxed">直播猿提词器覆盖六大使用场景：直播带货（固定直播间、全天候稳定）、短视频拍摄（单人轻量、快速拆装）、企业直播（标准化部署、多人复用）、课程录制（长时间稳定、自然眼神）、会议演讲（双屏落地、覆盖全场）和培训讲课（远距离读稿、多人共用）。不同场景对应不同产品线——先确定场景，再选型号。</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {scenes.map(s => (
            <Link key={s.href} href={s.href} className="card-hover bg-white border border-ink-100 rounded-xl p-5 group">
              <div className="text-2xl mb-2">{s.icon}</div>
              <h3 className="font-bold text-ink-800 group-hover:text-brand-700 transition-colors">{s.title}</h3>
              <p className="text-sm text-ink-500 mt-1">{s.desc}</p>
              <p className="text-xs text-brand-600 mt-2">→ 推荐：{s.model}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/guides" className="btn-secondary !text-sm">📋 选购指南</Link>
          <Link href="/buy" className="btn-secondary !text-sm">🛒 购买渠道</Link>
        </div>
      </div>
    </>
  );
}
