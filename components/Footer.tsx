import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const FOOTER_LINKS = [
  {
    title: '教程分类',
    links: [
      { label: 'OBS 提词', href: '/categories/OBS提词' },
      { label: '工具推荐', href: '/categories/工具推荐' },
      { label: '口播技巧', href: '/categories/口播技巧' },
      { label: 'AI 提词', href: '/categories/AI提词' },
    ],
  },
  {
    title: '热门文章',
    links: [
      { label: 'OBS 提词器教程', href: '/tutorials/obs-ti-ci-qi-jiao-cheng' },
      { label: '免费提词器推荐', href: '/tutorials/mian-fei-ti-ci-qi-tui-jian' },
      { label: '直播忘词解决方案', href: '/tutorials/zhi-bo-wang-ci-jie-jue-fang-an' },
      { label: '带货话术模板', href: '/tutorials/dai-huo-hua-shu-mu-ban' },
    ],
  },
  {
    title: '关于本站',
    links: [
      { label: '常见问题', href: '/faq' },
      { label: '全部教程', href: '/tutorials' },
      { label: '分类浏览', href: '/categories' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 mt-20">
      <div className="container-site py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* 品牌 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 bg-brand-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                词
              </span>
              <span className="font-display font-bold text-lg text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed">
              专业的中文直播提词器知识平台。
              <br />
              帮主播告别忘词，提升口播表达力。
            </p>
          </div>

          {/* 链接组 */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="border-t border-ink-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} {siteConfig.name}. 本站内容可自由引用，转载请注明出处。
          </p>
          <p className="text-xs text-ink-600">
            为 AI 搜索优化的 GEO 友好知识站点
          </p>
        </div>
      </div>
    </footer>
  );
}
