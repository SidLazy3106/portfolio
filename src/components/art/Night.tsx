import { roof } from "./Japan";

/* Moonlit temple scene in separate layers (sky / temple / foreground) so the hero can sandwich a giant title between them.
   Original SVG artwork; decorative only. */

function lcg(seed: number) {
  let a = seed >>> 0;
  return () => ((a = (Math.imul(a, 1664525) + 1013904223) >>> 0) / 4294967296);
}

const GLOW = "#F0D28A";

/** Layer 1: night sky, stars, far ridges and mist. (The moon is an HTML element so it can be placed per breakpoint.) */
export function NightSky() {
  const r = lcg(11);
  const stars = Array.from({ length: 56 }, () => ({ x: r() * 1440, y: r() * 520, s: 0.5 + r() * 1.3, o: 0.3 + r() * 0.6 }));
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <linearGradient id="ns-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060914" />
          <stop offset="0.5" stopColor="#10152a" />
          <stop offset="0.8" stopColor="#231c33" />
          <stop offset="1" stopColor="#35222e" />
        </linearGradient>
        <linearGradient id="ns-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b5a82" stopOpacity="0" />
          <stop offset="1" stopColor="#8a6a86" stopOpacity="0.34" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#ns-sky)" />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x.toFixed(0)} cy={s.y.toFixed(0)} r={s.s.toFixed(1)} fill="#fff" opacity={s.o.toFixed(2)} />
      ))}
      <path d="M0 640 L140 560 L260 610 L430 500 L600 600 L760 540 L900 620 L1080 520 L1240 600 L1440 540 V900 H0Z" fill="#171c31" />
      <rect y="560" width="1440" height="200" fill="url(#ns-mist)" />
      <path d="M0 730 L180 660 L340 706 L520 640 L700 716 L880 668 L1060 724 L1240 660 L1440 716 V900 H0Z" fill="#10142a" />
      <rect y="690" width="1440" height="120" fill="url(#ns-mist)" opacity="0.7" />
      <rect y="780" width="1440" height="120" fill="#0b0e15" />
    </svg>
  );
}

function windows(x: number, y: number, n: number, step: number, w = 24, h = 32) {
  return Array.from({ length: n }, (_, i) => (
    <g key={i}>
      <rect x={x + i * step - 3} y={y - 3} width={w + 6} height={h + 6} fill="#0a0d18" />
      <rect x={x + i * step} y={y} width={w} height={h} fill={GLOW} opacity="0.92" />
      <path d={`M${x + i * step + w / 2} ${y} v${h} M${x + i * step} ${y + h / 2} h${w}`} stroke="#6b4a2a" strokeWidth="1.5" opacity="0.7" />
    </g>
  ));
}

function stoneLantern(cx: number, by: number, s: number) {
  return (
    <g transform={`translate(${cx} ${by}) scale(${s})`}>
      <circle cx="0" cy="-58" r="62" fill="url(#nt-lamp)" />
      <rect x="-16" y="-8" width="32" height="8" fill="#1d2233" />
      <rect x="-7" y="-46" width="14" height="40" fill="#222839" />
      <rect x="-15" y="-66" width="30" height="22" fill="#1b2030" />
      <rect x="-9" y="-62" width="18" height="14" fill={GLOW} opacity="0.95" />
      <path d="M-26 -66 L0 -90 L26 -66 Z" fill="#272e43" />
      <circle cx="0" cy="-94" r="4" fill="#272e43" />
    </g>
  );
}

/** Layer 2: temple, stairs, torii, stone lanterns. Centred in a 1440 box; CSS shifts it on wide screens. */
export function NightTemple() {
  const steps = Array.from({ length: 8 }, (_, i) => ({ w: 250 + i * 30, y: 704 + i * 20 }));
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <radialGradient id="nt-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f0b868" stopOpacity="0.2" />
          <stop offset="1" stopColor="#f0b868" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nt-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f3c677" stopOpacity="0.42" />
          <stop offset="1" stopColor="#f3c677" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="720" cy="560" rx="420" ry="300" fill="url(#nt-halo)" />
      {/* top tier */}
      <rect x="652" y="426" width="136" height="48" fill="#0f1220" />
      {windows(664, 436, 3, 40, 20, 28)}
      <path d={roof(720, 428, 118, 44)} fill="#161c2f" stroke="#3b4260" strokeWidth="2" />
      <rect x="717" y="352" width="6" height="38" fill="#2a3047" />
      <path d="M708 372 h24 M711 360 h18" stroke="#2a3047" strokeWidth="3" />
      {/* middle tier */}
      <rect x="600" y="506" width="240" height="60" fill="#0f1220" />
      {windows(618, 518, 6, 38, 22, 30)}
      <path d={roof(720, 510, 176, 50)} fill="#161c2f" stroke="#3b4260" strokeWidth="2" />
      {/* lower tier */}
      <rect x="520" y="596" width="400" height="92" fill="#0f1220" />
      {windows(542, 612, 8, 48, 26, 36)}
      <path d={roof(720, 600, 258, 58)} fill="#161c2f" stroke="#3b4260" strokeWidth="2" />
      <rect x="516" y="684" width="408" height="8" fill="#1b2134" />
      {/* stairs */}
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={720 - s.w} y={s.y} width={s.w * 2} height="20" fill={i % 2 ? "#181d2e" : "#1c2236"} />
          <rect x={720 - s.w} y={s.y} width={s.w * 2} height="2" fill="#3b4260" opacity="0.7" />
        </g>
      ))}
      {/* torii */}
      <g>
        <rect x="654" y="596" width="16" height="118" fill="#9c342a" />
        <rect x="770" y="596" width="16" height="118" fill="#9c342a" />
        <rect x="664" y="632" width="112" height="10" fill="#8a2d25" />
        <path d="M630 596 Q720 576 810 596 L804 612 Q720 594 636 612 Z" fill="#b53b2e" />
        <path d="M636 612 Q720 594 804 612 L804 618 Q720 600 636 618 Z" fill="#6a1f1b" />
        <rect x="714" y="612" width="12" height="20" fill="#6a1f1b" />
      </g>
      {stoneLantern(494, 716, 1.15)}
      {stoneLantern(946, 716, 1.15)}
    </svg>
  );
}

