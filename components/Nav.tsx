"use client";
import { useEffect, useRef } from "react";

interface NavProps {
  isLoaded: boolean;
}

const LINKS = [
  { href: "#jl-about", label: "About" },
  { href: "#jl-work", label: "Work" },
  { href: "#jl-skills", label: "Skills" },
  { href: "#jl-exp", label: "Journey" },
];

export default function Nav({ isLoaded }: NavProps) {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href);
    const secs = ids
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    const setActive = (id: string) => {
      linksRef.current.forEach((el, i) => {
        if (!el) return;
        const active = LINKS[i].href === id;
        el.style.color = active ? "#0a0907" : "#a8a293";
        el.style.background = active ? "rgba(232,176,75,0.9)" : "transparent";
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive("#" + (en.target as HTMLElement).id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const handleMagnetic =
    (el: HTMLAnchorElement | null) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.35}px,${y * 0.45}px)`;
    };
  const handleMagneticLeave = (el: HTMLAnchorElement | null) => () => {
    if (el) el.style.transform = "translate(0,0)";
  };

  return (
    <nav
      id="jl-nav"
      className="jl-nav"
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: 28,
        padding: "12px 14px 12px 22px",
        borderRadius: 999,
        background: "rgba(18,16,12,0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(232,176,75,0.14)",
        boxShadow: "0 18px 50px -20px rgba(0,0,0,.8)",
        opacity: isLoaded ? 1 : 0,
        transition: "opacity .8s ease .2s",
      }}
    >
      <a href="#jl-hero" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-mld), cursive",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1,
            paddingTop: 4,
            color: "#f6cf78",
          }}
        >
          JL
        </span>
      </a>

      <div className="jl-navlinks" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {LINKS.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            ref={(el) => { linksRef.current[i] = el; }}
            style={{
              textDecoration: "none",
              color: "#a8a293",
              fontSize: 13.5,
              fontWeight: 500,
              padding: "8px 14px",
              borderRadius: 999,
              transition: "color .3s, background .3s",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>

      <a
        href="#jl-contact"
        ref={(el) => {
          if (!el) return;
          el.addEventListener("mousemove", (e) => handleMagnetic(el)(e as unknown as React.MouseEvent<HTMLAnchorElement>));
          el.addEventListener("mouseleave", handleMagneticLeave(el));
        }}
        style={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          borderRadius: 999,
          background: "linear-gradient(135deg,#f6cf78,#d99f3a)",
          color: "#0a0907",
          fontWeight: 600,
          fontSize: 13.5,
          whiteSpace: "nowrap",
          boxShadow: "0 0 22px rgba(232,176,75,.35)",
          transition: "transform .25s ease, box-shadow .3s",
        }}
      >
        Let&apos;s talk
      </a>
    </nav>
  );
}
