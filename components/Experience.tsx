"use client";
import { useEffect, useRef } from "react";

const ITEMS = [
  {
    role: "Graduate Intern",
    period: "2026 — Now",
    company: "Datamellon · Cloud Modernization",
    desc: "Built and maintained the BillsNg Admin Dashboard (React.js, TypeScript, React Query, Shadcn, Tailwind), integrating FAST APIs for provider management and transaction monitoring. Also engineered the UI and LLM integration for JRB Caista — including streaming response support — and contributed to the NSW AI Analytics Dashboard within an Agile team.",
    highlight: true,
  },
  {
    role: "Frontend Developer Tutor",
    period: "2025 — Now",
    company: "Techcrush · Edtech",
    desc: "Mentored 700+ students from zero coding knowledge to shipping their own websites — designing and delivering a structured frontend curriculum covering HTML, CSS, JavaScript, and React, with hands-on projects that mirror real-world workflows.",
    highlight: true,
  },
  {
    role: "Frontend Developer",
    period: "2024 — 2025",
    company: "KonnectHq · Marketplace",
    desc: "Built the website and web app for a local services and culinary platform using Next.js, React.js, TypeScript, Tailwind, Redux, and Firebase — shipping real-time chat between customers and providers, responsive design, and an admin dashboard across an Agile team.",
    highlight: false,
  },
  {
    role: "Frontend Developer (Contract)",
    period: "2025 — 2025",
    company: "Gurugeeks · IT Consulting",
    desc: "Built features across a HRM & CRM SaaS platform using React, Redux, and Tailwind — applying cloud-native design principles to drive performance and reliability within a collaborative, standards-focused team.",
    highlight: false,
  },
  {
    role: "Front-end Developer (Volunteer)",
    period: "2023 — 2024",
    company: "United States of Africa",
    desc: "Collaborated on ZumaridiAfrica, a video conferencing app — building intuitive UI/UX, optimising performance for smooth calls, and shipping features including recording and calendar integration.",
    highlight: true,
  },
];

export default function Experience() {
  const secRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Scroll-driven timeline fill
  useEffect(() => {
    const sec = secRef.current;
    const line = lineRef.current;
    if (!sec || !line) return;

    const update = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.35;
      const passed = vh * 0.62 - r.top;
      const k = total > 0 ? passed / total : 0;
      line.style.transform = `scaleY(${Math.min(1, Math.max(0, k))})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Mobile horizontal parallax + force-reveal
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Detect horizontal scroll mode by checking actual DOM state (more reliable than matchMedia)
    const isHorizontal = wrap.scrollWidth > wrap.clientWidth + 1;

    if (isHorizontal) {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.transition = "none";
      });
    }

    const onScroll = () => {
      if (!isHorizontal) return;
      const wRect = wrap.getBoundingClientRect();
      const center = wRect.left + wRect.width / 2;
      wrap.querySelectorAll<HTMLElement>(".jl-exp-item").forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = (r.left + r.width / 2 - center) / wRect.width;
        const abs = Math.abs(dist);
        el.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease";
        el.style.transform = `perspective(900px) rotateY(${dist * 28}deg) scale(${1 - abs * 0.18}) translateZ(${-abs * 80}px)`;
        el.style.opacity = String(1 - abs * 0.45);
      });
    };

    wrap.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => wrap.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal animations (header only on mobile; items handled by parallax effect above)
  useEffect(() => {
    const wrap = wrapRef.current;
    const isHorizontal = wrap ? wrap.scrollWidth > wrap.clientWidth + 1 : false;

    const headerEls = [labelRef.current, headRef.current];
    headerEls.forEach((el) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "translateY(0)";
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
      );
      io.observe(el);
    });

    if (!isHorizontal) {
      itemRefs.current.forEach((el) => {
        if (!el) return;
        const io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              (el as HTMLElement).style.opacity = "1";
              (el as HTMLElement).style.transform = "translateY(0)";
              io.disconnect();
            }
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
        );
        io.observe(el);
      });
    }
  }, []);

  const revealBase = (delay = 0): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(30px)",
    transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
  });

  return (
    <section
      id="jl-exp"
      ref={secRef}
      style={{
        position: "relative",
        padding: "90px 24px 120px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 70 }}>
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
            — The journey
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
          2 years, one obsession
        </h2>
      </div>

      <div
        ref={wrapRef}
        className="jl-exp-wrap"
        style={{ position: "relative", paddingLeft: 54 }}
      >
        {/* Track */}
        <div
          className="jl-exp-track"
          style={{
            position: "absolute",
            left: 19,
            top: 6,
            bottom: 6,
            width: 2,
            background: "rgba(232,176,75,0.12)",
            borderRadius: 2,
          }}
        />
        {/* Animated fill */}
        <div
          ref={lineRef}
          className="jl-exp-track"
          style={{
            position: "absolute",
            left: 19,
            top: 6,
            bottom: 6,
            width: 2,
            transformOrigin: "top",
            transform: "scaleY(0)",
            background: "linear-gradient(180deg,#f6cf78,#b8822f)",
            boxShadow: "0 0 14px rgba(232,176,75,.5)",
            borderRadius: 2,
          }}
        />

        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="jl-exp-item"
            style={{
              ...revealBase(0),
              position: "relative",
              marginBottom: i < ITEMS.length - 1 ? 40 : 0,
            }}
          >
            {/* Dot */}
            <span
              className="jl-exp-dot"
              style={{
                position: "absolute",
                left: -41,
                top: 4,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: item.highlight ? "#e8b04b" : "#0a0907",
                border: item.highlight ? "none" : "2px solid #e8b04b",
                boxShadow: `0 0 ${item.highlight ? 16 : 12}px rgba(232,176,75,${item.highlight ? 0.8 : 0.6})`,
              }}
            />
            {/* Card */}
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 18,
                background: item.highlight
                  ? "linear-gradient(135deg,rgba(232,176,75,0.08),rgba(255,255,255,0.02))"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid rgba(232,176,75,${item.highlight ? 0.18 : 0.1})`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-space), sans-serif",
                    fontWeight: 600,
                    fontSize: 21,
                  }}
                >
                  {item.role}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-code), monospace",
                    fontSize: 12,
                    color: "#e8b04b",
                  }}
                >
                  {item.period}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "#8a8475",
                  margin: "4px 0 12px",
                }}
              >
                {item.company}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14.5,
                  color: "#b3ad9d",
                  lineHeight: 1.65,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
