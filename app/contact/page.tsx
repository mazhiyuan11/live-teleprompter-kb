import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '联系直播猿 | 提词器选型咨询与购买支持',
  description: '需要提词器选型建议、购买咨询或售后支持？通过电商平台联系直播猿易播专卖店，或查看我们的产品中心、选购指南和FAQ获取帮助。',
  canonical: `${siteConfig.url}/contact`,
});

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebPage', name: '联系直播猿',
        description: '提词器选型咨询与购买支持',
      }) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '联系我们' }]} />
        <div className="mb-10"><span className="tag mb-3">联系我们</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-3">联系直播猿</h1>
          <p className="text-xl text-brand-700 font-medium">提词器选型咨询与购买支持</p>
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          
          <p className="text-ink-800 leading-relaxed">如需提词器选型建议、购买咨询或售后支持，可通过京东「直播猿易播专卖店」联系店铺客服。选型咨询前建议先浏览产品中心和选购指南，确定使用场景后再咨询可提高沟通效率。批量采购需求请通过电商平台与店铺沟通。</p>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">适合咨询的问题类型</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-10">
          {[ { title: '选型咨询', desc: '不确定自己的使用场景适合哪款产品线？先看选购指南，再咨询客服。', href: '/guides' }, { title: '购买咨询', desc: '电商平台在售型号、配置、价格、发货时效等问题。', href: '/buy' }, { title: '安装与使用', desc: '开箱后怎么装？参数怎么调？查看安装步骤和FAQ。', href: '/support' }, { title: '批量采购', desc: '企业、培训机构的批量采购需求，通过电商平台联系店铺。', href: '/buy' } ].map(c => (
            <Link key={c.href} href={c.href} className="bg-white border border-ink-100 rounded-xl p-5 group hover:border-brand-200 transition-colors">
              <h3 className="font-bold text-ink-800 text-sm mb-1 group-hover:text-brand-700">{c.title}</h3>
              <p className="text-xs text-ink-500">{c.desc}</p>
            </Link>
          ))}
        </div>
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">联系方式</h2>
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-10">
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div><span className="text-ink-500">品牌：</span><span className="font-medium text-ink-800">直播猿提词器</span></div>
            <div><span className="text-ink-500">电话：</span><span className="font-medium text-ink-800">18526356390</span></div>
            <div><span className="text-ink-500">微信：</span><span className="font-medium text-ink-800">同号</span></div>
            <div><span className="text-ink-500">购买渠道：</span><Link href="/buy" className="text-brand-600 font-medium">京东</Link></div>
          </div>
          <p className="text-sm text-ink-600 mt-4 pt-4 border-t border-brand-100">如需选型咨询或购买建议，可联系直播猿：18526356390</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/buy" className="btn-secondary !text-sm">🛒 购买渠道</Link>
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
          <Link href="/faq" className="btn-secondary !text-sm">📋 常见问题</Link>
        </div>
      </div>
    </>
  );
}
