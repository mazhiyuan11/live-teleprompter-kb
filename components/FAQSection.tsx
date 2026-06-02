'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HOMEPAGE_FAQ } from '@/lib/articles';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-white border-y border-ink-100">
      <div className="container-site">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-ink-900">
            常见问题解答
          </h2>
          <p className="text-ink-500 mt-2 text-sm">
            关于直播提词器，你可能想问的都在这里
          </p>
          <div className="section-divider mx-auto" />
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {HOMEPAGE_FAQ.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-question"
                aria-expanded={openIndex === index}
              >
                <span className="text-left">{faq.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-ink-400 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq-answer animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View all FAQ */}
        <div className="text-center mt-8">
          <Link href="/faq" className="btn-secondary text-sm">
            查看全部常见问题 →
          </Link>
        </div>
      </div>
    </section>
  );
}
