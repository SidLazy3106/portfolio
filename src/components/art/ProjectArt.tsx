import type { CoverArt } from "@/content/site";

const MONO = "JetBrains Mono Variable, ui-monospace, monospace";
const HEAD = "Space Grotesk Variable, sans-serif";
const BODY = "Inter Variable, sans-serif";
const W = "rgba(255,255,255,0.12)";

type Props = { kind: CoverArt; variant: "cover" | "detail" | "slot"; decorative?: boolean };

const LABELS: Record<string, string> = {
  "mfa-cover": "Illustration: a six-digit verification screen with a countdown timer",
  "mfa-detail": "Diagram: a web app hands off to the MFA layer, which grants or denies access",
  "packet-cover": "Illustration: a live packet capture with one flagged dropped packet",
  "packet-detail": "Illustration: a decoded TCP/IP header table",
  "securex-cover": "Illustration: Secure X desktop app running a system scan",
  "securex-detail": "Diagram: Secure X's three protection layers — antivirus, browser safety and deep scan",
};

export function ProjectArt({ kind, variant, decorative }: Props) {
  const key = `${kind}-${variant}`;
  const a11y = decorative
    ? { "aria-hidden": true as const, focusable: "false" as const }
    : { role: "img", "aria-label": variant === "slot" ? "Empty screenshot slot" : LABELS[key] };
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" {...a11y}>
      {variant === "slot" && <Slot />}
      {key === "mfa-cover" && <MfaCover />}
      {key === "mfa-detail" && <MfaDetail />}
      {key === "packet-cover" && <PacketCover />}
      {key === "packet-detail" && <PacketDetail />}
      {key === "securex-cover" && <SecurexCover />}
      {key === "securex-detail" && <SecurexDetail />}
    </svg>
  );
}

function Slot() {
  return (
    <>
      <rect width="640" height="400" fill="#121620" />
      <rect x="40" y="40" width="560" height="320" rx="18" fill="none" stroke="#F4C96B" strokeOpacity="0.65" strokeWidth="1.5" strokeDasharray="8 8" />
      <rect x="290" y="140" width="60" height="48" rx="8" fill="none" stroke="#F4C96B" strokeWidth="2" />
      <circle cx="306" cy="156" r="5" fill="#F4C96B" />
      <path d="M292 184 l18 -16 l12 10 l10 -8 l16 14" fill="none" stroke="#F4C96B" strokeWidth="2" strokeLinejoin="round" />
      <text x="320" y="226" textAnchor="middle" fontFamily={HEAD} fontSize="18" fontWeight="600" fill="#F4F5F8">[SCREENSHOT SLOT]</text>
      <text x="320" y="250" textAnchor="middle" fontFamily={BODY} fontSize="12.5" fill="#A0A8B7">Replace with a real capture of this project (16:10 or 16:9)</text>
    </>
  );
}

