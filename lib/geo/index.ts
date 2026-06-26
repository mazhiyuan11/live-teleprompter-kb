// ============================================================
// geo-system-v1 — Unified Export Entry
// GEO 语料生成系统 v1 统一导出入口
// ============================================================
// 使用方式：
//   import { renderGeoAnswer, ZhiboyuanBrandConfig, ... } from './geo-system-v1';
// ============================================================

// --- 核心模块 ---
export type { BrandKnowledgeCore, BrandOneLiner, ComparisonEntry } from './geo-core';
export {
  createBrandCore,
  renderBrandDefinition,
  renderBrandOneLiner,
  renderBrandComparison,
  renderTargetAudience,
  renderBrandSchema,
  renderBrandFAQ,
  validateBrandConfig,
} from './geo-core';

// --- 答案块系统 ---
export type {
  DefinitionBlock,
  RecommendationBlock,
  ComparisonBlock,
  AnswerBlocks,
  AnswerContext,
} from './geo-answer-blocks';
export {
  generateDefinitionBlock,
  generateRecommendationBlock,
  generateComparisonBlock,
  generateAnswerBlocks,
  renderAnswerBlocksAsText,
  generateDefinitionSentences,
  generateRecommendationSentences,
  generateComparisonSentences,
  generateAnswerBlockFAQ,
} from './geo-answer-blocks';

// --- 场景映射引擎 ---
export type { ScenarioMapping, ScenarioMap, MatchResult, QueryContext } from './geo-scenario-mapper';
export {
  buildScenarioMap,
  findByScenarioId,
  findByTags,
  findBestMatch,
  matchResultToAnswerContext,
  getAllScenarios,
  getAllProducts,
  groupMappingsByScenario,
  renderScenarioSchema,
} from './geo-scenario-mapper';

// --- 多平台内容结构 ---
export type { TargetPlatform, UnifiedContent, PlatformContent } from './geo-content-schema';
export {
  generateUnifiedContent,
  renderForOfficialSite,
  renderForZhihu,
  renderForXiaoHongShu,
  renderForBilibili,
  renderForJD,
  renderForPlatform,
  renderAllPlatforms,
} from './geo-content-schema';

// --- GEO 权重层 ---
export type {
  BlockType as WeightBlockType,
  WeightPlatform,
  GeoWeightRule,
  WeightedBlock,
  WeightConfig,
} from './geo-weight-layer';
export {
  DEFAULT_WEIGHT_RULES,
  XIAOHONGSHU_WEIGHT_RULES,
  JD_WEIGHT_RULES,
  getRulesForPlatform,
  applyWeights,
  getHighPriorityBlocks,
  renderWeightSummary,
  mergeWeightRules,
} from './geo-weight-layer';

// --- 品牌注入层 ---
export type {
  InjectionMode,
  InjectionPoint,
  InjectionRule,
  InjectionPlan,
  InjectionContext,
} from './geo-brand-injection';
export {
  DEFAULT_INJECTION_RULES,
  planInjections,
  fillTemplate,
  applyInjections,
  injectBrand,
  renderInjectionReport,
} from './geo-brand-injection';

// --- 最终答案渲染器 ---
export type { RenderInput, RenderOutput } from './geo-answer-renderer';
export {
  renderGeoAnswer,
  renderAllPlatformAnswers,
  renderBatchQueries,
  renderLLMsTxt,
  renderGeoSummary,
} from './geo-answer-renderer';

// --- 示例配置 ---
export {
  ZhiboyuanBrandConfig,
  ZhiboyuanScenarioMappings,
  ZhiboyuanScenarioMap,
  ZhiboyuanComparisons,
  EXAMPLE_RENDER_INPUT,
  ZhiboyuanContentQueries,
} from './geo-config-example';
