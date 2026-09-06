"use client";

import { motion } from "motion/react";

const raveLetters = "RAVE".split("");
const lonexLetters = "WITHLONEX".split("");

export default function AnimatedTitle() {
  return (
    <div className="font-display select-none uppercase">
      <div className="flex overflow-hidden text-[21vw] leading-[0.72] tracking-[-0.04em] sm:text-[18vw] lg:text-[13vw]">
        {raveLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={{
              y: "110%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15 + index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <div className="relative flex overflow-hidden text-[21vw] leading-[0.72] tracking-[-0.04em] sm:text-[18vw] lg:text-[13vw]">
        {lonexLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={{
              y: "110%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.45 + index * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="yellow-stroke rave-text-glow"
          >
            {letter}
          </motion.span>
        ))}

        <motion.div
          initial={{
            x: "-120%",
          }}
          animate={{
            x: "120%",
          }}
          transition={{
            delay: 1.1,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#efff00]/20 to-transparent blur-xl"
        />
      </div>
    </div>
  );
}
