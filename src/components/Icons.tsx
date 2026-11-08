import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, strokeWidth = 1.9, ...rest }: P & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>;
export const ArrowUpRight = (p: P) => <Base {...p}><path d="M7 17L17 7M8 7h9v9" /></Base>;
export const ArrowLeft = (p: P) => <Base {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Base>;
export const ArrowUp = (p: P) => <Base {...p}><path d="M12 19V5M6 11l6-6 6 6" /></Base>;
export const Download = (p: P) => <Base {...p}><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></Base>;
export const Sun = (p: P) => <Base {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Base>;
export const Moon = (p: P) => <Base {...p}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" /></Base>;
export const Menu = (p: P) => <Base {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Base>;
export const Close = (p: P) => <Base {...p}><path d="M6 6l12 12M18 6L6 18" /></Base>;
export const ChevronLeft = (p: P) => <Base {...p}><path d="M15 6l-6 6 6 6" /></Base>;
export const ChevronRight = (p: P) => <Base {...p}><path d="M9 6l6 6-6 6" /></Base>;
export const Expand = (p: P) => <Base {...p}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></Base>;
export const Printer = (p: P) => <Base {...p}><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="7" rx="1" /></Base>;
export const Check = (p: P) => <Base {...p}><path d="M5 12l5 5 9-10" /></Base>;
export const Mail = (p: P) => <Base {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></Base>;
export const Send = (p: P) => <Base {...p}><path d="M4 12l16-8-6 16-2.5-6.5z" /><path d="M11.5 13.5L20 4" /></Base>;
export const Star = (p: P) => <Base {...p}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></Base>;
export const Fork = (p: P) => <Base {...p}><circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" /></Base>;
export const Clock = (p: P) => <Base {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Base>;
export const Github = (p: P) => (
  <Base {...p}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Base>
);
export const Linkedin = (p: P) => <Base {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Base>;
export const Code = (p: P) => <Base {...p}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" /></Base>;
export const Shield = (p: P) => <Base {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></Base>;
export const Graph = (p: P) => <Base {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2M8 11h2l1-2 1.5 4 1-2H15" /></Base>;
export const Terminal = (p: P) => <Base {...p}><rect x="3" y="4" width="18" height="14" rx="2.5" /><path d="M7 9l3 2.5L7 14M12.5 14H17M8 21h8" /></Base>;
