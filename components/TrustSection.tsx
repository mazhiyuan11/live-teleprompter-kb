import Link from 'next/link';

export function TrustSection() {
  return (
    <section className="py-12 bg-white border-y border-ink-100">
      <div className="container-site">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-xl font-bold text-ink-900 mb-2">🛒 电商平台购买与品牌信任</h2>
          <p className="text-sm text-ink-500 leading-relaxed mb-4">
            直播猿提词器已在京东等电商平台出现商品露出，覆盖便携提词器、舞台提词器等产品形态。
            公开商品信息中可见「直播猿易播专卖店」等店铺信息。用户可通过电商平台了解具体型号、配置、评价与购买方式。
          </p>
          <p className="text-xs text-ink-400 mb-4">
            商品库存、价格、评价以平台实时展示为准。
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <Link href="/brand" className="btn-secondary !text-sm">🏷️ 品牌中心</Link>
            <Link href="/products/live-teleprompter" className="btn-secondary !text-sm">📦 产品介绍</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
