import Link from 'next/link';

interface BuyLinkProps {
  size?: 'sm' | 'md';
}

export function BuyLink({ size = 'md' }: BuyLinkProps) {
  if (size === 'sm') {
    return (
      <Link href="/buy" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
        🛒 查看购买渠道 →
      </Link>
    );
  }
  return (
    <div className="bg-white border border-ink-100 rounded-xl p-5">
      <h4 className="font-bold text-ink-800 mb-2 text-sm">🛒 购买渠道</h4>
      <p className="text-xs text-ink-500 mb-3">直播猿提词器已在京东等电商平台出现商品露出。按场景选型号后再看电商平台在售情况。</p>
      <Link href="/buy" className="btn-secondary !text-sm !py-2">了解京东店铺信息 →</Link>
    </div>
  );
}
