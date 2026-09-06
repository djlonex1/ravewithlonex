"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const springY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX - 8);
      mouseY.set(event.clientY - 8);
      setVisible(true);
    };

    const leave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        opacity: visible ? 1 : 0,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-4 w-4 rounded-full bg-[#efff00] mix-blend-difference md:block"
    />
  );
}
