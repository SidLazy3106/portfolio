"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-linked multi-layer parallax. Any descendant tagged data-parallax-layer="1..4"
 * is translated by that many percent of its own height across the section's scroll
 * (layer 1 travels the most, so it reads as the deepest and slowest; layer 4 the least,
 * so it tracks the page and reads as the closest).
 *
 * - Desktop: all four layers.
 * - Tablet / phone: background layers only, lighter, so text and touch scrolling stay calm.
 * - prefers-reduced-motion: nothing animates and the hero stays static.
 * Cleanup reverts only the animations created here, never other ScrollTriggers.
 */
const FULL: Record<string, number> = { "1": 70, "2": 55, "3": 40, "4": 10 };
const COMPACT: Record<string, number> = { "1": 40, "2": 28 };

type Props = {
  children: ReactNode;
  id?: string;
  className?: string;
  "aria-label"?: string;
  /** "hero": layers drift while the section scrolls off the top. "pass": layers drift across the whole time the section is on screen. */
  mode?: "hero" | "pass";
  /** Scales the movement (use < 1 for tall content sections). */
  strength?: number;
};

export function ParallaxHero({ children, id, className, "aria-label": ariaLabel, mode = "hero", strength = 1 }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        full: "(min-width: 961px) and (prefers-reduced-motion: no-preference)",
        compact: "(max-width: 960px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const amounts = ctx.conditions?.full ? FULL : COMPACT;
        const pass = mode === "pass";
        const tl = gsap.timeline({
          scrollTrigger: pass
            ? { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
            : { trigger: el, start: "0% 0%", end: "100% 0%", scrub: true },
        });
        el.querySelectorAll<HTMLElement>("[data-parallax-layer]").forEach((layer) => {
          const y = (amounts[layer.dataset.parallaxLayer ?? ""] ?? 0) * strength;
          if (!y) return;
          if (pass) tl.fromTo(layer, { yPercent: -y / 2 }, { yPercent: y / 2, ease: "none" }, 0);
          else tl.to(layer, { yPercent: y, ease: "none" }, 0);
        });
      },
    );

    // Web fonts change the hero's height after first paint; re-measure once they land.
    let live = true;
    document.fonts?.ready.then(() => live && ScrollTrigger.refresh());

    return () => {
      live = false;
      mm.revert();
    };
  }, [mode, strength]);

  return (
    <section ref={root} id={id} className={className} aria-label={ariaLabel} data-parallax-layers>
      {children}
    </section>
  );
}
