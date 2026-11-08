import type { CSSProperties } from "react";

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A small, fixed set of drifting petals. Pure CSS animation (transform + opacity only); hidden for reduced motion. */
export function Petals({ count = 8, seed = 1 }: { count?: number; seed?: number }) {
  const r = rng(seed);
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const size = 9 + r() * 11;
        const dur = 16 + r() * 14;
        const style = {
          left: `${(r() * 100).toFixed(1)}%`,
          width: `${size.toFixed(1)}px`,
          height: `${(size * 0.78).toFixed(1)}px`,
          animationDuration: `${dur.toFixed(1)}s`,
          animationDelay: `-${(r() * dur).toFixed(1)}s`,
          "--drift": `${(40 + r() * 90).toFixed(0)}px`,
        } as CSSProperties;
        return <span key={i} style={style} />;
      })}
    </div>
  );
}
