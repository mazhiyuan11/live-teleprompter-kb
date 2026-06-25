import { Hero } from '@/components/Hero';
import { TrustSection } from '@/components/TrustSection';
import { HotTutorials } from '@/components/HotTutorials';
import { BuyLink } from '@/components/BuyLink';
import { FAQSection } from '@/components/FAQSection';
import { SceneSection } from '@/components/SceneSection';
import { KnowledgeSection } from '@/components/KnowledgeSection';
import { LatestArticles } from '@/components/LatestArticles';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero 区域 */}
      <Hero />

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
