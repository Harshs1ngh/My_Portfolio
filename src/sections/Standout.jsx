import ScrollReveal from "../components/ScrollReveal";

const lines = [
  { text: "(A question,)", align: "left",   size: [40, 50],   color: "var(--text)",   weight: 400, ls: 0 },
  { text: "explored through",      align: "right",  size: [70, 120],  color: "var(--accent)", weight: 900, ls: -2 },
  { text: "logic,",        align: "left",   size: [70, 120],  color: "var(--text)",   weight: 900, ls: 16 },
  { text: "ALGORITHMS.",    align: "center", size: [60, 160],  color: "var(--text)",   weight: 900, ls: -3 },
];

export default function Standout() {
  return (
    <section
      style={{
        padding: "160px 4vw",
        background: "var(--bg2)",
        overflow: "hidden",
      }}
    >
      <div style={{
        display: "flex", flexDirection: "column",
        gap: "clamp(20px, 3vw, 48px)",
      }}>
        {lines.map((line, i) => (
          <ScrollReveal key={i} delay={i * 0.18} y={50}>
            <div style={{
              width: "100%",
              textAlign: line.align,
            }}>
              <span
                style={{
                  fontFamily: "var(--font-disp)",
                  fontSize: `clamp(${line.size[0]}px, ${line.size[1] / 14}vw, ${line.size[1]}px)`,
                  fontWeight: line.weight,
                  color: line.color,
                  letterSpacing: line.ls,
                  lineHeight: 0.88,
                  display: "inline-block",
                  textShadow: "2px 2px 12px rgba(15,17,23,0.6)",
                }}
              >
                {line.text}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal delay={0.7}>
        <div style={{
          marginTop: "clamp(48px, 8vw, 100px)",
          display: "flex", justifyContent: "center",
        }}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            data-cursor-hover
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "18px 48px",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              fontSize: 12, letterSpacing: "3px",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              position: "relative", overflow: "hidden",
              transition: "color 0.3s",
            }}
            className="cta-btn"
          >
            Start a Project →
          </a>
        </div>
      </ScrollReveal>

      <style>{`
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .cta-btn:hover::before { transform: scaleX(1); }
        .cta-btn:hover { color: var(--bg) !important; }
        .cta-btn > * { position: relative; z-index: 1; }
        .cta-btn span { position: relative; z-index: 1; }
      `}</style>
    </section>
  );
}