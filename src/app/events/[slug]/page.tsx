import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";
import { notFound } from "next/navigation";

import Countdown from "@/components/Countdown";
import EventActions from "@/components/EventActions";
import TrackedTicketLink from "@/components/analytics/TrackedTicketLink";
import EventViewTracker from "@/components/analytics/EventViewTracker";
import Reveal from "@/components/Reveal";
import {
  getEventBySlugDB,
} from "@/lib/events-db";
import { siteConfig } from "@/data/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const event =
    await getEventBySlugDB(slug);

  if (!event) {
    return {
      title:
        "Event Not Found",
    };
  }

  return {
    title: event.title,

    description:
      event.description,

    openGraph: {
      title:
        `${event.title} | Ravewithlonex`,

      description:
        event.description,

      images: [
        event.image,
      ],
    },
  };
}

export default async function EventPage({
  params,
}: EventPageProps) {
  const { slug } =
    await params;

  const event =
    await getEventBySlugDB(slug);

  if (!event) {
    notFound();
  }

  const ticketUrl =
    event.ticketUrl ||
    siteConfig.ticketUrl;

  const isUpcoming =
    event.phase ===
      "upcoming" ||
    event.phase ===
      "sold-out";

  return (
    <main className="min-h-screen bg-black text-white">
      <EventViewTracker
        eventId={event.id}
      />
      {/* HERO */}

      <section className="always-dark relative min-h-[80vh] overflow-hidden bg-black">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black" />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-[1500px] flex-col justify-between px-5 pb-14 pt-28 md:px-10 md:pb-20">
          <Link
            href="/#events"
            className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/70 transition hover:text-[#efff00]"
          >
            <ArrowLeft
              size={16}
            />

            All Events
          </Link>

          <div>
            <div className="mb-6 inline-flex border border-[#efff00]/40 bg-[#efff00]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
              {event.status}
            </div>

            <h1 className="font-display max-w-6xl text-[18vw] leading-[0.75] tracking-[-0.04em] sm:text-[14vw] lg:text-[9vw]">
              {event.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-7 text-xs font-black uppercase tracking-[0.15em] text-white/65">
              <span>
                {event.date}
              </span>

              <span>
                {event.venue}
              </span>

              <span>
                {event.time}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}

      <section className="always-dark bg-black px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                The Experience
              </p>

              <h2 className="font-display text-6xl leading-[0.85] md:text-8xl">
                ONE NIGHT.
                <br />
                ONE CROWD.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/55">
                {
                  event.description
                }
              </p>

              <div className="mt-10">
                <EventActions
                  eventId={
                    event.id
                  }
                  title={
                    event.title
                  }
                  startsAt={
                    event.startsAt
                  }
                  venue={
                    event.venue
                  }
                  description={
                    event.description
                  }
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
          >
            <div className="border border-white/10 bg-[#0c0c0c] p-7 md:p-9">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <CalendarDays className="text-[#efff00]" />

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                      Date
                    </p>

                    <p className="mt-2 font-display text-3xl">
                      {
                        event.date
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="text-[#efff00]" />

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                      Time
                    </p>

                    <p className="mt-2 font-display text-3xl">
                      {
                        event.time
                      }
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-[#efff00]" />

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                      Venue
                    </p>

                    <p className="mt-2 font-display text-3xl">
                      {
                        event.venue
                      }
                    </p>
                  </div>
                </div>
              </div>

              {isUpcoming && (
                <div className="mt-10 border-t border-white/10 pt-8">
                  <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                    Countdown
                  </p>

                  <Countdown
                    targetDate={
                      event.startsAt
                    }
                  />
                </div>
              )}

              {isUpcoming &&
                event.phase !==
                  "sold-out" && (
                  <TrackedTicketLink
                    eventId={event.id}
                    href={ticketUrl}
                  />
                )}

              {event.phase ===
                "sold-out" && (
                <div className="mt-10 bg-white/10 px-6 py-5 text-center text-xs font-black uppercase tracking-[0.2em]">
                  Sold Out
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* LINEUP */}

      {event.lineup.length >
        0 && (
        <section className="always-dark bg-[#070707] px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                On The Night
              </p>

              <h2 className="font-display text-7xl md:text-9xl">
                LINEUP.
              </h2>
            </Reveal>

            <div className="mt-14 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.lineup.map(
                (
                  member,
                  index
                ) => (
                  <Reveal
                    key={
                      member.name
                    }
                    delay={
                      index *
                      0.08
                    }
                  >
                    <div className="group w-full max-w-[420px] overflow-hidden border border-white/10 bg-[#0c0c0c] transition hover:border-[#efff00]/50">

                      {/* FULL IMAGE - NO CROPPING */}
                      {member.image && (
                        <div className="w-full bg-black">
                          <img
                            src={member.image}
                            alt={member.name}
                            loading="lazy"
                            className="block h-auto w-full"
                          />
                        </div>
                      )}

                      {/* MEMBER DETAILS */}
                      <div className="p-6">
                        <span className="font-display text-3xl text-white/15">
                          0{index + 1}
                        </span>

                        <div className="mt-8">
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
                            {member.role}
                          </p>

                          <h3 className="mt-2 font-display text-4xl md:text-5xl">
                            {member.name}
                          </h3>

                          {member.instagram && (
                            <a
                              href={member.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/60 hover:text-[#efff00]"
                            >
                              Instagram
                              <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}

      {event.gallery.length >
        0 && (
        <section className="always-dark bg-black px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1500px]">
            <Reveal>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                From The Night
              </p>

              <h2 className="font-display text-7xl md:text-9xl">
                GALLERY.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-3 md:grid-cols-2">
              {event.gallery.map(
                (
                  item,
                  index
                ) => (
                  <Reveal
                    key={
                      item.src
                    }
                    delay={
                      (index %
                        2) *
                      0.08
                    }
                  >
                    {item.type ===
                    "image" ? (
                      <div className="relative min-h-[420px] overflow-hidden">
                        <Image
                          src={
                            item.src
                          }
                          alt={
                            item.alt ||
                            event.title
                          }
                          fill
                          sizes="(max-width:768px) 100vw, 50vw"
                          className="object-cover transition duration-1000 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <video
                        controls
                        playsInline
                        src={
                          item.src
                        }
                        className="w-full"
                      />
                    )}
                  </Reveal>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