function MfaCover() {
  const digits = ["4", "1", "7", "9"];
  return (
    <>
      <rect width="640" height="400" fill="#121620" />
      <path d="M0 80H640M0 160H640M0 240H640M0 320H640M80 0V400M160 0V400M240 0V400M320 0V400M400 0V400M480 0V400M560 0V400" stroke="rgba(255,255,255,0.035)" />
      <circle cx="540" cy="60" r="170" fill="#8B7CFF" opacity="0.10" />
      <circle cx="90" cy="360" r="120" fill="#53D6C7" opacity="0.06" />
      <rect x="170" y="64" width="300" height="272" rx="20" fill="#171D29" stroke={W} />
      <path d="M320 92 l18 7 v13 c0 12 -8 20 -18 24 c-10 -4 -18 -12 -18 -24 v-13 z" fill="none" stroke="#8B7CFF" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M313 114 l5 5 l10 -10" fill="none" stroke="#53D6C7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="320" y="164" textAnchor="middle" fontFamily={HEAD} fontSize="19" fontWeight="600" fill="#F4F5F8">Verify it&apos;s you</text>
      <text x="320" y="185" textAnchor="middle" fontFamily={BODY} fontSize="11.5" fill="#A0A8B7">Enter the code sent to your device</text>
      <g fontFamily={MONO} fontSize="18" fontWeight="600" fill="#F4F5F8" textAnchor="middle">
        {digits.map((d, i) => (
          <g key={i}>
            <rect x={187 + i * 46} y="204" width="36" height="44" rx="9" fill="#0B0D12" stroke="rgba(255,255,255,0.16)" />
            <text x={205 + i * 46} y="232">{d}</text>
          </g>
        ))}
        <rect x="371" y="204" width="36" height="44" rx="9" fill="#0B0D12" stroke="#53D6C7" strokeWidth="2" />
        <rect x="388" y="216" width="2" height="20" fill="#53D6C7" />
        <rect x="417" y="204" width="36" height="44" rx="9" fill="#0B0D12" stroke="rgba(255,255,255,0.16)" />
      </g>
      <circle cx="290" cy="290" r="13" fill="none" stroke={W} strokeWidth="3" />
      <circle cx="290" cy="290" r="13" fill="none" stroke="#53D6C7" strokeWidth="3" strokeDasharray="56 82" strokeLinecap="round" transform="rotate(-90 290 290)" />
      <text x="312" y="295" fontFamily={MONO} fontSize="12" fill="#A0A8B7">code expires <tspan fill="#53D6C7">0:24</tspan></text>
      <rect x="44" y="300" width="104" height="28" rx="8" fill="none" stroke="#F4C96B" strokeOpacity="0.7" />
      <text x="96" y="318" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" fill="#F4C96B">TIME-BASED</text>
      <g transform="translate(520 280)">
        <rect x="-22" y="-6" width="44" height="36" rx="8" fill="#171D29" stroke="#8B7CFF" strokeWidth="1.5" />
        <path d="M-12 -6 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke="#8B7CFF" strokeWidth="2" />
        <circle cx="0" cy="12" r="4" fill="#8B7CFF" />
      </g>
      <path d="M60 90 v14 M53 97 h14" stroke="#53D6C7" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function MfaDetail() {
  return (
    <>
      <rect width="640" height="400" fill="#121620" />
      <text x="40" y="52" fontFamily={MONO} fontSize="12" fill="#53D6C7">{"// verification flow"}</text>
      <rect x="40" y="160" width="140" height="80" rx="14" fill="#171D29" stroke="rgba(255,255,255,0.14)" />
      <text x="110" y="196" textAnchor="middle" fontFamily={HEAD} fontSize="16" fontWeight="600" fill="#F4F5F8">Web app</text>
      <text x="110" y="218" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#A0A8B7">login request</text>
      <path className="cv-flow" d="M180 200 H240" stroke="#8B7CFF" strokeWidth="2" />
      <path d="M234 194 l8 6 l-8 6" fill="none" stroke="#8B7CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="246" y="130" width="160" height="140" rx="18" fill="#8B7CFF" opacity="0.14" />
      <rect x="246" y="130" width="160" height="140" rx="18" fill="none" stroke="#8B7CFF" strokeWidth="2" />
      <text x="326" y="172" textAnchor="middle" fontFamily={HEAD} fontSize="17" fontWeight="700" fill="#F4F5F8">MFA layer</text>
      <rect x="276" y="188" width="100" height="30" rx="8" fill="#0B0D12" />
      <text x="326" y="208" textAnchor="middle" fontFamily={MONO} fontSize="13" fill="#F4F5F8" letterSpacing="3">4179··</text>
      <text x="326" y="248" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#A0A8B7">code + time window</text>
      <path className="cv-flow" d="M406 180 C 440 180, 450 120, 488 120" fill="none" stroke="#53D6C7" strokeWidth="2" />
      <path className="cv-flow" d="M406 220 C 440 220, 450 280, 488 280" fill="none" stroke="#F4C96B" strokeWidth="2" />
      <rect x="488" y="86" width="120" height="68" rx="14" fill="#171D29" stroke="#53D6C7" strokeWidth="1.5" />
      <text x="548" y="116" textAnchor="middle" fontFamily={HEAD} fontSize="15" fontWeight="600" fill="#53D6C7">Verified</text>
      <text x="548" y="136" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#A0A8B7">access granted</text>
      <rect x="488" y="246" width="120" height="68" rx="14" fill="#171D29" stroke="#F4C96B" strokeWidth="1.5" />
      <text x="548" y="276" textAnchor="middle" fontFamily={HEAD} fontSize="15" fontWeight="600" fill="#F4C96B">Denied</text>
      <text x="548" y="296" textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#A0A8B7">expired / wrong code</text>
      <text x="40" y="360" fontFamily={BODY} fontSize="12" fill="#A0A8B7">Plugs into an existing app without rebuilding its login.</text>
    </>
  );
}

function PacketCover() {
  const hex = [
    "0000  45 00 00 3c 1c 46 40 00",
    "0008  40 06 b1 e6 0a 00 00 0c",
    "0010  0a 00 00 01 c9 3a 01 bb",
    "0018  a6 4f 11 2e 00 00 00 00",
    "0020  a0 02 fa f0 9c 21 00 00",
    "0028  02 04 05 b4 04 02 08 0a",
  ];
  const pk: [number, string, string, string][] = [
    [130, "UDP", "#53D6C7", "#0B0D12"],
    [220, "TCP", "#8B7CFF", "#0B0D12"],
    [490, "TCP", "#8B7CFF", "#0B0D12"],
  ];
  return (
    <>
      <rect width="640" height="400" fill="#0E1118" />
      <g fontFamily={MONO} fontSize="11" fill="#A0A8B7" opacity="0.38">
        {hex.map((h, i) => (
          <text key={i} x="32" y={70 + i * 20} xmlSpace="preserve">{h}</text>
        ))}
      </g>
      <text x="32" y="40" fontFamily={MONO} fontSize="12" fill="#53D6C7">● eth0 · live capture</text>
      <polyline points="300,120 330,118 352,112 372,120 396,116 420,62 436,124 462,118 494,120 520,116 548,121 600,118" fill="none" stroke="#F4C96B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <text x="420" y="50" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#F4C96B">latency spike</text>
      <text x="300" y="100" fontFamily={MONO} fontSize="10" fill="#A0A8B7">rtt</text>
      <path d="M24 240 H616" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      <path className="cv-flow" d="M24 240 H616" stroke="#53D6C7" strokeWidth="2" opacity="0.6" />
      <g fontFamily={MONO} fontSize="11" fontWeight="600" textAnchor="middle">
        <rect x="40" y="224" width="58" height="32" rx="8" fill="#8B7CFF" />
        <text x="69" y="244" fill="#0B0D12">TCP</text>
        {pk.map(([x, l, f, t]) => (
          <g key={x}>
            <rect x={x} y="224" width="58" height="32" rx="8" fill={f} />
            <text x={x + 29} y="244" fill={t}>{l}</text>
          </g>
        ))}
        <rect x="310" y="224" width="58" height="32" rx="8" fill="#171D29" stroke="#A0A8B7" />
        <text x="339" y="244" fill="#F4F5F8">IP</text>
        <rect x="400" y="224" width="58" height="32" rx="8" fill="none" stroke="#F4C96B" strokeWidth="2" strokeDasharray="5 4" />
        <text x="429" y="244" fill="#F4C96B">TCP</text>
      </g>
      <path d="M429 220 V196" stroke="#F4C96B" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="384" y="170" width="90" height="26" rx="7" fill="#F4C96B" />
      <text x="429" y="187" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" fill="#0B0D12">DROP @ hop 3</text>
      <g fontFamily={MONO} fontSize="11">
        <rect x="40" y="310" width="96" height="30" rx="8" fill="#171D29" stroke={W} />
        <text x="88" y="329" textAnchor="middle" fill="#F4F5F8">IPv4 hdr</text>
        <rect x="146" y="310" width="110" height="30" rx="8" fill="#171D29" stroke={W} />
        <text x="201" y="329" textAnchor="middle" fill="#F4F5F8">TCP flags</text>
        <rect x="266" y="310" width="96" height="30" rx="8" fill="#171D29" stroke={W} />
        <text x="314" y="329" textAnchor="middle" fill="#F4F5F8">UDP len</text>
      </g>
    </>
  );
}

function PacketDetail() {
  const rows: [string, string, string?][] = [
    ["version", "4"],
    ["header length", "20 bytes"],
    ["ttl", "64"],
    ["protocol", "TCP (6)", "#8B7CFF"],
  ];
  return (
    <>
      <rect width="640" height="400" fill="#0E1118" />
      <rect x="60" y="44" width="520" height="312" rx="18" fill="#171D29" stroke={W} />
      <text x="88" y="80" fontFamily={MONO} fontSize="12" fill="#53D6C7">frame #1042 · decoded</text>
      <rect x="470" y="64" width="84" height="24" rx="6" fill="none" stroke="#8B7CFF" />
      <text x="512" y="80" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#8B7CFF">TCP / IPv4</text>
      <path d="M88 98 H552" stroke="rgba(255,255,255,0.1)" />
      <path d="M88 146 H552 M88 180 H552 M88 214 H552 M88 248 H552 M88 282 H552" stroke="rgba(255,255,255,0.05)" />
      <g fontFamily={MONO} fontSize="12.5">
        {rows.map(([k, v, c], i) => (
          <g key={k}>
            <text x="88" y={130 + i * 34} fill="#A0A8B7">{k}</text>
            <text x="552" y={130 + i * 34} textAnchor="end" fill={c ?? "#F4F5F8"}>{v}</text>
          </g>
        ))}
        <text x="88" y="266" fill="#A0A8B7">flags</text>
        <rect x="452" y="252" width="44" height="22" rx="5" fill="#53D6C7" />
        <text x="474" y="267" textAnchor="middle" fill="#0B0D12" fontSize="11" fontWeight="600">SYN</text>
        <rect x="504" y="252" width="48" height="22" rx="5" fill="#53D6C7" />
        <text x="528" y="267" textAnchor="middle" fill="#0B0D12" fontSize="11" fontWeight="600">ACK</text>
        <text x="88" y="300" fill="#A0A8B7">checksum</text>
        <text x="552" y="300" textAnchor="end" fill="#F4C96B">0xb1e6 · mismatch?</text>
      </g>
      <text x="88" y="334" fontFamily={BODY} fontSize="11.5" fill="#A0A8B7">Each field decoded by hand — no libraries hiding the bytes.</text>
    </>
  );
}

function SecurexCover() {
  return (
    <>
      <rect width="640" height="400" fill="#121620" />
      <circle cx="420" cy="210" r="190" fill="#53D6C7" opacity="0.05" />
      <rect x="60" y="44" width="520" height="312" rx="16" fill="#171D29" stroke={W} />
      <path d="M60 80 H580" stroke="rgba(255,255,255,0.08)" />
      <circle cx="82" cy="62" r="5" fill="#F4C96B" />
      <circle cx="98" cy="62" r="5" fill="#53D6C7" />
      <circle cx="114" cy="62" r="5" fill="#8B7CFF" />
      <text x="320" y="67" textAnchor="middle" fontFamily={HEAD} fontSize="13" fontWeight="600" fill="#F4F5F8">Secure X</text>
      <path d="M200 80 V356" stroke="rgba(255,255,255,0.08)" />
      <g fontFamily={BODY} fontSize="12.5">
        <rect x="74" y="98" width="112" height="34" rx="8" fill="#8B7CFF" opacity="0.18" />
        <rect x="86" y="109" width="12" height="12" rx="3" fill="#8B7CFF" />
        <text x="106" y="120" fill="#F4F5F8">Antivirus</text>
        <rect x="86" y="151" width="12" height="12" rx="3" fill="none" stroke="#53D6C7" strokeWidth="1.5" />
        <text x="106" y="162" fill="#A0A8B7">Browser</text>
        <rect x="86" y="193" width="12" height="12" rx="3" fill="none" stroke="#F4C96B" strokeWidth="1.5" />
        <text x="106" y="204" fill="#A0A8B7">Deep scan</text>
      </g>
      <circle cx="390" cy="208" r="74" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle cx="390" cy="208" r="74" fill="none" stroke="#53D6C7" strokeWidth="10" strokeLinecap="round" strokeDasharray="330 465" transform="rotate(-90 390 208)" />
      <path d="M390 172 l26 10 v18 c0 18 -11 28 -26 34 c-15 -6 -26 -16 -26 -34 v-18 z" fill="#8B7CFF" fillOpacity="0.2" stroke="#8B7CFF" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M379 205 l8 8 l15 -15" fill="none" stroke="#53D6C7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="390" y="314" textAnchor="middle" fontFamily={HEAD} fontSize="15" fontWeight="600" fill="#F4F5F8">System scan</text>
      <text x="390" y="334" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#A0A8B7">antivirus · browser · deep</text>
    </>
  );
}

function SecurexDetail() {
  const cards = [
    { x: 40, c: "#8B7CFF", t: "Antivirus", l1: "Detects malicious", l2: "files on the PC" },
    { x: 234, c: "#53D6C7", t: "Browser safety", l1: "Flags unsafe sites", l2: "while browsing" },
    { x: 428, c: "#F4C96B", t: "Deep scan", l1: "In-depth checks of", l2: "system security" },
  ];
  return (
    <>
      <rect width="640" height="400" fill="#121620" />
      <text x="40" y="52" fontFamily={MONO} fontSize="12" fill="#53D6C7">{"// three layers, one app"}</text>
      {cards.map(({ x, c, t, l1, l2 }, i) => {
        const cx = x + 86;
        return (
          <g key={t}>
            <rect x={x} y="96" width="172" height="220" rx="18" fill="#171D29" stroke={c} strokeWidth="1.5" />
            <circle cx={cx} cy="156" r="28" fill={c} opacity="0.17" />
            {i === 0 && (
              <>
                <ellipse cx={cx} cy="160" rx="11" ry="14" fill="none" stroke={c} strokeWidth="2.2" />
                <path d={`M${cx - 11} 150 h22 M${cx} 146 v28 M${cx - 14} 160 h-8 M${cx + 14} 160 h8 M${cx - 12} 170 l-7 5 M${cx + 12} 170 l7 5 M${cx - 8} 148 l-5 -6 M${cx + 8} 148 l5 -6`} stroke={c} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
            {i === 1 && (
              <>
                <circle cx={cx} cy="156" r="14" fill="none" stroke={c} strokeWidth="2.2" />
                <path d={`M${cx - 14} 156 h28 M${cx} 142 c-6 8 -6 20 0 28 M${cx} 142 c6 8 6 20 0 28`} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
              </>
            )}
            {i === 2 && (
              <path d={`M${cx - 14} 150 l14 -8 l14 8 l-14 8 z M${cx - 14} 158 l14 8 l14 -8 M${cx - 14} 166 l14 8 l14 -8`} fill="none" stroke={c} strokeWidth="2" strokeLinejoin="round" />
            )}
            <text x={cx} y="218" textAnchor="middle" fontFamily={HEAD} fontSize="17" fontWeight="600" fill="#F4F5F8">{t}</text>
            <text x={cx} y="242" textAnchor="middle" fontFamily={BODY} fontSize="11.5" fill="#A0A8B7">{l1}</text>
            <text x={cx} y="258" textAnchor="middle" fontFamily={BODY} fontSize="11.5" fill="#A0A8B7">{l2}</text>
          </g>
        );
      })}
      <text x="40" y="360" fontFamily={BODY} fontSize="12" fill="#A0A8B7">Built by a team of three.</text>
    </>
  );
}
