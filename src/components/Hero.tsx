"use client";
import { siteConfig } from "@/data/site";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import Countdown from "./Countdown";
import AnimatedTitle from "./AnimatedTitle";

export default function Hero() {
  return (
    <section
      id="home"
      className="always-dark relative flex min-h-dvh items-end overflow-hidden bg-black"
    >
      {/* HERO BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-[center_30%]"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,.25),
              rgba(0,0,0,.55) 45%,
              rgba(0,0,0,1)
            ),
            url('/images/hero.jpg')
          `,
        }}
      />

      {/* YELLOW GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(239,255,0,0.13),transparent_35%)]" />

      {/* HERO CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-10 pt-32 sm:pt-36 md:px-10 md:pb-16 md:pt-40"
      >
        {/* SMALL TOP LABEL */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
          }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-[2px] w-10 bg-[#efff00]" />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#efff00]">
            Nigeria&apos;s Rave Movement
          </span>
        </motion.div>

        {/* ANIMATED MAIN TITLE */}
        <AnimatedTitle />

        {/* LOWER HERO CONTENT */}
        <div className="mt-8 grid gap-10 border-t border-white/15 pt-7 md:mt-10 md:pt-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          {/* LEFT SIDE */}
          <div>
            <p className="max-w-lg text-lg leading-relaxed text-white/60 md:text-xl">
              More than a party.
              <br />
              Music. Energy. Culture. Chaos.
              <br />

              <span className="text-white">
                Welcome to the movement.
              </span>
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
  href={siteConfig.ticketUrl}
  target="_blank"
  rel="noreferrer"
  className="rave-button inline-flex min-h-[54px] items-center justify-center gap-3 px-7 py-4 text-xs font-black uppercase tracking-[0.18em]"
>
  <span className="relative z-10">
    Get Tickets
  </span>

  <ArrowUpRight
    size={18}
    className="relative z-10"
  />
</a>

              <a
                href="#movement"
                className="glitch-hover flex items-center justify-center gap-2 border border-white/30 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:border-[#efff00] hover:text-[#efff00] sm:justify-start"
              >
                Explore
                <ArrowDown size={17} />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:border-l lg:border-white/15 lg:pl-10">
            {/* UPCOMING BADGE */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#efff00]/30 bg-[#efff00]/10 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#efff00] opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#efff00]" />
              </span>

              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#efff00]">
                Upcoming
              </span>
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
              Next Experience
            </p>

            <h2 className="font-display text-5xl leading-none md:text-7xl">
              THE LAST
              <br />

              <span className="text-[#efff00]">
                DANCE
              </span>
            </h2>

            <div className="my-7 flex flex-wrap gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              <span>09 OCT 2026</span>

              <span>
                Florida King&apos;s, Ede
              </span>

              <span>
                9PM — Till Dawn
              </span>
            </div>

            <Countdown targetDate="2026-10-09T21:00:00+01:00" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}