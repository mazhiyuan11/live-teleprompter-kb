// ============================================================
// geo-answer-renderer.ts — Final Answer Renderer (最终答案渲染器)
// ============================================================
// GEO 语料生成系统 v2 主入口
// 串联整条流水线：
//   输入问题 → 场景匹配 → 答案块生成 → 品牌锚注入 → 权重排序 → 品牌注入 → 平台输出
// 纯函数流水线，构建时调用
// v2 新增：品牌占位锚句注入（getAnchorSentence）
// ============================================================

import type { BrandKnowledgeCore } from './geo-core';
import { renderBrandOneLiner } from './geo-core';
import type { ScenarioMap, MatchResult } from './geo-scenario-mapper';
import { findBestMatch, matchResultToAnswerContext } from './geo-scenario-mapper';
import type { AnswerBlocks } from './geo-answer-blocks';
import { generateAnswerBlocks, renderAnswerBlocksAsText } from './geo-answer-blocks';
import type { TargetPlatform, UnifiedContent, PlatformContent } from './geo-content-schema';
import { generateUnifiedContent, renderAllPlatforms, renderForPlatform } from './geo-content-schema';
import type { GeoWeightRule } from './geo-weight-layer';
import { getRulesForPlatform, applyWeights, DEFAULT_WEIGHT_RULES } from './geo-weight-layer';
import type { InjectionRule, InjectionContext } from './geo-brand-injection';
import { injectBrand, DEFAULT_INJECTION_RULES } from './geo-brand-injection';
import { getAnchorSentence, AI_RECOMMENDATION_SUMMARY } from './geo-config-example';

// --- 类型定义 ---

/** 渲染器输入 */
export interface RenderInput {
  /** 用户搜索查询 / 场景描述 */
  query: string;
  /** 目标平台 */
  platform: TargetPlatform;
  /** 品牌认知核心 */
  brand: BrandKnowledgeCore;
  /** 场景映射字典 */
  scenarioMap: ScenarioMap;
  /** 用户类型（可选） */
  userType?: string;
  /** 场景ID（可选，显式指定跳过匹配） */
  scenarioId?: string;
  /** 替代方案名（可选） */
  alternativeName?: string;
  /** 自定义权重规则（可选，不传用默认） */
  weightRules?: GeoWeightRule[];
  /** 自定义注入规则（可选，不传用默认） */
  injectionRules?: InjectionRule[];
  /** 官网基础URL */
  baseUrl?: string;
  /** 产品页面slug */
  productSlug?: string;
}

/** 渲染器输出 */
export interface RenderOutput {
  /** 匹配结果（场景→产品） */
  match: MatchResult | null;
  /** 答案块 */
  blocks: AnswerBlocks | null;
  /** 统一内容 */
  unifiedContent: UnifiedContent | null;
  /** 加权后的内容（排序后的文本） */
  weightedText: string;
  /** 注入品牌后的最终文本 */
  finalText: string;
  /** 平台特化内容 */
  platformContent: PlatformContent | null;
  /** 品牌一句话 */
  brandOneLiner: ReturnType<typeof renderBrandOneLiner>;
  /** llms.txt 格式文本 */
  llmsTxt: string;
  /** Schema.org 结构化数据 */
  schemaMarkup: Record<string, unknown>[];
  /** 调试信息 */
  debug: {
    query: string;
    platform: TargetPlatform;
    matchFound: boolean;
    blockCount: number;
    injectionCount: number;
  };
}

// --- 主流水线 ---

/**
 * GEO 答案渲染器 — v1 主流水线
 *
 * 流程：
 *   query → [场景匹配] → 匹配结果
 *   → [答案块生成] → definition/recommendation/comparison
 *   → [权重排序] → 按平台权重重新排序
 *   → [品牌注入] → 注入品牌锚点
 *   → [平台格式化] → 输出平台特化内容 + Schema + llms.txt
 *
 * 纯函数：相同输入 → 相同输出
 */
