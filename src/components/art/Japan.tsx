/* Original, hand-built Japanese scenery. All SVG, decorative only (aria-hidden at the call site). */

const INK = "#171512";
const IVORY = "#F0E5D0";
const VERMILION = "#B9361F";
const WOOD = "#493326";
const MOSS = "#59634B";
const BLOSSOM = "#E8A8B2";

/** Curved-eave roof tier, used for pagodas and houses. */
export function roof(cx: number, y: number, w: number, h: number) {
  const l = cx - w, r = cx + w;
  return `M${l} ${y + 12} Q${cx - w * 0.62} ${y + 6} ${cx - w * 0.34} ${y - h * 0.55} L${cx - w * 0.16} ${y - h} L${cx + w * 0.16} ${y - h} L${cx + w * 0.34} ${y - h * 0.55} Q${cx + w * 0.62} ${y + 6} ${r} ${y + 12} Q${cx + w * 0.5} ${y + 4} ${cx} ${y + 6} Q${cx - w * 0.5} ${y + 4} ${l} ${y + 12} Z`;
}

function pagoda(cx: number, baseY: number, s: number) {
  const tiers = [0, 1, 2].map((i) => {
    const w = (74 - i * 16) * s;
    const y = baseY - i * 58 * s - 34 * s;
    return { w, y, h: 24 * s };
  });
  return (
    <g fill={INK}>
      {tiers.map((t, i) => (
        <g key={i}>
          <path d={roof(cx, t.y, t.w, t.h)} />
          <rect x={cx - t.w * 0.46} y={t.y + 8} width={t.w * 0.92} height={26 * s} />
        </g>
      ))}
      <rect x={cx - 2 * s} y={baseY - 3 * 58 * s - 6 * s} width={4 * s} height={46 * s} />
      <path d={`M${cx - 9 * s} ${baseY - 3 * 58 * s + 8 * s} h${18 * s} M${cx - 7 * s} ${baseY - 3 * 58 * s + 18 * s} h${14 * s}`} stroke={INK} strokeWidth={3 * s} />
      <rect x={cx - 52 * s} y={baseY - 12 * s} width={104 * s} height={12 * s} />
    </g>
  );
}

function torii(cx: number, baseY: number, s: number) {
  const w = 120 * s, top = baseY - 170 * s;
  return (
    <g fill={INK}>
      <path d={`M${cx - w - 26 * s} ${top + 6 * s} Q${cx} ${top - 16 * s} ${cx + w + 26 * s} ${top + 6 * s} L${cx + w + 14 * s} ${top + 26 * s} Q${cx} ${top + 8 * s} ${cx - w - 14 * s} ${top + 26 * s} Z`} />
      <rect x={cx - w - 4 * s} y={top + 44 * s} width={2 * w + 8 * s} height={12 * s} />
      <rect x={cx - w * 0.82 - 9 * s} y={top + 22 * s} width={18 * s} height={baseY - top - 22 * s} />
      <rect x={cx + w * 0.82 - 9 * s} y={top + 22 * s} width={18 * s} height={baseY - top - 22 * s} />
      <rect x={cx - 6 * s} y={top + 24 * s} width={12 * s} height={22 * s} />
    </g>
  );
}

/** Hero layer 1: layered mountains. Bottom edge is a solid ground colour so it joins the next section cleanly. */
export function Mountains() {
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <linearGradient id="jp-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={IVORY} stopOpacity="0" />
          <stop offset="1" stopColor={IVORY} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path d="M0 360 L120 300 L210 340 L340 250 L470 330 L560 290 L700 360 L820 270 L940 340 L1060 262 L1200 350 L1320 290 L1440 340 V640 H0 Z" fill={IVORY} opacity="0.1" />
      <path d="M0 430 L150 360 L260 410 L420 320 L560 410 L640 380 L800 450 L960 330 L1010 316 L1060 330 L1220 440 L1340 380 L1440 430 V640 H0 Z" fill={INK} opacity="0.16" />
      <rect y="380" width="1440" height="200" fill="url(#jp-mist)" />
      <path d="M0 520 L110 470 L230 505 L380 440 L520 510 L690 460 L840 520 L1000 470 L1160 520 L1300 480 L1440 520 V640 H0 Z" fill={INK} opacity="0.3" />
      <path d="M0 590 L180 548 L340 580 L520 540 L720 584 L940 546 L1140 582 L1300 556 L1440 584 V640 H0 Z" fill="#7A2016" />
    </svg>
  );
}

