import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 40,
  x = 0,
  once = true,
  threshold = 0.12,
}) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}