"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const STATS = [
  { count: 2, suffix: "+", label: "Years crafting" },
  { count: 15, suffix: "+", label: "Products shipped" },
  { count: 5, suffix: "", label: "Awards & features" },
];

function useReveal(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.transform = "translateY(0) scale(1)";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

function RevealDiv({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CountStat({
  count,
  suffix,
  label,
}: {
  count: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          const dur = 1500;
          const start = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            if (numRef.current)
              numRef.current.textContent =
                Math.round(eased * count) + (k >= 1 ? suffix : "");
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [count, suffix]);

  return (
    <div
      ref={ref}
      style={{
        padding: "22px 18px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(232,176,75,0.1)",
      }}
    >
      <span
        ref={numRef}
        style={{
          fontFamily: "var(--font-space), sans-serif",
          fontWeight: 700,
          fontSize: 38,
          color: "#f6cf78",
          lineHeight: 1,
          display: "block",
        }}
      >
        0
      </span>
      <div style={{ fontSize: 12.5, color: "#8a8475", marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 11}deg) rotateX(${-py * 11}deg) translateY(-6px)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="jl-about"
      style={{
        position: "relative",
        padding: "130px 24px 110px",
        maxWidth: 1240,
        margin: "0 auto",
      }}
    >
      <div
        className="jl-about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* Photo placeholder */}
        <RevealDiv style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: "-12% -12% -12% -12%",
              background:
                "radial-gradient(circle at 40% 30%,rgba(232,176,75,0.16),transparent 60%)",
              filter: "blur(20px)",
            }}
          />
          <div
            ref={cardRef}
            style={{
              position: "relative",
              aspectRatio: "4/5",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid rgba(232,176,75,0.18)",
              background:
                "repeating-linear-gradient(135deg,rgba(255,255,255,0.035) 0 12px,rgba(255,255,255,0.012) 12px 24px)",
              boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)",
              transition: "transform .3s ease",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/portfolio-image.jpeg"
              alt="Jubril Lukman"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg,transparent 55%,rgba(10,9,7,0.85))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 16,
                fontFamily: "var(--font-code), monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "#e8b04b",
              }}
            >
              LAGOS · REMOTE · GMT+1
            </div>
          </div>
        </RevealDiv>

        {/* Text + stats */}
        <div>
          <RevealDiv
            style={{
              fontFamily: "var(--font-code), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "#e8b04b",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            — About
          </RevealDiv>
          <RevealDiv
            delay={0.08}
            style={{
              margin: "0 0 24px",
              fontFamily: "var(--font-space), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(30px,4vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            I design and engineer the{" "}
            <span style={{ color: "#e8b04b" }}>moments</span> between clicks.
          </RevealDiv>
          <RevealDiv
            delay={0.16}
            style={{
              margin: "0 0 18px",
              fontSize: 16.5,
              lineHeight: 1.75,
              color: "#b3ad9d",
            }}
          >
            For 2 years I&apos;ve lived at the seam of design and engineering —
            translating ambitious visions into interfaces that load fast, feel
            tactile, and stay with people. I obsess over easing curves, frame
            budgets, and the half-second of magic that turns a product into an
            experience.
          </RevealDiv>
          <RevealDiv delay={0.24}>
            <div
              className="jl-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 18,
                marginTop: 38,
              }}
            >
              {STATS.map((s) => (
                <CountStat key={s.label} {...s} />
              ))}
            </div>
          </RevealDiv>
        </div>
      </div>
    </section>
  );
}
