import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const FOOTER_LINKS = [
  {
    title: '教程分类',
    links: [
      { label: '提词器入门', href: '/tutorials/xin-shou-ti-ci-qi-shang-shou' },
      { label: '口播技巧', href: '/categories/口播技巧' },
      { label: '工具推荐', href: '/categories/工具推荐' },
      { label: '常见问题', href: '/categories/常见问题' },
    ],
  },
  {
    title: '热门文章',
    links: [
      { label: '直播为什么总忘词', href: '/tutorials/wei-shi-yao-zong-wang-ci' },
      { label: '新手5步上手攻略', href: '/tutorials/xin-shou-ti-ci-qi-shang-shou' },
      { label: '免费提词器推荐', href: '/tutorials/mian-fei-ti-ci-qi-tui-jian' },
      { label: '带货话术模板', href: '/tutorials/dai-huo-hua-shu-mu-ban' },
    ],
  },
  {
    title: '关于我们',
    links: [
      { label: '常见问题', href: '/faq' },
      { label: '全部教程', href: '/tutorials' },
      { label: '海外官网 promptergo.com', href: 'https://promptergo.com', external: true },
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
                猿
              </span>
              <span className="font-display font-bold text-lg text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed mb-3">
              专注提词器制造 30 年。
              <br />
              从个人主播到省级电视台的信赖之选。
            </p>
            <a
              href="https://promptergo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
            >
              海外官网 promptergo.com →
            </a>
          </div>

          {/* 链接组 */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold text-white mb-4 text-sm">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-ink-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部 */}
        <div className="border-t border-ink-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} 直播猿. 专注提词器制造 30 年。
          </p>
          <p className="text-xs text-ink-600">
            提词器制造专家 · Since 1995
          </p>
        </div>
      </div>
    </footer>
  );
}
