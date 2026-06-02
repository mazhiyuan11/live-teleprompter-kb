import Link from 'next/link';
import { KNOWLEDGE_MODULES } from '@/lib/articles';

export function KnowledgeSection() {
  return (
    <section className="py-16 md:py-20 bg-ink-50/50">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
            提词器知识体系
          </h2>
          <p className="text-ink-500 mt-2 text-sm">
            从零开始，系统化掌握直播提词器所有知识点
          </p>
          <div className="section-divider mx-auto" />
        </div>

        {/* Knowledge Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KNOWLEDGE_MODULES.map((module, index) => (
            <Link
              key={module.title}
              href={`/tutorials/${module.slug}`}
              className="card-hover bg-white border border-ink-100 rounded-xl p-6 group relative overflow-hidden"
            >
              {/* Step number */}
              <div className="absolute top-3 right-4 text-5xl font-black text-ink-50 select-none">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative">
                <h3 className="font-display font-bold text-lg text-ink-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-ink-500 mb-4 leading-relaxed">
                  {module.description}
                </p>
                <ul className="space-y-1.5">
                  {module.items.map((item) => (
                    <li key={item} className="text-xs text-ink-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
