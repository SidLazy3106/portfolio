/* Hand-built illustrations. Theme-aware parts use the .i-* classes in globals.css. */

const MONO = "JetBrains Mono Variable, ui-monospace, monospace";

export function HeroArt() {
  return (
    <svg viewBox="0 0 560 520" aria-hidden="true" focusable="false">
      <ellipse className="i-faint spin-slow" cx="280" cy="270" rx="250" ry="210" fill="none" strokeWidth="1" strokeDasharray="2 8" />
      <ellipse className="i-faint" cx="280" cy="270" rx="190" ry="160" fill="none" strokeWidth="1" />
      <g className="fl3">
        <ellipse cx="482" cy="86" rx="46" ry="12" fill="none" stroke="#D9A441" strokeWidth="1.5" opacity="0.55" transform="rotate(-18 482 86)" />
        <circle cx="482" cy="86" r="24" fill="#D9A441" />
        <path d="M466 78a20 20 0 0 1 22-10" stroke="#171512" strokeOpacity="0.25" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <circle className="fl2" cx="62" cy="438" r="12" fill="#8FA277" />
      <circle cx="520" cy="440" r="5" fill="#D9472B" />
      <path className="flow" d="M196 170 C 230 186, 236 196, 250 214" fill="none" stroke="#D9472B" strokeWidth="1.6" />
      <path className="flow" d="M430 300 C 456 270, 470 240, 466 214" fill="none" stroke="#8FA277" strokeWidth="1.6" />
      <g>
        <rect className="i-card i-ink" x="128" y="176" width="300" height="194" rx="14" strokeWidth="2" />
        <rect className="i-bg" x="144" y="192" width="268" height="162" rx="6" />
        <rect x="160" y="210" width="38" height="7" rx="3.5" fill="#D9472B" />
        <rect x="204" y="210" width="72" height="7" rx="3.5" fill="#A99C86" opacity="0.5" />
        <rect x="176" y="227" width="54" height="7" rx="3.5" fill="#8FA277" />
        <rect x="236" y="227" width="96" height="7" rx="3.5" fill="#A99C86" opacity="0.35" />
        <rect x="176" y="244" width="30" height="7" rx="3.5" fill="#D9A441" />
        <rect x="212" y="244" width="60" height="7" rx="3.5" fill="#A99C86" opacity="0.5" />
        <rect x="192" y="261" width="110" height="7" rx="3.5" fill="#D9472B" opacity="0.7" />
        <rect x="192" y="278" width="44" height="7" rx="3.5" fill="#8FA277" opacity="0.8" />
        <rect x="242" y="278" width="70" height="7" rx="3.5" fill="#A99C86" opacity="0.35" />
        <rect x="176" y="295" width="64" height="7" rx="3.5" fill="#A99C86" opacity="0.5" />
        <rect x="160" y="312" width="24" height="7" rx="3.5" fill="#D9472B" />
        <rect x="160" y="330" width="8" height="12" rx="1" fill="#8FA277" />
        <path className="i-bg2 i-ink" d="M98 370 H458 L488 392 a6 6 0 0 1 -4 10 H72 a6 6 0 0 1 -4 -10 Z" strokeWidth="2" strokeLinejoin="round" />
        <path className="i-line" d="M246 384 H310" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="M112 432 c 20 -10, 34 10, 54 0 s 34 10, 54 0 s 34 10, 54 0" fill="none" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <g className="fl1">
        <rect className="i-card" x="14" y="66" width="200" height="118" rx="12" stroke="#D9472B" strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="32" cy="84" r="4" fill="#D9A441" />
        <circle cx="46" cy="84" r="4" fill="#8FA277" />
        <circle cx="60" cy="84" r="4" fill="#D9472B" />
        <text x="30" y="114" fontFamily={MONO} fontSize="11.5"><tspan fill="#D9472B">def</tspan><tspan className="i-txt"> verify(code):</tspan></text>
        <text x="30" y="134" fontFamily={MONO} fontSize="11.5" xmlSpace="preserve"><tspan fill="#8FA277">  if</tspan><tspan className="i-txt"> expired(code):</tspan></text>
        <text x="30" y="154" fontFamily={MONO} fontSize="11.5" xmlSpace="preserve"><tspan className="i-mut">    return </tspan><tspan fill="#D9A441">DENY</tspan></text>
        <text x="30" y="172" fontFamily={MONO} fontSize="11.5" className="i-mut" xmlSpace="preserve">  ...</text>
      </g>
      <g className="fl3">
        <circle className="i-card" cx="466" cy="190" r="32" stroke="#D9472B" strokeWidth="1.5" />
        <path d="M466 172 l14 6 v10 c0 9 -6 15 -14 18 c-8 -3 -14 -9 -14 -18 v-10 z" fill="none" stroke="#D9472B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M460 189 l4 4 l8 -8" fill="none" stroke="#8FA277" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="fl2">
        <rect x="330" y="300" width="214" height="112" rx="12" fill="#171512" stroke="#8FA277" strokeOpacity="0.55" strokeWidth="1.5" />
        <text x="346" y="326" fontFamily={MONO} fontSize="11.5" fill="#8FA277">$ <tspan fill="#F0E5D0">sniff -i eth0</tspan></text>
        <text x="346" y="348" fontFamily={MONO} fontSize="11" fill="#A99C86">TCP 443 <tspan fill="#D9472B">▸</tspan> SYN ACK</text>
        <text x="346" y="368" fontFamily={MONO} fontSize="11" fill="#A99C86" xmlSpace="preserve">UDP  53 <tspan fill="#D9472B">▸</tspan> ok</text>
        <text x="346" y="388" fontFamily={MONO} fontSize="11" fill="#D9A441">!! drop @ hop 3</text>
      </g>
      <path d="M520 290 v14 M513 297 h14" stroke="#D9472B" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 250 v12 M30 256 h12" stroke="#8FA277" strokeWidth="2" strokeLinecap="round" />
      <rect x="250" y="40" width="12" height="12" rx="2" fill="none" stroke="#D9A441" strokeWidth="1.6" transform="rotate(45 256 46)" />
      <circle cx="350" cy="120" r="3" fill="#8FA277" />
      <circle cx="110" cy="230" r="2.5" fill="#D9A441" />
    </svg>
  );
}

