export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        borderTop: "1px solid rgba(232,176,75,0.1)",
        padding: "40px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-0.02em",
          }}
        >
          Jubril Lukman
        </div>
        <div
          style={{
            fontFamily: "var(--font-code), monospace",
            fontSize: 11.5,
            color: "#6a6557",
            letterSpacing: "0.1em",
          }}
        >
          Designed &amp; engineered with intent · © 2026
        </div>
        <a
          href="#jl-hero"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#e8b04b",
            fontWeight: 500,
            transition: "transform .25s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
