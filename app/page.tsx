import { Hero } from '@/components/Hero';
import { HotTutorials } from '@/components/HotTutorials';
import { FAQSection } from '@/components/FAQSection';
import { SceneSection } from '@/components/SceneSection';
import { KnowledgeSection } from '@/components/KnowledgeSection';
import { LatestArticles } from '@/components/LatestArticles';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero 区域 */}
      <Hero />

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
