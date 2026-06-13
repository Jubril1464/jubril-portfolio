"use client";
import { useEffect, useRef } from "react";

interface LoaderProps {
  onLoaded: () => void;
}

export default function Loader({ onLoaded }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const num = numRef.current;
    const bar = barRef.current;
    const dur = 2200;
    const start = performance.now();

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }
      onLoaded();
    };

    const tick = (t: number) => {
      const elapsed = t - start;
      const k = Math.min(1, elapsed / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      if (num) num.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (bar) bar.style.transform = `scaleX(${eased})`;
      if (elapsed < dur) requestAnimationFrame(tick);
      else setTimeout(reveal, 280);
    };
    requestAnimationFrame(tick);

    const fallback = setTimeout(reveal, dur + 700);
    return () => clearTimeout(fallback);
  }, [onLoaded]);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#0a0907",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 34,
        transition: "opacity .8s ease, visibility .8s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 60%,rgba(232,176,75,0.08),transparent 60%)",
        }}
      />
      <div
        style={{
          fontFamily: "var(--font-code), monospace",
          fontSize: 12,
          letterSpacing: "0.4em",
          color: "#8a8475",
          textTransform: "uppercase",
        }}
      >
        Initializing experience
      </div>
      <div
        ref={numRef}
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(80px,18vw,200px)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          background: "linear-gradient(180deg,#f3efe6,#9a8d6e)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        000
      </div>
      <div
        style={{
          width: "min(340px,70vw)",
          height: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "100%",
            transformOrigin: "0 50%",
            transform: "scaleX(0)",
            background: "linear-gradient(90deg,#b8822f,#f6cf78)",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "var(--font-code), monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "#5a5648",
        }}
      >
        JUBRIL LUKMAN © 2026
      </div>
    </div>
  );
}
