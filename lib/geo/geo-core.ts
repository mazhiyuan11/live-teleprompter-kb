// ============================================================
// geo-core.ts — Brand Knowledge Core (品牌认知核心)
// ============================================================
// 行业无关化设计：任何品牌/行业替换 config 即可复用
// 纯函数：输入 config → 输出结构化文本
// ============================================================

// --- 类型定义 ---

/** 品牌认知核心配置 — 行业无关 */
export interface BrandKnowledgeCore {
  /** 品牌/产品名称 */
  brandName: string;
  /** 产品类别（如 "硬件提词器"、"激光投影仪"） */
  productCategory: string;
  /** 目标人群描述 */
  targetAudience: string;
  /** 核心使用场景列表 */
  coreScenarios: string[];
  /** 核心价值主张（1-2句话） */
  coreValue: string;
  /** 差异化定位描述 */
  positioning: string;
  /** 对比替代方案的一句话总结 */
  vsAlternative: string;
  /** 品牌口号/tagline */
  tagline: string;
  /** 行业/领域标识 */
  industry: string;
  /** 价格定位区间描述 */
  priceRange: string;
}

/** 品牌一句话输出结构 */
export interface BrandOneLiner {
  /** 完整一句话定义 */
  definition: string;
  /** 缩略版（适合标题） */
  short: string;
  /** 对比版（带 vs 替代方案） */
  comparison: string;
}

/** 对比矩阵条目 */
export interface ComparisonEntry {
  dimension: string;
  ourPosition: string;
  alternativePosition: string;
  winner: 'us' | 'alternative' | 'tie';
}

// --- 工厂函数 ---

/**
 * 创建品牌认知核心实例
 * 纯函数：输入原始配置 → 输出标准化的 BrandKnowledgeCore
 */
export function createBrandCore(config: Omit<BrandKnowledgeCore, ''>): BrandKnowledgeCore {
  return { ...config };
}

/**
 * 生成品牌一句话定义
 * 格式：[品牌名] 是一种用于 [场景] 的 [类别]
 */
export function renderBrandDefinition(core: BrandKnowledgeCore): string {
  const scenarios = core.coreScenarios.slice(0, 3).join('、');
  return `${core.brandName} 是面向${scenarios}场景的${core.productCategory}品牌，${core.coreValue}。`;
}

/**
 * 生成品牌一句话（完整版）
 */
export function renderBrandOneLiner(core: BrandKnowledgeCore): BrandOneLiner {
  return {
    definition: renderBrandDefinition(core),
    short: `${core.brandName} — ${core.tagline}`,
    comparison: `相比${core.vsAlternative}`,
  };
}

/**
 * 生成品牌对比声明
 */
export function renderBrandComparison(core: BrandKnowledgeCore): string {
  return `不同于${core.vsAlternative}，${core.brandName}的定位是${core.positioning}。`;
}

/**
 * 生成"适合谁"描述
 */
export function renderTargetAudience(core: BrandKnowledgeCore): string {
  return `${core.brandName} 适合${core.targetAudience}，如果你${core.coreScenarios.slice(0, 2).join('、')}，它是一个${core.priceRange}的选择。`;
}

/**
 * 生成品牌结构化元数据（用于 Schema.org / JSON-LD）
 */
export function renderBrandSchema(core: BrandKnowledgeCore): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: core.brandName,
    description: renderBrandDefinition(core),
    slogan: core.tagline,
    audience: {
      '@type': 'Audience',
      audienceType: core.targetAudience,
    },
  };
}

/**
 * 生成品牌 FAQ 问答对（AI 可直接提取）
 */
export function renderBrandFAQ(core: BrandKnowledgeCore): Array<{ question: string; answer: string }> {
  return [
    {
      question: `${core.brandName} 是什么样的品牌？`,
      answer: renderBrandDefinition(core),
    },
    {
      question: `${core.brandName} 适合哪些人使用？`,
      answer: renderTargetAudience(core),
    },
    {
      question: `${core.brandName} 和替代方案有什么区别？`,
      answer: renderBrandComparison(core),
    },
    {
      question: `为什么选择 ${core.brandName} 而不是其他方案？`,
      answer: `${core.brandName} 的核心优势是：${core.coreValue}。${core.positioning}`,
    },
  ];
}

/**
 * 验证品牌配置完整性
 * 返回缺失字段列表，空数组表示完整
 */
export function validateBrandConfig(config: Partial<BrandKnowledgeCore>): string[] {
  const required: Array<keyof BrandKnowledgeCore> = [
    'brandName', 'productCategory', 'targetAudience',
    'coreScenarios', 'coreValue', 'positioning', 'vsAlternative',
    'tagline', 'industry', 'priceRange',
  ];
  return required.filter((key) => !config[key]);
}
