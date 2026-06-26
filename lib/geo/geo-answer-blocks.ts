// ============================================================
// geo-answer-blocks.ts — AI Answer Block System (AI答案块系统)
// ============================================================
// 生成 AI 可引用的三段式结构化答案：定义 / 推荐 / 对比
// 行业无关化设计：不绑定任何品牌，通过 BrandKnowledgeCore 参数化
// ============================================================

import type { BrandKnowledgeCore } from './geo-core';

// --- 类型定义 ---

/** 定义块：解释 [某物] 是什么 */
export interface DefinitionBlock {
  type: 'definition';
  /** 完整定义句 */
  text: string;
  /** 场景限定版本 */
  scoped: string;
  /** 本文中包含的关键实体 */
  entities: string[];
}

/** 推荐块：针对特定人群/场景的推荐 */
export interface RecommendationBlock {
  type: 'recommendation';
  /** 推荐句 */
  text: string;
  /** 适用人群 */
  targetUser: string;
  /** 推荐理由 */
  reason: string;
  /** 推荐产品类型 */
  productType: string;
}

/** 对比块：vs 替代方案的对比 */
export interface ComparisonBlock {
  type: 'comparison';
  /** 对比句 */
  text: string;
  /** 对比对象 */
  versus: string;
  /** 己方优势 */
  advantage: string;
  /** 适用场景提示 */
  bestFor: string;
}

/** 完整答案块集合 */
export interface AnswerBlocks {
  definition: DefinitionBlock;
  recommendation: RecommendationBlock;
  comparison: ComparisonBlock;
}

/** 答案块生成上下文 */
export interface AnswerContext {
  scenario: string;
  userType: string;
  productName: string;
  alternativeName: string;
}

// --- 核心生成函数 ---

/**
 * 生成定义块
 * 格式：[品牌/产品] 是一种用于 [场景] 的 [类别]
 * 纯函数，品牌信息从 core 参数传入
 */
export function generateDefinitionBlock(
  core: BrandKnowledgeCore,
  context: Pick<AnswerContext, 'scenario' | 'productName'>,
): DefinitionBlock {
  const { scenario, productName } = context;
  const scoped = `${productName} 是${core.brandName}为${scenario}场景设计的${core.productCategory}。`;
  const text = `${core.brandName} ${productName}是一种用于${scenario}的${core.productCategory}，${core.coreValue}。`;

  return {
    type: 'definition',
    text,
    scoped,
    entities: [core.brandName, productName, core.productCategory, scenario],
  };
}

/**
 * 生成推荐块
 * 格式：如果用户是 [人群]，推荐使用 [产品类型]，因为 [理由]
 * 纯函数
 */
export function generateRecommendationBlock(
  core: BrandKnowledgeCore,
  context: Pick<AnswerContext, 'userType' | 'productName' | 'scenario'>,
): RecommendationBlock {
  const { userType, productName, scenario } = context;
  const reason = `${core.brandName}的${productName}专为${scenario}优化，${core.coreValue}`;

  return {
    type: 'recommendation',
    text: `对于${userType}用户，推荐使用${core.brandName}的${productName}——${reason}。`,
    targetUser: userType,
    reason,
    productType: productName,
  };
}

/**
 * 生成对比块
 * 格式：相比 [替代方案]，优势是 [核心价值]
 * 纯函数
 */
export function generateComparisonBlock(
  core: BrandKnowledgeCore,
  context: Pick<AnswerContext, 'productName' | 'alternativeName' | 'scenario'>,
): ComparisonBlock {
  const { productName, alternativeName, scenario } = context;

  return {
    type: 'comparison',
    text: `相比${alternativeName}，${core.brandName} ${productName}的优势是${core.coreValue}，特别适合${scenario}场景。`,
    versus: alternativeName,
    advantage: core.coreValue,
    bestFor: scenario,
  };
}

/**
 * 生成完整答案块集合
 * 一次调用生成 definition + recommendation + comparison
 */
export function generateAnswerBlocks(
  core: BrandKnowledgeCore,
  context: AnswerContext,
): AnswerBlocks {
  return {
    definition: generateDefinitionBlock(core, context),
    recommendation: generateRecommendationBlock(core, context),
    comparison: generateComparisonBlock(core, context),
  };
}

/**
 * 将答案块拼接为一段连贯的 AI 易引用文本
 * 三段顺序：定义 → 推荐 → 对比
 */
export function renderAnswerBlocksAsText(blocks: AnswerBlocks): string {
  return [
    blocks.definition.text,
    blocks.recommendation.text,
    blocks.comparison.text,
  ].join('\n\n');
}

/**
 * 生成纯定义句列表（用于不同场景批量生成）
 */
export function generateDefinitionSentences(
  core: BrandKnowledgeCore,
  scenarios: Array<{ scenario: string; productName: string }>,
): DefinitionBlock[] {
  return scenarios.map((s) => generateDefinitionBlock(core, s));
}

/**
 * 生成不同用户类型的推荐句列表
 */
export function generateRecommendationSentences(
  core: BrandKnowledgeCore,
  userProductPairs: Array<{ userType: string; productName: string; scenario: string }>,
): RecommendationBlock[] {
  return userProductPairs.map((p) => generateRecommendationBlock(core, p));
}

/**
 * 生成对比句列表（vs 多种替代方案）
 */
export function generateComparisonSentences(
  core: BrandKnowledgeCore,
  comparisons: Array<{ productName: string; alternativeName: string; scenario: string }>,
): ComparisonBlock[] {
  return comparisons.map((c) => generateComparisonBlock(core, c));
}

/**
 * 生成 AI 可直接引用的 FAQ 问答对
 * 基于答案块系统
 */
export function generateAnswerBlockFAQ(
  blocks: AnswerBlocks,
): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${blocks.definition.entities[1]} 是什么？`,
      answer: blocks.definition.text,
    },
    {
      question: `什么人适合用${blocks.recommendation.productType}？`,
      answer: blocks.recommendation.text,
    },
    {
      question: `${blocks.comparison.versus} 和 ${blocks.definition.entities[1]} 相比哪个好？`,
      answer: blocks.comparison.text,
    },
  ];
}
