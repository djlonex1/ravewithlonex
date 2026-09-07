import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

import { siteConfig } from "@/data/site";
import ContactSection from "@/components/ContactSection";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import EventCard from "@/components/EventCard";
import JoinMovement from "@/components/JoinMovement";
import Footer from "@/components/Footer";
import { events } from "@/data/events";

const gallery = [
  {
    image: "/images/gallery-1.jpg",
    size: "lg:col-span-7",
    height: "min-h-[560px]",
  },
  {
    image: "/images/gallery-2.jpg",
    size: "lg:col-span-5",
    height: "min-h-[560px]",
  },
  {
    image: "/images/gallery-3.jpg",
    size: "lg:col-span-4",
    height: "min-h-[430px]",
  },
  {
    image: "/images/gallery-4.jpg",
    size: "lg:col-span-8",
    height: "min-h-[430px]",
  },
  {
    image: "/images/gallery-5.jpg",
    size: "lg:col-span-6",
    height: "min-h-[500px]",
  },
  {
    image: "/images/gallery-6.jpg",
    size: "lg:col-span-6",
    height: "min-h-[500px]",
  },
  {
    image: "/images/gallery-7.jpg",
    size: "lg:col-span-8",
    height: "min-h-[520px]",
  },
  {
    image: "/images/gallery-8.jpg",
    size: "lg:col-span-4",
    height: "min-h-[520px]",
  },
  {
    image: "/images/gallery-9.jpg",
    size: "lg:col-span-5",
    height: "min-h-[460px]",
  },
  {
    image: "/images/gallery-10.jpg",
    size: "lg:col-span-7",
    height: "min-h-[460px]",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <PageLoader />
<CustomCursor />
      <Navbar />

      <Hero />

      {/* TICKER */}
      <div className="marquee border-y border-black bg-[#efff00] py-4 text-black">
        <div className="marquee-track font-display text-4xl tracking-tight">
          <span>
            RAVEWITHLONEX ✦ MUSIC ✦ CULTURE ✦ ENERGY ✦
            NO ORDINARY NIGHTS ✦ RAVEWITHLONEX ✦ MUSIC ✦
            CULTURE ✦ ENERGY ✦ NO ORDINARY NIGHTS ✦
          </span>

          <span>
            RAVEWITHLONEX ✦ MUSIC ✦ CULTURE ✦ ENERGY ✦
            NO ORDINARY NIGHTS ✦ RAVEWITHLONEX ✦ MUSIC ✦
            CULTURE ✦ ENERGY ✦ NO ORDINARY NIGHTS ✦
          </span>
        </div>
      </div>

      {/* MOVEMENT */}
      <section
        id="movement"
        className="grid-background relative px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="mb-16 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#efff00]" />

              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                The Movement
              </span>
            </div>
          </Reveal>

          <div className="grid gap-16 lg:grid-cols-[1.5fr_.5fr]">
            <Reveal>
              <h2 className="font-display text-[16vw] leading-[0.78] tracking-[-0.03em] sm:text-[13vw] lg:text-[9vw]">
                WE DON&apos;T
                <br />
                THROW
                <br />
                <span className="text-stroke">
                  PARTIES.
                </span>
              </h2>
            </Reveal>

            <Reveal
              delay={0.15}
              className="flex flex-col justify-end"
            >
              <p className="text-xl leading-relaxed text-white/60">
                We create nights people remember.
              </p>

              <p className="mt-6 leading-relaxed text-white/40">
                Ravewithlonex brings music, people,
                nightlife and culture together to create
                experiences built around freedom,
                connection and pure energy.
              </p>

              <div className="mt-10 border-l-2 border-[#efff00] pl-5 font-display text-3xl">
                MORE THAN A PARTY.
                <br />
                IT&apos;S A MOVEMENT.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section
        id="events"
        className="bg-[#080808] px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="mb-16 flex items-end justify-between">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                  Nights We Created
                </p>

                <h2 className="font-display text-7xl leading-none sm:text-8xl lg:text-[9rem]">
                  EVENTS.
                </h2>
              </div>

              <p className="hidden max-w-xs text-right text-sm leading-relaxed text-white/40 md:block">
                Every night has its own story.
                <br />
                Every crowd leaves a memory.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3">
            {events.map((event, index) => (
              <Reveal
                key={event.title}
                delay={index * 0.1}
              >
                <EventCard
                  event={event}
                  number={`0${index + 1}`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-[#efff00] px-4 py-16 text-black">
  <Reveal>
    <p className="font-display mx-auto max-w-full text-center text-[14vw] leading-[0.85] tracking-[-0.04em] sm:text-[12vw] lg:text-[9vw]">
      YOU HAD TO BE THERE.
    </p>
  </Reveal>
</section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="bg-black px-5 py-28 md:px-10 md:py-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <div className="mb-16 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                  Inside The Rave
                </p>

                <h2 className="font-display text-7xl leading-[0.85] sm:text-8xl lg:text-[9rem]">
                  THE
                  <br />
                  EXPERIENCE.
                </h2>
              </div>

              <div className="flex items-end">
                <p className="max-w-lg text-xl leading-relaxed text-white/45">
                  No staged moments. No fake energy.
                  Just music, sweat, lights, people and
                  memories made somewhere between the
                  first drop and sunrise.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            {gallery.map((item, index) => (
              <Reveal
                key={item.image}
                delay={(index % 2) * 0.08}
                className={item.size}
              >
                <div
  className={`image-noise group relative overflow-hidden bg-[#111] ${item.height}`}
>
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale transition duration-[1200ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(
                          rgba(0,0,0,.15),
                          rgba(0,0,0,.4)
                        ),
                        url('${item.image}')
                      `,
                    }}
                  />

                  <div className="absolute bottom-5 left-5 font-display text-2xl text-white/80">
                    0{index + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETS */}
      <section
        id="tickets"
        className="relative overflow-hidden bg-[#0a0a0a] px-5 py-28 md:px-10 md:py-40"
      >
        <div className="absolute right-[-5%] top-0 font-display text-[30vw] leading-none text-white/[0.015]">
          09
        </div>

        <div className="relative mx-auto max-w-[1500px]">
          <Reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
              Next Experience
            </p>

            <h2 className="font-display text-[18vw] leading-[0.73] tracking-[-0.03em] sm:text-[14vw] lg:text-[10vw]">
              THE LAST
              <br />

              <span className="yellow-stroke">
                DANCE.
              </span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 border-y border-white/15 py-10 lg:grid-cols-4">
            <Reveal>
              <div className="flex gap-4">
                <CalendarDays className="text-[#efff00]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Date
                  </p>

                  <p className="mt-2 font-display text-2xl">
                    09 OCT 2026
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex gap-4">
                <MapPin className="text-[#efff00]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Location
                  </p>

                  <p className="mt-2 font-display text-2xl">
                    FLORIDA KING&apos;S, EDE
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex gap-4">
                <Clock className="text-[#efff00]" />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Doors
                  </p>

                  <p className="mt-2 font-display text-2xl">
                    9PM — DAWN
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.24}
              className="flex items-center"
            >
              <a
  href={siteConfig.ticketUrl}
  target="_blank"
  rel="noreferrer"
  className="rave-button group flex min-h-[60px] w-full items-center justify-between bg-[#efff00] px-6 py-5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
>
  <span className="relative z-10">
    Get Tickets
  </span>

  <ArrowUpRight
    size={19}
    className="relative z-10 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
  />
</a>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-white/45">
                One night. One crowd. One final dance.
                Join the movement and be there when
                Ravewithlonex takes over Ede.
              </p>

              <a
                href="#join"
                className="flex items-center gap-3 border-b border-[#efff00] pb-2 text-sm font-black uppercase tracking-[0.2em] text-[#efff00]"
              >
                Join Guest List
                <ArrowRight size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <JoinMovement />

<ContactSection />

<Footer />
    </main>
  );
}