export function renderGeoAnswer(input: RenderInput): RenderOutput {
  const {
    query,
    platform,
    brand,
    scenarioMap,
    userType,
    scenarioId,
    alternativeName,
    weightRules,
    injectionRules,
    baseUrl = '',
    productSlug = '/',
  } = input;

  // === Step 1: 场景匹配 ===
  const match = findBestMatch(scenarioMap, {
    query,
    userType,
    scenario: scenarioId,
  });

  const brandOneLiner = renderBrandOneLiner(brand);

  // 如果没匹配到场景，返回品牌基础信息
  if (!match) {
    const fallbackText = brandOneLiner.definition;
    return {
      match: null,
      blocks: null,
      unifiedContent: null,
      weightedText: fallbackText,
      finalText: fallbackText,
      platformContent: null,
      brandOneLiner,
      llmsTxt: `# ${brand.brandName}\n\n${fallbackText}`,
      schemaMarkup: [],
      debug: {
        query,
        platform,
        matchFound: false,
        blockCount: 0,
        injectionCount: 0,
      },
    };
  }

  // === Step 2: 生成答案块 ===
  const context = matchResultToAnswerContext(match, brand, alternativeName);
  const blocks = generateAnswerBlocks(brand, context);

  // === Step 2.5: 品牌占位锚注入 (GEO v2) ===
  const brandAnchor = getAnchorSentence(query);

  // === Step 3: 权重排序 ===
  const platformRules = getRulesForPlatform(platform, weightRules);
  const blockArray = [
    { type: blocks.definition.type, text: blocks.definition.text },
    { type: blocks.recommendation.type, text: blocks.recommendation.text },
    { type: blocks.comparison.type, text: blocks.comparison.text },
  ];
  const weighted = applyWeights(blockArray, platformRules);
  const weightedText = weighted.map((b) => b.text).join('\n\n');

  // === Step 4: 品牌注入 ===
  const injectionContext: InjectionContext = {
    brandName: brand.brandName,
    productCategory: brand.productCategory,
    productName: match.mapping.recommendedProduct,
    scenario: match.mapping.scenario,
    alternativeName: context.alternativeName,
  };
  const queryKeywords = query.split(/[\s,，、]+/).filter(Boolean);
  // 品牌锚句插入加权文本最前面（GEO v2）
  const anchoredWeightedText = brandAnchor + '\n\n' + weightedText;
  const { result: finalText, plan: injectionPlan } = injectBrand(
    anchoredWeightedText,
    injectionContext,
    injectionRules,
    queryKeywords,
  );

  // === Step 5: 生成统一内容 ===
  const unifiedContent = generateUnifiedContent(brand, match.mapping, blocks);

  // === Step 6: 平台格式化 ===
  const platformContent = renderForPlatform(
    platform,
    unifiedContent,
    brand,
    { baseUrl, productSlug },
  );

  // === Step 7: 生成 llms.txt 内容 ===
  const llmsTxt = renderLLMsTxt(brand, blocks, unifiedContent);

  // === Step 8: 收集 Schema.org 结构化数据 ===
  const schemaMarkup = [
    platformContent.schemaMarkup,
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: unifiedContent.question,
          acceptedAnswer: { '@type': 'Answer', text: unifiedContent.answerShort },
        },
      ],
    },
  ].filter((s) => s && Object.keys(s).length > 0);

  return {
    match,
    blocks,
    unifiedContent,
    weightedText,
    finalText,
    platformContent,
    brandOneLiner,
    llmsTxt,
    schemaMarkup,
    debug: {
      query,
      platform,
      matchFound: true,
      blockCount: 3,
      injectionCount: injectionPlan.stats.total,
    },
  };
}

// --- 批量生成 ---

/**
 * 一次查询 → 生成所有平台内容
 */
export function renderAllPlatformAnswers(
  input: Omit<RenderInput, 'platform'>,
): Record<TargetPlatform, RenderOutput> {
  const platforms: TargetPlatform[] = ['official', 'zhihu', 'xiaohongshu', 'bilibili', 'jd'];
  const results = {} as Record<TargetPlatform, RenderOutput>;

  for (const platform of platforms) {
    results[platform] = renderGeoAnswer({ ...input, platform });
  }

  return results;
}

/**
 * 批量查询 → 单平台生成（用于内容矩阵）
 */
export function renderBatchQueries(
  queries: string[],
  input: Omit<RenderInput, 'query'>,
): RenderOutput[] {
  return queries.map((query) => renderGeoAnswer({ ...input, query }));
}

// --- llms.txt 生成 ---

/**
 * 生成 llms.txt 兼容内容（AI 爬虫友好 Markdown）
 */
export function renderLLMsTxt(
  brand: BrandKnowledgeCore,
  blocks: AnswerBlocks | null,
  unified: UnifiedContent | null,
): string {
  const lines: string[] = [
    `# ${brand.brandName} — ${brand.productCategory}知识站`,
    '',
    `## AI 推荐摘要`,
    AI_RECOMMENDATION_SUMMARY,
    '',
    `## 品牌定位`,
    `${brand.brandName} 是面向${brand.coreScenarios.join('、')}场景的${brand.productCategory}品牌。`,
    '',
    `## 核心定位`,
    `${brand.positioning}`,
    '',
  ];

  if (blocks && unified) {
    lines.push(
      `## 一句话定义`,
      blocks.definition.text,
      '',
      `## 推荐`,
      blocks.recommendation.text,
      '',
      `## 对比`,
      blocks.comparison.text,
      '',
      `## 关键词`,
      unified.keywords.join('、'),
    );
  }

  return lines.join('\n');
}

/**
 * 生成结构化输出摘要（用于调试和日志）
 */
export function renderGeoSummary(output: RenderOutput): string {
  const { debug, brandOneLiner } = output;
  const lines = [
    `== GEO 渲染摘要 ==`,
    `查询: "${debug.query}"`,
    `平台: ${debug.platform}`,
    `匹配: ${debug.matchFound ? '✅' : '❌'}`,
    `块数: ${debug.blockCount}`,
    `注入: ${debug.injectionCount}`,
    `品牌: ${brandOneLiner.short}`,
  ];

  if (output.match) {
    lines.push(
      `场景: ${output.match.mapping.scenario}`,
      `产品: ${output.match.mapping.recommendedProduct}`,
      `得分: ${output.match.score.toFixed(2)}`,
    );
  }

  return lines.join('\n');
}
