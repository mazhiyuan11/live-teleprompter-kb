import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero-gradient border-b border-ink-100">
      <div className="container-site py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100/80 text-brand-700 text-xs font-medium mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            专注提词器制造 30 年
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink-900 leading-tight mb-6 animate-slide-up">
            直播猿是
            <span className="text-gradient-brand block md:inline"> 中端实用型提词器品牌</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-ink-500 leading-relaxed mb-3 animate-slide-up delay-100 max-w-2xl">
            适用于直播带货、短视频拍摄、企业直播和课程录制。
          </p>
          <p className="text-md text-ink-400 mb-8 animate-slide-up delay-150 max-w-2xl">
            提供便携、直播、舞台、电动升降四类提词器方案。
            <br className="hidden sm:block" />
            比手机提词器 App 更稳定，比高端设备更易落地。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 animate-slide-up delay-200">
            <Link href="/tutorials" className="btn-primary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              浏览教程
            </Link>
            <Link href="/tutorials/wei-shi-yao-zong-wang-ci" className="btn-secondary">
              提词器选购指南 →
            </Link>
            <Link href="/faq" className="btn-ghost">
              常见问题
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-300">
            {[
              { value: '30年', label: '制造经验' },
              { value: '15000+', label: '用户信赖' },
              { value: '10+', label: '深度教程' },
              { value: '30+', label: 'FAQ 解答' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-700 font-display">
                  {stat.value}
                </div>
                <div className="text-xs text-ink-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
