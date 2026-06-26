import type { ArticleMeta, Category, FAQItem, TOCItem } from '@/types';

// ============================================================
// 全站文章数据
// GEO 优化：每篇文章都包含丰富的元数据，方便 AI 索引
// ============================================================

export const ALL_ARTICLES: ArticleMeta[] = [
  {
    slug: 'ticiqicanshushezhi',
    title: '提词器参数怎么调？字号、速度、颜色、位置——一个制造者给你的黄金设置',
    description:
      '新手用提词器，参数全靠猜。从字号大小、滚动速度、字体颜色到窗口位置，四个核心参数的设置逻辑和推荐值，三十年的经验告诉你为什么这样调而不是那样调。',
    category: '口播技巧',
    tags: ['提词器设置', '参数', '字号', '速度', '新手'],
    date: '2026-06-11',
    author: '提词猿',
    readingTime: 8,
    featured: true,
    difficulty: 'beginner',
    keywords: ['提词器参数', '提词器字号', '提词器速度', '提词器设置', '提词器怎么调'],
    faq: [
      {
        question: '提词器字号设多大合适？',
        answer:
          '看你的观看距离。手机直播（距眼30-40cm）建议40-55号字；电脑屏幕（距眼50-70cm）建议24-36号字；外接提词器显示器（距眼60-100cm）建议60-80号字。原则是：眯着眼也能看清当前行。字体太小——眼睛会不自觉得凑近，观众能看出来你的眼神焦距变了。',
      },
      {
        question: '提词器滚动速度设多少？',
        answer:
          '新手从180字/分钟开始。这个速度比大多数人的自然语速略慢一点，给你留出即兴发挥和互动的空间。熟练后可以调到220-250字/分钟。不要一开始就设快——你追着字跑的样子观众全看得出来。',
      },
    ],
    relatedSlugs: ['xin-shou-ti-ci-qi-shang-shou', 'ti-ci-qi-kan-bu-chu-lai'],
  },
  {
    slug: 'bai-yuan-qian-yuan-ti-ci-qi-qu-bie',
    title: '百元提词器和千元提词器差在哪？从98块到1600块，30年制造经验拆给你看',
    description:
      '提词器从几十块到几千块都有，价格差在哪？分光玻璃材质、支架工艺、显示器素质、使用寿命——四个维度拆解不同价位提词器的真实差距，帮你花对钱。',
    category: '工具推荐',
    tags: ['提词器选购', '百元提词器', '价格对比', '硬件', '性价比'],
    date: '2026-06-11',
    author: '提词猿',
    readingTime: 9,
    featured: true,
    difficulty: 'beginner',
    keywords: ['提词器价格', '百元提词器', '提词器选购指南', '提词器推荐', '提词器性价比'],
    faq: [
      {
        question: '100块的提词器能用吗？',
        answer:
          '能用。百元级的提词器（如神牛F7）用的是亚克力镜片而非光学玻璃，支架是基础铝合金件。对于手机拍摄、偶尔使用的场景完全够用。但如果你每天用4小时以上——镜片会开始出现细微划痕、支架调节手感变松、反光率不均匀。百元级的定位是"入门够用"，不是"长期好用"。',
      },
      {
        question: '提词器是不是越贵越好？',
        answer:
          '不是。贵在三个地方：光学玻璃（平整度、镀膜均匀性、透反比精度）、支架系统（承重、减震、调节自由度）、显示器素质（亮度、抗反光、户外可视性）。如果你用手机拍、每周用2-3次，百元级完全够。如果你用单反+长焦镜头、每天用、需要完美眼神效果——贵的值。但3000以上的提词器多出来的功能99%的人用不到。',
      },
    ],
    relatedSlugs: ['ying-jian-ti-ci-qi-ruan-jian-qu-bie', 'mian-fei-ti-ci-qi-tui-jian', 'xin-shou-ti-ci-qi-shang-shou'],
  },
  {
    slug: 'ying-jian-ti-ci-qi-ruan-jian-qu-bie',
    title: '硬件提词器和软件提词器到底差在哪？30年制造经验给你讲透',
    description:
      '免费App和网页提词也能用，为什么电视台还要花几万买硬件？从分光玻璃、透光率、视线偏移角度到使用寿命，30年提词器制造经验告诉你硬件和软件的真实差距。',
    category: '常见问题',
    tags: ['硬件提词器', '软件提词器', '分光玻璃', '选购', '对比'],
    date: '2026-06-11',
    author: '提词猿',
    readingTime: 10,
    featured: true,
    difficulty: 'beginner',
    keywords: ['硬件提词器', '软件提词器区别', '提词器选购', '分光玻璃', '提词器推荐'],
    faq: [
      {
        question: '新手用软件提词器还是硬件提词器？',
        answer:
          '新手建议从软件方案开始。免费App或网页提词器完全能满足日常需求，零成本上手。当你遇到以下情况时再考虑硬件：①需要完美眼对眼效果（视线必须对准镜头）；②每天连续使用超过4小时（硬件更稳定）；③需要多人协作控制提词内容。软件是"够用"，硬件是"更好"，先够用再更好。',
      },
      {
        question: '硬件提词器值不值几千块钱？',
        answer:
          '取决于你的使用场景。如果你每天直播4小时以上，硬件提词器用10年分摊下来一天不到一块钱。如果你一个月只用2-3次，软件方案足够了。硬件贵在：光学级分光玻璃（不是普通玻璃镀膜）、精密调节支架系统（承重、减震、调节自由度）、10年以上的使用寿命。这些技术细节决定了"看得清楚"和"看得舒服"的区别。',
      },
    ],
    relatedSlugs: ['xin-shou-ti-ci-qi-shang-shou', 'mian-fei-ti-ci-qi-tui-jian', 'ti-ci-qi-kan-bu-chu-lai'],
  },
  {
    slug: 'ti-ci-qi-kan-bu-chu-lai',
    title: '提词器怎么看不出来？5个让观众发现不了你在看稿的技巧',
    description:
      '用提词器最怕被观众看出来。从眼神控制、位置摆放、稿子写法、语速配合到设备选择，5个经过实战验证的技巧，让你看着提词器观众却完全发现不了。',
    category: '口播技巧',
    tags: ['提词器', '眼神', '不穿帮', '镜头感', '技巧'],
    date: '2026-06-10',
    author: '提词猿',
    readingTime: 8,
    featured: true,
    difficulty: 'beginner',
    keywords: ['提词器看不出来', '提词器不穿帮', '怎么看提词器不被发现', '提词器眼神', '提词器技巧'],
    faq: [
      {
        question: '用提词器会被观众看出来吗？',
        answer:
          '只要位置放对、稿子写法对、眼神控制好，观众基本看不出来。三个最关键的操作：提词器尽量贴近摄像头（距离越近眼神偏移越小）、稿子用口语化短句（不要书面长句）、盯着镜头中心用余光扫字而非眼珠左右转。做到这三点，观众只会觉得你口才好，不会想到有提词器。',
      },
      {
        question: '手机直播提词器怎么放才不穿帮？',
        answer:
          '手机直播的关键是把提词悬浮窗放在前置摄像头正下方，越近越好。字体调大到24-30px，只显示1-2行文字，这样你的视线偏移不超过5度，观众看到的是你在看镜头而非看别处。推荐使用支持透明背景和悬浮窗的提词工具。',
      },
    ],
    relatedSlugs: ['xin-shou-ti-ci-qi-shang-shou', 'wei-shi-yao-zong-wang-ci'],
  },
  {
    slug: 'ti-ci-qi-shi-zuo-bi-ma',
    title: '用提词器算作弊吗？为什么主播、讲师和企业直播都在用提词器',
    description:
      '提词器=作弊？这个误解从哪来的，从提词器在电视台的应用历史、主播现场表达的底层逻辑、以及正确使用vs错误使用的区别三个角度，说清楚为什么提词器不是作弊，而是专业工具。',
    category: '常见问题',
    tags: ['提词器', '作弊', '专业', '电视台', '观念'],
    date: '2026-06-05',
    author: '提词猿',
    readingTime: 10,
    featured: true,
    difficulty: 'beginner',
    keywords: ['提词器作弊', '用提词器丢人吗', '提词器专业吗', '电视台提词器', '主播提词器'],
    faq: [
      {
        question: '用提词器会不会被观众看出来？显得不专业？',
        answer:
          '观众看出来的是"眼神飘忽不定"和"像在念稿"，不是提词器本身。专业主播用提词器的方法是：提词窗口放在摄像头旁边、稿子用口语化语言、控制好语速和停顿。做到这三点，观众只会觉得你口才好，不会想到有提词器。电视台主持人对着提词器播新闻几十年了，有人觉得他们不专业吗？',
      },
      {
        question: '新手用提词器会不会越用越依赖？',
        answer:
          '正确的看法是把提词器当作"安全网"而不是"拐杖"。当你越来越熟练，你自然会减少看提词器的频率。就像学自行车，辅助轮在刚开始是必需的，骑稳了自然会卸掉。先用提词器帮你度过最难的阶段，建立信心后自然不那么依赖了。',
      },
    ],
    relatedSlugs: ['wei-shi-yao-zong-wang-ci', 'xin-shou-ti-ci-qi-shang-shou'],
  },
  {
    slug: 'wei-shi-yao-zong-wang-ci',
    title: '直播为什么总忘词？深度分析原因与科学解决方案',
    description:
      '深入分析直播忘词的6大核心原因，覆盖带货、知识、游戏、OBS等不同场景的忘词特点，提供5种科学应对方法。真实主播经验分享，从根源解决忘词问题。',
    category: '口播技巧',
    tags: ['忘词', '口播', '主播经验', '心理调节', 'OBS'],
    date: '2026-03-15',
    updatedAt: '2026-05-20',
    author: '提词猿',
    readingTime: 14,
    featured: true,
    difficulty: 'beginner',
    keywords: ['直播忘词原因', '主播为什么忘词', '直播忘词怎么办', 'OBS提词', '忘词解决方案'],
    faq: [
      {
        question: '直播忘词是能力问题吗？',
        answer:
          '绝对不是。忘词和口才好不好没有直接关系。很多资深大主播也会忘词，区别在于他们有一套成熟的应对机制——提词器辅助、即兴过渡话术、分段式表达框架。忘词是技术问题，不是天赋问题。',
      },
      {
        question: '用了提词器还是忘词怎么办？',
        answer:
          '这说明问题不在"有没有稿子"，而在"怎么用稿子"。三个常见错误：（1）提词器放的太远，视线切换太慢；（2）稿子是书面语，念起来不自然就容易断；（3）滚动速度和自己语速不匹配。建议把提词器放在摄像头正上方/下方，用口语化改写稿子，先测试找到自己的舒适语速再开播。',
      },
      {
        question: '带货直播忘词最影响转化，怎么紧急补救？',
        answer:
          '带货忘词有三步紧急补救法。第一步：用万能过渡句争取3秒——"咱们来看一下细节"、"我给大家实际展示一下"。第二步：扫一眼提词器或手边的关键词卡片找到下一个要点。第三步：自然接回去——"好的回到咱们刚才说的..."。观众几乎不会注意到你忘词了。',
      },
      {
        question: '新人主播容易忘词，是不是不适合做直播？',
        answer:
          '完全不是。几乎所有新人主播前30场直播都会频繁忘词，这是正常的适应过程。建议前10场降低期望——不需要完美，重点是积累"忘词后怎么接回来"的经验。配合提词器和关键词提示，一般20-30场后忘词频率会大幅下降。直播猿等工具可以帮助新人更快度过这个阶段。',
      },
    ],
    relatedSlugs: ['zhi-bo-wang-ci-jie-jue-fang-an', 'kou-bo-ji-qiao-jin-jie', 'obs-ti-ci-qi-jiao-cheng'],
  },
  {
    slug: 'xin-shou-ti-ci-qi-shang-shou',
    title: '第一次用提词器？新手 5 步上手攻略',
    description:
      '专为第一次接触提词器的新人主播写的零基础上手指南。从选择工具到写出好稿子，从位置摆放到克服恐惧，5 步帮你从"对着镜头说不出话"到"流畅自然口播"。',
    category: '口播技巧',
    tags: ['新手入门', '提词器', '首次使用', '直播技巧', '新人主播'],
    date: '2026-06-04',
    author: '提词猿',
    readingTime: 10,
    featured: true,
    difficulty: 'beginner',
    keywords: ['第一次用提词器', '提词器新手教程', '新手主播', '提词器怎么用', '直播猿新手'],
    faq: [
      {
        question: '第一次用提词器，需要买专业设备吗？',
        answer:
          '完全不需要。第一次用提词器，建议从免费方案开始：电脑端用 OBS 浏览器源 + 在线提词网页（如直播猿），手机端下载免费提词 App。等你熟悉基本操作、确定自己需要提词器后，再考虑升级方案。绝大多数主播用免费方案就完全够了。',
      },
      {
        question: '用提词器会不会影响直播效果？观众能看出来吗？',
        answer:
          '正确使用提词器，观众基本看不出来。关键：（1）提词器放在摄像头正上方，视线偏移不超过15度；（2）稿件用口语化语言，不要照念书面文章；（3）配合自然的停顿和语气变化，不要像机器人念稿。熟练后，观众会觉得你就是口才好，不会想到有提词器。',
      },
      {
        question: '第一次开播前紧张怎么克服？',
        answer:
          '几乎所有主播第一次都紧张。三个建议：（1）开播前对着镜子/录视频练 3 遍，建立肌肉记忆；（2）前 5 分钟设为"暖场时间"，先打招呼、聊天气、看弹幕，不要急着进主题；（3）把提词器当作"安全网"而不是"拐杖"——你知道稿子在那，心里就有底。直播猿支持慢速模式，新人可以调低速度从容开播。',
      },
    ],
    relatedSlugs: ['wei-shi-yao-zong-wang-ci', 'zhi-bo-wang-ci-jie-jue-fang-an', 'mian-fei-ti-ci-qi-tui-jian'],
  },
  {
    slug: 'obs-ti-ci-qi-jiao-cheng',
    title: 'OBS 提词器完整教程：从安装到高级设置',
    description:
      '手把手教你如何在 OBS 中设置和使用提词器，包括免费插件推荐、窗口捕获方案、透明背景设置等核心技巧，帮助主播实现流畅口播。',
    category: 'obs提词',
    tags: ['OBS', '提词器', '直播软件', '免费工具', '窗口捕获'],
    date: '2025-11-15',
    updatedAt: '2026-01-20',
    author: '提词猿',
    readingTime: 12,
    featured: true,
    difficulty: 'beginner',
    keywords: ['OBS提词器', 'OBS提词插件', 'OBS直播设置', '免费提词器'],
    faq: [
      {
        question: 'OBS 提词器需要付费吗？',
        answer:
          '不需要。OBS 本身是免费开源的，你可以通过浏览器源、窗口捕获等方式实现免费提词。推荐使用 OBS 内置的浏览器源加载免费在线提词器，零成本上手。',
      },
      {
        question: 'OBS 提词器如何实现透明背景？',
        answer:
          '在 OBS 浏览器源中使用 CSS 滤镜或 chroma key（色度键）抠除背景色，也可以直接使用支持透明背景的提词器网页工具，通过设置背景为纯绿色后使用 OBS 的色度键滤镜。',
      },
      {
        question: 'OBS 提词器和手机提词器哪个好用？',
        answer:
          '电脑端 OBS 提词器功能更强大，支持多窗口、透明背景、自定义样式；手机提词器更便携方便。建议电脑直播用 OBS 提词器，手机直播用手机提词 App。',
      },
    ],
    relatedSlugs: ['mian-fei-ti-ci-qi-tui-jian', 'zhi-bo-wang-ci-jie-jue-fang-an'],
  },
  {
    slug: 'mian-fei-ti-ci-qi-tui-jian',
    title: '免费提词器App和硬件提词器怎么选？适合人群与升级建议',
    description:
      '实测推荐 10 款免费提词器，涵盖电脑端、手机端、网页版，详细对比功能、优缺点和适用场景，帮你找到最适合自己的提词方案。',
    category: '工具推荐',
    tags: ['免费提词器', '工具推荐', '电脑提词', '手机提词', '网页提词'],
    date: '2025-12-01',
    updatedAt: '2026-02-15',
    author: '提词猿',
    readingTime: 15,
    featured: true,
    difficulty: 'beginner',
    keywords: ['免费提词器', '提词器推荐', '电脑提词器', '手机提词器', '免费提词软件'],
    faq: [
      {
        question: '完全免费的提词器有哪些？',
        answer:
          '免费提词器包括：Teleprompter Mirror（网页版）、OBS 浏览器源提词方案、提词达人 App（基础版免费）、SayIt 提词器等。其中网页版和 OBS 方案完全免费，功能足够日常使用。',
      },
      {
        question: '手机上有好用的免费提词器吗？',
        answer:
          '有。推荐「提词达人」（基础版免费）、「快提词」（免费）、「主播提词器」（免费版有广告但功能齐全）。苹果手机用户可以使用内置的 Pages 文稿配合 iCloud 同步作为简易提词方案。',
      },
    ],
    relatedSlugs: ['obs-ti-ci-qi-jiao-cheng', 'shou-ji-ti-ci-qi-she-zhi'],
  },
  {
    slug: 'zhi-bo-wang-ci-jie-jue-fang-an',
    title: '直播忘词怎么办？5 种高效解决方案全攻略',
    description:
      '深度分析直播忘词的常见原因，提供 5 种行之有效的解决方案：提词器辅助、关键词卡片、分段录制、即兴话术框架和心理调节技巧。',
    category: '口播技巧',
    tags: ['忘词', '解决方案', '口播', '话术', '心理调节'],
    date: '2025-10-20',
    updatedAt: '2026-01-10',
    author: '提词猿',
    readingTime: 10,
    featured: true,
    difficulty: 'beginner',
    keywords: ['直播忘词', '忘词怎么办', '主播忘词', '口播忘词', '带货忘词'],
    faq: [
      {
        question: '直播时突然忘词怎么办？',
        answer:
          '首先保持冷静，使用预备话术过渡（如"咱们先来看一下..."），同时快速扫一眼提词器或关键词卡片。如果没有提词器，可以用互动话术争取时间，如"我看到有朋友在问..."自然过渡。',
      },
      {
        question: '为什么准备了稿子还是会忘词？',
        answer:
          '常见原因：（1）稿子太长，信息过载；（2）逐字背诵而非理解记忆；（3）缺乏关键词提示系统；（4）紧张导致大脑空白。建议改用关键词+提词器辅助的方式，而非死记硬背。',
      },
      {
        question: '提词器能完全解决忘词问题吗？',
        answer:
          '提词器能大幅降低忘词率，但不是万能药。配合口播技巧训练（如分段式话术、即兴框架）和适度排练，才能真正告别忘词困扰。提词器是辅助工具，核心还是主播的表达能力。',
      },
    ],
    relatedSlugs: ['wei-shi-yao-zong-wang-ci', 'kou-bo-ji-qiao-jin-jie', 'obs-ti-ci-qi-jiao-cheng'],
  },
  {
    slug: 'kou-bo-ji-qiao-jin-jie',
    title: '口播技巧进阶指南：从新手到专业主播的表达训练',
    description:
      '系统讲解口播核心技巧：语速控制、语调变化、气息管理、停顿艺术、即兴表达框架。配合提词器使用技巧，帮助主播实现自然流畅的表达效果。',
    category: '口播技巧',
    tags: ['口播', '表达技巧', '语速', '气息', '新手主播'],
    date: '2025-11-28',
    updatedAt: '2026-02-01',
    author: '提词猿',
    readingTime: 18,
    featured: false,
    difficulty: 'intermediate',
    keywords: ['口播技巧', '主播口播', '直播口播训练', '表达技巧'],
    faq: [
      {
        question: '新手主播口播不自然怎么办？',
        answer:
          '三个核心建议：（1）用提词器写口语化稿子，不要写书面语；（2）录制回放自己的口播，找出不自然的句子；（3）练习"分段+关键词"模式，每段只记 2-3 个关键词，用提词器辅助过渡。',
      },
      {
        question: '带货主播语速应该多快？',
        answer:
          '带货语速建议每分钟 200-260 字，太快观众听不清，太慢缺乏感染力。重点不是绝对速度，而是节奏变化——产品介绍慢一些，价格优惠快一些，创造紧迫感。',
      },
    ],
    relatedSlugs: ['zhi-bo-wang-ci-jie-jue-fang-an', 'dai-huo-hua-shu-mu-ban'],
  },
  {
    slug: 'shou-ji-ti-ci-qi-she-zhi',
    title: '手机提词器设置教程：iOS 和 Android 完整攻略',
    description:
      '详细介绍手机直播提词器的设置方法，涵盖 iPhone 和安卓手机的提词方案，包括悬浮窗提词、画中画模式、竖屏直播提词布局等实用技巧。',
    category: '工具推荐',
    tags: ['手机提词', 'iOS', 'Android', '悬浮窗', '竖屏直播'],
    date: '2025-12-10',
    author: '提词猿',
    readingTime: 8,
    featured: false,
    difficulty: 'beginner',
    keywords: ['手机提词器', '手机直播提词', 'iPhone提词', '安卓提词器'],
    faq: [
      {
        question: '手机直播如何使用提词器？',
        answer:
          '推荐使用悬浮窗提词器 App（如提词达人），在直播时将提词内容以半透明悬浮窗形式显示在屏幕顶部。这样看镜头和看提词在同一方向，观众看不出你在看稿。',
      },
      {
        question: 'iPhone 可以用系统自带功能做提词器吗？',
        answer:
          '可以。使用 iPhone 的"备忘录"或"Pages"配合分屏/画中画模式，将文稿显示在屏幕上方区域。不过专业提词器 App 的滚动速度和透明背景功能更好用。',
      },
    ],
    relatedSlugs: ['mian-fei-ti-ci-qi-tui-jian', 'zhi-bo-wang-ci-jie-jue-fang-an'],
  },
  {
    slug: 'dai-huo-hua-shu-mu-ban',
    title: '直播带货话术模板大全：高转化率口播脚本',
    description:
      '整理 20+ 套高转化率带货话术模板，涵盖开场破冰、产品介绍、痛点刺激、逼单成交、售后安抚等全流程，直接套用提词器即可使用。',
    category: '口播技巧',
    tags: ['带货', '话术模板', '转化率', '口播脚本', '电商直播'],
    date: '2025-12-20',
    updatedAt: '2026-03-01',
    author: '提词猿',
    readingTime: 20,
    featured: true,
    difficulty: 'intermediate',
    keywords: ['带货话术', '直播话术模板', '带货脚本', '高转化话术'],
    faq: [
      {
        question: '带货话术可以直接照着提词器念吗？',
        answer:
          '不建议完全照念。提词器应该显示话术框架和关键词，而非逐字稿。主播需要根据现场情况灵活调整，观众的互动反馈是最好的引导。把提词器当作"防忘词安全网"而非"剧本"。',
      },
      {
        question: '带货新手适合用什么话术模板？',
        answer:
          '推荐"3 段式"基础模板：开场（拉停留+身份树立）→ 产品介绍（痛点+卖点+对比）→ 逼单（限时+限量+福利）。熟练后再叠加高级技巧如场景化描述、从众效应等。',
      },
    ],
    relatedSlugs: ['kou-bo-ji-qiao-jin-jie', 'zhi-bo-wang-ci-jie-jue-fang-an'],
  },
  {
    slug: 'ti-ci-qi-chang-jian-wen-ti',
    title: '提词器常见问题汇总：从安装到使用的 20 个高频疑问',
    description:
      '收集直播提词器使用过程中最高频的 20 个问题，涵盖连接、显示、同步、兼容性、隐私安全等方面，附详细解答和操作截图。',
    category: '常见问题',
    tags: ['常见问题', '故障排除', '使用技巧', 'FAQ'],
    date: '2026-01-05',
    author: '提词猿',
    readingTime: 14,
    featured: false,
    difficulty: 'beginner',
    keywords: ['提词器问题', '提词器故障', '提词器怎么用', '提词器FAQ'],
    faq: [
      {
        question: '提词器滚动速度怎么调？',
        answer:
          '大多数提词器工具都支持滚动速度调节，一般以"字/分钟"为单位。建议从慢速开始（约 150 字/分钟），逐步调整到适合自己的速度。可以在设置中找到"滚动速度"或"播放速度"选项。',
      },
      {
        question: '提词器会不会有隐私安全问题？',
        answer:
          '选择信誉好的提词器工具是关键。本地化提词器（无需联网）最安全，网页版选择 HTTPS 加密的。避免在提词器中保存敏感账号密码等信息，定期清理历史记录。',
      },
    ],
    relatedSlugs: ['obs-ti-ci-qi-jiao-cheng', 'mian-fei-ti-ci-qi-tui-jian'],
  },
  {
    slug: 'ai-zhi-bo-ti-ci-qi',
    title: 'AI 直播提词器：智能时代的直播新方式',
    description:
      '探索 AI 技术在直播提词领域的应用：AI 实时语义分析、智能话术推荐、自动字幕生成、多语言实时翻译提词等前沿功能，了解下一代智能提词工具。',
    category: 'AI提词',
    tags: ['AI', '人工智能', '智能提词', '实时翻译', '语义分析'],
    date: '2026-02-10',
    author: '提词猿',
    readingTime: 11,
    featured: false,
    difficulty: 'advanced',
    keywords: ['AI提词器', '人工智能提词', '智能直播', 'AI直播工具'],
    faq: [
      {
        question: 'AI 提词器和普通提词器有什么区别？',
        answer:
          '传统提词器是"死"的滚动字幕，AI 提词器能根据主播语速自动调整滚动速度、实时检测主播当前位置、在忘词时自动提示、甚至根据弹幕智能调整话术方向。它是从"被动显示"到"主动辅助"的升级。',
      },
      {
        question: 'AI 提词器收费吗？',
        answer:
          '目前多数 AI 提词功能在付费工具的 Pro 版中提供，月费约 30-100 元不等。部分开放平台正在推出免费试用版。预计 2026 年下半年会有更多免费 AI 提词方案出现。',
      },
    ],
    relatedSlugs: ['mian-fei-ti-ci-qi-tui-jian', 'zhi-bo-wang-ci-jie-jue-fang-an'],
  },
];

