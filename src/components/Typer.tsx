"use client";

import { useEffect, useState } from "react";

export function Typer({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStill(true);
  }, []);

  useEffect(() => {
    if (still) return;
    const word = roles[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && n < word.length) t = setTimeout(() => setN(n + 1), 55 + Math.random() * 45);
    else if (!del) t = setTimeout(() => setDel(true), 1700);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 28);
    else
      t = setTimeout(() => {
        setDel(false);
        setI((i + 1) % roles.length);
      }, 350);
    return () => clearTimeout(t);
  }, [i, n, del, still, roles]);

  const text = still ? roles[0] : roles[i].slice(0, n);
  return (
    <span style={{ color: "var(--text)", whiteSpace: "nowrap" }}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
