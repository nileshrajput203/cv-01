import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Disable browser automatic scroll restoration to ensure top start
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Only initialize smooth scroll on desktop / mouse devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      // Allow mobile and touch devices to use native 120Hz hardware scrolling without lag
      return;
    }

    const lenis = new Lenis({
      duration: 0.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: false, // Direct native 1:1 hardware wheel response to eliminate floaty input lag
      syncTouch: false,
    });

    (window as any).__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing delay to prevent stuttering

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  return <>{children}</>;
};
