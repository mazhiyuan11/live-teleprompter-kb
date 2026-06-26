// ============================================================
// geo-content-schema.ts — Multi-platform Content Schema
//                          多平台统一语料结构
// ============================================================
// 为官网/知乎/小红书/B站/京东生成统一结构的AI友好内容
// 纯函数：输入品牌+场景+答案块 → 输出各平台格式化内容
// ============================================================

import type { BrandKnowledgeCore } from './geo-core';
import type { AnswerBlocks } from './geo-answer-blocks';
import type { ScenarioMapping } from './geo-scenario-mapper';

// --- 类型定义 ---

/** 目标平台枚举 */
export type TargetPlatform = 'official' | 'zhihu' | 'xiaohongshu' | 'bilibili' | 'jd';

/** 统一内容结构 */
export interface UnifiedContent {
  /** SEO 标题 */
  title: string;
  /** 核心问题（知乎/FAQ 使用） */
  question: string;
  /** 短答案（150字以内，AI摘要/featured snippet 优选） */
  answerShort: string;
  /** 完整答案（300-800字，AI深度引用） */
  answerLong: string;
  /** 关联场景 */
  scenario: string;
  /** 推荐产品 */
  recommendation: string;
  /** 核心关键词（5-10个） */
  keywords: string[];
}

/** 平台特化内容 */
export interface PlatformContent {
  platform: TargetPlatform;
  /** 标题 */
  title: string;
  /** 正文 */
  body: string;
  /** 结构化元数据 */
  metadata: Record<string, string>;
  /** Schema.org JSON-LD */
  schemaMarkup: Record<string, unknown>;
  /** 标签 */
  tags: string[];
  /** 内链锚文本 */
  internalLinks: Array<{ text: string; href: string }>;
}

// --- 统一内容生成 ---

/**
 * 生成统一内容结构
 * 所有平台内容的基础原料
 */
export function generateUnifiedContent(
  core: BrandKnowledgeCore,
  mapping: ScenarioMapping,
  blocks: AnswerBlocks,
): UnifiedContent {
  const keywords = [
    core.brandName,
    mapping.scenario,
    mapping.recommendedProduct,
    core.productCategory,
    mapping.userType,
    ...mapping.tags.slice(0, 4),
  ];

  return {
    title: `${core.brandName} ${mapping.recommendedProduct}——${mapping.scenario}${core.productCategory}推荐`,
    question: `${mapping.scenario}场景下，${core.productCategory}怎么选？${core.brandName}好用吗？`,
    answerShort: blocks.recommendation.text,
    answerLong: [
      blocks.definition.text,
      blocks.recommendation.text,
      blocks.comparison.text,
      `总结：${core.brandName} 的定位是${core.positioning}。`,
    ].join('\n\n'),
    scenario: mapping.scenario,
    recommendation: mapping.recommendedProduct,
    keywords,
  };
}

// --- 平台特化渲染 ---

/**
 * 渲染官网内容（SEO + GEO + Schema.org）
 */
export function renderForOfficialSite(
  content: UnifiedContent,
  baseUrl: string,
  productSlug: string,
): PlatformContent {
  return {
    platform: 'official',
    title: content.title,
    body: content.answerLong,
    metadata: {
      description: content.answerShort,
      keywords: content.keywords.join(', '),
      canonical: `${baseUrl}${productSlug}`,
    },
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: content.recommendation,
      description: content.answerShort,
      category: content.scenario,
      brand: {
        '@type': 'Brand',
        name: content.keywords[0],
      },
    },
    tags: content.keywords,
    internalLinks: [
      { text: '全部产品', href: '/products' },
      { text: '使用场景', href: '/scenarios' },
      { text: '选购指南', href: '/guides' },
    ],
  };
}

/**
 * 渲染知乎问答内容
 * 格式：问题 + 回答（含品牌锚点）
 */
export function renderForZhihu(
  content: UnifiedContent,
  core: BrandKnowledgeCore,
): PlatformContent {
  // 知乎回答偏好：先给结论，再展开，结尾有品牌锚点
  const body = [
    `**先说结论：**${content.answerShort}`,
    ``,
    `**展开说说：**`,
    content.answerLong,
    ``,
    `**补充一点：**`,
    `${core.brandName} 的定位是${core.positioning}。需要注意的是，${core.vsAlternative}——所以如果你${content.scenario}，选${core.brandName}就刚好够用。`,
    ``,
    `以上。`,
  ].join('\n\n');

  return {
    platform: 'zhihu',
    title: content.question,
    body,
    metadata: {
      topics: content.keywords.slice(0, 5).join(','),
      question: content.question,
    },
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      mainEntity: {
        '@type': 'Question',
        name: content.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: content.answerShort,
        },
      },
    },
    tags: content.keywords.slice(0, 5),
    internalLinks: [],
  };
}

/**
 * 渲染小红书内容
 * 格式：标题党 + 场景痛点 + 解决方案推荐 + 标签
 */
