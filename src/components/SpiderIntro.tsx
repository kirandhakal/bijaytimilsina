"use client";
import { useEffect, useState } from "react";
import SpiderMark from "@/components/SpiderMark";
export default function SpiderIntro() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    try {
      if (sessionStorage.getItem("bijay-spider-intro")) return;
      sessionStorage.setItem("bijay-spider-intro", "seen");
    } catch {
      /* Storage is optional; the intro still dismisses on its timer. */
    }
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 1800);
    const dismiss = () => setVisible(false);
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") dismiss();
    };
    window.addEventListener("keydown", key);
    preference.addEventListener("change", dismiss);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("keydown", key);
      preference.removeEventListener("change", dismiss);
    };
  }, []);
  if (!visible) return null;
  return (
    <div className="spider-intro" aria-label="Portfolio introduction">
      <div className="intro-web" />
      <div className="intro-emblem">
        <SpiderMark />
        <div className="intro-scan">
          <SpiderMark />
        </div>
      </div>
      <strong>BIJAY TIMILSINA</strong>
      <span className="intro-caption">A NEW WORLD OF POSSIBILITIES</span>
      <div className="intro-track">
        <span />
      </div>
      <button onClick={() => setVisible(false)} className="intro-skip">
        Skip intro
      </button>
    </div>
  );
}