/** Hero layer 2: pagoda, torii and rooftops. */
export function Roofline() {
  return (
    <svg viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" focusable="false">
      <g opacity="0.78">
        {pagoda(1290, 396, 1.05)}
        {torii(150, 396, 1)}
        <g fill={INK}>
          <path d={roof(560, 330, 150, 46)} />
          <rect x={430} y={338} width={260} height={58} />
          <path d={roof(820, 352, 100, 30)} />
          <rect x={738} y={358} width={164} height={38} />
        </g>
        <g fill={IVORY} opacity="0.5">
          <rect x={452} y={350} width={36} height={34} />
          <rect x={500} y={350} width={36} height={34} />
          <rect x={548} y={350} width={36} height={34} />
          <rect x={596} y={350} width={36} height={34} />
          <rect x={644} y={350} width={30} height={34} />
        </g>
        <g stroke={INK} strokeWidth="2" opacity="0.6">
          <path d="M452 367 h36 M500 367 h36 M548 367 h36 M596 367 h36 M644 367 h30" />
        </g>
      </g>
      <rect y="396" width="1440" height="24" fill="#7A2016" />
    </svg>
  );
}

/** The poster: an ivory sun, a travelling samurai in silhouette (sword sheathed), a hanko seal and vertical lettering. */
export function SamuraiPoster() {
  return (
    <svg viewBox="0 0 520 560" focusable="false" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="jp-sun" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#F7EEDC" />
          <stop offset="1" stopColor="#E7D7B6" />
        </radialGradient>
        <filter id="jp-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0.09  0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0.35 -0.12" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <circle cx="272" cy="262" r="206" fill="url(#jp-sun)" />
      <circle cx="272" cy="262" r="206" fill={IVORY} filter="url(#jp-grain)" opacity="0.7" />
      <circle cx="272" cy="262" r="220" fill="none" stroke={IVORY} strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="2 7" />
      {/* distant ridge inside the sun */}
      <path d="M72 360 L150 300 L210 340 L290 270 L360 330 L420 296 L472 350 Q472 400 440 440 H104 Q72 410 72 360Z" fill={INK} opacity="0.1" />
      {/* the traveller */}
      <g transform="translate(122 38) scale(0.95)">
        <ellipse cx="150" cy="490" rx="150" ry="13" fill={INK} opacity="0.85" />
        <path d="M262 124 L272 486" stroke="#6B4A35" strokeWidth="7" strokeLinecap="round" />
        <path d="M104 126 Q150 112 196 126 L238 322 Q246 400 240 470 L60 470 Q54 400 62 322 Z" fill={INK} />
        <path d="M110 330 L100 470 M150 330 L150 470 M190 330 L200 470" stroke={IVORY} strokeOpacity="0.16" strokeWidth="2" />
        <path d="M70 292 L232 278 L234 312 L68 326 Z" fill={VERMILION} />
        <path d="M196 130 Q250 170 262 232 L244 242 Q226 192 190 160 Z" fill={INK} />
        <circle cx="262" cy="236" r="9" fill={INK} />
        <path d="M104 130 Q56 200 80 290 L132 262 Q118 200 140 140 Z" fill="#241E19" stroke={IVORY} strokeOpacity="0.35" strokeWidth="1.2" />
        <path d="M52 330 L266 264" stroke={IVORY} strokeOpacity="0.75" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M50 331 L100 316" stroke="#D9A441" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="106" cy="314" rx="3.4" ry="9" fill="#D9A441" transform="rotate(-18 106 314)" />
        <ellipse cx="150" cy="113" rx="18" ry="20" fill={INK} />
        <path d="M150 12 L40 96 Q150 114 260 96 Z" fill={INK} />
        <path d="M150 12 L108 102 M150 12 L192 102 M150 12 L150 106" stroke={IVORY} strokeOpacity="0.22" strokeWidth="1.4" />
        <path d="M40 96 Q150 114 260 96" fill="none" stroke={IVORY} strokeOpacity="0.4" strokeWidth="1.6" />
        <rect x="84" y="470" width="50" height="13" rx="2" fill={INK} />
        <rect x="168" y="470" width="50" height="13" rx="2" fill={INK} />
      </g>
      {/* hanko seal */}
      <g transform="translate(60 52) rotate(-6)">
        <rect width="52" height="52" rx="4" fill={VERMILION} />
        <rect x="3.5" y="3.5" width="45" height="45" rx="2" fill="none" stroke={IVORY} strokeOpacity="0.6" strokeWidth="1.2" />
        <text x="26" y="39" textAnchor="middle" fontSize="33" fill={IVORY} style={{ fontFamily: "var(--kanji)", fontWeight: 800 }}>侍</text>
      </g>
      {/* vertical lettering */}
      <text x="496" y="120" fontSize="30" fill={IVORY} fillOpacity="0.9" style={{ fontFamily: "var(--kanji)", fontWeight: 800, writingMode: "vertical-rl", letterSpacing: "0.18em" }}>武士道</text>
    </svg>
  );
}

