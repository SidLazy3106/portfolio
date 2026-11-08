"use client";

import { useState } from "react";

/**
 * Framed real photographs (Pexels, free licence), graded to a moonlit tone with CSS.
 * If a photo fails to load, the frame falls back to an intentional dark panel instead of a broken-image icon.
 */
const PHOTOS = [
  { id: "32957877", label: "The Gate", idx: "01", alt: "A torii gate and stone lanterns at the entrance of a Japanese shrine", pos: "50% 60%" },
  { id: "2187315", label: "Lanterns", idx: "02", alt: "A stone lantern beside a pond under blooming cherry blossoms in a Kyoto garden", pos: "50% 55%" },
  { id: "19894939", label: "Still Paths", idx: "03", alt: "The entrance of Kumano Nyakuoji Shrine in Kyoto with its torii gate", pos: "50% 50%" },
];

function Frame({ p, big }: { p: (typeof PHOTOS)[number]; big?: boolean }) {
  const [ok, setOk] = useState(true);
  const src = `https://images.pexels.com/photos/${p.id}/pexels-photo-${p.id}.jpeg?auto=compress&cs=tinysrgb&w=${big ? 1500 : 900}`;
  return (
    <figure className={`photo${big ? " photo-big" : ""}`}>
      <div className="photo-img" data-parallax-layer={big ? "1" : "2"}>
        {ok && (
          <img src={src} alt={p.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" style={{ objectPosition: p.pos }} onError={() => setOk(false)} />
        )}
      </div>
      <figcaption><span>{p.idx}</span>{p.label}</figcaption>
    </figure>
  );
}

export function PhotoBand() {
  return (
    <div className="photos-grid">
      <Frame p={PHOTOS[0]} big />
      <Frame p={PHOTOS[1]} />
      <Frame p={PHOTOS[2]} />
    </div>
  );
}
