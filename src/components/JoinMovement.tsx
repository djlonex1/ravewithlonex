"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function JoinMovement() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#efff00] px-5 py-24 text-black md:px-10 md:py-36"
    >
      <div className="absolute right-[-10%] top-[-25%] font-display text-[35vw] leading-none text-black/[0.04]">
        RAVE
      </div>

      <div className="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.3em]">
            Don&apos;t Hear About It Late
          </p>

          <h2 className="font-display text-7xl leading-[0.85] sm:text-8xl lg:text-[9rem]">
            JOIN THE
            <br />
            MOVEMENT.
          </h2>

          <p className="mt-7 max-w-lg text-base font-medium leading-relaxed text-black/65">
            Get early ticket access, location drops,
            lineup announcements and private Ravewithlonex
            updates before everybody else.
          </p>
        </div>

        <div className="flex items-end">
          {submitted ? (
            <div className="w-full border-y border-black/25 py-12">
              <p className="font-display text-5xl">
                YOU&apos;RE ON THE LIST.
              </p>

              <p className="mt-3 text-black/60">
                Welcome to the movement.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full"
            >
              <input
                required
                type="text"
                placeholder="YOUR NAME"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                required
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                type="tel"
                placeholder="WHATSAPP NUMBER"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                type="text"
                placeholder="CITY"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-between bg-black px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
              >
                Join The Movement
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
