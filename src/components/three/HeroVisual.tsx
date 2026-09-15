'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse rounded-2xl bg-muted/30" />,
});

/**
 * Defers the Three.js bundle until the hero is on screen and the browser is
 * idle, so it never competes with first paint or Core Web Vitals.
 */
export default function HeroVisual({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect data-saver connections: skip the 3D scene entirely
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    let idle: number | undefined;
    const start = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback;
      if (ric) idle = ric(() => setReady(true), { timeout: 1500 });
      else idle = window.setTimeout(() => setReady(true), 300);
    };

    if (!('IntersectionObserver' in window)) {
      start();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (idle !== undefined) {
        window.clearTimeout(idle);
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idle);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Soft glow under the laptop */}
      <div className="pointer-events-none absolute inset-x-[10%] top-[30%] bottom-[5%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.22),transparent_65%)] blur-2xl" />
      <div className="relative size-full">
        {ready ? <HeroScene /> : <div className="size-full" aria-hidden />}
      </div>
    </div>
  );
}
