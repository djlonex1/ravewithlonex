import {
  ArrowUpRight,
  Handshake,
  Mail,
  Music2,
  Users,
} from "lucide-react";

import { siteConfig } from "@/data/site";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#070707] px-5 py-28 md:px-10 md:py-40"
    >
      <div className="absolute left-[-8%] top-10 font-display text-[28vw] leading-none text-white/[0.015]">
        RW
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <div className="mb-16">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
              Work With The Movement
            </p>

            <h2 className="font-display text-7xl leading-[0.82] sm:text-8xl lg:text-[9rem]">
              LET&apos;S
              <br />
              CREATE
              <br />
              <span className="yellow-stroke">
                SOMETHING.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* SPONSORSHIP */}
          <Reveal>
            <div className="group flex min-h-[370px] flex-col justify-between border border-white/10 bg-[#0c0c0c] p-7 transition duration-500 hover:border-[#efff00]/60 md:p-9">
              <div className="flex items-start justify-between">
                <Handshake
                  size={34}
                  className="text-[#efff00]"
                />

                <span className="font-display text-4xl text-white/10">
                  01
                </span>
              </div>

              <div>
                <h3 className="font-display text-5xl">
                  PARTNERS &
                  <br />
                  SPONSORS
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
                  Collaborate with Ravewithlonex and connect
                  your brand with nightlife, music, youth culture
                  and unforgettable live experiences.
                </p>

                <a
                  href="#join"
                  className="mt-8 inline-flex items-center gap-3 border-b border-[#efff00] pb-2 text-xs font-black uppercase tracking-[0.18em] text-[#efff00]"
                >
                  Partner With Us
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* BOOKINGS */}
          <Reveal delay={0.1}>
            <div className="group flex min-h-[370px] flex-col justify-between border border-white/10 bg-[#0c0c0c] p-7 transition duration-500 hover:border-[#efff00]/60 md:p-9">
              <div className="flex items-start justify-between">
                <Music2
                  size={34}
                  className="text-[#efff00]"
                />

                <span className="font-display text-4xl text-white/10">
                  02
                </span>
              </div>

              <div>
                <h3 className="font-display text-5xl">
                  DJ LONEX
                  <br />
                  BOOKINGS
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
                  Clubs, concerts, private events, festivals,
                  weddings and premium nightlife experiences.
                </p>

                <a
                  href={siteConfig.socials.djInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 border-b border-[#efff00] pb-2 text-xs font-black uppercase tracking-[0.18em] text-[#efff00]"
                >
                  Booking Enquiry
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* COMMUNITY */}
          <Reveal delay={0.2}>
            <div className="group flex min-h-[370px] flex-col justify-between border border-white/10 bg-[#efff00] p-7 text-black transition duration-500 hover:bg-white md:p-9">
              <div className="flex items-start justify-between">
                <Users size={34} />

                <span className="font-display text-4xl text-black/15">
                  03
                </span>
              </div>

              <div>
                <h3 className="font-display text-5xl">
                  JOIN THE
                  <br />
                  COMMUNITY
                </h3>

                <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-black/60">
                  Follow the movement, get event drops and
                  be part of what we&apos;re building next.
                </p>

                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-xs font-black uppercase tracking-[0.18em]"
                >
                  Follow Ravewithlonex
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/30">
                General Enquiries
              </p>

              <p className="mt-2 font-display text-3xl md:text-4xl">
                RAVEWITHLONEX
              </p>
            </div>

            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="rave-button inline-flex items-center justify-center gap-3 bg-[#efff00] px-7 py-5 text-xs font-black uppercase tracking-[0.2em] text-black"
            >
              Contact The Team
              <Mail size={17} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
