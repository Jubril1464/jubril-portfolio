"use client";
import { useEffect, useRef } from "react";

interface HeroProps {
  isLoaded: boolean;
}

const CODE_CHIPS = [
  {
    depth: 2.4,
    scrollFactor: 0.18,
    style: { left: "7%", top: "22%" },
    anim: "var(--animate-float-1)",
    content: (
      <>
        <span style={{ color: "#e8b04b" }}>const</span> craft ={" "}
        <span style={{ color: "#f6cf78" }}>await</span>
        <br />
        &nbsp;&nbsp;build(<span style={{ color: "#8fbf8a" }}>&apos;delight&apos;</span>);
      </>
    ),
  },
  {
    depth: 3.6,
    scrollFactor: 0.3,
    style: { right: "8%", top: "30%" },
    anim: "var(--animate-float-2)",
    content: (
      <>
        <span style={{ color: "#e8b04b" }}>motion</span>.spring(&#123;
        <br />
        &nbsp;&nbsp;stiffness: <span style={{ color: "#f6cf78" }}>180</span>
        <br />
        &#125;)
      </>
    ),
  },
  {
    depth: 1.6,
    scrollFactor: 0.12,
    style: { left: "13%", bottom: "18%" },
    anim: "var(--animate-float-3)",
    content: (
      <>
        <span style={{ color: "#e8b04b" }}>&lt;Hero</span> immersive{" "}
        <span style={{ color: "#e8b04b" }}>/&gt;</span>
      </>
    ),
  },
  {
    depth: 4.2,
    scrollFactor: 0.36,
    style: { right: "13%", bottom: "24%" },
    anim: "var(--animate-float-4)",
    content: (
      <>
        fps: <span style={{ color: "#8fbf8a" }}>60</span> · gpu ✓
      </>
    ),
  },
];

export default function Hero({ isLoaded }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLAnchorElement>(null);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const heroBlocksRef = useRef<(HTMLElement | null)[]>([]);
  const ctaBtnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const attachMagnetic = (el: HTMLAnchorElement | null) => {
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.4;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
      el.style.transform = `translate(${x}px,${y}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  };

  // Kinetic name animation
  useEffect(() => {
    if (!isLoaded) return;

    const wrapLetters = (
      container: HTMLSpanElement | null,
      text: string,
      delay: number
    ) => {
      if (!container) return;
      container.innerHTML = "";
      [...text].forEach((ch, i) => {
        const s = document.createElement("span");
        s.textContent = ch === " " ? " " : ch;
        s.style.display = "inline-block";
        s.style.transform = "translateY(110%) rotate(6deg)";
        s.style.opacity = "0";
        s.style.transition =
          "transform .9s cubic-bezier(.2,.9,.25,1), opacity .9s ease";
        container.appendChild(s);
        setTimeout(() => {
          s.style.transform = "translateY(0) rotate(0)";
          s.style.opacity = "1";
        }, delay + i * 55);
      });
    };

    wrapLetters(line1Ref.current, "JUBRIL", 120);
    wrapLetters(line2Ref.current, "LUKMAN", 120);

    heroBlocksRef.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 700 + i * 120);
    });
  }, [isLoaded]);

  // Mouse parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      ty = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    };
    const onLeave = () => { tx = 0; ty = 0; };
    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      chipsRef.current.forEach((el, i) => {
        if (!el) return;
        const d = CODE_CHIPS[i].depth;
        el.style.transform = `translate3d(${cx * d * 14}px,${cy * d * 14}px,0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll parallax
  useEffect(() => {
    const hero = heroRef.current;
    const inner = innerRef.current;
    const bg = bgRef.current;
    const grid = gridRef.current;
    const cue = scrollCueRef.current;
    if (!hero || !inner) return;
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const heroH = hero.offsetHeight;
      if (scrollY > heroH * 1.2) { ticking = false; return; }
      const progress = Math.min(1, Math.max(0, scrollY / heroH));
      const ease = progress * progress;
      inner.style.transform = `translateY(${-scrollY * 0.45}px) scale(${1 - ease * 0.08})`;
      inner.style.opacity = String(Math.max(0, 1 - ease * 1.6));
      if (bg) bg.style.transform = `translateY(${scrollY * 0.25}px) scale(${1 + ease * 0.04})`;
      if (grid) grid.style.transform = `translateY(${scrollY * 0.15}px)`;
      if (cue) cue.style.opacity = String(Math.max(0, 1 - progress * 4));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const chipBase: React.CSSProperties = {
    position: "absolute",
    fontFamily: "var(--font-code), monospace",
    fontSize: 12.5,
    lineHeight: 1.7,
    padding: "16px 18px",
    borderRadius: 14,
    background: "rgba(20,18,13,0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(232,176,75,0.12)",
    boxShadow: "0 24px 60px -28px rgba(0,0,0,.9)",
    color: "#cdbf9a",
  };

  const heroRevealStyle = (i: number): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(20px)",
    transition: `opacity .8s ease ${i * 0.15}s, transform .8s ease ${i * 0.15}s`,
  });

  return (
    <section
      id="jl-hero"
      ref={heroRef}
      className="jl-hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 24px 80px",
      }}
    >
      {/* Animated gradient bg */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 55% at 50% 38%,rgba(232,176,75,0.10),transparent 70%),linear-gradient(120deg,#0a0907,#100d09 40%,#0a0907 75%)",
          backgroundSize: "200% 200%",
          animation: "var(--animate-grad)",
          willChange: "transform",
        }}
      />
      {/* Grid floor */}
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,176,75,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(232,176,75,0.05) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(70% 60% at 50% 55%,#000,transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 55%,#000,transparent 80%)",
          willChange: "transform",
        }}
      />

      {/* Floating code chips */}
      {CODE_CHIPS.map((chip, i) => (
        <div
          key={i}
          ref={(el) => { chipsRef.current[i] = el; }}
          className="jl-depth"
          style={{
            ...chipBase,
            ...chip.style,
            animation: chip.anim,
            fontSize: i >= 2 ? 12 : 12.5,
          }}
        >
          {chip.content}
        </div>
      ))}

      {/* Hero content */}
      <div
        ref={innerRef}
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          maxWidth: 1100,
          willChange: "transform,opacity",
        }}
      >
        {/* Available badge */}
        <div
          ref={(el) => { heroBlocksRef.current[0] = el; }}
          style={{
            ...heroRevealStyle(0),
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            border: "1px solid rgba(232,176,75,0.2)",
            background: "rgba(232,176,75,0.06)",
            fontFamily: "var(--font-code), monospace",
            fontSize: 11.5,
            letterSpacing: "0.18em",
            color: "#e8b04b",
            textTransform: "uppercase",
            marginBottom: 34,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#5fd17a",
              boxShadow: "0 0 10px #5fd17a",
              display: "inline-block",
            }}
          />
          Available for select work · 2026
        </div>

        {/* Name */}
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(54px,12.5vw,168px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
          }}
        >
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={line1Ref} style={{ display: "inline-block" }} />
          </span>
          <span
            style={{
              display: "block",
              overflow: "hidden",
              background: "linear-gradient(90deg,#f6cf78,#e8b04b,#b8822f)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <span ref={line2Ref} style={{ display: "inline-block" }} />
          </span>
        </h1>

        {/* Tagline */}
        <p
          ref={(el) => { heroBlocksRef.current[1] = el; }}
          style={{
            ...heroRevealStyle(1),
            maxWidth: 600,
            margin: "30px auto 0",
            fontSize: "clamp(16px,2vw,20px)",
            lineHeight: 1.6,
            color: "#b3ad9d",
          }}
        >
          Creative Frontend Engineer crafting immersive, high-performance
          interfaces where motion, depth and detail make products feel{" "}
          <span style={{ color: "#f3efe6" }}>alive</span>.
        </p>

        {/* CTA buttons */}
        <div
          ref={(el) => { heroBlocksRef.current[2] = el; }}
          style={{
            ...heroRevealStyle(2),
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 42,
          }}
        >
          <div className="jl-hero-cta" style={{ display: "contents" }}>
            <a
              href="#jl-work"
              ref={(el) => { ctaBtnRefs.current[0] = el; attachMagnetic(el); }}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 30px",
                borderRadius: 999,
                background: "linear-gradient(135deg,#f6cf78,#d99f3a)",
                color: "#0a0907",
                fontWeight: 600,
                fontSize: 15,
                boxShadow: "0 0 30px rgba(232,176,75,.4)",
                transition: "transform .3s cubic-bezier(.2,.9,.25,1), box-shadow .3s",
              }}
            >
              View selected work →
            </a>
            <a
              href="#jl-contact"
              ref={(el) => { ctaBtnRefs.current[1] = el; attachMagnetic(el); }}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 30px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(243,239,230,0.16)",
                color: "#f3efe6",
                fontWeight: 600,
                fontSize: 15,
                backdropFilter: "blur(10px)",
                transition: "transform .3s cubic-bezier(.2,.9,.25,1), border-color .3s",
              }}
            >
              Start a project
            </a>
          </div>
          <a
            href="/Lukman_Jubril_Resume.pdf"
            download
            ref={(el) => { ctaBtnRefs.current[2] = el; attachMagnetic(el); }}
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 30px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(232,176,75,0.25)",
              color: "#e8b04b",
              fontWeight: 600,
              fontSize: 15,
              backdropFilter: "blur(10px)",
              transition: "transform .3s cubic-bezier(.2,.9,.25,1), border-color .3s",
            }}
          >
            Download CV ↓
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#jl-work"
        ref={scrollCueRef}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease .8s",
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-code), monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "#6a6557",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <span
          style={{
            width: 26,
            height: 42,
            borderRadius: 14,
            border: "1.5px solid rgba(232,176,75,0.4)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 8,
          }}
        >
          <span
            style={{
              width: 4,
              height: 8,
              borderRadius: 3,
              background: "#e8b04b",
              animation: "var(--animate-scroll-dot)",
            }}
          />
        </span>
      </a>
    </section>
  );
}
