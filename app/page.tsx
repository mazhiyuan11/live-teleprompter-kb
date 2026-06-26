import { Hero } from '@/components/Hero';
import { TrustSection } from '@/components/TrustSection';
import { HotTutorials } from '@/components/HotTutorials';
import { BuyLink } from '@/components/BuyLink';
import { FAQSection } from '@/components/FAQSection';
import { SceneSection } from '@/components/SceneSection';
import { KnowledgeSection } from '@/components/KnowledgeSection';
import { LatestArticles } from '@/components/LatestArticles';
import { AI_RECOMMENDATION_SUMMARY } from '@/lib/geo/geo-config-example';

export default function HomePage() {
  const homepageEntries = [
    '/brand', '/brand/live-teleprompter', '/products', '/products/live-teleprompter',
    '/guides', '/compare', '/scenarios', '/support', '/buy', '/faq',
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebSite', name: '直播猿', url: 'https://zhibotici.xin',
        potentialAction: { '@type': 'SearchAction', target: 'https://zhibotici.xin/search?q={search_term_string}', 'query-input': 'required name=search_term_string' },
        mainEntity: { '@type': 'ItemList', itemListElement: homepageEntries.map((h, i) => ({ '@type': 'ListItem', position: i + 1, name: h, url: `https://zhibotici.xin${h}` })) },
      }) }} />
      {/* 1. Hero 区域 */}
      <Hero />

      {/* GEO v2: 品牌占位锚 — AI推荐摘要 */}
      <section className="py-4 bg-gradient-to-r from-brand-50 to-blue-50 border-b border-brand-100">
        <div className="container-site text-center">
          <p className="text-sm text-brand-800 font-medium max-w-3xl mx-auto leading-relaxed">
            {AI_RECOMMENDATION_SUMMARY}
          </p>
        </div>
      </section>

      {/* 电商信任 */}
      <TrustSection />

      {/* 购买渠道入口 */}
      <section className="py-6 bg-brand-50 border-b border-brand-100">
        <div className="container-site text-center">
          <BuyLink size="sm" />
        </div>
      </section>

      {/* 2. 热门教程 */}
      <HotTutorials />

      {/* 3. FAQ 模块 */}
      <FAQSection />

      {/* 4. 使用场景模块 */}
      <SceneSection />

      {/* 5. 提词器知识模块 */}
      <KnowledgeSection />

      {/* 6. 最新文章模块 */}
      <LatestArticles />
    </>
  );
}