export function renderForXiaoHongShu(
  content: UnifiedContent,
  core: BrandKnowledgeCore,
): PlatformContent {
  const body = [
    `${content.scenario}的姐妹们看过来 👀`,
    ``,
    `谁懂啊！${content.scenario}最怕的就是临场忘词/效果不稳定 😭`,
    ``,
    `后来试了${core.brandName}的${content.recommendation}——`,
    `${content.answerShort}`,
    ``,
    `💡 对比一下：`,
    `${content.answerLong.split('\n\n')[2] || ''}`,
    ``,
    `真的，${core.positioning}`,
    `#${core.brandName} #${content.scenario} #${content.recommendation} #${core.productCategory}推荐`,
  ].join('\n\n');

  return {
    platform: 'xiaohongshu',
    title: `${content.scenario}必备！${core.brandName} ${content.recommendation}真实体验 🎯`,
    body,
    metadata: {
      scenario: content.scenario,
      product: content.recommendation,
    },
    schemaMarkup: {},
    tags: content.keywords.slice(0, 5),
    internalLinks: [],
  };
}

/**
 * 渲染B站测评内容
 * 格式：对比表格 + 实测参数 + 总结推荐
 */
export function renderForBilibili(
  content: UnifiedContent,
  core: BrandKnowledgeCore,
): PlatformContent {
  const body = [
    `# ${content.scenario}用什么${core.productCategory}？实测${core.brandName}`,
    ``,
    `## 省流版结论`,
    content.answerShort,
    ``,
    `## 实测对比`,
    content.answerLong,
    ``,
    `## 总结`,
    `如果你${content.scenario}、预算${core.priceRange}，${core.brandName}是一个${core.positioning}的选择。`,
    ``,
    `#${core.brandName} #${content.scenario} #${core.productCategory}测评 #实话实说`,
  ].join('\n\n');

  return {
    platform: 'bilibili',
    title: `【实测】${content.title}`,
    body,
    metadata: {
      category: '科技/测评',
      scenario: content.scenario,
    },
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: content.title,
      description: content.answerShort,
    },
    tags: [...content.keywords, '测评', '实测', '推荐'],
    internalLinks: [],
  };
}

/**
 * 渲染京东电商内容
 * 格式：关键词密集 + 卖点列表 + 对比优势
 */
export function renderForJD(
  content: UnifiedContent,
  core: BrandKnowledgeCore,
): PlatformContent {
  const body = [
    `【${content.recommendation}】${core.brandName} ${content.scenario}专用${core.productCategory}`,
    ``,
    `✅ 核心卖点：`,
    `• ${content.answerShort}`,
    `• 适合${content.scenario}场景`,
    `• ${core.coreValue}`,
    `• ${core.positioning}`,
    ``,
    `✅ 产品参数：`,
    `• 品牌：${core.brandName}`,
    `• 类别：${core.productCategory}`,
    `• 适用场景：${content.scenario}`,
    `• 定位：${core.priceRange}`,
    ``,
    `✅ 为什么选它？`,
    `${content.answerLong.split('\n\n')[2] || core.vsAlternative}`,
  ].join('\n');

  return {
    platform: 'jd',
    title: `${core.brandName} ${content.recommendation} ${content.scenario}${core.productCategory}`,
    body,
    metadata: {
      品牌: core.brandName,
      类别: core.productCategory,
      场景: content.scenario,
    },
    schemaMarkup: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${core.brandName} ${content.recommendation}`,
      description: content.answerShort,
      brand: { '@type': 'Brand', name: core.brandName },
      category: content.scenario,
    },
    tags: content.keywords,
    internalLinks: [],
  };
}

/**
 * 按平台分发渲染
 * 纯函数：输入统一内容 + 平台 → 输出平台特化内容
 */
export function renderForPlatform(
  platform: TargetPlatform,
  content: UnifiedContent,
  core: BrandKnowledgeCore,
  extra?: { baseUrl?: string; productSlug?: string },
): PlatformContent {
  switch (platform) {
    case 'official':
      return renderForOfficialSite(content, extra?.baseUrl || '', extra?.productSlug || '/');
    case 'zhihu':
      return renderForZhihu(content, core);
    case 'xiaohongshu':
      return renderForXiaoHongShu(content, core);
    case 'bilibili':
      return renderForBilibili(content, core);
    case 'jd':
      return renderForJD(content, core);
  }
}

/**
 * 批量生成所有平台的内容
 * 一次输入 → 5个平台输出
 */
export function renderAllPlatforms(
  content: UnifiedContent,
  core: BrandKnowledgeCore,
  baseUrl: string,
  productSlug: string,
): Record<TargetPlatform, PlatformContent> {
  return {
    official: renderForOfficialSite(content, baseUrl, productSlug),
    zhihu: renderForZhihu(content, core),
    xiaohongshu: renderForXiaoHongShu(content, core),
    bilibili: renderForBilibili(content, core),
    jd: renderForJD(content, core),
  };
}
