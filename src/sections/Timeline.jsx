import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { portfolioData } from "../data/portfolio";

function TimelineItem({ item, index, isActive }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "48px 1fr",
      gap: "0 32px",
      marginBottom: 64,
      position: "relative",
    }}>
      {/* Dot */}
      <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        <motion.div
          animate={{
            borderColor: isActive ? "var(--accent)" : "rgba(241,241,241,0.15)",
            background: isActive ? "var(--accent)" : "var(--bg)",
            boxShadow: isActive ? "0 0 14px rgba(78,154,241,0.45)" : "none",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 12, height: 12, borderRadius: "50%",
            border: "2px solid rgba(241,241,241,0.15)",
            background: "var(--bg)",
            marginTop: 6,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Body */}
      <ScrollReveal delay={index * 0.1}>
        <div>
          <p style={{
            fontSize: 11, letterSpacing: "3px",
            textTransform: "uppercase",
            color: isActive ? "var(--accent)" : "var(--text-dim)",
            marginBottom: 8,
            transition: "color 0.5s",
          }}>{item.year}</p>

          <h3 style={{
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(22px, 2.8vw, 34px)",
            letterSpacing: "2px", color: "var(--text)",
            marginBottom: 4,
          }}>{item.role}</h3>

          <p style={{
            fontSize: 13, color: "var(--text-muted)",
            letterSpacing: "1px", marginBottom: 16,
          }}>
            {item.company}
            {item.location && <span style={{ color: "var(--text-dim)", marginLeft: 8 }}>· {item.location}</span>}
          </p>

          <p style={{
            fontSize: 14, lineHeight: 1.75,
            color: "var(--text-muted)", maxWidth: 600,
            marginBottom: 16,
          }}>{item.description}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 10, letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "4px 10px",
                border: "1px solid var(--border)",
                color: "var(--text-dim)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

export default function Timeline() {
  const trackRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const itemRefs = useRef([]);
  

  useEffect(() => {
    const update = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const viewMid = window.scrollY + window.innerHeight * 0.62;
      const progress = Math.max(0, Math.min(1,
        (viewMid - trackTop) / track.offsetHeight
      ));
      setFillHeight(progress * 100);

      let active = 0;
      itemRefs.current.forEach((el) => {
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight * 0.65) active++;
        }
      });
      setActiveCount(active);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="timeline" style={{ padding: "120px 4vw", background: "var(--bg)" }}>
      <ScrollReveal>
        <p style={{
          fontSize: 11, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 16,
        }}>// 04 — Journey</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 style={{
          fontFamily: "var(--font-disp)",
          fontSize: "clamp(48px, 7vw, 88px)",
          lineHeight: 0.92, letterSpacing: "2px",
          color: "var(--text)", marginBottom: 64,
        }}>ACADEMIC &<br/>TECHNICAL JOURNEY</h2>
      </ScrollReveal>

      <div ref={trackRef} style={{ position: "relative", paddingLeft: 0 }}>
        {/* Background line */}
        <div style={{
          position: "absolute",
          left: 24, top: 0, bottom: 0,
          width: 1,
          background: "rgba(241,241,241,0.08)",
          pointerEvents: "none",
        }} />
        {/* Fill line */}
        <motion.div
          style={{
            position: "absolute",
            left: 24, top: 0,
            width: 2,
            background: "var(--accent)",
            height: `${fillHeight}%`,
            boxShadow: "0 0 8px rgba(78,154,241,0.4)",
            pointerEvents: "none",
            borderRadius: 1,
          }}
        />

        {portfolioData.timeline.map((item, i) => (
          <div key={i} ref={(el) => (itemRefs.current[i] = el)}>
            <TimelineItem
              item={item}
              index={i}
              isActive={i < activeCount}
            />
          </div>
        ))}
      </div>
    </section>
  );
}