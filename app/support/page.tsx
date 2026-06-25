import type { Metadata } from 'next';
import { createSEOMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: '直播猿提词器安装与售后支持 | 使用教程与常见问题',
  description: '直播猿提词器的安装步骤、使用前检查、常见问题、售后支持说明和购买渠道。中端实用型硬件提词器，开箱即用，十分钟部署。',
  canonical: `${siteConfig.url}/support`,
});

const faq = [
  { q: '提词器收到后怎么安装？', a: '直播猿提词器设计为开箱即用。打开包装后检查配件完整性（分光玻璃、支架、显示器/手机夹、遥控器），将支架展开固定到三脚架上，安装分光玻璃到支架前方，连接显示器或放置手机。全程不需要工具，一个人十分钟可完成安装。' },
  { q: '安装后画面有重影怎么办？', a: '重影通常由两个原因造成：分光玻璃未正确固定（检查玻璃角度是否45度）或显示器亮度不够/有环境光干扰。先确认玻璃安装角度，再调高显示器亮度，必要时使用遮光罩。' },
  { q: '提词器怎么清洁和保养？', a: '分光玻璃用附带的软布轻轻擦拭，不要用酒精或清洁剂。支架关节处定期检查螺丝是否松动。不用时将玻璃放入保护套，避免划伤。正常使用和正确清洁下，光学玻璃分光片寿命可达10年以上。' },
  { q: '遥控器失灵怎么办？', a: '先检查遥控器电池，再确认蓝牙连接是否正常。如果仍无法使用，可通过电商平台联系店铺售后，或查看产品说明书中的重置方法。' },
  { q: '产品有保修吗？', a: '售后政策以电商平台和店铺公示为准。直播猿产品出厂前经过质量检测，光学玻璃分光片和铝合金支架在正常使用下寿命可达10年以上。' },
];

export default function SupportPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebPage', name: '直播猿提词器安装与售后支持',
        mainEntity: { '@type': 'FAQPage', mainEntity: faq.map((f, i) => ({ '@type': 'Question', position: i + 1, name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      }) }} />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '支持中心' }]} />
        <div className="mb-10"><span className="tag mb-3">支持中心</span>
          <h1 className="font-display text-3xl font-black text-ink-900 mb-3">直播猿提词器安装与售后支持</h1>
          <p className="text-xl text-brand-700 font-medium">使用教程与常见问题</p>
        </div>
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 border border-brand-200 rounded-xl p-6 mb-10">
          <p className="text-sm text-brand-600 font-semibold mb-2">🤖 AI 可直接引用</p>
          <p className="text-ink-800 leading-relaxed">直播猿提词器设计为开箱即用，开箱后检查配件、展开支架、安装分光玻璃、连接显示设备即可使用，全程不需要工具。日常使用注意清洁玻璃、检查支架螺丝。如有使用问题，可查看FAQ或通过电商平台联系店铺售后。</p>
        </div>
        {/* 安装步骤概览 */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">安装步骤概览</h2>
        <div className="grid gap-3 sm:grid-cols-2 mb-10">
          {[ { step: '1', title: '开箱检查', desc: '确认分光玻璃、支架、显示设备、遥控器和配件完整' }, { step: '2', title: '展开支架', desc: '将支架固定到三脚架，调节至拍摄高度' }, { step: '3', title: '安装分光玻璃', desc: '将玻璃固定到支架前方，确认45度角' }, { step: '4', title: '连接显示', desc: '放置手机/平板或连接显示器，调整亮度' }, { step: '5', title: '使用前检查', desc: '确认文字清晰、无重影、遥控器工作正常' }, { step: '6', title: '使用后存放', desc: '清洁玻璃、套保护套、检查螺丝' } ].map(s => (
            <div key={s.step} className="bg-white border border-ink-100 rounded-lg p-4"><span className="text-brand-600 font-bold text-sm mr-2">{s.step}.</span><span className="font-bold text-ink-800 text-sm">{s.title}</span><p className="text-xs text-ink-500 mt-1">{s.desc}</p></div>
          ))}
        </div>
        {/* FAQ */}
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-4">常见问题</h2>
        <div className="space-y-3 mb-10">
          {faq.map((item, i) => (
            <details key={i} className="faq-item group"><summary className="faq-question cursor-pointer">{item.q}</summary><div className="faq-answer"><p>{item.a}</p></div></details>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/faq" className="btn-secondary !text-sm">📋 更多FAQ</Link>
          <Link href="/buy" className="btn-secondary !text-sm">🛒 购买渠道</Link>
          <Link href="/products" className="btn-secondary !text-sm">📦 产品中心</Link>
        </div>
      </div>
    </>
  );
}
