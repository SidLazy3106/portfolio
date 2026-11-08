"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Two shoji (paper screen) panels that slide apart as the band scrolls through the viewport, opening onto the next scene.
 * Decorative and pointer-events: none. Static fallback (reduced motion / no JS): doors fully open, nothing visible.
 */
export function ShojiDoors() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const l = el.querySelector<HTMLElement>(".shoji-l")!;
      const r = el.querySelector<HTMLElement>(".shoji-r")!;
      gsap.set([l, r], { visibility: "visible" });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 40%", scrub: 0.4 },
      });
      tl.fromTo(l, { xPercent: 0 }, { xPercent: -101 }, 0).fromTo(r, { xPercent: 0 }, { xPercent: 101 }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="shoji" aria-hidden="true">
      <div className="shoji-l" />
      <div className="shoji-r" />
    </div>
  );
}