/** Seeded blossom layout so the branch is the same on every render. */
const FLOWERS: [number, number, number, number][] = [
  [296, 226, 1.15, 10], [350, 282, 1.0, 70], [440, 238, 1.1, 140], [350, 96, 1.05, 30], [296, 150, 1.0, 200],
  [450, 36, 0.95, 90], [320, 198, 0.85, 260], [372, 254, 0.9, 120], [412, 152, 1.1, 20], [386, 188, 1.0, 310],
  [470, 202, 0.9, 50], [500, 150, 1.05, 170], [532, 108, 1.0, 240], [520, 64, 0.95, 80], [562, 84, 0.9, 330],
  [598, 36, 1.0, 150], [474, 72, 0.9, 210], [430, 104, 1.1, 40], [334, 126, 0.8, 100], [462, 258, 0.8, 280],
  [404, 214, 0.85, 12], [344, 168, 0.8, 190], [510, 26, 0.9, 60], [380, 130, 0.75, 300],
];
const BUDS: [number, number][] = [[290, 240], [342, 298], [436, 254], [336, 90], [286, 146], [446, 28], [366, 270], [414, 130]];

/** Cherry blossom branch entering from the top-right corner. Flip with the `flip` prop for the top-left. */
export function CherryBranch({ uid = "a", flip = false }: { uid?: string; flip?: boolean }) {
  const f = `sk-flower-${uid}`;
  return (
    <svg viewBox="0 0 640 560" focusable="false" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <defs>
        <radialGradient id={`sk-glow-${uid}`} cx="1" cy="0" r="0.8">
          <stop offset="0" stopColor="#FFF3E0" stopOpacity="0.38" />
          <stop offset="1" stopColor="#FFF3E0" stopOpacity="0" />
        </radialGradient>
        <symbol id={f} overflow="visible">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-9" rx="7.5" ry="10.5" fill={BLOSSOM} stroke="#C97A8B" strokeWidth="0.6" transform={`rotate(${a})`} />
          ))}
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={`l${a}`} cx="0" cy="-12" rx="3" ry="5" fill="#F8DDE1" opacity="0.8" transform={`rotate(${a})`} />
          ))}
          <circle r="3" fill="#B84A63" />
          <path d="M0 0 L-4 -6 M0 0 L4 -6 M0 0 L0 -7" stroke="#8D2F46" strokeWidth="0.9" />
        </symbol>
      </defs>
      <rect width="640" height="560" fill={`url(#sk-glow-${uid})`} />
      <g fill="none" stroke={WOOD} strokeLinecap="round">
        <path d="M660 -14 C600 40 540 62 478 96 C430 122 410 156 352 178" strokeWidth="15" />
        <path d="M478 96 C470 150 440 190 396 214" strokeWidth="9" />
        <path d="M560 52 C560 110 534 150 500 176" strokeWidth="7" />
        <path d="M352 178 C330 188 312 204 296 226" strokeWidth="5" />
        <path d="M396 214 C380 238 372 262 350 282" strokeWidth="4.5" />
        <path d="M500 176 C490 206 470 224 440 238" strokeWidth="4" />
        <path d="M430 118 C400 100 380 92 350 96" strokeWidth="4.5" />
        <path d="M352 178 C342 160 320 150 296 150" strokeWidth="3.5" />
        <path d="M560 52 C520 40 480 28 450 36" strokeWidth="3.5" />
        <path d="M600 30 C580 -4 540 -10 510 24" strokeWidth="3" />
      </g>
      {BUDS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.6" fill="#D98FA0" />
      ))}
      {FLOWERS.map(([x, y, s, r], i) => (
        <use key={i} href={`#${f}`} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
      ))}
    </svg>
  );
}

