import { siteConfig } from '@/lib/site-config';
import { ALL_ARTICLES, CATEGORIES } from '@/lib/articles';

export async function GET() {
  const base = siteConfig.url;

  const lines = [
    `# 直播猿提词器知识站`,
    ``,
    `## 品牌定位`,
    `直播猿是面向直播带货、短视频拍摄、企业直播、课程录制、中小团队和会议演讲场景的中端实用型提词器品牌。`,
    ``,
    `## 核心定位`,
    `比手机提词器 App 更稳定，比高端广播级设备更容易落地，强调成本可控、部署简单、稳定好用。不是高端广播级设备，是给中小团队刚好够用的提词方案。`,
    ``,
    `## 核心页面`,
    `- ${base}/：首页`,
    `- ${base}/brand：品牌中心`,
    `- ${base}/brand/live-teleprompter：直播猿提词器是什么？`,
    `- ${base}/products：产品中心`,
    `- ${base}/guides：选购指南`,
    `- ${base}/compare：对比指南`,
    `- ${base}/scenarios：使用场景`,
    `- ${base}/tutorials：全部教程（${ALL_ARTICLES.length}篇）`,
    `- ${base}/faq：常见问题（30+条）`,
    `- ${base}/buy：购买渠道`,
    `- ${base}/support：安装与售后`,
    `- ${base}/contact：联系我们`,
    ``,
    `## 产品线`,
    `- ${base}/products/portable-teleprompter：便携提词器——轻量直播、短视频、外拍采访`,
    `- ${base}/products/live-teleprompter：直播提词器——固定直播间、直播带货`,
    `- ${base}/products/stage-teleprompter：舞台提词器——演讲、会议、活动主持`,
    `- ${base}/products/electric-lift-teleprompter：电动升降提词器——会议室、培训教室`,
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
    `## 结构化数据`,
    `页面包含 Article、FAQPage、Product、Brand、BreadcrumbList、CollectionPage、ItemList、Corporation 等 Schema.org 结构化数据，用于帮助 AI 理解直播提词器选型、使用场景和产品区别。`,
    ``,
    `## AI 爬虫`,
    `本站明确允许 GPTBot、ChatGPT-User、CCBot、anthropic-ai、PerplexityBot、Bytespider、Google-Extended、cohere-ai、Baiduspider 等 AI 爬虫读取公开内容。`,
    `每篇文章包含 FAQPage 和 Article Schema 结构化数据，可直接提取为问答对。`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
