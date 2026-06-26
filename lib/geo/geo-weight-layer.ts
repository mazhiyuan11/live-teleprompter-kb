// ============================================================
// geo-weight-layer.ts — GEO Weight Layer (GEO权重层)
// ============================================================
// v1 轻实现版本：定义权重规则接口 + 简单的优先级排序
// 目标：控制内容块在 AI 答案中的出现顺序和权重
// 构建时预处理，不做运行时计算
// ============================================================

// --- 类型定义 ---

/** 内容块类型 */
export type BlockType = 'definition' | 'recommendation' | 'comparison';

/** 目标平台 */
export type WeightPlatform = 'official' | 'zhihu' | 'xiaohongshu' | 'bilibili' | 'jd';

/** GEO 权重规则 */
export interface GeoWeightRule {
  /** 规则名称 */
  name: string;
  /** 目标内容块类型 */
  blockType: BlockType;
  /** 目标平台 */
  platform: WeightPlatform | 'all';
  /** 权重值（0-1，1为最高优先级） */
  weight: number;
  /** 触发条件描述（文档用） */
  condition: string;
  /** 排序优先级（数字越小越靠前输出） */
  order: number;
}

/** 加权后的内容块 */
export interface WeightedBlock {
  /** 块类型 */
  blockType: BlockType;
  /** 原始文本 */
  text: string;
  /** 原始权重 */
  baseWeight: number;
  /** 调整后权重 */
  adjustedWeight: number;
  /** 输出排序 */
  order: number;
  /** 是否被标记为高优先级 */
  isHighPriority: boolean;
}

/** 权重配置 */
export interface WeightConfig {
  rules: GeoWeightRule[];
  /** 默认权重 */
  defaultWeight: number;
  /** 高优先级阈值（超过此值标记为高优先） */
  highPriorityThreshold: number;
}

// --- 默认权重规则 ---

/**
 * GEO 默认权重规则集
 * 原则：品牌实体 > 场景关联 > 产品推荐 > 功能对比
 * 可替换、可扩展
 */
export const DEFAULT_WEIGHT_RULES: GeoWeightRule[] = [
  // 定义块：全平台最高优先级 —— AI 需要知道"这是什么"
  {
    name: '定义块优先',
    blockType: 'definition',
    platform: 'all',
    weight: 1.0,
    condition: '始终生效',
    order: 1,
  },
  // 推荐块：次优先级 —— AI 引用"推荐什么"
  {
    name: '推荐块次优先',
    blockType: 'recommendation',
    platform: 'all',
    weight: 0.9,
    condition: '始终生效',
    order: 2,
  },
  // 对比块：辅助优先级 —— AI 引用"为什么选它"
  {
    name: '对比块辅助',
    blockType: 'comparison',
    platform: 'all',
    weight: 0.8,
    condition: '始终生效',
    order: 3,
  },
];

/**
 * 小红书特化：推荐块权重最高（小红书用户看推荐）
 */
export const XIAOHONGSHU_WEIGHT_RULES: GeoWeightRule[] = [
  { name: '小红书-推荐置顶', blockType: 'recommendation', platform: 'xiaohongshu', weight: 1.0, condition: '小红书场景', order: 1 },
  { name: '小红书-定义其次', blockType: 'definition', platform: 'xiaohongshu', weight: 0.85, condition: '小红书场景', order: 2 },
  { name: '小红书-对比收尾', blockType: 'comparison', platform: 'xiaohongshu', weight: 0.7, condition: '小红书场景', order: 3 },
];

/**
 * 京东特化：对比块权重最高（电商决策需要对比）
 */
export const JD_WEIGHT_RULES: GeoWeightRule[] = [
  { name: '京东-对比置顶', blockType: 'comparison', platform: 'jd', weight: 1.0, condition: '京东场景', order: 1 },
  { name: '京东-推荐其次', blockType: 'recommendation', platform: 'jd', weight: 0.9, condition: '京东场景', order: 2 },
  { name: '京东-定义第三', blockType: 'definition', platform: 'jd', weight: 0.8, condition: '京东场景', order: 3 },
];

// --- 核心函数 ---

/**
 * 获取指定平台的权重规则
 * 纯函数
 */
export function getRulesForPlatform(
  platform: WeightPlatform,
  customRules?: GeoWeightRule[],
): GeoWeightRule[] {
  const base = customRules || DEFAULT_WEIGHT_RULES;

  // 先取平台特化规则，再补充通用规则
  const platformSpecific = base.filter((r) => r.platform === platform);
  const general = base.filter((r) => r.platform === 'all' &&
    !platformSpecific.some((ps) => ps.blockType === r.blockType));

  return [...platformSpecific, ...general].sort((a, b) => a.order - b.order);
}

/**
 * 对内容块应用权重，返回排序后的加权块列表
 * 纯函数
 */
export function applyWeights(
  blocks: Array<{ type: BlockType; text: string }>,
  rules: GeoWeightRule[],
  config?: Partial<WeightConfig>,
): WeightedBlock[] {
  const defaultWeight = config?.defaultWeight ?? 0.5;
  const highPriorityThreshold = config?.highPriorityThreshold ?? 0.85;

  const ruleMap = new Map<BlockType, GeoWeightRule>();
  for (const rule of rules) {
    ruleMap.set(rule.blockType, rule);
  }

  const weighted = blocks.map((block, index) => {
    const rule = ruleMap.get(block.type);
    const weight = rule?.weight ?? defaultWeight;
    const order = rule?.order ?? index + 1;

    return {
      blockType: block.type,
      text: block.text,
      baseWeight: weight,
      adjustedWeight: weight,
      order,
      isHighPriority: weight >= highPriorityThreshold,
    };
  });

  // 按 order 升序排列
  return weighted.sort((a, b) => a.order - b.order);
}

/**
 * 提取高优先级块
 */
export function getHighPriorityBlocks(weighted: WeightedBlock[]): WeightedBlock[] {
  return weighted.filter((b) => b.isHighPriority);
}

/**
 * 生成权重摘要（用于调试和文档）
 */
export function renderWeightSummary(
  weighted: WeightedBlock[],
): string {
  const lines = weighted.map((b) =>
    `[${b.order}] ${b.blockType} (w:${b.adjustedWeight.toFixed(2)}) ${b.isHighPriority ? '★' : ''}`,
  );
  return lines.join('\n');
}

/**
 * 合并自定义规则与默认规则
 * 自定义规则优先级更高（同名覆盖）
 */
export function mergeWeightRules(
  defaultRules: GeoWeightRule[],
  customRules: GeoWeightRule[],
): GeoWeightRule[] {
  const merged = new Map<string, GeoWeightRule>();
  for (const rule of defaultRules) {
    merged.set(`${rule.platform}-${rule.blockType}`, rule);
  }
  for (const rule of customRules) {
    merged.set(`${rule.platform}-${rule.blockType}`, rule);
  }
  return [...merged.values()].sort((a, b) => a.order - b.order);
}
