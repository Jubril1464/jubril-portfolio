"use client";
import { useEffect } from "react";
import Image from "next/image";
import { ProjectData } from "./types";

interface ModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function Modal({ project, onClose }: ModalProps) {
  const open = !!project;

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const stackItems = project?.stack
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
        transition: "opacity .4s ease, visibility .4s ease",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(6,5,4,0.78)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          width: "min(680px,100%)",
          maxHeight: "88vh",
          overflow: "auto",
          borderRadius: 24,
          background: "#100d09",
          border: "1px solid rgba(232,176,75,0.2)",
          boxShadow: "0 50px 120px -40px rgba(0,0,0,.95)",
          transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(.97)",
          transition: "transform .45s cubic-bezier(.2,.9,.3,1)",
        }}
      >
        {/* Hero image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            background: "rgba(16,14,10,0.9)",
          }}
        >
          {project?.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="680px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          )}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid rgba(243,239,230,0.18)",
              background: "rgba(10,9,7,0.6)",
              color: "#f3efe6",
              fontSize: 18,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
              transition: "background .3s, transform .3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(232,176,75,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(10,9,7,0.6)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "34px 36px 40px" }}>
          <div
            style={{
              fontFamily: "var(--font-code), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "#e8b04b",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            {project?.tag}
          </div>
          <h3
            style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-space), sans-serif",
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: "-0.03em",
            }}
          >
            {project?.title}
          </h3>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 16,
              lineHeight: 1.7,
              color: "#b3ad9d",
            }}
          >
            {project?.desc}
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {stackItems.map((s) => (
              <span
                key={s}
                style={{
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: "rgba(232,176,75,0.08)",
                  border: "1px solid rgba(232,176,75,0.2)",
                  fontFamily: "var(--font-code), monospace",
                  fontSize: 12,
                  color: "#e8b04b",
                }}
              >
                {s}
              </span>
            ))}
          </div>
          {project?.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "13px 26px",
                borderRadius: 999,
                background: "linear-gradient(135deg,#f6cf78,#d99f3a)",
                color: "#0a0907",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(232,176,75,.3)",
                transition: "transform .25s ease, box-shadow .3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(232,176,75,.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(232,176,75,.3)";
              }}
            >
              Visit site ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
