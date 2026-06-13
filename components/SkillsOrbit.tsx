"use client";
import { useEffect, useRef, useState } from "react";

interface TechNode {
  name: string;
  level: string;
  projects: string;
  angle: number;
}

interface Ring {
  radius: number;
  speed: number;
  reverse: boolean;
  nodes: TechNode[];
}

const RINGS: Ring[] = [
  {
    radius: 118,
    speed: 34,
    reverse: false,
    nodes: [
      { name: "React.js", level: "Expert", projects: "15+ projects", angle: 0 },
      { name: "Next.js", level: "Expert", projects: "12+ projects", angle: 120 },
      { name: "TypeScript", level: "Expert", projects: "38 projects", angle: 240 },
    ],
  }, 
  {
    radius: 200,
    speed: 50,
    reverse: true,
    nodes: [
      { name: "JavaScript", level: "Expert", projects: "60+ projects", angle: 30 },
      { name: "Framer Motion", level: "Advanced", projects: "28 projects", angle: 102 },
      { name: "Tailwind CSS", level: "Advanced", projects: "30 projects", angle: 174 },
      { name: "Node.js", level: "Advanced", projects: "20 projects", angle: 246 },
      { name: "React Native", level: "Proficient", projects: "2 projects", angle: 318 },
    ],
  },
  {
    radius: 282,
    speed: 68,
    reverse: false,
    nodes: [
      { name: "HTML", level: "Expert", projects: "60+ projects", angle: 20 },
      { name: "CSS", level: "Expert", projects: "60+ projects", angle: 92 },
      { name: "SCSS", level: "Advanced", projects: "24 projects", angle: 164 },
      { name: "Python", level: "Proficient", projects: "10 projects", angle: 236 },
      { name: "Shadcn UI", level: "Advanced", projects: "18 projects", angle: 308 },
    ],
  },
];

interface Tooltip {
  name: string;
  meta: string;
  x: number;
  y: number;
  visible: boolean;
}

export default function SkillsOrbit() {
  const orbitRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const orbitWrapRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tooltip>({ name: "", meta: "", x: 0, y: 0, visible: false });

  // Reveal animation
  useEffect(() => {
    const els = [labelRef.current, headRef.current, descRef.current];
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
    const wrap = orbitWrapRef.current;
    if (wrap) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            wrap.style.opacity = "1";
            wrap.style.transform = "scale(1)";
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
      );
      io.observe(wrap);
    }
  }, []);

  const handleChipEnter = (node: TechNode, chipEl: HTMLDivElement) => {
    const orbitBox = orbitRef.current;
    if (!orbitBox) return;
    const br = chipEl.getBoundingClientRect();
    const ob = orbitBox.getBoundingClientRect();
    setTip({
      name: node.name,
      meta: `${node.level} · ${node.projects}`,
      x: br.left + br.width / 2 - ob.left,
      y: br.top - ob.top,
      visible: true,
    });
  };

  const handleChipLeave = () => setTip((t) => ({ ...t, visible: false }));

  const revealBase = (delay: number): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(30px)",
    transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
  });

  return (
    <section
      id="jl-skills"
      style={{
        position: "relative",
        padding: "90px 24px 120px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(50% 50% at 50% 50%,rgba(232,176,75,0.06),transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1240,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
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
            — Capabilities
          </span>
        </div>
        <h2
          ref={headRef}
          style={{
            ...revealBase(0.08),
            margin: "0 0 10px",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px,5vw,56px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          A galaxy of tools
        </h2>
        <p
          ref={descRef}
          style={{
            ...revealBase(0.16),
            margin: "0 auto 40px",
            maxWidth: 520,
            fontSize: 15,
            color: "#8a8475",
            lineHeight: 1.6,
          }}
        >
          Hover any technology to see how deep I go. Everything orbits one core
          principle — performance.
        </p>

        {/* Orbit */}
        <div
          ref={orbitWrapRef}
          style={{
            opacity: 0,
            transform: "scale(0.92)",
            transition: "opacity 1s ease, transform 1s ease",
            position: "relative",
            width: "min(620px,92vw)",
            aspectRatio: "1",
            margin: "0 auto",
          }}
        >
          <div ref={orbitRef} style={{ position: "absolute", inset: 0 }}>
            {/* SVG orbit paths */}
            <svg
              viewBox="0 0 620 620"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <circle
                cx="310" cy="310" r="118"
                fill="none" stroke="rgba(232,176,75,0.18)"
                strokeWidth="1" strokeDasharray="3 8"
              />
              <circle
                cx="310" cy="310" r="200"
                fill="none" stroke="rgba(232,176,75,0.14)"
                strokeWidth="1" strokeDasharray="3 10"
              />
              <circle
                cx="310" cy="310" r="282"
                fill="none" stroke="rgba(232,176,75,0.1)"
                strokeWidth="1" strokeDasharray="3 12"
              />
              <circle
                cx="310" cy="310" r="200"
                fill="none" stroke="#e8b04b" strokeWidth="1.5"
                strokeDasharray="2 1400" strokeLinecap="round"
                opacity="0.6"
                style={{ animation: "var(--animate-dash)" }}
              />
            </svg>

            {/* Core */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 124,
                height: 124,
                borderRadius: "50%",
                background: "radial-gradient(circle at 38% 32%,#f6cf78,#b8822f)",
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 0 60px rgba(232,176,75,.5),inset 0 0 30px rgba(255,255,255,.25)",
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#0a0907",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                60
                <br />
                FPS
              </span>
              <span
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  border: "1px solid rgba(232,176,75,.4)",
                  animation: "var(--animate-ring)",
                }}
              />
            </div>

            {/* Rings */}
            {RINGS.map((ring, ri) => {
              const spinAnim = ring.reverse
                ? `jlSpinR ${ring.speed}s linear infinite`
                : `jlSpin ${ring.speed}s linear infinite`;
              const counterAnim = ring.reverse
                ? `jlSpin ${ring.speed}s linear infinite`
                : `jlSpinR ${ring.speed}s linear infinite`;

              return (
                <div
                  key={ri}
                  style={{
                    position: "absolute",
                    inset: 0,
                    animation: spinAnim,
                  }}
                >
                  {ring.nodes.map((node) => {
                    const angleRad = (node.angle * Math.PI) / 180;
                    const x = Math.cos(angleRad) * ring.radius;
                    const y = Math.sin(angleRad) * ring.radius;
                    return (
                      <div
                        key={node.name}
                        className="orbit-chip"
                        suppressHydrationWarning
                        style={{
                          transform: `translate(-50%,-50%) translate(${x}px,${y}px)`,
                          animation: counterAnim,
                        }}
                        onMouseEnter={(e) =>
                          handleChipEnter(node, e.currentTarget as HTMLDivElement)
                        }
                        onMouseLeave={handleChipLeave}
                      >
                        {node.name}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Tooltip */}
            <div
              style={{
                position: "absolute",
                left: tip.x,
                top: tip.y,
                transform: "translate(-50%,-130%)",
                pointerEvents: "none",
                opacity: tip.visible ? 1 : 0,
                transition: "opacity .2s ease",
                zIndex: 10,
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(16,14,10,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(232,176,75,0.25)",
                boxShadow: "0 18px 40px -18px rgba(0,0,0,.9)",
                whiteSpace: "nowrap",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-space), sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#f3efe6",
                }}
              >
                {tip.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-code), monospace",
                  fontSize: 11,
                  color: "#e8b04b",
                  marginTop: 3,
                }}
              >
                {tip.meta}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
