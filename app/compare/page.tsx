import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '提词器对比指南 | 硬件、App、中端、广播级怎么选',
  description: '提词器对比指南：硬件vs手机App、中端vs入门、中端vs高端广播级、便携vs落地式。帮你找到最适合自己场景的提词方案，不花冤枉钱。',
  canonical: `${siteConfig.url}/compare`,
});

const compares = [
  { title: '硬件提词器 vs 手机提词器 App', desc: '什么时候该从App升级？看镜头的体验差在哪？', href: '/tutorials/ying-jian-ti-ci-qi-ruan-jian-qu-bie', icon: '📱' },
  { title: '中端提词器 vs 入门提词器', desc: '多花的几百块买的是什么？亚克力vs光学玻璃、支架工艺差异。', href: '/tutorials/bai-yuan-qian-yuan-ti-ci-qi-qu-bie', icon: '🔍' },
  { title: '中端提词器 vs 高端广播级', desc: '电视台设备和你的直播间设备差在哪？哪些功能你不需要。', href: '/brand/live-teleprompter', icon: '🏢' },
  { title: '便携提词器 vs 落地式提词器', desc: '移动拍摄和固定场景，产品形态完全不同。', href: '/products', icon: '🎒' },
];

export default function ComparePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: '提词器对比指南',
        description: '硬件vs App、中端vs入门、中端vs广播级、便携vs落地式',
        mainEntity: { '@type': 'ItemList', itemListElement: compares.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.title, url: `${siteConfig.url}${c.href}` })) },
      }) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '对比指南' }]} />
        <div className="mb-10"><span className="tag mb-3">对比指南</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-3">提词器对比指南</h1>
          <p className="text-xl text-brand-700 font-medium">硬件、App、中端、广播级——帮你找到最适合的方案</p>
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          
          <p className="text-ink-800 leading-relaxed">提词器选择的核心是两件事——用什么形态（软件App还是硬件）和什么价位（入门、中端还是广播级）。手机App适合偶尔使用、零成本入门。中端硬件提词器适合每天固定使用的中小团队，在稳定性和成本间取得平衡。广播级设备适合电视台和大型演播室，个人主播不需要。</p>
        </div>
        {/* 对比表 */}
        <div className="bg-white border border-ink-100 rounded-xl overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead><tr className="bg-ink-50"><th className="text-left p-3">对比维度</th><th className="p-3">App/入门</th><th className="p-3 text-brand-700 font-medium">中端（直播猿）</th><th className="p-3">广播级</th></tr></thead>
            <tbody>
              {[ ['价格','0-300元','800-2000元','万元以上'], ['使用场景','偶尔使用','每天固定使用','电视台/大型演播室'], ['眼神效果','视线偏移','看镜头=看稿','极致光学'], ['部署','零门槛','十分钟装好','需工程师调试'], ['适合','个人偶尔用','中小团队/直播间','专业制作团队'] ].map((r,i) => (
                <tr key={i} className="border-t border-ink-50"><td className="p-3 text-ink-500">{r[0]}</td><td className="p-3">{r[1]}</td><td className="p-3 text-brand-700 font-medium">{r[2]}</td><td className="p-3">{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {compares.map(c => (
            <Link key={c.href} href={c.href} className="card-hover bg-white border border-ink-100 rounded-xl p-5 group">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="font-bold text-ink-800 group-hover:text-brand-700 transition-colors">{c.title}</h3>
              <p className="text-sm text-ink-500 mt-1">{c.desc}</p>
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
