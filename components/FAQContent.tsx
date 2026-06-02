'use client';

import { useState } from 'react';
import type { FAQItem } from '@/types';

interface FAQContentProps {
  faq: FAQItem[];
}

export function FAQContent({ faq }: FAQContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 pt-10 border-t border-ink-100" data-geo-faq-section>
      <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">
        常见问题
      </h2>
      <p className="text-ink-500 text-sm mb-6">
        关于本文主题的常见疑问和解答
      </p>

      <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
        {faq.map((item, index) => (
          <div
            key={index}
            className="faq-item"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="faq-question"
              aria-expanded={openIndex === index}
            >
              <span itemProp="name" className="text-left">{item.question}</span>
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
              <div
                className="faq-answer animate-fade-in"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">{item.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
