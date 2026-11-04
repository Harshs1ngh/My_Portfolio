import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function ScrambleLink({ text, href, onClick }) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef(null);
  const resetRef = useRef(null);

  useEffect(() => {
    if (!hovering) {
      clearTimeout(timerRef.current);
      clearTimeout(resetRef.current);
      setDisplay(text);
      return;
    }

    const scramble = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") { out += " "; continue; }
        out += Math.random() > 0.35
          ? text[i]
          : LETTERS[Math.floor(Math.random() * LETTERS.length)];
      }
      setDisplay(out);
      timerRef.current = setTimeout(scramble, 70);
    };

    scramble();
    resetRef.current = setTimeout(() => {
      clearTimeout(timerRef.current);
      setDisplay(text);
    }, 600);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(resetRef.current);
    };
  }, [hovering, text]);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        fontSize: 13,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: hovering ? "var(--accent)" : "var(--text-muted)",
        padding: "8px 14px",
        border: hovering ? "1px solid rgba(78,154,241,0.25)" : "1px solid transparent",
        background: hovering ? "rgba(78,154,241,0.06)" : "transparent",
        transition: "all 0.2s",
        fontFamily: "var(--font-body)",
        whiteSpace: "nowrap",
      }}
    >
      {display}
    </a>
  );
}

const navItems = [
  { text: "About", href: "#about" },
  { text: "Skills", href: "#skills" },
  { text: "Works", href: "#works" },
  { text: "Journey", href: "#timeline" },
  { text: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: "0 4vw",
          height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(15,17,23,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        }}
      >
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: 26, letterSpacing: 4,
            color: "var(--text)",
          }}
        >
          {portfolioData.name.toUpperCase()}.
        </a>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {navItems.map((item) => (
            <ScrambleLink
              key={item.text}
              text={item.text}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
            />
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--border-acc)",
            color: "var(--accent)",
            padding: "8px 14px",
            fontSize: 11, letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: 72, left: 0, right: 0,
              background: "rgba(15,17,23,0.97)",
              backdropFilter: "blur(16px)",
              zIndex: 999,
              padding: "24px 4vw 32px",
              borderBottom: "1px solid var(--border)",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.text}
                onClick={() => scrollTo(item.href)}
                style={{
                  background: "none", border: "none",
                  color: "var(--text-muted)", textAlign: "left",
                  fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {item.text}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}