"use client";

import {
  MessageCircle,
  Phone,
  PhoneCall,
  Plus,
  Users,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const COMMUNITY_URL =
  "https://chat.whatsapp.com/FYavPrewOTLHZkTbzMjoz4?mode=gi_t";

const BUSINESS_WHATSAPP =
  "https://wa.me/2348146675314?text=Hi%20Ravewithlonex%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

const BUSINESS_CALL =
  "tel:+2348146675314";

const SECOND_CALL =
  "tel:+2349073687106";

const actions = [
  {
    label: "Join Community",
    sublabel: "Ravewithlonex WhatsApp",
    href: COMMUNITY_URL,
    external: true,
    icon: Users,
  },
  {
    label: "Business WhatsApp",
    sublabel: "08146675314",
    href: BUSINESS_WHATSAPP,
    external: true,
    icon: MessageCircle,
  },
  {
    label: "Call Business",
    sublabel: "08146675314",
    href: BUSINESS_CALL,
    external: false,
    icon: PhoneCall,
  },
  {
    label: "Call",
    sublabel: "09073687106",
    href: SECOND_CALL,
    external: false,
    icon: Phone,
  },
];

export default function WhatsAppCommunityButton() {
  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  if (
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end md:bottom-7 md:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.22,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mb-3 w-[290px] overflow-hidden border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl sm:w-[320px]"
          >
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#efff00]">
                Ravewithlonex
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                How do you want to connect?
              </p>
            </div>

            <div className="p-2">
              {actions.map(
                (
                  action,
                  index
                ) => {
                  const Icon =
                    action.icon;

                  return (
                    <motion.a
                      key={
                        action.label
                      }
                      href={
                        action.href
                      }
                      target={
                        action.external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        action.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{
                        opacity: 0,
                        x: 18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index *
                          0.045,
                      }}
                      onClick={() =>
                        setOpen(
                          false
                        )
                      }
                      className="group flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-4 transition last:border-b-0 hover:bg-[#efff00]"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#efff00]/25 bg-[#efff00]/10 text-[#efff00] transition group-hover:border-black/20 group-hover:bg-black group-hover:text-[#efff00]">
                          <Icon
                            size={18}
                          />
                        </div>

                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white transition group-hover:text-black">
                            {
                              action.label
                            }
                          </p>

                          <p className="mt-1 text-[10px] text-white/35 transition group-hover:text-black/55">
                            {
                              action.sublabel
                            }
                          </p>
                        </div>
                      </div>

                      <span className="text-lg text-white/20 transition group-hover:translate-x-1 group-hover:text-black">
                        →
                      </span>
                    </motion.a>
                  );
                }
              )}
            </div>

            <div className="border-t border-white/10 px-5 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/20">
                Music • Energy • Culture • Chaos
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
        whileTap={{
          scale: 0.95,
        }}
        aria-expanded={open}
        aria-label={
          open
            ? "Close Ravewithlonex contact menu"
            : "Open Ravewithlonex contact menu"
        }
        className="group flex min-h-14 items-center gap-3 border border-[#efff00]/50 bg-[#efff00] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-black shadow-[0_15px_45px_rgba(239,255,0,0.18)] transition hover:shadow-[0_18px_55px_rgba(239,255,0,0.3)]"
      >
        <div className="relative flex h-7 w-7 items-center justify-center bg-black text-[#efff00]">
          <MessageCircle
            size={15}
            className={`absolute transition duration-300 ${
              open
                ? "scale-0 opacity-0"
                : "scale-100 opacity-100"
            }`}
          />

          <Plus
            size={17}
            className={`absolute transition duration-300 ${
              open
                ? "rotate-45 scale-100 opacity-100"
                : "rotate-0 scale-0 opacity-0"
            }`}
          />
        </div>

        <span>
          {open
            ? "Close"
            : "Connect"}
        </span>

        {!open && (
          <span className="relative ml-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-black/40" />
            <span className="relative inline-flex h-2 w-2 bg-black" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
