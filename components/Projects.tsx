"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ProjectData } from "./types";

const PROJECTS: ProjectData[] = [
  {
    title: "KonnectHQ",
    tag: "Marketplace · Community",
    desc: "Your go-to destination for seamless local services and culinary inspiration. Connect with trusted service providers for everyday needs, and dive into a vibrant recipe-sharing community where culinary enthusiasts unite. Discover, connect, and make every interaction count.",
    stack: "React · Next.js · TypeScript · Node.js",
    link: "https://app.konnecthq.net",
    image: "/konnecthq.png",
  },
  {
    title: "Kinel Academy",
    tag: "EdTech · Platform",
    desc: "A modern learning platform where aspiring tech and creative professionals gain real-world skills through cohort-based programs, hands-on projects, and expert-led lessons. Built for the next generation of builders.",
    stack: "Next.js · TypeScript · Tailwind · Node.js",
    link: "https://www.kinelacademy.com",
    image: "/kinel.png",
  },
  {
    title: "Doju Health",
    tag: "HealthTech · Marketplace",
    desc: "A centralised health marketplace designed to make the procurement of health products easier and more reliable. Bridging the gap between buyers and verified health suppliers across the region.",
    stack: "React · TypeScript · Node.js · PostgreSQL",
    link: "https://www.dojuhealth.com",
    image: "/doju.png",
  },
];

interface ProjectsProps {
  onProjectClick: (p: ProjectData) => void;
}

function ProjectCard({
  project,
  index,
  onProjectClick,
}: {
  project: ProjectData;
  index: number;
  onProjectClick: (p: ProjectData) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  // Reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            },
            (index % 2) * 120,
          );
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  // Tilt
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
      card.style.transform =
        "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={() => onProjectClick(project)}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity .8s ease, transform .35s ease",
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(232,176,75,0.12)",
        background: "rgba(16,14,10,0.7)",
        cursor: "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Preview */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16/10",
          overflow: "hidden",
          background: "rgba(16,14,10,0.9)",
        }}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            loading="eager"
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 18,
            fontFamily: "var(--font-code), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#e8b04b",
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(10,9,7,0.6)",
            border: "1px solid rgba(232,176,75,0.2)",
          }}
        >
          {project.tag.toUpperCase()}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: "24px 26px 26px" }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 600,
            fontSize: 23,
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 14,
            color: "#9a9486",
            lineHeight: 1.6,
          }}
        >
          {project.desc.split(".")[0]}.
        </p>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            color: "#e8b04b",
          }}
        >
          View project <span style={{ transition: "transform .3s" }}>→</span>
        </span>
      </div>
    </article>
  );
}

export default function Projects({ onProjectClick }: ProjectsProps) {
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const els = [labelRef.current, headRef.current, descRef.current];
    els.forEach((el) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
      );
      io.observe(el);
    });
  }, []);

  const revealBase = (delay: number): React.CSSProperties => ({
    opacity: 0,
    transform: "translateY(30px)",
    transition: `opacity .9s ease ${delay}s, transform .9s ease ${delay}s`,
  });

  return (
    <section
      id="jl-work"
      style={{
        position: "relative",
        padding: "90px 24px 120px",
        maxWidth: 1240,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 54,
        }}
      >
        <div>
          <div ref={labelRef} style={revealBase(0)}>
            <span
              style={{
                fontFamily: "var(--font-code), monospace",
                fontSize: 12,
                letterSpacing: "0.3em",
                color: "#e8b04b",
                textTransform: "uppercase",
              }}
            >
              — Selected work
            </span>
          </div>
          <h2
            ref={headRef}
            style={{
              ...revealBase(0.08),
              margin: 0,
              marginTop: 16,
              fontFamily: "var(--font-space), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px,5vw,56px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            Things I&apos;ve built
          </h2>
        </div>
        <p
          ref={descRef}
          style={{
            ...revealBase(0.16),
            maxWidth: 320,
            margin: 0,
            fontSize: 14.5,
            color: "#8a8475",
            lineHeight: 1.6,
          }}
        >
          A selection of products built end-to-end — from architecture and
          design to shipped, live experiences.
        </p>
      </div>

      <div
        className="jl-projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 26,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>
    </section>
  );
}
