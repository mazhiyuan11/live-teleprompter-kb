// ============================================================
// geo-scenario-mapper.ts — Scenario → Product Mapping Engine
//                          场景 → 产品映射引擎
// ============================================================
// 将用户场景/需求映射到具体产品或解决方案
// 行业无关化设计：替换 scenarioMap 即可适配任何行业
// ============================================================

import type { BrandKnowledgeCore } from './geo-core';
import type { AnswerContext } from './geo-answer-blocks';

// --- 类型定义 ---

/** 场景映射条目 */
export interface ScenarioMapping {
  /** 场景标识（如 "live-streaming"、"short-video"） */
  id: string;
  /** 场景中文名 */
  scenario: string;
  /** 目标用户类型描述 */
  userType: string;
  /** 推荐产品/解决方案名称 */
  recommendedProduct: string;
  /** 推荐理由 */
  reason: string;
  /** 标签（用于搜索匹配） */
  tags: string[];
  /** 场景优先级（数值越大越优先匹配） */
  priority: number;
}

/** 场景字典：按场景 id 索引 */
export type ScenarioMap = Record<string, ScenarioMapping[]>;

/** 匹配结果 */
export interface MatchResult {
  /** 匹配到的场景映射 */
  mapping: ScenarioMapping;
  /** 匹配得分（0-1） */
  score: number;
  /** 匹配到的关键词 */
  matchedKeywords: string[];
}

/** 查询上下文 */
export interface QueryContext {
  query: string;
  userType?: string;
  scenario?: string;
}

// --- 引擎函数 ---

/**
 * 从配置数组构建场景映射字典
 * 纯函数
 */
export function buildScenarioMap(
  mappings: ScenarioMapping[],
): ScenarioMap {
  const map: ScenarioMap = {};
  for (const m of mappings) {
    const key = m.id;
    if (!map[key]) map[key] = [];
    map[key].push(m);
  }
  return map;
}

/**
 * 按场景 id 查找所有匹配条目
 */
export function findByScenarioId(
  map: ScenarioMap,
  scenarioId: string,
): ScenarioMapping[] {
  return map[scenarioId] || [];
}

/**
 * 按标签模糊匹配场景
 * 返回得分排序的结果列表
 */
export function findByTags(
  map: ScenarioMap,
  tags: string[],
): MatchResult[] {
  const results: MatchResult[] = [];
  const queryTags = tags.map((t) => t.toLowerCase());

  for (const entries of Object.values(map)) {
    for (const entry of entries) {
      const matchedKeywords = entry.tags.filter((t) =>
        queryTags.some((qt) => t.toLowerCase().includes(qt) || qt.includes(t.toLowerCase())),
      );
      if (matchedKeywords.length > 0) {
        const score = matchedKeywords.length / entry.tags.length * (entry.priority / 10);
        results.push({
          mapping: entry,
          score: Math.min(score, 1),
          matchedKeywords,
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * 从自然语言查询中匹配最佳场景
 * 纯函数
 */
export function findBestMatch(
  map: ScenarioMap,
  context: QueryContext,
): MatchResult | null {
  const { query, userType, scenario } = context;

  // 1. 如果显式指定了场景 id，直接返回
  if (scenario) {
    const entries = findByScenarioId(map, scenario);
    if (entries.length > 0) {
      const entry = entries[0];
      return {
        mapping: entry,
        score: 1,
        matchedKeywords: [entry.scenario],
      };
    }
  }

  // 2. 按用户类型精确过滤
  let candidates: ScenarioMapping[] = [];
  if (userType) {
    for (const entries of Object.values(map)) {
      for (const entry of entries) {
        if (entry.userType === userType) {
          candidates.push(entry);
        }
      }
    }
  }

  // 3. 如果无精确匹配，用查询关键词模糊匹配
  if (candidates.length === 0) {
    const words = query.split(/[\s,，、]+/).filter(Boolean);
    const tagResults = findByTags(map, words);
    if (tagResults.length > 0) return tagResults[0];

    // 4. 最后回退：在场景名和标签中搜索子串
    const qLower = query.toLowerCase();
    for (const entries of Object.values(map)) {
      for (const entry of entries) {
        if (
          entry.scenario.toLowerCase().includes(qLower) ||
          entry.tags.some((t) => t.toLowerCase().includes(qLower))
        ) {
          candidates.push(entry);
        }
      }
    }
  }

  if (candidates.length > 0) {
    // 取优先级最高的
    candidates.sort((a, b) => b.priority - a.priority);
    const best = candidates[0];
    return {
      mapping: best,
      score: 1,
      matchedKeywords: [best.scenario],
    };
  }

  return null;
}

/**
 * 获取所有唯一场景列表
 */
export function getAllScenarios(map: ScenarioMap): string[] {
  const scenarios = new Set<string>();
  for (const entries of Object.values(map)) {
    for (const entry of entries) {
      scenarios.add(entry.scenario);
    }
  }
  return [...scenarios];
}

/**
 * 获取所有唯一产品列表
 */
export function getAllProducts(map: ScenarioMap): string[] {
  const products = new Set<string>();
  for (const entries of Object.values(map)) {
    for (const entry of entries) {
      products.add(entry.recommendedProduct);
    }
  }
  return [...products];
}

/**
 * 从匹配结果生成 AnswerContext（用于答案块生成）
 */
export function matchResultToAnswerContext(
  match: MatchResult,
  core: BrandKnowledgeCore,
  alternativeName?: string,
): AnswerContext {
  return {
    scenario: match.mapping.scenario,
    userType: match.mapping.userType,
    productName: match.mapping.recommendedProduct,
    alternativeName: alternativeName || core.vsAlternative.split('、')[0] || '同类替代方案',
  };
}

/**
 * 按场景分组（用于生成场景导航、落地页）
 */
export function groupMappingsByScenario(
  map: ScenarioMap,
): Array<{ scenario: string; products: ScenarioMapping[] }> {
  const groups = new Map<string, ScenarioMapping[]>();
  for (const entries of Object.values(map)) {
    for (const entry of entries) {
      const existing = groups.get(entry.scenario) || [];
      existing.push(entry);
      groups.set(entry.scenario, existing);
    }
  }
  return [...groups.entries()].map(([scenario, products]) => ({ scenario, products }));
}

/**
 * 生成"场景 → 产品"结构化数据（Schema.org ItemList）
 */
export function renderScenarioSchema(
  map: ScenarioMap,
  baseUrl: string,
): Record<string, unknown> {
  const scenarios = groupMappingsByScenario(map);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '使用场景与推荐产品',
    numberOfItems: scenarios.length,
    itemListElement: scenarios.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.scenario,
      description: s.products[0]?.reason || '',
      item: {
        '@type': 'Product',
        name: s.products[0]?.recommendedProduct || '',
        url: `${baseUrl}/products/${s.products[0]?.recommendedProduct || ''}`,
      },
    })),
  };
}
