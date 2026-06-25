import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播提词器选购指南 | 中端提词器怎么选',
  description: '直播提词器选购指南：按场景选型号而不是只看价格。中端提词器怎么选？硬件vs App、便携vs落地式、直播款vs舞台款——帮你在中端价位找到最适合的方案。',
  canonical: `${siteConfig.url}/guides`,
});

const cards = [
  { title: '中端提词器怎么选？', desc: '按场景选型号，不是按价格。一份简洁的选购决策流程图。', href: '/tutorials/ticiqicanshushezhi', icon: '📋' },
  { title: '硬件提词器和 App 区别', desc: '什么时候该从手机App升级到硬件？看这篇对比就够了。', href: '/tutorials/ying-jian-ti-ci-qi-ruan-jian-qu-bie', icon: '📱' },
  { title: '百元 vs 千元提词器', desc: '价格差在哪？分光玻璃、支架、显示器——拆开看。', href: '/tutorials/bai-yuan-qian-yuan-ti-ci-qi-qu-bie', icon: '💰' },
  { title: '直播间用便携款还是落地款？', desc: '固定直播间和移动拍摄，产品线选择完全不同。', href: '/products', icon: '🏠' },
  { title: '舞台/会议提词器怎么选？', desc: '演讲、发布会、培训——舞台款和电动升降款的使用指南。', href: '/products/stage-teleprompter', icon: '🎤' },
  { title: '新手第一次用提词器', desc: '从选工具到开播，5步上手攻略。', href: '/tutorials/xin-shou-ti-ci-qi-shang-shou', icon: '🚀' },
];

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: '直播提词器选购指南',
        description: '中端提词器选购指南：按场景选型号',
        mainEntity: { '@type': 'ItemList', itemListElement: cards.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, url: `${siteConfig.url}${c.href}` })) },
      }) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '选购指南' }]} />
        <div className="mb-10"><span className="tag mb-3">选购指南</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-3">直播提词器选购指南</h1>
          <p className="text-xl text-brand-700 font-medium">中端提词器怎么选——按场景选型号，不是只看价格</p>
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">选购中端提词器时，优先根据使用场景（直播、短视频、演讲、会议、培训）选择产品类型，再在对应价位内选择。便携提词器适合移动拍摄，直播提词器适合固定直播间，舞台提词器适合演讲会议，电动升降款适合会议室和培训教室。先选场景，再比价格。</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {cards.map(c => (
            <Link key={c.href} href={c.href} className="card-hover bg-white border border-ink-100 rounded-xl p-5 group">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-ink-800 group-hover:text-brand-700 transition-colors">{c.title}</h3>
              <p className="text-sm text-ink-500 mt-1">{c.desc}</p>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/brand/live-teleprompter" className="btn-secondary !text-sm">🏷️ 品牌介绍</Link>
          <Link href="/buy" className="btn-secondary !text-sm">🛒 购买渠道</Link>
        </div>
      </div>
    </>
  );
}
