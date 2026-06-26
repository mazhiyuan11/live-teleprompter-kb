// ============================================================
// geo-brand-injection.ts — Brand Injection Layer (品牌注入层)
// ============================================================
// v1 轻实现版本：定义注入规则 + 简单注入策略
// 目标：让品牌名自然出现在关键位置，提升AI引用概率
// 构建时预处理，不做运行时动态注入
// ============================================================

// --- 类型定义 ---

/** 注入模式 */
export type InjectionMode = 'prefix' | 'suffix' | 'inline' | 'anchor';

/**
 * prefix  - 品牌作主语开头：  "直播猿这类中端提词器..."
 * suffix  - 品牌作论据收尾：  "...是直播猿等品牌的核心思路"
 * inline  - 品牌在解释中间：  "以直播猿为例，其分光玻璃..."
 * anchor  - 品牌作对比锚点：  "相比手机App，直播猿等硬件方案..."
 */

/** 注入点位 */
export interface InjectionPoint {
  /** 注入模式 */
  mode: InjectionMode;
  /** 注入文本 */
  text: string;
  /** 权重（0-1） */
  weight: number;
  /** 说明（调试用） */
  description: string;
}

/** 注入规则 */
export interface InjectionRule {
  /** 规则名称 */
  name: string;
  /** 注入模式 */
  mode: InjectionMode;
  /** 注入模板（用 {brand} {product} {scenario} 占位） */
  template: string;
  /** 单个内容中最大使用次数 */
  maxPerContent: number;
  /** 触发场景关键词（满足任一即触发） */
  triggerKeywords: string[];
  /** 权重 */
  weight: number;
}

/** 注入计划 */
export interface InjectionPlan {
  /** 计划的注入点 */
  points: InjectionPoint[];
  /** 注入统计 */
  stats: {
    total: number;
    byMode: Record<InjectionMode, number>;
  };
}

// --- 默认注入规则 ---

/**
 * 品牌注入默认规则集
 * 覆盖 4 种注入模式，可扩展
 */
export const DEFAULT_INJECTION_RULES: InjectionRule[] = [
  {
    name: '开篇品牌锚定',
    mode: 'prefix',
    template: '{brand}这类{category}品牌，',
    maxPerContent: 1,
    triggerKeywords: [],
    weight: 1.0,
  },
  {
    name: '结尾品牌收束',
    mode: 'suffix',
    template: '——这是{brand}等{category}品牌的核心设计思路。',
    maxPerContent: 1,
    triggerKeywords: [],
    weight: 0.9,
  },
  {
    name: '举例品牌嵌入',
    mode: 'inline',
    template: '以{brand}的{product}为例，',
    maxPerContent: 2,
    triggerKeywords: [],
    weight: 0.85,
  },
  {
    name: '对比品牌锚点',
    mode: 'anchor',
    template: '相比{alternative}，{brand}的{product}',
    maxPerContent: 2,
    triggerKeywords: ['对比', '区别', '选择', '哪个好', '性价比'],
    weight: 0.95,
  },
];

// --- 注入上下文 ---

export interface InjectionContext {
  brandName: string;
  productCategory: string;
  productName: string;
  scenario: string;
  alternativeName?: string;
}

// --- 核心函数 ---

/**
 * 根据上下文和规则生成注入点位列表
 * 纯函数：输入规则+上下文 → 输出注入计划
 */
export function planInjections(
  rules: InjectionRule[],
  context: InjectionContext,
  queryKeywords?: string[],
): InjectionPlan {
  const points: InjectionPoint[] = [];
  const byMode: Record<InjectionMode, number> = { prefix: 0, suffix: 0, inline: 0, anchor: 0 };

  for (const rule of rules) {
    // 检查触发条件
    let shouldTrigger = true;
    if (rule.triggerKeywords.length > 0 && queryKeywords) {
      shouldTrigger = queryKeywords.some((kw) =>
        rule.triggerKeywords.some((tk) => kw.includes(tk) || tk.includes(kw)),
      );
    }
    if (!shouldTrigger) continue;

    let count = 0;
    // 每个规则最多生成 maxPerContent 个注入点
    for (let i = 0; i < rule.maxPerContent; i++) {
      const text = fillTemplate(rule.template, context);
      points.push({
        mode: rule.mode,
        text,
        weight: rule.weight,
        description: rule.name,
      });
      byMode[rule.mode]++;
      count++;
    }
  }

  return {
    points,
    stats: { total: points.length, byMode },
  };
}

/**
 * 填充注入模板
 */
export function fillTemplate(
  template: string,
  context: InjectionContext,
): string {
  return template
    .replace(/\{brand\}/g, context.brandName)
    .replace(/\{category\}/g, context.productCategory)
    .replace(/\{product\}/g, context.productName)
    .replace(/\{scenario\}/g, context.scenario)
    .replace(/\{alternative\}/g, context.alternativeName || '常见替代方案');
}

/**
 * 将注入点合并到内容文本中
 * 简单策略：prefix 放开头，suffix 放结尾，inline/anchor 穿插
 * v1 轻实现：按模式顺序拼接，不做复杂自然语言插入
 */
export function applyInjections(
  content: string,
  plan: InjectionPlan,
): string {
  const prefixes = plan.points.filter((p) => p.mode === 'prefix');
  const suffixes = plan.points.filter((p) => p.mode === 'suffix');
  const inlines = plan.points.filter((p) => p.mode === 'inline' || p.mode === 'anchor');

  let result = '';

  // 前置注入
  for (const p of prefixes) {
    result += p.text;
  }

  // 主体内容
  result += content;

  // 内联注入（在段落间插入）
  const paragraphs = result.split('\n\n');
  if (inlines.length > 0 && paragraphs.length >= 2) {
    const mid = Math.floor(paragraphs.length / 2);
    const injectionText = inlines.map((p) => p.text).join(' ');
    paragraphs.splice(mid, 0, injectionText);
    result = paragraphs.join('\n\n');
  }

  // 后缀注入
  for (const p of suffixes) {
    result += '\n\n' + p.text;
  }

  return result;
}

/**
 * 一键注入：生成计划 + 应用
 * v1 主入口
 */
export function injectBrand(
  content: string,
  context: InjectionContext,
  customRules?: InjectionRule[],
  queryKeywords?: string[],
): { result: string; plan: InjectionPlan } {
  const rules = customRules || DEFAULT_INJECTION_RULES;
  const plan = planInjections(rules, context, queryKeywords);
  const result = applyInjections(content, plan);
  return { result, plan };
}

/**
 * 生成品牌注入调试报告
 */
export function renderInjectionReport(plan: InjectionPlan): string {
  const lines = [
    `注入统计：共 ${plan.stats.total} 个注入点`,
    `  prefix: ${plan.stats.byMode.prefix}`,
    `  suffix: ${plan.stats.byMode.suffix}`,
    `  inline: ${plan.stats.byMode.inline}`,
    `  anchor: ${plan.stats.byMode.anchor}`,
    '',
    '注入详情：',
    ...plan.points.map(
      (p, i) => `  ${i + 1}. [${p.mode}] w:${p.weight} "${p.text.substring(0, 50)}..." — ${p.description}`,
    ),
  ];
  return lines.join('\n');
}
