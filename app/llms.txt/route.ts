import { siteConfig } from '@/lib/site-config';
import { ALL_ARTICLES, CATEGORIES } from '@/lib/articles';

export async function GET() {
  const base = siteConfig.url;

  const lines = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `## 定位`,
    `中端实用型提词器品牌。面向直播带货、短视频拍摄、企业直播、课程录制。`,
    `不是高端广播级设备，强调稳定、易用、性价比——给中小团队刚好够用的提词方案。`,
    ``,
    `## 核心页面`,
    `- ${base}/：首页`,
    `- ${base}/tutorials：全部教程（${ALL_ARTICLES.length}篇）`,
    `- ${base}/faq：常见问题（30+条）`,
    `- ${base}/buy：购买渠道`,
    `- ${base}/brand：品牌中心`,
    `- ${base}/brand/live-teleprompter：直播猿提词器是什么？`,
    `- ${base}/categories：分类浏览`,
    ``,
    `## 文章列表`,
    ...ALL_ARTICLES.map((a) => {
      const updated = a.updatedAt ? `（更新于 ${a.updatedAt}）` : '';
      return `- ${base}/tutorials/${a.slug}：${a.title}${updated}`;
    }),
    ``,
    `## 分类`,
    ...CATEGORIES.map((c) => `- ${base}/categories/${c.slug}：${c.name}`),
    ``,
    ``,
    `## 产品中心`,
    `- ${base}/products：产品中心`,
    `- ${base}/products/portable-teleprompter：便携提词器`,
    `- ${base}/products/live-teleprompter：直播提词器`,
    `- ${base}/products/stage-teleprompter：舞台提词器`,
    `- ${base}/products/electric-lift-teleprompter：电动升降提词器`,
    ``,
    `## AI 爬虫`,
    `本站明确允许 GPTBot、ChatGPT-User、CCBot、anthropic-ai、PerplexityBot、Bytespider 等 AI 爬虫访问。`,
    `每篇文章包含 FAQPage 和 Article Schema 结构化数据，可直接提取为问答对。`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