export function DeskArt() {
  return (
    <svg viewBox="0 0 480 400" role="img" aria-label="Illustration of a developer desk with a monitor, books, coffee and headphones">
      <circle cx="380" cy="80" r="46" fill="#D9472B" opacity="0.12" />
      <rect className="i-line" x="32" y="30" width="120" height="90" rx="10" fill="none" strokeWidth="1.5" strokeDasharray="4 5" />
      <path d="M60 96 l20 -24 l16 16 l12 -10 l20 18" fill="none" stroke="#8FA277" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="124" cy="56" r="7" fill="#D9A441" />
      <rect className="i-card i-ink" x="150" y="96" width="210" height="138" rx="12" strokeWidth="2" />
      <rect className="i-bg" x="162" y="108" width="186" height="114" rx="5" />
      <text x="174" y="132" fontFamily={MONO} fontSize="10.5" fill="#8FA277">$ ./tracer --decode</text>
      <rect x="174" y="146" width="60" height="6" rx="3" fill="#D9472B" />
      <rect x="240" y="146" width="80" height="6" rx="3" fill="#A99C86" opacity="0.4" />
      <rect x="186" y="160" width="96" height="6" rx="3" fill="#A99C86" opacity="0.4" />
      <rect x="186" y="174" width="44" height="6" rx="3" fill="#D9A441" />
      <rect x="236" y="174" width="52" height="6" rx="3" fill="#A99C86" opacity="0.4" />
      <rect x="174" y="188" width="120" height="6" rx="3" fill="#D9472B" opacity="0.6" />
      <rect x="174" y="204" width="7" height="10" rx="1" fill="#8FA277" />
      <path className="i-ink" d="M244 234 v26 M214 262 h62" strokeWidth="2" strokeLinecap="round" />
      <path className="i-ink" d="M20 262 H460" strokeWidth="2" strokeLinecap="round" />
      <path className="i-line" d="M44 262 V372 M436 262 V372" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 280 c 30 6, 60 -4, 90 2" fill="none" stroke="#D9A441" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <rect x="44" y="196" width="22" height="66" rx="3" fill="#D9472B" />
      <rect x="68" y="208" width="20" height="54" rx="3" fill="#8FA277" />
      <rect x="90" y="188" width="24" height="74" rx="3" className="i-card i-ink" strokeWidth="1.5" transform="rotate(8 102 225)" />
      <text x="55" y="240" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill="#171512" transform="rotate(-90 55 240)">DSA</text>
      <text x="78" y="248" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill="#171512" transform="rotate(-90 78 248)">OS</text>
      <text x="104" y="244" fontFamily={MONO} fontSize="8.5" fontWeight="600" className="i-txt" transform="rotate(-82 104 244)">CN</text>
      <path className="i-card i-ink" d="M372 222 h40 v30 a10 10 0 0 1 -10 10 h-20 a10 10 0 0 1 -10 -10 z" strokeWidth="2" />
      <path className="i-ink" d="M412 230 h6 a8 8 0 0 1 0 16 h-6" fill="none" strokeWidth="2" />
      <path className="steam" d="M384 212 c-4 -6, 4 -10, 0 -16" fill="none" stroke="#A99C86" strokeWidth="1.6" strokeLinecap="round" />
      <path className="steam" style={{ animationDelay: "-1.4s" }} d="M398 212 c-4 -6, 4 -10, 0 -16" fill="none" stroke="#A99C86" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M308 262 v-14 a22 22 0 0 1 44 0 v14" fill="none" stroke="#D9472B" strokeWidth="3" strokeLinecap="round" />
      <rect x="302" y="246" width="10" height="16" rx="4" fill="#D9472B" />
      <rect x="346" y="246" width="10" height="16" rx="4" fill="#D9472B" />
      <rect x="384" y="110" width="58" height="52" rx="4" fill="#D9A441" transform="rotate(6 413 136)" />
      <text x="392" y="138" fontFamily={MONO} fontSize="10" fill="#171512" transform="rotate(6 413 136)">rca()</text>
      <path className="i-ink" d="M140 262 l6 -22 h22 l6 22" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M157 240 c -2 -18, -14 -22, -20 -30 M157 240 c 2 -16, 12 -24, 22 -28 M157 240 v-30" fill="none" stroke="#8FA277" strokeWidth="2" strokeLinecap="round" />
      <ellipse className="i-faint" cx="240" cy="380" rx="200" ry="6" fill="none" strokeWidth="1.2" />
    </svg>
  );
}

