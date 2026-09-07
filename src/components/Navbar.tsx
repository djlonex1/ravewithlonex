"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  {
    name: "Movement",
    href: "#movement",
  },
  {
    name: "Events",
    href: "#events",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Tickets",
    href: "#tickets",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <a
            href="#home"
            className="font-display text-xl tracking-[0.08em] md:text-2xl"
          >
            RAVE
            <span className="text-[#efff00]">
              WITHLONEX
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:text-[#efff00]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <ThemeToggle />



          <a
            href="#tickets"
            className="hidden bg-[#efff00] px-6 py-3 text-xs font-black uppercase tracking-[0.15em] text-black transition hover:bg-white lg:block"
          >
            Get Tickets
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#efff00] text-black"
          >
            <div className="flex h-20 items-center justify-between px-5">
              <span className="font-display text-2xl">
                RAVEWITHLONEX
              </span>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center px-6">
              {links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="border-b border-black/20 py-3 font-display text-[15vw] leading-none sm:text-7xl"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
