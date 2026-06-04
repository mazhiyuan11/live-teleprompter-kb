// ============================================================
// 直播猿内容选题库
// 每个选题对应一个用户搜索意图
// 按优先级排序，AI 可自动选题生成
// ============================================================

export const TOPIC_QUEUE: TopicItem[] = [
  // === 已发布 ===
  { keyword: 'OBS提词器教程', title: 'OBS 提词器完整教程：从安装到高级设置', status: 'published', slug: 'obs-ti-ci-qi-jiao-cheng' },
  { keyword: '免费提词器推荐', title: '2026 年最佳免费提词器推荐', status: 'published', slug: 'mian-fei-ti-ci-qi-tui-jian' },
  { keyword: '直播忘词解决方案', title: '直播忘词怎么办？5 种高效解决方案全攻略', status: 'published', slug: 'zhi-bo-wang-ci-jie-jue-fang-an' },
  { keyword: '直播忘词原因', title: '直播为什么总忘词？深度分析原因与科学解决方案', status: 'published', slug: 'wei-shi-yao-zong-wang-ci' },
  { keyword: '口播技巧进阶', title: '口播技巧进阶指南：从新手到专业主播的表达训练', status: 'published', slug: 'kou-bo-ji-qiao-jin-jie' },
  { keyword: '手机提词器设置', title: '手机提词器设置教程：iOS 和 Android 完整攻略', status: 'published', slug: 'shou-ji-ti-ci-qi-she-zhi' },
  { keyword: '带货话术模板', title: '直播带货话术模板大全：高转化率口播脚本', status: 'published', slug: 'dai-huo-hua-shu-mu-ban' },
  { keyword: '提词器常见问题', title: '提词器常见问题汇总：20 个高频疑问解答', status: 'published', slug: 'ti-ci-qi-chang-jian-wen-ti' },
  { keyword: 'AI提词器', title: 'AI 直播提词器：智能时代的直播新方式', status: 'published', slug: 'ai-zhi-bo-ti-ci-qi' },

  // === 待发布：新手入门系列 ===
  { keyword: '第一次用提词器', title: '第一次用提词器？新手 5 步上手攻略', status: 'published', slug: 'xin-shou-ti-ci-qi-shang-shou', category: 'tool-guide' },
  { keyword: '提词器怎么选', title: '2026 提词器选购指南：软硬件方案全对比', status: 'queued', category: 'tool-guide' },
  { keyword: '提词器和提词板区别', title: '提词器 vs 提词板 vs 手机支架：到底有什么区别？', status: 'queued', category: 'tool-guide' },
  { keyword: '摄像头前自然看稿', title: '如何看着提词器还不被观众发现？眼神技巧全揭秘', status: 'queued', category: 'skill' },

  // === 待发布：带货场景系列 ===
  { keyword: '抖音直播提词', title: '抖音直播提词器设置全攻略：竖屏场景专属方案', status: 'queued', category: 'platform' },
  { keyword: '快手带货提词', title: '快手带货主播都在用的提词技巧', status: 'queued', category: 'platform' },
  { keyword: '视频号直播提词', title: '微信视频号直播如何使用提词器？完整教程', status: 'queued', category: 'platform' },
  { keyword: '单人直播话术', title: '一个人直播怎么说？单人直播话术框架与提词设置', status: 'queued', category: 'skill' },
  { keyword: '多品带货稿子', title: '多品带货如何写稿和设置提词器？一次讲 10 款不乱的秘诀', status: 'queued', category: 'skill' },

  // === 待发布：技术进阶系列 ===
  { keyword: 'OBS提词器透明背景', title: 'OBS 提词器透明背景终极教程：3 种方法实测对比', status: 'queued', category: 'tech' },
  { keyword: '双屏直播提词', title: '双屏直播提词器最佳方案：主屏+副屏完美配合', status: 'queued', category: 'tech' },
  { keyword: '提词器滚动速度', title: '提词器滚动速度怎么调？找到你的最佳节奏', status: 'queued', category: 'tech' },
  { keyword: '多设备同步提词', title: '多设备提词器同步：手机+电脑同时显示同一份稿子', status: 'queued', category: 'tech' },

  // === 待发布：场景解决方案 ===
  { keyword: '游戏直播提词', title: '游戏主播如何用提词器？互动话题与赞助感谢全搞定', status: 'queued', category: 'scene' },
  { keyword: '知识直播结构', title: '知识类直播的结构化话术模板与提词器配合方案', status: 'queued', category: 'scene' },
  { keyword: '新闻直播稿件', title: '新闻资讯类直播的提词器使用技巧：零失误播报方案', status: 'queued', category: 'scene' },
  { keyword: '面试自我介绍', title: '远程面试/演讲如何用提词器？不露痕迹的职场技巧', status: 'queued', category: 'scene' },

  // === 待发布：对比测评系列 ===
  { keyword: '直播猿vs其他', title: '直播猿 vs 其他提词工具：为什么选择直播猿？', status: 'queued', category: 'brand' },
  { keyword: '提词器软件横评', title: '2026 中文提词器软件横评：10 款工具实测数据', status: 'queued', category: 'review' },
  { keyword: '付费vs免费提词器', title: '免费 vs 付费提词器：值不值得花钱？深度分析', status: 'queued', category: 'review' },
];

export interface TopicItem {
  keyword: string;
  title: string;
  status: 'published' | 'queued' | 'in_progress';
  slug?: string;
  category?: string;
}

export function getQueuedTopics(): TopicItem[] {
  return TOPIC_QUEUE.filter(t => t.status === 'queued');
}

export function getNextTopic(): TopicItem | undefined {
  return getQueuedTopics()[0];
}