function blades(seed: number, n: number, x0: number, x1: number, baseY: number, hMin: number, hMax: number) {
  const r = lcg(seed);
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * (x1 - x0);
    const h = hMin + r() * (hMax - hMin);
    const lean = (r() - 0.5) * 26;
    d += `M${x.toFixed(0)} ${baseY} q${(lean * 0.2).toFixed(0)} ${(-h * 0.6).toFixed(0)} ${lean.toFixed(0)} ${-h.toFixed(0)} `;
  }
  return d;
}

function leaves(seed: number, n: number, cx: number, cy: number, rx: number, ry: number, rMin: number, rMax: number) {
  const r = lcg(seed);
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, k = Math.sqrt(r());
    const x = cx + Math.cos(a) * rx * k, y = cy + Math.sin(a) * ry * k, rr = rMin + r() * (rMax - rMin);
    d += `M${(x - rr).toFixed(0)} ${y.toFixed(0)} a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 0 ${(rr * 2).toFixed(1)} 0 a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 0 ${(-rr * 2).toFixed(1)} 0 `;
  }
  return d;
}

/** Layer 4: mossy mounds, grass, maple and blossom foliage, a glowing lantern. Bottom edge is solid page-ink so it joins the next section. */
export function NightFront() {
  return (
    <svg viewBox="0 0 1440 460" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <radialGradient id="nf-lamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f3c677" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f3c677" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* far low mound */}
      <path d="M300 462 Q720 372 1140 462Z" fill="#101c14" />
      {/* left mound */}
      <path d="M-30 462 V352 Q110 276 290 336 Q420 380 560 462Z" fill="#17261b" />
      <path d="M40 462 Q150 346 300 372 Q400 396 470 462Z" fill="#203222" opacity="0.8" />
      {/* right mound */}
      <path d="M840 462 Q1010 348 1190 372 Q1330 390 1470 318 V462Z" fill="#17261b" />
      <path d="M980 462 Q1120 372 1260 396 Q1340 410 1400 462Z" fill="#203222" opacity="0.8" />
      <path d={blades(5, 120, -10, 560, 462, 18, 62)} fill="none" stroke="#2f4a33" strokeWidth="2" strokeLinecap="round" />
      <path d={blades(9, 120, 840, 1450, 462, 18, 62)} fill="none" stroke="#2f4a33" strokeWidth="2" strokeLinecap="round" />
      <path d={blades(13, 70, 380, 1060, 462, 10, 34)} fill="none" stroke="#223a27" strokeWidth="2" strokeLinecap="round" />
      {/* lantern on the left mound */}
      <g transform="translate(262 372)">
        <circle cx="0" cy="-28" r="66" fill="url(#nf-lamp)" />
        <rect x="-18" y="-8" width="36" height="9" fill="#1a1f2e" />
        <rect x="-8" y="-40" width="16" height="34" fill="#222839" />
        <rect x="-15" y="-58" width="30" height="20" fill="#1b2030" />
        <rect x="-9" y="-54" width="18" height="12" fill={GLOW} />
        <path d="M-26 -58 L0 -80 L26 -58Z" fill="#2a3148" />
      </g>
      {/* maple branch (left) */}
      <path d="M-20 360 C40 330 80 300 120 250 M60 316 C90 316 120 330 150 340" fill="none" stroke="#1b1410" strokeWidth="7" strokeLinecap="round" />
      <path d={leaves(21, 26, 70, 292, 70, 46, 7, 13)} fill="#a8332a" />
      <path d={leaves(22, 20, 90, 276, 66, 40, 6, 11)} fill="#d4642f" />
      <path d={leaves(23, 12, 120, 340, 50, 24, 5, 9)} fill="#7f2623" />
      {/* blossom + maple (right) */}
      <path d="M1470 330 C1400 316 1360 296 1320 246 M1380 304 C1350 306 1320 320 1296 336" fill="none" stroke="#1b1410" strokeWidth="7" strokeLinecap="round" />
      <path d={leaves(31, 24, 1360, 292, 72, 44, 7, 12)} fill="#e8a8b2" />
      <path d={leaves(32, 14, 1346, 276, 60, 34, 5, 9)} fill="#f6d2d8" />
      <path d={leaves(33, 16, 1310, 336, 50, 24, 5, 9)} fill="#c4492e" />
      <rect y="440" width="1440" height="22" fill="#0b0e15" />
    </svg>
  );
}
