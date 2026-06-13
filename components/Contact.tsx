"use client";
import { useEffect, useRef, useState } from "react";

const SOCIALS = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "X / Twitter", href: "#" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [labelRef.current, headRef.current, descRef.current, formWrapRef.current, socialsRef.current];
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sent || loading) return;
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const revealBase = (delay = 0): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(30px)",
    transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
  });

  const inputStyle: React.CSSProperties = {
    padding: "16px 18px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(243,239,230,0.12)",
    color: "#f3efe6",
    fontSize: 15,
    outline: "none",
    transition: "border-color .3s, box-shadow .3s, background .3s",
    width: "100%",
  };

  return (
    <section
      id="jl-contact"
      style={{ position: "relative", padding: "110px 24px 90px", overflow: "hidden" }}
    >
      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,176,75,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(232,176,75,0.06) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "var(--animate-grid-pan)",
          maskImage: "radial-gradient(70% 70% at 50% 40%,#000,transparent 80%)",
          WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%,#000,transparent 80%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(45% 40% at 50% 35%,rgba(232,176,75,0.1),transparent 70%)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <div ref={labelRef} style={revealBase(0)}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-code), monospace",
              fontSize: 12,
              letterSpacing: "0.3em",
              color: "#e8b04b",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            — Let&apos;s build
          </span>
        </div>
        <h2
          ref={headRef}
          style={{
            ...revealBase(0.08),
            margin: "0 0 18px",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px,8vw,86px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          Have something
          <br />
          <span
            style={{
              background: "linear-gradient(90deg,#f6cf78,#e8b04b,#b8822f)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            worth building?
          </span>
        </h2>
        <p
          ref={descRef}
          style={{
            ...revealBase(0.16),
            margin: "0 auto 44px",
            maxWidth: 480,
            fontSize: 16,
            color: "#b3ad9d",
            lineHeight: 1.65,
          }}
        >
          Tell me about it. I reply to every serious message within 48 hours.
        </p>

        <div
          ref={formWrapRef}
          style={{ ...revealBase(0.24), maxWidth: 520, margin: "0 auto" }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 16, textAlign: "left" }}
          >
            <div
              className="jl-form-row"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="jl-input"
                style={inputStyle}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="jl-input"
                style={inputStyle}
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell me about your project…"
              rows={4}
              className="jl-input"
              style={{ ...inputStyle, resize: "vertical" }}
              required
            />
            {error && (
              <p style={{ margin: 0, fontSize: 13.5, color: "#f87171" }}>{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || sent}
              style={{
                marginTop: 6,
                justifySelf: "start",
                padding: "16px 34px",
                border: "none",
                borderRadius: 14,
                background: sent
                  ? "linear-gradient(135deg,#5fd17a,#3a9e54)"
                  : "linear-gradient(135deg,#f6cf78,#d99f3a)",
                color: "#0a0907",
                fontWeight: 600,
                fontSize: 15,
                cursor: loading || sent ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 0 30px rgba(232,176,75,.35)",
                transition: "transform .25s ease, background .4s, opacity .3s",
              }}
            >
              {sent ? "Message sent ✓" : loading ? "Sending…" : "Send message →"}
            </button>
          </form>
        </div>

        <div
          ref={socialsRef}
          style={{
            ...revealBase(0),
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 46,
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{
                textDecoration: "none",
                padding: "12px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(243,239,230,0.12)",
                color: "#cdc6b6",
                fontSize: 13.5,
                fontWeight: 500,
                transition: "transform .25s ease, border-color .3s, color .3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(232,176,75,0.4)";
                (e.currentTarget as HTMLElement).style.color = "#f6cf78";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(243,239,230,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#cdc6b6";
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
