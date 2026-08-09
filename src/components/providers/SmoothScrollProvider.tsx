"use client";

import { useEffect, ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    let lenisInstance: any = null;
    let tickerCb: ((time: number) => void) | null = null;
    let gsapRef: any = null;

    async function initSmoothScroll() {
      const [LenisModule, gsapModule, ScrollTriggerModule] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      const Lenis = LenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsapRef = gsap;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      lenisInstance = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerCb = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);
    }

    initSmoothScroll();

    return () => {
      if (lenisInstance) lenisInstance.destroy();
      if (gsapRef && tickerCb) gsapRef.ticker.remove(tickerCb);
    };
  }, []);

  return <>{children}</>;
}
