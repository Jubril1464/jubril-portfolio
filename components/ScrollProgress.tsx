"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const k = max > 0 ? window.scrollY / max : 0;
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, k))})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 3,
        zIndex: 70,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "0 50%",
          transform: "scaleX(0)",
          background: "linear-gradient(90deg,#b8822f,#f6cf78,#e8b04b)",
          boxShadow: "0 0 16px rgba(232,176,75,.6)",
        }}
      />
    </div>
  );
}
