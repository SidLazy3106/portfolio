"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Screenshot } from "@/content/site";
import { ProjectArt } from "./art/ProjectArt";
import { ChevronLeft, ChevronRight, Close, Expand } from "./Icons";

function Slide({ s, priority, sizes }: { s: Screenshot; priority?: boolean; sizes: string }) {
  if (s.src) {
    return <Image src={s.src} alt={s.caption} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />;
  }
  if (s.art) return <ProjectArt kind={s.art.kind} variant={s.art.variant} />;
  return null;
}

export function Gallery({ items, title }: { items: Screenshot[]; title: string }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const n = items.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (!full) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [full, go]);

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  const cur = items[i];
  const counter = `${i + 1} / ${n}`;

  return (
    <section aria-roledescription="carousel" aria-label={`${title} gallery`}>
      <div className="stage" {...swipe}>
        <div className="stage-in" key={i} aria-live="polite">
          <Slide s={cur} priority={i === 0} sizes="(max-width: 1200px) 100vw, 1136px" />
        </div>
        {n > 1 && (
          <>
            <button type="button" className="g-nav g-prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
            <button type="button" className="g-nav g-next" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
          </>
        )}
        <button type="button" className="g-full" onClick={() => setFull(true)} aria-label="View image full screen"><Expand /></button>
      </div>
      <div className="g-bar">
        <p className="g-cap">{cur.caption}</p>
        {n > 1 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="dots">
              {items.map((_, k) => (
                <button key={k} type="button" className="dot" aria-current={k === i} aria-label={`Show image ${k + 1} of ${n}`} onClick={() => setI(k)}>
                  <span />
                </button>
              ))}
            </div>
            <span className="g-count">{counter}</span>
          </div>
        )}
      </div>
      {n > 1 && (
        <div className="thumbs">
          {items.map((s, k) => (
            <button key={k} type="button" className="thumb" aria-current={k === i} aria-label={`Image ${k + 1}: ${s.caption}`} onClick={() => setI(k)}>
              {s.src ? <Image src={s.src} alt="" fill sizes="160px" style={{ objectFit: "cover" }} /> : s.art ? <ProjectArt kind={s.art.kind} variant={s.art.variant} decorative /> : null}
            </button>
          ))}
        </div>
      )}

      {full && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} — full-screen image`} onClick={(e) => e.target === e.currentTarget && setFull(false)}>
          <button ref={closeRef} type="button" className="g-full lb-close" onClick={() => setFull(false)} aria-label="Close full-screen view"><Close size={20} /></button>
          <div className="stage" {...swipe}>
            <div className="stage-in" key={`f${i}`}>
              <Slide s={cur} sizes="100vw" />
            </div>
            {n > 1 && (
              <>
                <button type="button" className="g-nav g-prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft /></button>
                <button type="button" className="g-nav g-next" onClick={() => go(1)} aria-label="Next image"><ChevronRight /></button>
              </>
            )}
          </div>
          <p className="lb-cap">{cur.caption} · {counter}</p>
        </div>
      )}
    </section>
  );
}