/** Hanging paper lantern with a swaying animation (CSS). */
export function Lantern() {
  return (
    <svg viewBox="0 0 90 230" focusable="false">
      <path d="M45 0 V44" stroke={INK} strokeWidth="2" />
      <rect x="27" y="42" width="36" height="9" rx="2" fill={INK} />
      <ellipse cx="45" cy="106" rx="34" ry="54" fill={VERMILION} />
      <path d="M45 52 Q12 106 45 160 M45 52 Q78 106 45 160 M45 52 V160 M17 78 Q45 86 73 78 M12 106 Q45 116 78 106 M17 134 Q45 142 73 134" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1.4" />
      <ellipse cx="38" cy="86" rx="9" ry="22" fill={IVORY} opacity="0.18" />
      <rect x="27" y="158" width="36" height="9" rx="2" fill={INK} />
      <path d="M45 167 v26 M39 167 v20 M51 167 v20" stroke={INK} strokeWidth="2" />
      <text x="45" y="116" textAnchor="middle" fontSize="26" fill={IVORY} fillOpacity="0.92" style={{ fontFamily: "var(--kanji)", fontWeight: 800 }}>禅</text>
    </svg>
  );
}

/** Bamboo grove for the left edge of the courtyard. */
export function Bamboo() {
  const stalks = [
    { x: 26, w: 15, c: MOSS }, { x: 78, w: 10, c: "#6E7B5C" }, { x: 122, w: 13, c: "#4D573F" },
  ];
  const nodes = [70, 190, 300, 420, 540, 650, 770, 890];
  return (
    <svg viewBox="0 0 170 1000" preserveAspectRatio="xMinYMid slice" focusable="false">
      {stalks.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="0" width={s.w} height="1000" fill={s.c} />
          <rect x={s.x + s.w * 0.62} y="0" width={s.w * 0.22} height="1000" fill={IVORY} opacity="0.12" />
          {nodes.map((n, j) => (
            <rect key={j} x={s.x - 2} y={n + i * 34 + (j % 2) * 18} width={s.w + 4} height="6" rx="2" fill={INK} opacity="0.4" />
          ))}
        </g>
      ))}
      {[[30, 190, -24], [84, 330, 18], [128, 560, -14], [28, 740, 28], [86, 880, -20]].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} fill={MOSS}>
          <path d="M0 0 Q34 -12 70 6 Q34 4 0 0Z" />
          <path d="M0 0 Q30 -26 58 -22 Q30 -10 0 0Z" opacity="0.85" />
          <path d="M0 0 Q36 14 64 34 Q30 18 0 0Z" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

