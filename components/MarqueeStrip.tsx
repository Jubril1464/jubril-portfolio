const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "React Native",
  "Python",
  "Tailwind",
  "Node.js",
  "Javascript",
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div
      style={{
        position: "relative",
        borderTop: "1px solid rgba(232,176,75,0.08)",
        borderBottom: "1px solid rgba(232,176,75,0.08)",
        padding: "22px 0",
        overflow: "hidden",
        background: "rgba(15,13,9,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "var(--animate-marquee)",
          gap: 50,
          whiteSpace: "nowrap",
          fontFamily: "var(--font-space), sans-serif",
          fontWeight: 600,
          fontSize: 18,
          color: "#5a5648",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 50 }}
          >
            <span>{item}</span>
            <span style={{ color: "#e8b04b" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
