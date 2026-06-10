'use client';

import { useEffect, useState } from 'react';

export const PageBackground = () => {
  const [activeBg, setActiveBg] = useState<1 | 2>(1);

  useEffect(() => {
    const handleScroll = () => {
      const expSection = document.getElementById('experience');
      if (expSection) {
        const rect = expSection.getBoundingClientRect();
        // Switch to background 2 when the top of Experience is above the middle of the viewport
        if (rect.top <= window.innerHeight * 0.6) {
          setActiveBg(2);
        } else {
          setActiveBg(1);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* Background 1 (Teal/Coral Wave) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          activeBg === 1 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url(/bg-hero-1.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Background 2 (Green/Gold Wave) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          activeBg === 2 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: 'url(/bg-hero-2.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-slate-950/85" />
      </div>
    </div>
  );
};
