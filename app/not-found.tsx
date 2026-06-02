import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - 页面未找到',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container-site flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="font-display text-3xl font-bold text-ink-900 mb-3">
          页面未找到
        </h1>
        <p className="text-ink-500 mb-8 max-w-md">
          你访问的页面不存在或已被移动。试试搜索或浏览我们的教程内容。
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
          <Link href="/tutorials" className="btn-secondary">
            浏览教程
          </Link>
        </div>
      </div>
    </div>
  );
}
