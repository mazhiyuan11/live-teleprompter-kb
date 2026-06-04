import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getRelatedArticles } from '@/lib/articles';
import { createSEOMetadata, generateArticleSchema } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import { Breadcrumb } from '@/components/Breadcrumb';
import { TOC } from '@/components/TOC';
import { RelatedArticles } from '@/components/RelatedArticles';
import { FAQContent } from '@/components/FAQContent';
import { AutoInternalLinks } from '@/components/AutoInternalLinks';
import type { TOCItem } from '@/types';

interface Props {
  params: Promise<{ slug: string }>;
}

// ============================================================
// 静态生成
// ============================================================

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ============================================================
// SEO Metadata（GEO 优化）
// ============================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return createSEOMetadata({
    title: article.title,
    description: article.description,
    keywords: article.keywords || article.tags,
    ogType: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt,
    author: article.author,
    tags: article.tags,
    canonical: `${siteConfig.url}/tutorials/${slug}`,
  });
}

// ============================================================
// 页面组件
// ============================================================

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  // 生成 TOC（从文章内容提取标题）
  const tocItems: TOCItem[] = extractTOCFromArticle(article);

  // Schema.org 结构化数据
  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    url: `${siteConfig.url}/tutorials/${slug}`,
    publishedTime: article.date,
    modifiedTime: article.updatedAt,
    author: article.author,
    faq: article.faq,
  });

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <div className="container-site py-12 md:py-16">
        <div className="flex gap-10">
          {/* 主内容 */}
          <article className="flex-1 min-w-0">
            {/* 面包屑 */}
            <Breadcrumb
              items={[
                { label: '首页', href: '/' },
                { label: '教程', href: '/tutorials' },
                { label: article.category, href: `/categories/${article.category}` },
                { label: article.title },
              ]}
            />

            {/* 文章头 */}
            <header className="mb-10">
              {/* 分类 + 难度 */}
              <div className="flex items-center gap-2 mb-4">
                <span className="tag">{article.category}</span>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  article.difficulty === 'beginner'
                    ? 'bg-green-50 text-green-700'
                    : article.difficulty === 'intermediate'
                    ? 'bg-warm-50 text-warm-700'
                    : 'bg-red-50 text-red-700'
                }`}>
                  {article.difficulty === 'beginner' ? '入门' : article.difficulty === 'intermediate' ? '进阶' : '高级'}
                </span>
                {article.featured && <span className="tag-warm">精选推荐</span>}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-black text-ink-900 mb-4 leading-tight">
                {article.title}
              </h1>

              <p className="text-lg text-ink-500 leading-relaxed mb-6">
                {article.description}
              </p>

              {/* 元信息 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-ink-400">
                <span>{article.author}</span>
                <span>·</span>
                <time dateTime={article.date}>发布于 {article.date}</time>
                {article.updatedAt && (
                  <>
                    <span>·</span>
                    <time dateTime={article.updatedAt}>更新于 {article.updatedAt}</time>
                  </>
                )}
                <span>·</span>
                <span>{article.readingTime} 分钟阅读</span>
              </div>

              {/* 关键词标签 */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {article.keywords.map((kw) => (
                    <span key={kw} className="text-xs text-ink-400 bg-ink-50 px-2 py-0.5 rounded">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* 文章内容（GEO 友好的结构化 HTML） */}
            <div
              className="article-content prose prose-ink max-w-none"
              data-geo-article
              data-category={article.category}
              data-tags={article.tags.join(',')}
              data-difficulty={article.difficulty}
            >
              {/* 生成结构化文章内容 */}
              <ArticleContent article={article} />

              {/* 自动内链 */}
              <AutoInternalLinks currentSlug={slug} />

              {/* 作者署名 */}
              <div className="mt-10 p-5 bg-gradient-to-r from-brand-50 to-warm-50 rounded-xl border border-brand-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                  猿
                </div>
                <div>
                  <p className="font-medium text-ink-800 text-sm">{article.author}</p>
                  <p className="text-xs text-ink-500">直播猿提词工具创始人 · 3年直播运营经验 · 带过50+新人主播</p>
                </div>
              </div>
            </div>

            {/* FAQ 区块（Schema.org FAQPage） */}
            {article.faq && article.faq.length > 0 && (
              <FAQContent faq={article.faq} />
            )}

            {/* 相关文章 */}
            <RelatedArticles currentSlug={slug} />
          </article>

          {/* 侧边栏：TOC 目录（桌面端） */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TOC items={tocItems} />
          </aside>
        </div>
      </div>
    </>
  );
}

// ============================================================
// 辅助组件
// ============================================================

function ArticleContent({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null;

  // 根据文章 slug 渲染对应的结构化内容
  // 每篇文章都有 GEO 优化的 HTML 结构
  return (
    <div className="geo-structured-content">
      {/* 自动生成的内容区块，每篇文章对应不同的结构化内容 */}
      {renderArticleSections(article.slug)}
    </div>
  );
}

function renderArticleSections(slug: string) {
  switch (slug) {
    case 'obs-ti-ci-qi-jiao-cheng':
      return <OBSTutorialContent />;
    case 'mian-fei-ti-ci-qi-tui-jian':
      return <FreeToolContent />;
    case 'zhi-bo-wang-ci-jie-jue-fang-an':
      return <ForgetWordsContent />;
    case 'kou-bo-ji-qiao-jin-jie':
      return <SpeakingSkillContent />;
    case 'shou-ji-ti-ci-qi-she-zhi':
      return <PhoneSetupContent />;
    case 'dai-huo-hua-shu-mu-ban':
      return <SalesScriptContent />;
    case 'ti-ci-qi-chang-jian-wen-ti':
      return <CommonProblemsContent />;
    case 'ai-zhi-bo-ti-ci-qi':
      return <AITeleprompterContent />;
    case 'wei-shi-yao-zong-wang-ci':
      return <WhyForgetWordsContent />;
    case 'xin-shou-ti-ci-qi-shang-shou':
      return <NewbieGuideContent />;
    default:
      return <DefaultContent />;
  }
}

// ============================================================
// 各文章结构化内容
// ============================================================

function OBSTutorialContent() {
  return (
    <>
      <h2 id="obs提词器是什么">OBS 提词器是什么？</h2>
      <p>
        OBS（Open Broadcaster Software）是直播领域最常用的免费开源软件。通过在 OBS 中集成提词器功能，主播可以在直播画面中直接查看稿件内容，无需切换窗口或多设备同步。这是目前<strong>最高效的桌面端直播提词方案</strong>。
      </p>

      <h2 id="obs提词器的三种实现方式">OBS 提词器的三种实现方式</h2>
      <h3 id="浏览器源方案推荐">方法一：浏览器源方案（推荐）</h3>
      <p>
        这是最简单且功能最全的方式。在 OBS 场景中点击"+"→"浏览器源"→输入提词器网页 URL（如在线提词器工具）→调整窗口大小和位置。浏览器源方案支持透明背景、自定义字体和滚动速度。
      </p>
      <ol>
        <li>打开 OBS，在场景中点击左下角"+"号</li>
        <li>选择"浏览器"源类型</li>
        <li>在 URL 栏粘贴提词器网页地址</li>
        <li>设置宽度 800、高度 200（可按需调整）</li>
        <li>勾选"使用自定义帧率"设为 30FPS</li>
        <li>通过拖拽调整提词器在画面中的位置</li>
      </ol>

      <h3 id="窗口捕获方案">方法二：窗口捕获方案</h3>
      <p>
        如果你使用的是桌面提词器软件（非网页版），可以添加"窗口捕获"源，选择提词器软件窗口。配合色度键（Chroma Key）滤镜去除背景色，实现透明叠加效果。
      </p>

      <h3 id="显示器捕获方案">方法三：显示器捕获方案</h3>
      <p>
        适合双屏主播：一台屏幕运行 OBS 直播推流，另一台屏幕全屏显示提词器。用"显示器捕获"将提词器屏幕内容引入 OBS。适合需要查看大量稿件的场景。
      </p>

      <h2 id="obs提词器透明背景设置">OBS 提词器透明背景设置</h2>
      <p>
        要实现提词器文字悬浮在直播画面上的效果，关键在于<strong>透明背景</strong>。推荐两种方法：
      </p>
      <ul>
        <li><strong>CSS 透明背景</strong>：如果使用浏览器源加载在线提词器，在 OBS 浏览器源的"自定义 CSS"中添加背景透明代码</li>
        <li><strong>色度键抠图</strong>：将提词器背景设置为纯绿色 (#00FF00)，然后在 OBS 中对源添加"色度键"滤镜，绿色背景会被透明化</li>
      </ul>

      <h2 id="obs提词器推荐插件">OBS 提词器推荐插件</h2>
      <table>
        <thead>
          <tr>
            <th>工具名称</th>
            <th>类型</th>
            <th>价格</th>
            <th>特点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>浏览器源 + 在线提词</td>
            <td>内置功能</td>
            <td>免费</td>
            <td>无需安装、支持透明背景</td>
          </tr>
          <tr>
            <td>Teleprompter Mirror</td>
            <td>网页工具</td>
            <td>免费</td>
            <td>支持镜像翻转、滚动调速</td>
          </tr>
          <tr>
            <td>提词达人</td>
            <td>桌面软件</td>
            <td>免费/Pro</td>
            <td>中文优化、悬浮窗模式</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function FreeToolContent() {
  return (
    <>
      <h2 id="为什么需要提词器">为什么需要提词器？</h2>
      <p>
        无论是新手主播还是资深带货达人，提词器都是提升直播流畅度的关键工具。2026 年市面上涌现了大量免费提词器工具，本文将全面对比实测，帮你找到最适合的一款。
      </p>

      <h2 id="电脑端免费提词器">电脑端免费提词器推荐</h2>
      <h3 id="obs浏览器源方案">1. OBS 浏览器源方案</h3>
      <p>完全免费，与直播软件无缝集成。利用 OBS 内置的浏览器源功能加载在线提词网页，支持透明背景、自定义字体和滚动速度。综合评分：⭐⭐⭐⭐⭐</p>

      <h3 id="teleprompter-mirror">2. Teleprompter Mirror</h3>
      <p>免费网页版提词器，支持文字镜像翻转（适配提词器反射板）、自定义滚动速度、字体大小调节。打开即用，无需注册。综合评分：⭐⭐⭐⭐</p>

      <h3 id="提词达人桌面版">3. 提词达人桌面版</h3>
      <p>国产提词器软件，基础版免费。支持悬浮窗置顶、透明背景、多稿件管理。中文优化做得很好，特别适合中文主播。Pro 版解锁 AI 功能。综合评分：⭐⭐⭐⭐</p>

      <h2 id="手机端免费提词器">手机端免费提词器推荐</h2>
      <h3 id="快提词">1. 快提词</h3>
      <p>完全免费的手机提词器 App，支持悬浮窗模式、滚动速度调节、字体大小和颜色设置。适合手机直播使用。综合评分：⭐⭐⭐⭐</p>

      <h3 id="主播提词器">2. 主播提词器</h3>
      <p>免费版有广告但功能齐全，支持分段提词、收藏夹、云同步。适合电商主播使用。综合评分：⭐⭐⭐</p>

      <h2 id="网页版免费提词器">网页版免费提词器推荐</h2>
      <p>网页版提词器无需安装，打开浏览器即可使用。最适合配合 OBS 浏览器源使用。推荐几款免费的中文网页提词器。</p>

      <h2 id="免费提词器对比表">免费提词器功能对比</h2>
      <table>
        <thead>
          <tr>
            <th>工具</th>
            <th>平台</th>
            <th>透明背景</th>
            <th>镜像翻转</th>
            <th>移动端</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OBS 浏览器源</td>
            <td>桌面</td>
            <td>✅</td>
            <td>✅</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>Teleprompter Mirror</td>
            <td>网页</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>提词达人</td>
            <td>桌面/手机</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>快提词</td>
            <td>手机</td>
            <td>❌</td>
            <td>❌</td>
            <td>✅</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function ForgetWordsContent() {
  return (
    <>
      <h2 id="直播忘词的常见原因">直播忘词的常见原因</h2>
      <p>直播忘词是每个主播都可能遇到的问题，即使是经验丰富的大主播也不例外。理解忘词的根本原因，才能有针对性地解决。</p>
      <ul>
        <li><strong>信息过载</strong>：一次性准备太多内容，导致大脑处理不过来</li>
        <li><strong>死记硬背</strong>：逐字背诵而非理解记忆，一旦中断就接不上</li>
        <li><strong>缺乏提示系统</strong>：没有任何视觉辅助，全靠大脑记忆</li>
        <li><strong>紧张焦虑</strong>：面对镜头紧张，大脑一片空白</li>
        <li><strong>弹幕干扰</strong>：被弹幕带偏思路，忘记原本要说什么</li>
      </ul>

      <h2 id="五种高效解决方案">五种高效解决方案</h2>

      <h3 id="方案一提词器辅助">方案一：提词器辅助（核心方案）</h3>
      <p>使用提词器是最直接有效的忘词解决方案。将准备好的稿件导入提词器，放在摄像头附近，讲话时自然扫视。这是<strong>所有方案中效果最好的</strong>，建议优先采用。</p>

      <h3 id="方案二关键词卡片">方案二：关键词卡片</h3>
      <p>对于不方便使用提词器的场景（如走动直播），准备一张关键词卡片放在视线范围内。每行只写 2-3 个关键词作为提示，而非完整句子。</p>

      <h3 id="方案三分段录制思维">方案三：分段录制思维</h3>
      <p>将直播内容切分为多个 3-5 分钟的小段，每段只记核心要点。段与段之间用互动环节过渡。这种方法适用于内容密集的知识型直播。</p>

      <h3 id="方案四即兴话术框架">方案四：即兴话术框架</h3>
      <p>掌握一套即兴话术框架：①吸引注意 → ②建立共鸣 → ③展开观点 → ③案例佐证 → ④总结强化。当忘词时，用框架自然过渡。</p>

      <h3 id="方案五心理调节技巧">方案五：心理调节技巧</h3>
      <p>忘词后的心理状态至关重要。深呼吸、微笑面对镜头、用互动话术争取时间。记住：观众往往不会注意到你忘词，除非你表现出慌乱。</p>

      <h2 id="忘词应急话术模板">忘词应急话术模板</h2>
      <p>建议每位主播在提词器中准备以下应急话术：</p>
      <ul>
        <li>"咱们先来看一下刚才有朋友问到的..."</li>
        <li>"说到这个，我想起一个很有意思的点..."</li>
        <li>"让我先给大家举个例子..."</li>
        <li>"所以总结一下我们刚才说的..."</li>
      </ul>
    </>
  );
}

function SpeakingSkillContent() {
  return (
    <>
      <h2 id="口播基础训练">口播基础训练</h2>
      <p>口播（口语播报）是直播的核心技能。好的口播不只是"说话流畅"，更重要的是让观众愿意听、听得进去。本章系统讲解口播训练的各个维度。</p>

      <h2 id="语速控制技巧">语速控制技巧</h2>
      <h3 id="找到你的最佳语速">找到你的最佳语速</h3>
      <p>一般中文口播的最佳语速在每分钟 200-260 字之间。太快观众跟不上，太慢显得拖沓。建议录制一段 3 分钟的口播，统计字数并回听，找到自己最自然的语速。</p>

      <h3 id="节奏变化">节奏变化——让口播有起伏</h3>
      <p>单调的语速会让观众分心。关键信息慢下来、强调；过渡内容加快速度。就像音乐有节奏，好的口播也有"快慢快"的变化。</p>

      <h2 id="语调和气息">语调与气息管理</h2>
      <p>腹式呼吸是专业主播的基本功。用腹式呼吸支撑声音，气息更稳、底气更足、声音更有穿透力。</p>
      <ul>
        <li>吸气时腹部鼓起，呼气时腹部收缩</li>
        <li>每句话前先吸一小口气</li>
        <li>长句中间找停顿点换气</li>
        <li>避免说到一半"气不够"导致音量衰减</li>
      </ul>

      <h2 id="停顿的艺术">停顿的艺术</h2>
      <p>有意识的停顿是专业主播的标志。停顿用于：①给观众思考时间；②强调重要信息；③自然过渡到下一话题。一般停顿 1-2 秒即可。</p>

      <h2 id="提词器口播配合">与提词器的完美配合</h2>
      <p>提词器和口播技巧相辅相成：（1）提词器显示关键词而非逐字稿；（2）用提词器的滚动速度配合你的语速；（3）眼神在镜头和提词器之间自然切换；（4）不要"念稿式"口播，保持自然交谈的语气。</p>
    </>
  );
}

function PhoneSetupContent() {
  return (
    <>
      <h2 id="手机提词器概述">手机提词器概述</h2>
      <p>手机直播越来越流行，如何在小小的手机屏幕上优雅地使用提词器？本文涵盖 iOS 和 Android 系统的完整提词方案。</p>

      <h2 id="ios提词方案">iPhone 提词方案</h2>
      <h3 id="悬浮窗提词app">悬浮窗提词 App</h3>
      <p>在 App Store 搜索"提词器"，选择支持悬浮窗功能的 App。安装后，在直播 App 上方显示半透明提词窗口。推荐设置：字体大小 18pt-22pt、背景透明度 30%、滚动速度 180 字/分钟。</p>

      <h3 id="画中画模式">画中画模式</h3>
      <p>利用 iOS 画中画功能，将提词器 App 以小窗口形式悬浮在直播 App 上。此方案需要提词器 App 支持画中画。</p>

      <h2 id="android提词方案">Android 提词方案</h2>
      <h3 id="悬浮窗权限设置">悬浮窗权限设置</h3>
      <p>安卓手机使用提词器悬浮窗前，需要先在系统设置中开启对应 App 的"悬浮窗权限"。路径：设置 → 应用 → 提词器 App → 权限 → 开启悬浮窗。</p>

      <h2 id="竖屏直播提词布局">竖屏直播提词布局建议</h2>
      <p>竖屏直播（如抖音、快手）的提词器布局要点：</p>
      <ul>
        <li>提词窗口放在屏幕上方 1/5 区域</li>
        <li>宽度占屏幕 90%，行数控制在 1-2 行</li>
        <li>避免遮挡面部和产品展示区域</li>
        <li>使用深色背景 + 白色文字的高对比方案</li>
      </ul>
    </>
  );
}

function SalesScriptContent() {
  return (
    <>
      <h2 id="带货话术重要性">为什么带货话术需要模板？</h2>
      <p>带货直播是分秒必争的高强度场景。有模板的话术框架能帮助主播在高压下保持输出稳定、逻辑清晰。好的模板不是"死记硬背的稿子"，而是灵活的"结构框架"。</p>

      <h2 id="三段式基础模板">三段式基础模板（新手必备）</h2>
      <h3 id="第一阶段开场破冰">第一阶段：开场破冰（30秒）</h3>
      <p>目标：拉停留、建立身份、吸引注意。关键词：真诚、利益点、好奇心。</p>

      <h3 id="第二阶段产品介绍">第二阶段：产品介绍（2-3分钟）</h3>
      <p>目标：触发需求、建立信任。框架：痛点 → 卖点 → 对比 → 体验 → 场景。这是转化率最高的环节。</p>

      <h3 id="第三阶段逼单成交">第三阶段：逼单成交（1分钟）</h3>
      <p>目标：促进行动。框架：限时 → 限量 → 福利 → 紧迫感。利用从众心理（"已经卖了XXX件"）。</p>

      <h2 id="高级话术技巧">高级话术技巧</h2>
      <ul>
        <li><strong>场景化描述</strong>：让观众想象自己使用产品的场景</li>
        <li><strong>从众效应</strong>："99% 的顾客都选择了这款"</li>
        <li><strong>稀缺感营造</strong>："库存只剩 50 单"</li>
        <li><strong>社交证明</strong>："回头客再次回购"</li>
      </ul>

      <h2 id="提词器话术设置">提词器话术设置建议</h2>
      <p>在提词器中，建议用以下格式组织话术：（1）每段用大号标题标注阶段名称；（2）关键词加粗或变色；（3）产品数据单独一行；（4）价格信息用醒目颜色标注。</p>
    </>
  );
}

function CommonProblemsContent() {
  return (
    <>
      <h2 id="安装和连接问题">安装和连接问题</h2>
      <h3 id="提词器无法连接obs">提词器无法在 OBS 中显示？</h3>
      <p>常见原因：（1）浏览器源的 URL 输入错误；（2）网络连接问题导致网页加载失败；（3）OBS 版本过旧不支持某些浏览器源功能。解决：检查 URL 是否以 https:// 开头，确保 OBS 版本在 28.0 以上。</p>

      <h3 id="提词器滚动不流畅">提词器滚动不流畅？</h3>
      <p>尝试将 OBS 浏览器源的帧率调整到 30FPS 或 60FPS。如果使用网页提词器，关闭其他耗费 CPU 的浏览器标签页。</p>

      <h2 id="显示和同步问题">显示和同步问题</h2>
      <h3 id="提词器文字模糊">提词器文字模糊不清？</h3>
      <p>检查浏览器源的分辨率设置，建议设为 1920x1080。同时提词器网页本身的字体大小也要适当。在 OBS 中右键浏览器源 → 属性 → 设置宽度和高度。</p>

      <h2 id="兼容性问题">兼容性问题</h2>
      <h3 id="mac提词器兼容">Mac 系统提词器兼容性？</h3>
      <p>Mac 版 OBS 对浏览器源的支持不如 Windows 版本完善。建议 Mac 用户优先使用窗口捕获方案，或用 Mac 自带的文本编辑器配合全屏模式作为简易提词器。</p>
    </>
  );
}

function AITeleprompterContent() {
  return (
    <>
      <h2 id="ai提词器是什么">AI 提词器是什么？</h2>
      <p>AI 提词器是融合了人工智能技术的新一代提词工具。传统提词器只是"滚动字幕"，AI 提词器能<strong>实时感知主播的表达状态</strong>，主动提供智能辅助。它是提词器技术的未来方向。</p>

      <h2 id="ai提词器核心功能">AI 提词器的核心功能</h2>
      <h3 id="智能语速适配">智能语速适配</h3>
      <p>AI 提词器通过语音识别实时检测主播语速，自动调整文字滚动速度。主播说快时自动加速，说慢时自动减速，时刻保持稿件的"下一句"在最佳位置。</p>

      <h3 id="实时语义检测">实时语义检测</h3>
      <p>AI 能识别主播当前在说稿件的哪个位置。如果主播即兴发挥偏离了原稿，AI 会自动定位到对应位置，不会出现"念完了稿子没跟上"的尴尬。</p>

      <h3 id="智能话术推荐">智能话术推荐</h3>
      <p>基于弹幕内容和直播间氛围，AI 可以实时推荐合适的话术方向。比如弹幕多人问价，AI 自动推送价格相关话术。</p>

      <h2 id="ai提词器推荐">2026 年 AI 提词器推荐</h2>
      <ul>
        <li><strong>提词达人 Pro</strong>：国产 AI 提词器，支持中文语音识别和智能语速适配，月费 30 元</li>
        <li><strong>SayIt AI</strong>：英语为主的 AI 提词方案，适合英文直播</li>
        <li><strong>开源方案</strong>：GitHub 上有开源的 AI 辅助提词项目，适合有技术能力的主播自行部署</li>
      </ul>

      <h2 id="ai提词器未来展望">AI 提词器的未来展望</h2>
      <p>未来 AI 提词器将向以下方向发展：多语言实时翻译提词、基于直播数据的个性化话术优化、与弹幕互动的智能应答辅助、全息 AR 提词显示。AI 提词器将成为每一个主播的"智能副播"。</p>
    </>
  );
}

function WhyForgetWordsContent() {
  return (
    <>
      <h2 id="开场">直播为什么总忘词？</h2>
      <p>
        我做了三年直播运营，带过不下 50 个新人主播。有一个问题几乎每个人都会问——<strong>"我明明准备了稿子，为什么开播就大脑空白？"</strong>
      </p>
      <p>
        这个问题看起来简单，但背后的原因其实有好几层。以下是我这几年的观察和经验整理，不只讲"为什么"，更重要的是讲"怎么办"。
      </p>
      <blockquote>
        本文是真实经验分享，不是广告软文。文中提到的工具和方法都是自己团队主播实际使用过的，仅供参考。
      </blockquote>

      <h2 id="六大核心原因">直播忘词的 6 大核心原因</h2>

      <h3 id="原因一稿子太长">1. 稿子太长，信息过载</h3>
      <p>
        这是最常见也最容易被忽视的原因。很多主播（尤其是新人）有一个误区：<strong>准备的越详细越安全</strong>。于是写了一份 3000 字的逐字稿，觉得"只要照着念就万无一失"。
      </p>
      <p>
        但实际情况恰恰相反。大脑在高压环境下（开播本身就是一种压力），处理长文本的能力会断崖式下降。你看着密密麻麻的字，反而找不到"下一句该说什么"。
      </p>
      <p>
        <strong>真实案例</strong>：团队里有个带货主播，第一场准备了 5000 字的话术稿，结果开播 3 分钟就忘词了——因为眼神在密密麻麻的文字里迷路了，找不到自己说到哪了。
      </p>
      <p>
        <strong>解决思路</strong>：把长篇稿子拆成"模块化要点"，每个模块不超过 3 个关键词。比如不是写"今天给大家带来一款非常好用的洗面奶，它的成分非常温和，含有氨基酸..."，而是提炼为：洗面奶 → 氨基酸 → 温和不刺激。3 个关键词比 200 字逐字稿好记 10 倍。
      </p>

      <h3 id="原因二死记硬背">2. 死记硬背 vs 理解记忆</h3>
      <p>
        这是第二个大坑。很多人觉得"把稿子背下来就万无一失"。但<strong>背诵和口播是完全不同的两件事</strong>。背诵依赖"逐字回忆"，一旦中间断了一个词，后面的整段都会塌掉——就像多米诺骨牌。
      </p>
      <p>
        口播依赖的是"语义框架"。你不需要记住每一个字，只需要记住"这一段的目的是什么、关键信息是什么"，然后用你自己的话表达出来。
      </p>
      <p>
        <strong>打个比方</strong>：背诵是默写全文，口播是复述故事。你回忆上周跟朋友聊天说了什么，靠的是故事逻辑，不是逐字背诵。
      </p>

      <h3 id="原因三缺乏视觉辅助">3. 缺乏视觉辅助系统</h3>
      <p>
        这是我观察到的<strong>专业主播和业余主播最大的区别之一</strong>。专业主播几乎都有某种形式的视觉辅助——提词器、关键词卡片、甚至只是贴纸。业余主播往往"相信自己能记住"，结果一紧张就忘。
      </p>
      <p>人类是视觉动物。在高压环境下，看到 vs 回忆，前者靠谱一万倍。</p>
      <table>
        <thead>
          <tr>
            <th>直播场景</th>
            <th>推荐方案</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>桌面电脑直播</td>
            <td>OBS 浏览器源 + 在线提词器（如直播猿），透明背景悬浮在摄像头旁</td>
          </tr>
          <tr>
            <td>手机竖屏直播</td>
            <td>悬浮窗提词 App，文字放在屏幕上方 1/5 区域</td>
          </tr>
          <tr>
            <td>走动式直播</td>
            <td>实体关键词卡片，手持或放在产品展示台旁</td>
          </tr>
          <tr>
            <td>游戏直播</td>
            <td>第二屏幕或平板放提词内容</td>
          </tr>
        </tbody>
      </table>
      <p>
        特别说一下 <strong>OBS 场景</strong>：这是桌面端最灵活的方案。在 OBS 里加一个浏览器源，加载在线提词工具（我自己用直播猿），设置成半透明悬浮条，放在画面顶部靠近摄像头的位置。观众完全看不出你在看稿，因为你的视线始终在镜头附近。
      </p>

      <h3 id="原因四镜头焦虑">4. 镜头焦虑与心理压力</h3>
      <p>
        面对镜头和面对人是完全不同的体验。你说话的时候看不到对方的反应（点头、微笑、皱眉），大脑失去了"社交反馈"这个校准信号，就会进入一种不确定状态。
      </p>
      <p><strong>不确定 → 紧张 → 大脑空白 → 忘词</strong>。这是一个连锁反应。</p>
      <p>
        <strong>破解方法</strong>：前 5 分钟用"暖场模式"，先闲聊、打招呼、看弹幕，给自己缓冲时间进入状态。允许自己犯错——大多数观众根本不会注意到你忘词 2-3 秒。
      </p>

      <h3 id="原因五弹幕干扰">5. 弹幕干扰打乱思路</h3>
      <p>
        你正在按稿子讲 A 产品，突然弹幕问"B 产品什么时候上"、"多少钱"。你下意识去回复弹幕，回完了发现自己忘了刚才说到哪了。这不是你注意力不集中，而是<strong>"任务切换"的认知成本</strong>。
      </p>
      <p>
        <strong>解决思路</strong>：在提词器里标明"这里留 30 秒回复弹幕"，主动掌控节奏；学会选择性忽略不是每条弹幕都要回；用提词器做"锚点"，回完弹幕瞄一眼就能秒回正轨。
      </p>

      <h3 id="原因六准备不足">6. 准备不足与过度自信</h3>
      <p>
        有一点反直觉：<strong>忘词最多的往往不是完全没准备的主播，而是"觉得不用怎么准备"的主播。</strong>做了一两个月直播后产生错觉——"我随便说说就行"。稿子不写了，要点不列了，提词器也不开了。结果一开播，脑子一片空白。
      </p>
      <p>信心是好事，但不要用信心替代准备。专业主播准备得比新人更充分，只是他们看起来轻松而已。</p>

      <h2 id="不同场景分析">不同直播场景的忘词特点</h2>

      <h3 id="带货直播忘词">带货直播</h3>
      <p><strong>典型问题</strong>：产品信息多（规格、价格、材质、优惠），容易漏掉关键卖点。</p>
      <p><strong>高频忘词点</strong>：讲完一个产品过渡到下一个时、被弹幕问价打断后、限时逼单环节紧张时。</p>
      <p><strong>建议</strong>：提词器里用"产品名 + 3 个核心卖点 + 价格"的格式。其他内容自由发挥。</p>

      <h3 id="知识直播忘词">知识直播</h3>
      <p><strong>典型问题</strong>：内容逻辑链长，一个点没讲清楚后面就乱了。</p>
      <p><strong>建议</strong>：用提词器显示"逻辑树"——一级标题是大论点，二级是论据关键词。不要放完整段落。</p>

      <h3 id="游戏直播忘词">游戏直播</h3>
      <p><strong>典型问题</strong>：注意力在游戏操作上，顾不上说话。不是"忘了说什么"而是"忘了要说"。</p>
      <p><strong>建议</strong>：第二屏幕放"话题池"——提前准备 10-15 个闲聊话题和互动问题，瞄一眼就能说。</p>

      <h3 id="obs场景忘词">OBS 桌面直播</h3>
      <p><strong>典型问题</strong>：OBS 场景多（主画面、产品特写、PPT 展示），切换场景后容易断档。</p>
      <p><strong>建议</strong>：OBS 浏览器源是神器。加载直播猿等在线提词工具，设置成透明悬浮条，始终显示在画面最上层。不管怎么切场景，提词内容一直可见。</p>

      <h2 id="五个科学方法">科学应对忘词的 5 个方法</h2>

      <h3 id="方法一提词器">方法一：提词器辅助（最核心）</h3>
      <p>
        不绕弯子，<strong>提词器是解决忘词问题最有效的工具</strong>，没有之一。但关键不是提词器本身，而是使用方式：
      </p>
      <ol>
        <li><strong>放对位置</strong>：提词器/悬浮条放在摄像头正上方或正下方，视线偏移不超过 15°</li>
        <li><strong>写对内容</strong>：口语化、要点化，不是书面文章</li>
        <li><strong>调对速度</strong>：滚动速度和你的自然语速匹配，一般 180-220 字/分钟</li>
        <li><strong>做对标记</strong>：用颜色/符号标记重点，一眼就能定位</li>
      </ol>
      <p>直播猿这类工具的好处是中文优化好，直接浏览器打开就能用，不需要下载安装。</p>

      <h3 id="方法二关键词卡片">方法二：关键词卡片法</h3>
      <p>适合手机直播、走动直播等不方便用提词器的场景。一张卡片只写 5-8 个关键词，字号要大，按流程从上到下排列，贴在手边随时能瞄到的地方。即使不看，知道"万一忘了有退路"本身就能大幅降低忘词概率。</p>

      <h3 id="方法三分段式话术">方法三：分段式话术</h3>
      <p>放弃"一口气讲完所有内容"的想法，把直播切分成 3-5 分钟的小段。每段结构：引入（10 秒）→ 展开（2-3 分钟）→ 互动/过渡（20-30 秒）。每个段落独立，忘词的连锁反应被隔断。A 段讲砸了不影响 B 段。</p>

      <h3 id="方法四即兴过渡">方法四：即兴过渡框架</h3>
      <p>忘词不可怕，可怕的是忘词后的慌乱。准备一套"万能过渡话术"，建议写在提词器最顶部作为"紧急备用"：</p>
      <ul>
        <li>"说到这个，我想起来一个很有意思的点..."</li>
        <li>"我给大家实际展示一下，这样更直观..."</li>
        <li>"咱们先来看一下评论区，有朋友在问..."</li>
        <li>"总结一下刚才说的重点..."</li>
        <li>"让我换个角度跟大家聊聊这个..."</li>
      </ul>

      <h3 id="方法五心理脱敏">方法五：心理脱敏训练</h3>
      <p>每天对着镜子或摄像头自由讲话 5 分钟，<strong>不准备任何稿子</strong>。话题随便——今天吃了什么、昨天看了什么视频都行。唯一的要求：不能停顿超过 3 秒。这个训练帮你建立"即使不知道下一句说什么，嘴也能继续动"的能力。</p>

      <h2 id="总结">真实经验总结</h2>
      <p>
        忘词不是你的问题，是<strong>人类大脑在高压环境下的正常反应</strong>。忘词是技术问题，有技术方案。提词器 + 关键词卡片 + 分段话术 + 过渡框架 + 心理训练，这五样东西加在一起，99% 的忘词问题都能解决。
      </p>
      <p>
        <strong>我自己的经验</strong>：前 10 场直播把提词当成"拐杖"，大胆用，不要觉得丢人。等你建立了肌肉记忆和表达信心，自然就会减少依赖。到那时候，提词器从"拐杖"变成"安全网"——你不需要一直看，但知道它在那里，就很安心。
      </p>
    </>
  );
}

function NewbieGuideContent() {
  return (
    <>
      <h2 id="开场">第一次面对镜头，是什么感觉？</h2>
      <p>
        如果你第一次开播，对着镜头说不出话——<strong>这完全正常</strong>。
      </p>
      <p>
        我见过的每一个主播，第一场直播都是紧张的。包括我自己。区别只在于——你有没有用提词器帮你撑过最难的阶段。
      </p>
      <p>
        这篇文章就是写给<strong>从来没碰过提词器、第一次想试试</strong>的你。5 步，从零到流畅开播。
      </p>
      <blockquote>
        本文不会推荐昂贵的设备，不要求你买任何东西。只需要一台电脑或一部手机，配合免费工具，半小时就能设好。
      </blockquote>

      <h2 id="第一步选工具">第一步：选一个提词方案（5 分钟）</h2>
      <p>
        别在这步纠结太久。你是新手，你需要的不是"最好的"方案，而是<strong>"今天能用的"</strong>方案。
      </p>

      <h3 id="电脑直播推荐">电脑直播（推荐）</h3>
      <p>
        打开浏览器 → 搜索直播猿 → 打开在线提词页面 → 在 OBS 中添加"浏览器源"→ 粘贴网址 → 调整位置到摄像头下方。
      </p>
      <p>这是零成本的入门方案。不需要下载软件，不需要注册，不需要花钱。设置全程不超过 5 分钟。</p>

      <h3 id="手机直播推荐">手机直播</h3>
      <p>去应用商店搜"提词器"，选评分最高的免费 App 下载。安装后开启"悬浮窗"权限，把提词窗口拖到屏幕顶部。</p>

      <p><strong>我的建议</strong>：第一场直播，用最简单的方案。别一上来就搞双屏、多设备同步——那些是进阶玩法，以后再说。</p>

      <h2 id="第二步写稿子">第二步：写一份"提词稿"（20 分钟）</h2>
      <p>这是<strong>最重要的一步</strong>。新手最容易犯的错：把平时写的文章直接复制进提词器。</p>
      <p>提词器的稿子和书面文章不一样。三个原则：</p>

      <h3 id="口语化原则">原则一：口语化</h3>
      <p>
        不要写"本产品采用先进工艺制造，具有卓越的品质表现"。写"这个产品质量很好，用的是最好的工艺"。
      </p>
      <p><strong>写完之后念一遍</strong>。如果念出来觉得拗口，就改。改到念出来像正常说话为止。</p>

      <h3 id="短句原则">原则二：短句</h3>
      <p>一句话不超过 20 个字。句号比逗号好用。断句点就是你的换气点。</p>

      <h3 id="关键词原则">原则三：关键词突出</h3>
      <p>把最重要的词用特殊标记标出来。比如：</p>
      <pre>今天给大家推荐一款洗面奶
👉【氨基酸配方】温和不刺激
👉【细腻泡沫】深层清洁不紧绷
👉【今天专属价】限时 59 元</pre>
      <p>你在提词器里看到这些标记，一眼就能定位到关键信息。不用满屏找字。</p>

      <h2 id="第三步摆位置">第三步：把提词器放在对的位置（2 分钟）</h2>
      <p>这步决定"观众能不能看出来你在念稿"。</p>

      <p><strong>唯一的原则</strong>：提词器的位置要尽可能靠近摄像头。</p>
      <ul>
        <li><strong>电脑直播</strong>：提词窗口放在摄像头正上方或正下方，越近越好。以 OBS 能拖动的范围为准。</li>
        <li><strong>手机直播</strong>：悬浮窗放在前置摄像头旁边，屏幕顶部 1/5 区域。</li>
      </ul>

      <p>为什么？因为你的视线在看提词器和看镜头之间切换。距离越近，切换越快，观众越看不出来。</p>

      <p><strong>一个小技巧</strong>：在提词器旁边贴一张便利贴，上面画个箭头指向摄像头。提醒自己"记得看镜头"。</p>

      <h2 id="第四步调速度">第四步：调整滚动速度（3 分钟）</h2>

      <p>新人最常见的抱怨：<strong>"提词器滚太快了我跟不上"或者"滚太慢了我得等"。</strong></p>

      <p>找到一个速度，设置它，然后<strong>让提词器适应你的语速，而不是反过来</strong>。</p>

      <h3 id="找语速方法">怎么找？</h3>
      <ol>
        <li>对着提词器念一段稿子（不录、不开播，自己练）</li>
        <li>感觉快了就调慢，慢了就调快</li>
        <li>找到"刚好念完一行，下一行就出现"的节奏</li>
        <li><strong>记住这个速度数字</strong></li>
      </ol>

      <p>对于大多数中文主播，初始速度设置在 <strong>180-200 字/分钟</strong> 比较舒服。以后熟练了再加快。</p>

      <p>直播猿支持实时调速，开播过程中也能随时调整，不用担心设错了改不了。</p>

      <h2 id="第五步第一次">第五步：第一次开播（你的任务不是完美）</h2>

      <p>前面四步准备了这么久，现在是最关键的一步——<strong>真的开播</strong>。</p>

      <p>但你第一次开播的目标不是"讲得完美"。目标是：<strong>开播了，没垮，下次还敢。</strong></p>

      <h3 id="第一场建议">第一场直播的建议设置</h3>
      <ul>
        <li><strong>时长</strong>：15-20 分钟，别太长时间</li>
        <li><strong>内容</strong>：选你最有把握的话题</li>
        <li><strong>提词器</strong>：开着，放在摄像头旁边</li>
        <li><strong>心态</strong>：这是练习，不是表演</li>
      </ul>

      <h3 id="三个允许">记住三个"允许"</h3>
      <ol>
        <li><strong>允许自己看提词器</strong>——它是工具，不是作弊</li>
        <li><strong>允许自己念错</strong>——错了就错了，观众没那么在意</li>
        <li><strong>允许自己紧张</strong>——紧张说明你在乎这件事</li>
      </ol>

      <p>第一场结束之后，你最大的感受不会是"我好差"，而是——<strong>"原来没想象的那么难"</strong>。</p>

      <h2 id="总结">总结：5 步回顾</h2>

      <table>
        <thead>
          <tr><th>步骤</th><th>做什么</th><th>耗时</th></tr>
        </thead>
        <tbody>
          <tr><td>① 选工具</td><td>电脑选 OBS+直播猿，手机选免费 App</td><td>5 分钟</td></tr>
          <tr><td>② 写稿子</td><td>口语化 + 短句 + 关键词标记</td><td>20 分钟</td></tr>
          <tr><td>③ 摆位置</td><td>提词器靠近摄像头，越近越好</td><td>2 分钟</td></tr>
          <tr><td>④ 调速度</td><td>先练一遍，找到舒适速度（180-200字/分钟）</td><td>3 分钟</td></tr>
          <tr><td>⑤ 开播</td><td>目标不是完美，是"下次还敢"</td><td>15-20 分钟</td></tr>
        </tbody>
      </table>

      <p>合计准备时间半小时，你就能完成第一场有提词器辅助的直播。</p>
      <p>后面的事情——口播技巧、话术打磨、多品带货——都是在这 5 步的基础上叠加。先把基础跑通，再慢慢升级。</p>
    </>
  );
}

function DefaultContent() {
  return (
    <>
      <h2 id="文章内容">文章内容</h2>
      <p>本文正在撰写中，敬请期待完整内容。</p>
      <p>本站致力于提供最专业的直播提词器知识内容，所有文章均经过深度调研和实际测试，确保内容的准确性和实用性。</p>
    </>
  );
}

// ============================================================
// TOC 提取工具
// ============================================================

function extractTOCFromArticle(article: ReturnType<typeof getArticleBySlug>): TOCItem[] {
  if (!article) return [];

  const items: TOCItem[] = [];

  // 基于文章 slug 生成对应的 TOC
  const tocMap: Record<string, TOCItem[]> = {
    'obs-ti-ci-qi-jiao-cheng': [
      { id: 'obs提词器是什么', text: 'OBS 提词器是什么？', level: 1 },
      { id: 'obs提词器的三种实现方式', text: 'OBS 提词器的三种实现方式', level: 1 },
      { id: '浏览器源方案推荐', text: '方法一：浏览器源方案（推荐）', level: 2 },
      { id: '窗口捕获方案', text: '方法二：窗口捕获方案', level: 2 },
      { id: '显示器捕获方案', text: '方法三：显示器捕获方案', level: 2 },
      { id: 'obs提词器透明背景设置', text: 'OBS 提词器透明背景设置', level: 1 },
      { id: 'obs提词器推荐插件', text: 'OBS 提词器推荐插件', level: 1 },
    ],
    'mian-fei-ti-ci-qi-tui-jian': [
      { id: '为什么需要提词器', text: '为什么需要提词器？', level: 1 },
      { id: '电脑端免费提词器', text: '电脑端免费提词器推荐', level: 1 },
      { id: 'obs浏览器源方案', text: 'OBS 浏览器源方案', level: 2 },
      { id: 'teleprompter-mirror', text: 'Teleprompter Mirror', level: 2 },
      { id: '提词达人桌面版', text: '提词达人桌面版', level: 2 },
      { id: '手机端免费提词器', text: '手机端免费提词器推荐', level: 1 },
      { id: '网页版免费提词器', text: '网页版免费提词器推荐', level: 1 },
      { id: '免费提词器对比表', text: '免费提词器功能对比', level: 1 },
    ],
    'zhi-bo-wang-ci-jie-jue-fang-an': [
      { id: '直播忘词的常见原因', text: '直播忘词的常见原因', level: 1 },
      { id: '五种高效解决方案', text: '五种高效解决方案', level: 1 },
      { id: '方案一提词器辅助', text: '方案一：提词器辅助', level: 2 },
      { id: '方案二关键词卡片', text: '方案二：关键词卡片', level: 2 },
      { id: '方案三分段录制思维', text: '方案三：分段录制思维', level: 2 },
      { id: '方案四即兴话术框架', text: '方案四：即兴话术框架', level: 2 },
      { id: '方案五心理调节技巧', text: '方案五：心理调节技巧', level: 2 },
      { id: '忘词应急话术模板', text: '忘词应急话术模板', level: 1 },
    ],
    'kou-bo-ji-qiao-jin-jie': [
      { id: '口播基础训练', text: '口播基础训练', level: 1 },
      { id: '语速控制技巧', text: '语速控制技巧', level: 1 },
      { id: '语调和气息', text: '语调与气息管理', level: 1 },
      { id: '停顿的艺术', text: '停顿的艺术', level: 1 },
      { id: '提词器口播配合', text: '与提词器的完美配合', level: 1 },
    ],
    'shou-ji-ti-ci-qi-she-zhi': [
      { id: '手机提词器概述', text: '手机提词器概述', level: 1 },
      { id: 'ios提词方案', text: 'iPhone 提词方案', level: 1 },
      { id: 'android提词方案', text: 'Android 提词方案', level: 1 },
      { id: '竖屏直播提词布局', text: '竖屏直播提词布局建议', level: 1 },
    ],
    'dai-huo-hua-shu-mu-ban': [
      { id: '带货话术重要性', text: '为什么带货话术需要模板？', level: 1 },
      { id: '三段式基础模板', text: '三段式基础模板（新手必备）', level: 1 },
      { id: '高级话术技巧', text: '高级话术技巧', level: 1 },
      { id: '提词器话术设置', text: '提词器话术设置建议', level: 1 },
    ],
    'ti-ci-qi-chang-jian-wen-ti': [
      { id: '安装和连接问题', text: '安装和连接问题', level: 1 },
      { id: '显示和同步问题', text: '显示和同步问题', level: 1 },
      { id: '兼容性问题', text: '兼容性问题', level: 1 },
    ],
    'ai-zhi-bo-ti-ci-qi': [
      { id: 'ai提词器是什么', text: 'AI 提词器是什么？', level: 1 },
      { id: 'ai提词器核心功能', text: 'AI 提词器的核心功能', level: 1 },
      { id: 'ai提词器推荐', text: 'AI 提词器推荐', level: 1 },
      { id: 'ai提词器未来展望', text: 'AI 提词器的未来展望', level: 1 },
    ],
    'xin-shou-ti-ci-qi-shang-shou': [
      { id: '开场', text: '第一次面对镜头，是什么感觉？', level: 1 },
      { id: '第一步选工具', text: '第一步：选一个提词方案', level: 1 },
      { id: '电脑直播推荐', text: '电脑直播（推荐）', level: 2 },
      { id: '手机直播推荐', text: '手机直播', level: 2 },
      { id: '第二步写稿子', text: '第二步：写一份"提词稿"', level: 1 },
      { id: '口语化原则', text: '原则一：口语化', level: 2 },
      { id: '短句原则', text: '原则二：短句', level: 2 },
      { id: '关键词原则', text: '原则三：关键词突出', level: 2 },
      { id: '第三步摆位置', text: '第三步：把提词器放在对的位置', level: 1 },
      { id: '第四步调速度', text: '第四步：调整滚动速度', level: 1 },
      { id: '找语速方法', text: '怎么找到自己的语速？', level: 2 },
      { id: '第五步第一次', text: '第五步：第一次开播', level: 1 },
      { id: '第一场建议', text: '第一场直播的建议设置', level: 2 },
      { id: '三个允许', text: '记住三个"允许"', level: 2 },
      { id: '总结', text: '总结：5 步回顾', level: 1 },
    ],
    'wei-shi-yao-zong-wang-ci': [
      { id: '开场', text: '直播为什么总忘词？', level: 1 },
      { id: '六大核心原因', text: '直播忘词的 6 大核心原因', level: 1 },
      { id: '原因一稿子太长', text: '1. 稿子太长，信息过载', level: 2 },
      { id: '原因二死记硬背', text: '2. 死记硬背 vs 理解记忆', level: 2 },
      { id: '原因三缺乏视觉辅助', text: '3. 缺乏视觉辅助系统', level: 2 },
      { id: '原因四镜头焦虑', text: '4. 镜头焦虑与心理压力', level: 2 },
      { id: '原因五弹幕干扰', text: '5. 弹幕干扰打乱思路', level: 2 },
      { id: '原因六准备不足', text: '6. 准备不足与过度自信', level: 2 },
      { id: '不同场景分析', text: '不同直播场景的忘词特点', level: 1 },
      { id: '带货直播忘词', text: '带货直播', level: 2 },
      { id: '知识直播忘词', text: '知识直播', level: 2 },
      { id: '游戏直播忘词', text: '游戏直播', level: 2 },
      { id: 'obs场景忘词', text: 'OBS 桌面直播', level: 2 },
      { id: '五个科学方法', text: '科学应对忘词的 5 个方法', level: 1 },
      { id: '方法一提词器', text: '方法一：提词器辅助', level: 2 },
      { id: '方法二关键词卡片', text: '方法二：关键词卡片法', level: 2 },
      { id: '方法三分段式话术', text: '方法三：分段式话术', level: 2 },
      { id: '方法四即兴过渡', text: '方法四：即兴过渡框架', level: 2 },
      { id: '方法五心理脱敏', text: '方法五：心理脱敏训练', level: 2 },
      { id: '总结', text: '真实经验总结', level: 1 },
    ],
  };

  return tocMap[article.slug] || [];
}
