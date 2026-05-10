'use client';

import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;

            // Lấy giá trị stagger từ thuộc tính style hoặc dataset
            const staggerAttr = target.getAttribute('style') || '';
            const staggerMatch = staggerAttr.match(/--stagger:\s*(\d+)/);
            const stagger = staggerMatch ? parseInt(staggerMatch[1]) : 0;

            // Kích hoạt hiệu ứng sau một khoảng delay dựa trên stagger
            setTimeout(() => {
              target.classList.add('active');
            }, stagger * 120);

            // Ngừng quan sát sau khi đã kích hoạt
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    const reveals = containerRef.current?.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale',
    );
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
};
