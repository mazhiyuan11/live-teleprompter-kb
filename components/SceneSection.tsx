import Link from 'next/link';
import { SCENES } from '@/lib/articles';

export function SceneSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
            适用场景
          </h2>
          <p className="text-ink-500 mt-2 text-sm">
            无论你做什么类型的直播，提词器都能帮到你
          </p>
          <div className="section-divider mx-auto" />
        </div>

        {/* Scene Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENES.map((scene) => (
            <Link
              key={scene.title}
              href={`/tutorials/${scene.slug}`}
              className="card-hover bg-white border border-ink-100 rounded-xl p-6 group"
            >
              <div className="text-3xl mb-3">{scene.icon}</div>
              <h3 className="font-display font-bold text-lg text-ink-900 mb-2 group-hover:text-brand-700 transition-colors">
                {scene.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                {scene.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 mt-3 group-hover:gap-2 transition-all">
                查看方案
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
