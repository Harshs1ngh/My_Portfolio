import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringRef.current.x = lerp(ringRef.current.x, pos.x, 0.12);
      ringRef.current.y = lerp(ringRef.current.y, pos.y, 0.12);
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    const onEnter = (e) => {
      if (e.target.matches("a, button, [data-cursor-hover]")) setHovered(true);
    };
    const onLeave = (e) => {
      if (e.target.matches("a, button, [data-cursor-hover]")) setHovered(false);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: clicked ? 6 : 8,
          height: clicked ? 6 : 8,
          borderRadius: "50%",
          background: "var(--accent)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.15s, height 0.15s",
        }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: ring.x,
          top: ring.y,
          width: hovered ? 52 : clicked ? 28 : 36,
          height: hovered ? 52 : clicked ? 28 : 36,
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: hovered ? 0.8 : 0.45,
          transition: "width 0.2s var(--ease-out), height 0.2s var(--ease-out), opacity 0.2s",
        }}
      />
    </>
  );
}