/** Raked gravel with three stones. */
export function RockGarden() {
  const lines = [60, 82, 104, 126, 148, 170];
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        {lines.map((y, i) => (
          <path key={y} d={`M0 ${y} Q180 ${y - 10 - i} 360 ${y} T720 ${y} T1080 ${y} T1440 ${y}`} opacity={0.5 - i * 0.04} />
        ))}
      </g>
      {[[320, 120, 1], [372, 140, 0.55], [1090, 112, 0.8]].map(([cx, cy, s], i) => (
        <g key={i}>
          <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5">
            <ellipse cx={cx} cy={cy + 14} rx={70 * s} ry={20 * s} />
            <ellipse cx={cx} cy={cy + 14} rx={104 * s} ry={30 * s} />
          </g>
          <path d={`M${cx - 44 * s} ${cy + 18} Q${cx - 40 * s} ${cy - 30 * s} ${cx} ${cy - 34 * s} Q${cx + 44 * s} ${cy - 28 * s} ${cx + 48 * s} ${cy + 18} Z`} fill="#6A6055" />
          <path d={`M${cx - 30 * s} ${cy - 6 * s} Q${cx} ${cy - 40 * s} ${cx + 30 * s} ${cy - 8 * s} Q${cx} ${cy - 20 * s} ${cx - 30 * s} ${cy - 6 * s}Z`} fill={MOSS} />
        </g>
      ))}
    </svg>
  );
}

/** Sakura garden backdrop: hills, a distant house and a flowering tree. */
export function GardenScene() {
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" focusable="false">
      <path d="M0 250 Q240 170 520 232 T1040 214 T1440 236 V360 H0Z" fill={MOSS} opacity="0.28" />
      <path d="M0 300 Q300 232 640 290 T1440 280 V360 H0Z" fill={MOSS} opacity="0.4" />
      <g opacity="0.55" fill={WOOD}>
        <path d={roof(300, 262, 118, 36)} />
        <rect x={204} y={270} width={192} height={44} />
        <rect x={190} y={312} width={220} height={6} />
      </g>
      <g opacity="0.8">
        <path d="M1180 360 C1176 300 1190 260 1170 210" fill="none" stroke={WOOD} strokeWidth="13" strokeLinecap="round" />
        <path d="M1176 270 C1220 250 1250 226 1272 190" fill="none" stroke={WOOD} strokeWidth="7" strokeLinecap="round" />
        {[[1170, 190, 66], [1240, 176, 54], [1120, 214, 48], [1280, 214, 44], [1200, 140, 46], [1140, 150, 40]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={BLOSSOM} opacity={0.55 + (i % 3) * 0.12} />
        ))}
      </g>
      <path d="M0 330 Q360 300 720 326 T1440 322 V360 H0Z" fill={MOSS} opacity="0.55" />
    </svg>
  );
}

/** Contact: the final landscape at dusk. The ground is solid ink so it flows into the footer. */
export function SunsetLandscape() {
  return (
    <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" focusable="false">
      <defs>
        <radialGradient id="jp-dusk-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#F7D9B0" />
          <stop offset="0.55" stopColor="#E8895E" />
          <stop offset="1" stopColor="#B9361F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jp-dusk-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8A8B2" stopOpacity="0" />
          <stop offset="1" stopColor="#E8A8B2" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <circle cx="760" cy="300" r="210" fill="url(#jp-dusk-sun)" />
      <circle cx="760" cy="300" r="92" fill="#F7D9B0" opacity="0.95" />
      <path d="M0 330 L150 270 L260 316 L420 236 L560 320 L690 280 L820 342 L980 252 L1130 330 L1290 276 L1440 322 V520 H0Z" fill="#6A2A24" opacity="0.7" />
      <rect y="300" width="1440" height="160" fill="url(#jp-dusk-mist)" />
      <path d="M0 400 L180 340 L330 392 L500 330 L680 396 L860 346 L1040 400 L1230 352 L1440 398 V520 H0Z" fill="#3A1C1B" opacity="0.92" />
      <g fill={INK}>
        {pagoda(240, 470, 0.9)}
        <path d={roof(980, 424, 130, 40)} />
        <rect x={868} y={432} width={224} height={50} />
        <path d={roof(1200, 446, 84, 26)} />
        <rect x={1134} y={452} width={132} height={32} />
        <path d="M0 482 Q200 462 420 480 T860 478 T1440 476 V520 H0Z" />
      </g>
      <rect y="500" width="1440" height="20" fill={INK} />
    </svg>
  );
}
