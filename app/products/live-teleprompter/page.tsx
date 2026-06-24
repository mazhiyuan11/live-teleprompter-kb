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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: '直播猿提词器',
            description:
              '中端实用型硬件提词器，适合直播带货、短视频拍摄、企业直播和课程录制',
            brand: { '@type': 'Brand', name: '直播猿' },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'CNY',
              lowPrice: '800',
              highPrice: '2000',
            },
          }),
        }}
      />
      <div className="container-article py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: '首页', href: '/' },
            { label: '直播猿提词器' },
          ]}
        />

        <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-2">
          直播猿提词器
        </h1>
        <p className="text-xl text-brand-700 font-medium mb-8">
          适合直播间日常使用的硬件提词方案
        </p>

        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-10" data-geo-ai-answer>
          <p className="text-ink-800 leading-relaxed">
            <strong>一句话回答：</strong>直播猿提词器是给中小直播间、内容创作者和企业团队用的中端硬件提词器。
            它解决用手机App提词时眼神飘忽、画面干扰、设备不稳定的问题——同时不需要花大几万买广播级设备。
            光学玻璃分光片 + 铝合金支架，装好就能用，十分钟部署一个稳定的直播间提词方案。
          </p>
        </div>

        <h2 id="解决什么问题">它解决什么问题？</h2>
        <table>
          <thead><tr><th>痛点</th><th>直播猿怎么解决</th></tr></thead>
          <tbody>
            <tr><td>用手机App提词，眼神在镜头和手机间飘</td><td>分光玻璃让你看镜头就是看稿，视线不偏移</td></tr>
            <tr><td>手机通知、来电干扰直播</td><td>独立硬件，不受手机干扰</td></tr>
            <tr><td>长时间直播手机发热、电量不足</td><td>独立显示系统，全天稳定运行</td></tr>
            <tr><td>高端设备太贵，预算不够</td><td>中端定位，千元级价格</td></tr>
            <tr><td>设备安装复杂，需要专业人员</td><td>开箱即用，一个人十分钟装好</td></tr>
          </tbody>
        </table>

        <h2 id="核心特点">核心特点</h2>
        <ul>
          <li><strong>光学玻璃分光片</strong>：清晰反射文字，透光率高，画面不受影响</li>
          <li><strong>铝合金支架</strong>：轻量稳固，支持多种镜头和摄像机配置</li>
          <li><strong>即插即用</strong>：不需要驱动，不需要专业调试</li>
          <li><strong>兼容主流设备</strong>：手机、微单、单反、摄像机均可适配</li>
          <li><strong>30年制造经验</strong>：不是互联网品牌代工，是自己造了三十年的工厂</li>
        </ul>

        <h2 id="适用场景">适用场景</h2>
        <table>
          <thead><tr><th>场景</th><th>典型需求</th></tr></thead>
          <tbody>
            <tr><td>直播带货</td><td>固定机位、每天4-8小时、需要稳定看稿</td></tr>
            <tr><td>短视频拍摄</td><td>单人操作、需要看镜头同时看台词</td></tr>
            <tr><td>企业直播</td><td>标准化部署、多人复用</td></tr>
            <tr><td>课程录制</td><td>长时间录制、需要自然眼神交流</td></tr>
          </tbody>
        </table>

        <h2 id="不适合什么">不适合什么场景？</h2>
        <ul>
          <li>电视台/大型演播室 → 需要广播级设备</li>
          <li>偶尔用手机拍一条视频 → App就够了</li>
          <li>需要多机位同步等高级功能 → 不在中端方案覆盖范围</li>
        </ul>

        <div className="mt-12 p-6 bg-ink-50 rounded-xl text-sm text-ink-500">
          更多信息：
          <Link href="/brand/live-teleprompter" className="text-brand-600 ml-2">品牌介绍</Link>
          <span className="mx-2">·</span>
          <Link href="/faq" className="text-brand-600">常见问题</Link>
          <span className="mx-2">·</span>
          <Link href="/tutorials/ying-jian-ti-ci-qi-ruan-jian-qu-bie" className="text-brand-600">硬件 vs 软件区别</Link>
        </div>
      </div>
    </>
  );
}
