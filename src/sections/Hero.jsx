import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolio";

export default function Hero() {
  const canvasRef = useRef(null);
  const portraitRef = useRef(null);
  const [showOutline, setShowOutline] = useState(false);

  const mouseRef = useRef({ x: -999, y: -999 });
  const portraitMouseRef = useRef({ x: 50, y: 50 });

  const radiusRef = useRef(0);
  const targetRadiusRef = useRef(0);
  const rafRef = useRef(null);

  // Show the outline 2 seconds after the Hero component mounts.
  useEffect(() => {
    const timer = setTimeout(() => setShowOutline(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const portrait = portraitRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      radiusRef.current +=
        (targetRadiusRef.current - radiusRef.current) * 0.07;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = mouseRef.current;
      const r = radiusRef.current;

      // Update portrait spotlight
      if (portrait) {
        portrait.style.setProperty(
          "--mouse-x",
          `${portraitMouseRef.current.x}%`
        );

        portrait.style.setProperty(
          "--mouse-y",
          `${portraitMouseRef.current.y}%`
        );

        portrait.style.setProperty(
          "--reveal-radius",
          `${r * 1.25}px`
        );
      }

      if (r > 1) {
        // Outer glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, r);

        grd.addColorStop(0, "rgba(78,154,241,0.12)");
        grd.addColorStop(0.5, "rgba(78,154,241,0.05)");
        grd.addColorStop(1, "rgba(78,154,241,0)");

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Inner ring
        ctx.beginPath();
        ctx.arc(x, y, r * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(78,154,241,${0.28 * (r / 180)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Outer ring
        ctx.beginPath();
        ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(78,154,241,${0.12 * (r / 180)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(78,154,241,0.9)";
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();

    mouseRef.current = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    };

    const portraitRect = portraitRef.current.getBoundingClientRect();

    portraitMouseRef.current = {
      x: ((e.clientX - portraitRect.left) / portraitRect.width) * 100,
      y: ((e.clientY - portraitRect.top) / portraitRect.height) * 100,
    };

    targetRadiusRef.current = 180;
  };

  const handleMouseLeave = () => {
    targetRadiusRef.current = 0;
  };

  const {
    heroLines,
    heroAccentWord,
    heroBio,
    heroRoles,
    stack,
  } = portfolioData;

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: "100vh",
        minHeight: "700px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 65% 35%, rgba(78,154,241,0.07) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 75%, rgba(230,185,128,0.05) 0%, transparent 50%),
            var(--bg)
          `,
        }}
      />

      {/* Interactive Portrait Background */}
      <div
        ref={portraitRef}
        className="hero-portrait"
        aria-hidden="true"
      >
        {/* Always-visible outline */}
        <img
          className={`portrait-base ${showOutline ? "outline-visible" : ""}`}
          src="/images/outline.png"
          alt=""
        />

        {/* Portrait revealed by cursor */}
        <img
          className="portrait-reveal"
          src="/images/harsh.png"
          alt=""
        />
      </div>

      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      {/* Interactive Cursor Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "0 4vw 40px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 11,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
            fontFamily: "var(--font-body)",
          }}
        >
          // COMPUTER SCIENCE | SOFTWARE DEVELOPMENT — {stack}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: "clamp(60px, 11vw, 130px)",
            lineHeight: 0.88,
            letterSpacing: "2px",
            color: "var(--text)",
          }}
        >
          {heroLines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {line === heroAccentWord ? (
                <span style={{ color: "var(--accent)" }}>
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 36,
            paddingTop: 36,
            borderTop: "1px solid var(--border)",
          }}
          className="hero-sub"
        >
          <p
            style={{
              maxWidth: 440,
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--text-muted)",
              letterSpacing: "0.3px",
            }}
          >
            {heroBio}
          </p>

          <div style={{ textAlign: "right" }}>
            {heroRoles.map((r, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: 4,
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          Scroll
        </span>

        <motion.div
          animate={{
            scaleY: [1, 0.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, var(--accent), transparent)",
            transformOrigin: "top",
          }}
        />
      </motion.div>

      {/* Responsive Styles */}
      <style>{`
        .hero-portrait {
          position: absolute;
          z-index: 1;
          top: 2%;
          right: 2%;
          width: clamp(340px, 38vw, 540px);
          height: clamp(430px, 52vw, 650px);
          pointer-events: none;
          --mouse-x: 50%;
          --mouse-y: 50%;
          --reveal-radius: 0px;
        }

        .hero-portrait img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center bottom;
        }

        .portrait-base {
          opacity: 0;
          filter: brightness(0) invert(1);
          transition: opacity 1.2s ease-in-out;
        }

        .portrait-base.outline-visible {
          opacity: 0.55;
        }

        .portrait-reveal {
          opacity: 1;
          filter: brightness(1.08) contrast(1.04);
          position: absolute;
          top: -3px !important;
          left: -3px !important;
          width: calc(100% + 6px) !important;
          height: calc(100% + 6px) !important;

          -webkit-mask-image: radial-gradient(
            circle var(--reveal-radius) at var(--mouse-x) var(--mouse-y),
            black 0%,
            black 45%,
            transparent 100%
          );

          mask-image: radial-gradient(
            circle var(--reveal-radius) at var(--mouse-x) var(--mouse-y),
            black 0%,
            black 45%,
            transparent 100%
          );
        }

@media (max-width: 768px) {
  .hero-portrait {
    display: none !important;
  }

  #hero canvas {
    display: none !important;
  }

  .hero-sub {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start !important;
  }

  .hero-sub > div {
    text-align: left !important;
  }
}

        @media (prefers-reduced-motion: reduce) {
          .hero-portrait img {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
