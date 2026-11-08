"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Cinematic ink-brush "cut" between two sections (purely an artistic wipe: a brush stroke and a clipped reveal).
 * Scroll-linked, so it plays forwards and backwards with the scrollbar and never locks scrolling.
 *   1 stroke draws across -> 2 scene parts along the diagonal -> 3 next scene is revealed with a few ink flecks
 *   -> 4 halves settle and leave a thin brush seam.
 * Without JS, or with reduced motion, the CSS shows that final seam.
 * `from` should match the bottom colour of the section above, `to` the top colour of the section below.
 */
const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CUT = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%)";

export function InkSlash({ from, to }: { from: string; to: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(s: string) => el.querySelector<T>(s)!;
      const top = q<HTMLElement>(".slash-t");
      const bot = q<HTMLElement>(".slash-b");
      const stroke = q<SVGPathElement>(".slash-stroke");
      const shine = q<SVGPathElement>(".slash-shine");
      const flecks = gsap.utils.toArray<HTMLElement>(".slash-fleck", el);
      const gap = window.innerWidth < 640 ? 5 : 9;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 28%", scrub: 0.4, invalidateOnRefresh: true },
      });
      tl.fromTo(stroke, { strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, duration: 0.3 }, 0)
        .fromTo(shine, { strokeDashoffset: 1, opacity: 0.95 }, { strokeDashoffset: 0, duration: 0.3 }, 0.04)
        .fromTo(top, { clipPath: FULL }, { clipPath: CUT, duration: 0.14 }, 0.3)
        .fromTo(top, { xPercent: 0, yPercent: 0 }, { xPercent: gap * 0.45, yPercent: -gap * 1.4, duration: 0.28 }, 0.42)
        .fromTo(bot, { xPercent: 0, yPercent: 0 }, { xPercent: -gap * 0.45, yPercent: gap * 1.4, duration: 0.28 }, 0.42)
        .fromTo(flecks, { opacity: 0, x: 0, y: 0, scale: 0.4 }, {
          opacity: (i: number) => 0.9 - i * 0.05,
          x: (i: number) => (i % 2 ? -1 : 1) * (30 + i * 22),
          y: (i: number) => (i % 3 === 0 ? -1 : 1) * (14 + i * 9),
          scale: 1,
          duration: 0.3,
          stagger: 0.02,
        }, 0.44)
        .to(top, { xPercent: 0, yPercent: 0, duration: 0.26 }, 0.74)
        .to(bot, { xPercent: 0, yPercent: 0, duration: 0.26 }, 0.74)
        .to(flecks, { opacity: 0, duration: 0.2 }, 0.8)
        .to(shine, { opacity: 0.0, duration: 0.2 }, 0.8)
        .to(stroke, { opacity: 0.9, duration: 0.01 }, 1);
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="slash" aria-hidden="true" style={{ "--from": from, "--to": to } as CSSProperties}>
      <div className="slash-ink" />
      <div className="slash-b" />
      <div className="slash-t" />
      <svg className="slash-line" viewBox="0 0 1000 100" preserveAspectRatio="none" focusable="false">
        <path className="slash-stroke" d="M1002 -2 L-2 102" pathLength={1} />
        <path className="slash-shine" d="M1002 -2 L-2 102" pathLength={1} />
      </svg>
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} className="slash-fleck" style={{ left: `${14 + i * 12}%`, top: `${78 - i * 11}%`, width: 5 + (i % 3) * 3, height: 5 + (i % 3) * 3 }} />
      ))}
    </div>
  );
}
