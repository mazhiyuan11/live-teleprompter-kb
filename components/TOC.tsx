'use client';

import { useEffect, useState } from 'react';
import type { TOCItem } from '@/types';

interface TOCProps {
  items: TOCItem[];
}

export function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="文章目录">
      <h4 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">
        目录
      </h4>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`toc-link ${activeId === item.id ? 'active' : ''}`}
              style={{ paddingLeft: `${12 + (item.level - 1) * 12}px` }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