export function ContactArt() {
  return (
    <svg viewBox="0 0 460 220" aria-hidden="true" focusable="false">
      <path className="flow" d="M120 150 C 180 150, 200 80, 270 80" fill="none" stroke="#D9472B" strokeWidth="1.6" />
      <path className="flow" d="M120 150 C 200 160, 260 170, 330 150" fill="none" stroke="#8FA277" strokeWidth="1.6" />
      <g className="fl1">
        <rect className="i-card i-ink" x="30" y="104" width="110" height="76" rx="10" strokeWidth="2" />
        <path className="i-ink" d="M34 110 l51 38 l51 -38" fill="none" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="132" cy="110" r="11" fill="#D9A441" />
        <text x="132" y="114" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" fill="#171512">1</text>
      </g>
      <g className="fl2">
        <rect x="262" y="48" width="148" height="56" rx="16" fill="#D9472B" />
        <path d="M282 104 l-6 14 l18 -14 z" fill="#D9472B" />
        <rect x="280" y="66" width="96" height="7" rx="3.5" fill="#171512" opacity="0.45" />
        <rect x="280" y="80" width="64" height="7" rx="3.5" fill="#171512" opacity="0.3" />
      </g>
      <g className="fl3">
        <rect className="i-card" x="320" y="128" width="116" height="46" rx="14" stroke="#8FA277" strokeWidth="1.5" />
        <circle cx="346" cy="151" r="3.5" fill="#8FA277" />
        <circle cx="360" cy="151" r="3.5" fill="#8FA277" opacity="0.7" />
        <circle cx="374" cy="151" r="3.5" fill="#8FA277" opacity="0.4" />
      </g>
      <path d="M210 30 v12 M204 36 h12" stroke="#D9A441" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="196" r="4" fill="#D9472B" />
      <rect x="40" y="40" width="10" height="10" rx="2" fill="none" stroke="#8FA277" strokeWidth="1.5" transform="rotate(45 45 45)" />
    </svg>
  );
}