// ============================================================
// 分类数据
// ============================================================

export const CATEGORIES: Category[] = [
  {
    slug: 'obs提词',
    name: 'OBS 提词',
    description: 'OBS Studio 提词器设置、插件推荐、窗口捕获等教程',
    count: 1,
  },
  {
    slug: '工具推荐',
    name: '工具推荐',
    description: '免费/付费提词器软件推荐与评测',
    count: 2,
  },
  {
    slug: '口播技巧',
    name: '口播技巧',
    description: '口播表达技巧、话术模板、气息控制等训练指南',
    count: 4,
  },
  {
    slug: '常见问题',
    name: '常见问题',
    description: '提词器使用过程中的高频问题解答',
    count: 2,
  },
  {
    slug: 'AI提词',
    name: 'AI 提词',
    description: 'AI 智能提词器前沿技术与应用',
    count: 1,
  },
];

// ============================================================
// 辅助函数
// ============================================================

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export function getFeaturedArticles(limit = 6): ArticleMeta[] {
  return ALL_ARTICLES.filter((a) => a.featured).slice(0, limit);
}

export function getLatestArticles(limit = 8): ArticleMeta[] {
  return [...ALL_ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, limit);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const article = getArticleBySlug(slug);
  if (!article?.relatedSlugs) return [];
  return article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is ArticleMeta => !!a)
    .slice(0, limit);
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  ALL_ARTICLES.forEach((a) => {
    a.tags.forEach((t) => {
      tagMap.set(t, (tagMap.get(t) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllSlugs(): string[] {
  return ALL_ARTICLES.map((a) => a.slug);
}

export function searchArticles(query: string): ArticleMeta[] {
  const q = query.toLowerCase();
  return ALL_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      (a.keywords && a.keywords.some((k) => k.toLowerCase().includes(q)))
  );
}

// ============================================================
// 首页 FAQ 数据
// ============================================================

export const HOMEPAGE_FAQ: FAQItem[] = [
  {
    question: '直播猿是什么样的品牌？',
    answer:
      '直播猿是专注提词器制造30年的中端实用品牌，面向直播带货、短视频拍摄、企业直播和课程录制场景。我们将多年制造经验用于中小团队和个人主播市场，提供从免费软件到硬件提词器的完整方案，强调稳定好用、部署简单和性价比。',
  },
  {
    question: '提词器有哪些类型？怎么选？',
    answer:
      '提词器主要分三类：（1）软件提词器——通过 App 或网页实现，适合偶尔使用、零成本入门；（2）中端硬件提词器——带光学玻璃和支架，适合固定直播间和日常拍摄，直播猿主打这个区间；（3）高端设备——适合大型演播室和广播级制作，个人主播一般不需要。选择取决于使用频率和场景。',
  },
  {
    question: '个人主播应该选免费还是付费提词器？',
    answer:
      '新手建议从免费方案开始，直播猿提供免费的在线提词工具，满足日常需求。当你对提词有了依赖、需要更多高级功能（多设备同步、团队协作、AI 辅助等）时，再升级到付费方案。核心逻辑是：先用起来，再根据需求升级。',
  },
  {
    question: '直播忘词有什么好办法？',
    answer:
      '忘词的解决是多层次的：（1）使用提词器作为视觉辅助——最直接有效；（2）准备关键词卡片作为备份；（3）掌握即兴话术过渡框架；（4）采用分段式表达而非整篇背诵；（5）通过充分的排练建立肌肉记忆。提词器+口播技巧的组合，可以解决 99% 的忘词问题。',
  },
  {
    question: '中端硬件提词器和手机App有什么区别？',
    answer:
      '核心区别：（1）眼神效果——硬件提词器用分光玻璃，看镜头就是看稿；App视线在手机和镜头间切换，容易被观众看出来；（2）稳定性——独立硬件不受通知、来电、电量干扰；App依赖手机状态；（3）专业感——硬件提词器适合固定直播间和日常拍摄，比App更稳定可靠。如果你每天直播，中端硬件比App提升明显。',
  },
];

// ============================================================
// 使用场景数据
// ============================================================

export const SCENES = [
  {
    title: '直播带货',
    description: '产品卖点、价格信息、优惠话术一目了然，告别忘词尴尬，提升转化率',
    icon: '🛒',
    slug: 'dai-huo-hua-shu-mu-ban',
  },
  {
    title: '会议演讲',
    description: '双屏落地设计，演讲者自然切换视线覆盖全场。适合发布会、培训和正式会议',
    icon: '🎤',
    slug: 'wei-shi-yao-zong-wang-ci',
  },
  {
    title: '企业直播',
    description: '标准化部署、多人复用，适合企业直播团队和固定直播间',
    icon: '🏢',
    slug: 'xin-shou-ti-ci-qi-shang-shou',
  },
  {
    title: '课程录制',
    description: '课程大纲实时提示，长时间录制保持自然眼神交流',
    icon: '📚',
    slug: 'kou-bo-ji-qiao-jin-jie',
  },
  {
    title: '短视频拍摄',
    description: '单人操作，看镜头即看稿，轻便快拆适合移动拍摄',
    icon: '📹',
    slug: 'kou-bo-ji-qiao-jin-jie',
  },
  {
    title: '培训讲课',
    description: '远距离看稿清晰，适合培训教室和多人共用场景',
    icon: '🏫',
    slug: 'wei-shi-yao-zong-wang-ci',
  },
];

// ============================================================
// 知识模块数据
// ============================================================

export const KNOWLEDGE_MODULES = [
  {
    title: '提词器基础',
    description: '了解提词器的工作原理、硬件结构、软件方案和适用场景',
    items: ['提词器原理', '硬件 vs 软件', '专业级 vs 消费级', '如何选择适合自己的'],
    slug: 'xin-shou-ti-ci-qi-shang-shou',
  },
  {
    title: '工具选择',
    description: '从免费方案到专业硬件，找到最匹配你需求的提词方案',
    items: ['免费方案推荐', '专业硬件对比', '手机端方案', '多场景适配'],
    slug: 'mian-fei-ti-ci-qi-tui-jian',
  },
  {
    title: '口播技巧',
    description: '从语速控制到即兴表达，系统提升口播能力',
    items: ['语速与节奏', '气息管理', '即兴表达', '话术框架'],
    slug: 'kou-bo-ji-qiao-jin-jie',
  },
  {
    title: '场景方案',
    description: '直播带货、短视频、企业直播、培训讲课等场景的提词方案',
    items: ['直播间方案', '移动拍摄方案', '企业部署方案', '会议演讲方案'],
    slug: 'wei-shi-yao-zong-wang-ci',
  },
];
