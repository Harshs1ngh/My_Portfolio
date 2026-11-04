import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { portfolioData } from "../data/portfolio";

function SkillCard({ icon, title, tags, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          y: hovered ? -6 : 0,
          borderColor: hovered ? "rgba(78,154,241,0.4)" : "rgba(241,241,241,0.08)",
        }}
        transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
        data-cursor-hover
        style={{
          border: "1px solid var(--border)",
          padding: "32px",
          background: "var(--bg2)",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
        <h3 style={{
          fontFamily: "var(--font-disp)",
          fontSize: 24, letterSpacing: "2px",
          color: "var(--text)", marginBottom: 16,
        }}>{title}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11, padding: "4px 10px",
              border: "1px solid rgba(78,154,241,0.25)",
              color: "var(--accent)", letterSpacing: "1px",
            }}>{tag}</span>
          ))}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 4vw", background: "var(--bg)" }}>
      <ScrollReveal>
        <p style={{
          fontSize: 11, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 16,
        }}>// 02 — Skills</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{
          fontFamily: "var(--font-disp)",
          fontSize: "clamp(48px, 7vw, 88px)",
          lineHeight: 0.92, letterSpacing: "2px",
          color: "var(--text)", marginBottom: 56,
        }}>TECHNICAL<br/>EXPERTISE</h2>
      </ScrollReveal>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 24,
      }}>
        {portfolioData.skills.map((skill, i) => (
          <SkillCard key={skill.title} {...skill} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}