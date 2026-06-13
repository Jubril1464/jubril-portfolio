"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      el.style.left = cx + "px";
      el.style.top = cy + "px";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 520,
        height: 520,
        borderRadius: "50%",
        background:
          "radial-gradient(circle,rgba(232,176,75,0.13) 0%,rgba(232,176,75,0.04) 35%,transparent 68%)",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
        zIndex: 60,
        mixBlendMode: "screen",
        willChange: "left,top",
        transition: "opacity .4s ease",
      }}
    />
  );
}
