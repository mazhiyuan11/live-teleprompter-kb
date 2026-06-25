/**
 * 直播猿电商链接配置
 * 所有外链统一管理，不用硬编码
 */
export const commerceLinks = {
  jd: {
    storeName: '直播猿易播专卖店',
    storeUrl: '', // 待填入真实京东店铺链接
    note: '京东等电商平台可查看部分直播猿提词器型号。商品信息、价格、评价以平台实时展示为准。',
    visible: true,
  },
  // 预留其他平台
  // taobao: { ... },
  // pdd: { ... },
};

export function getJdLink(): string | null {
  return commerceLinks.jd.storeUrl || null;
}
