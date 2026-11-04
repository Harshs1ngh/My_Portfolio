import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { portfolioData } from "../data/portfolio";

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.01 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-cursor-hover
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--bg3)",
          aspectRatio: project.wide ? "21/9" : "16/10",
          gridColumn: project.wide ? "span 2" : "span 1",
          transformStyle: "preserve-3d",
          perspective: 1000,
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
        className={project.wide ? "project-wide" : ""}
      >
        {/* Color accent bg */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 30% 40%, ${project.color}18 0%, transparent 65%)`,
          transition: "opacity 0.4s",
          opacity: hovered ? 1 : 0.4,
        }} />

        {/* Project Background Image */}
        {project.image && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: hovered ? 0.95 : 0.85,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(15,17,23,0.25), rgba(15,17,23,0.65))",
            pointerEvents: "none",
          }}
        />

        {/* Number Watermark */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(80px, 14vw, 160px)",
            color: "rgba(255,255,255,0.18)",
            letterSpacing: "4px",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {project.id}
        </div>

        {/* Always-visible bottom info */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(15,17,23,0.92) 0%, transparent 100%)",
          padding: "24px 28px 20px",
        }}>
          <p style={{
            fontSize: 11, letterSpacing: "3px",
            color: project.color, marginBottom: 8,
          }}>{project.id} / {String(portfolioData.projects.length).padStart(2, "0")}</p>
          <p style={{
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(20px, 2.5vw, 34px)",
            letterSpacing: "2px", color: "var(--text)",
          }}>{project.name}</p>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(15,17,23,0.97) 0%, rgba(15,17,23,0.5) 50%, transparent 100%)",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: "32px 28px",
              }}
            >
              <p style={{
                fontSize: 11, letterSpacing: "3px",
                color: project.color, marginBottom: 8,
              }}>{project.id} / {String(portfolioData.projects.length).padStart(2, "0")}</p>
              <p style={{
                fontFamily: "var(--font-disp)",
                fontSize: "clamp(20px, 2.5vw, 34px)",
                letterSpacing: "2px", color: "var(--text)", marginBottom: 12,
              }}>{project.name}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                {project.tech.map((t) => (
                  <span key={t} style={{
                    fontSize: 10, letterSpacing: "2px",
                    textTransform: "uppercase",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)", padding: "3px 8px",
                  }}>{t}</span>
                ))}
              </div>
              <p style={{
                fontSize: 13, lineHeight: 1.65,
                color: "var(--text-muted)", marginBottom: 16,
                maxWidth: 480,
              }}>{project.description}</p>
              <div style={{ display: "flex", gap: 16 }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 11, letterSpacing: "2px",
                    textTransform: "uppercase", color: "var(--accent)",
                    borderBottom: "1px solid rgba(78,154,241,0.4)",
                    paddingBottom: 2,
                    transition: "color 0.2s",
                  }}
                >GitHub ↗</a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 11, letterSpacing: "2px",
                      textTransform: "uppercase", color: "var(--text-muted)",
                      borderBottom: "1px solid var(--border)",
                      paddingBottom: 2,
                    }}
                  >Live Demo ↗</a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  );
}

export default function Works() {
  return (
    <section id="works" style={{ padding: "120px 0 0", background: "var(--bg2)", overflow: "hidden" }}>
      <div style={{ padding: "0 4vw" }}>
        <ScrollReveal>
          <p style={{
            fontSize: 11, letterSpacing: "3px",
            textTransform: "uppercase", color: "var(--accent)", marginBottom: 48,
          }}>// 03 — Works</p>
        </ScrollReveal>
      </div>

      {/* Scrolling ticker */}
      <div style={{ overflow: "hidden", marginBottom: 48 }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{
            display: "inline-flex",
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(80px, 12vw, 144px)",
            whiteSpace: "nowrap",
            letterSpacing: "4px",
            color: "transparent",
            WebkitTextStroke: "1px rgba(241,241,241,0.33)",
          }}
        >
          {Array(6).fill("SELECTED PROJECTS \u00A0\u00A0\u00A0").join("")}
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        padding: "0 4vw",
      }} className="projects-grid">
        {portfolioData.projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i * 0.07} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .project-wide { grid-column: span 1 !important; aspect-ratio: 16/10 !important; }
        }
      `}</style>
    </section>
  );
}