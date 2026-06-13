"use client";
import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  { q: "Jubril built the BillsNg dashboard end-to-end and got the Caista LLM streaming integration running smoothly — clean code, zero hand-holding required.", n: "Agboola Awonbiowo,", r: "Frontend Lead, Datamellon" },
  { q: "The real-time chat between customers and providers was seamless from day one. Jubril understood the product deeply and the frontend showed it.", n: "Abass Makinde", r: "Founder, KonnectHQ" },
  { q: "He translated a complex learning platform into an interface that feels effortless. Students noticed the difference immediately.", n: "Ridwan Makinde", r: "Technical Lead, Kinel Academy" },
  { q: "Jubril brought structure and clarity to our marketplace UI. The procurement flow is intuitive in a space where that's genuinely hard to achieve.", n: "Ibrahim Abdulkadir", r: "Product Lead, Doju Health" },
  { q: "He improved our video conferencing UI and shipped recording and calendar features without slowing the team down — solid collaborator.", n: "Chimerem", r: "Lead Developer, ZumaridiAfrica" },
  { q: "Delivered HRM and CRM features with real attention to performance. Jubril's approach to cloud-native patterns elevated the whole codebase.", n: "Charles", r: "Engineering Manager, SaaS Platform" },
];

function TestCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  const initials = t.n.split(" ").map((w) => w[0]).join("");
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: 360,
        padding: "26px 28px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.035)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(232,176,75,0.12)",
        boxShadow: "0 24px 60px -36px rgba(0,0,0,.8)",
      }}
    >
      <div style={{ color: "#e8b04b", fontSize: 20, marginBottom: 12, letterSpacing: 2 }}>
        &ldquo;
      </div>
      <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.6, color: "#cdc6b6" }}>
        {t.q}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#f6cf78,#b8822f)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#0a0907",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#f3efe6" }}>{t.n}</div>
          <div style={{ fontSize: 12, color: "#8a8475" }}>{t.r}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [labelRef.current, headRef.current];
    els.forEach((el) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "translateY(0)";
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );
      io.observe(el);
    });
  }, []);

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  const doubled2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  const revealBase = (delay = 0): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(30px)",
    transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
  });

  return (
    <section
      style={{
        position: "relative",
        padding: "90px 0 110px",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 48, padding: "0 24px" }}>
        <div ref={labelRef} style={revealBase(0)}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-code), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "#e8b04b",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            — Kind words
          </span>
        </div>
        <h2
          ref={headRef}
          style={{
            ...revealBase(0.08),
            margin: 0,
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px,5vw,56px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          People I&apos;ve built with
        </h2>
      </div>

      <div
        style={{
          position: "relative",
          WebkitMaskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
          maskImage:
            "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
        }}
      >
        {/* Row 1 — left scrolling */}
        <div
          ref={row1Ref}
          style={{
            display: "flex",
            width: "max-content",
            gap: 22,
            padding: "0 11px",
            animation: "var(--animate-marquee-test)",
          }}
        >
          {doubled.map((t, i) => (
            <TestCard key={i} t={t} />
          ))}
        </div>
        {/* Row 2 — right scrolling */}
        <div
          ref={row2Ref}
          style={{
            display: "flex",
            width: "max-content",
            gap: 22,
            padding: "18px 11px 0",
            animation: "var(--animate-marquee-test-r)",
          }}
        >
          {doubled2.map((t, i) => (
            <TestCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
