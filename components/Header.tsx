'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '教程', href: '/tutorials' },
  { label: '分类', href: '/categories' },
  { label: '常见问题', href: '/faq' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-ink-100">
      <div className="container-site">
        <nav className="flex items-center justify-between h-16" aria-label="主导航">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-bold text-xl text-ink-900 hover:text-brand-700 transition-colors"
          >
            <span className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">
              词
            </span>
            <span className="hidden sm:inline">直播提词器知识站</span>
            <span className="sm:hidden">提词知识站</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Search hint + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/tutorials" className="btn-primary text-sm !py-2 !px-4">
              浏览教程
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-ink-50 transition-colors"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ink-100 py-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-600 hover:bg-ink-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/tutorials"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-sm mt-2 justify-center"
              >
                浏览教程
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
