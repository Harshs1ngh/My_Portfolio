import ScrollReveal from "../components/ScrollReveal";
import { portfolioData } from "../data/portfolio";

export default function About() {
  const { about, stats, location, stack } = portfolioData;

  return (
    <section id="about" style={{ padding: "120px 4vw", background: "var(--bg2)" }}>
      <ScrollReveal>
        <p style={{
          fontSize: 11, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 24,
        }}>// 01 &mdash; About</p>
      </ScrollReveal>

      <div className="about-grid">
        <ScrollReveal delay={0.1}>
          <div>
            {[
              ["Location", location, "var(--text)"],
              ["Stack", stack, "var(--text)"],
              ["Available", "Open to Work", "#4ade80"],
              ["Focus", "Scalable Systems · Software Architecture · Algorithms", "var(--text)"],
            ].map(([label, value, color]) => (
              <div key={label} style={{ marginBottom: 24 }}>
                <p style={{
                  fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
                  color: "var(--text-dim)", marginBottom: 6,
                }}>{label}</p>
                <p style={{ fontSize: 14, color, letterSpacing: "0.5px" }}>{value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p style={{
            fontSize: "clamp(20px, 2.4vw, 30px)",
            lineHeight: 1.55, fontWeight: 400,
            color: "var(--text)", letterSpacing: "0.2px", 
          }}>
            {about.split(/(Harsh|performance and elegance|maintainable, scalable, and fast)/).map((part, i) =>
              ["Harsh", "performance and elegance", "maintainable, scalable, and fast"].includes(part)
                ? <em key={i} style={{ color: "var(--accent)", fontStyle: "normal" }}>{part}</em>
                : part
            )}
          </p>
        </ScrollReveal>
      </div>

      <div className="stats-row">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={0.1 + i * 0.07}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(34px, 4.5vw, 56px)",
                color: "var(--accent)", letterSpacing: "2px",
              }}>{s.number}</div>
              <div style={{
                fontSize: 11, letterSpacing: "2px",
                textTransform: "uppercase", color: "var(--text-muted)",
                marginTop: 6,
              }}>{s.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: start;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 80px;
          border-top: 1px solid var(--border);
          padding-top: 52px;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .stats-row { grid-template-columns: repeat(2, 1fr); gap: 40px; }
        }
      `}</style>
    </section>
  );
}