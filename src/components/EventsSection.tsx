import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";

import {
  getPastEventsDB,
  getUpcomingEventsDB,
} from "@/lib/events-db";

export default async function EventsSection() {
  const [upcoming, past] =
    await Promise.all([
      getUpcomingEventsDB(),
      getPastEventsDB(),
    ]);

  return (
    <section
      id="events"
      className="relative bg-[var(--bg)] px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <div className="mb-12 border-b border-[var(--border)] pb-8 md:mb-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#efff00]" />

                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#efff00]">
                    What&apos;s Next
                  </p>
                </div>

                <h2 className="font-display text-7xl leading-[0.78] tracking-[-0.03em] sm:text-8xl lg:text-[9rem]">
                  UPCOMING
                  <span className="text-[#efff00]">
                    .
                  </span>
                </h2>
              </div>

              <div className="max-w-sm md:text-right">
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  The next chapter of Ravewithlonex.
                  One night, one crowd, one experience
                  you don&apos;t want explained to you afterwards.
                </p>

                <p className="mt-4 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--muted)]">
                  Tickets • Experiences • Culture
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {upcoming.length > 0 ? (
          upcoming.length === 1 ? (
            <Reveal>
              <EventCard
                event={upcoming[0]}
                number="01"
                variant="featured"
              />
            </Reveal>
          ) : (
            <div
              className={`grid gap-4 ${
                upcoming.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3"
              }`}
            >
              {upcoming.map(
                (event, index) => (
                  <Reveal
                    key={event.id}
                    delay={index * 0.08}
                  >
                    <EventCard
                      event={event}
                      number={String(
                        index + 1
                      ).padStart(2, "0")}
                    />
                  </Reveal>
                )
              )}
            </div>
          )
        ) : (
          <Reveal>
            <div className="border border-[var(--border)] px-6 py-20 text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-[#efff00]">
                Stand By
              </p>

              <p className="mt-5 font-display text-5xl md:text-7xl">
                NEXT RAVE LOADING...
              </p>

              <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                Join the movement and be the first to know
                when the next experience drops.
              </p>
            </div>
          </Reveal>
        )}

        {past.length > 0 && (
          <div className="mt-28 md:mt-40">
            <Reveal>
              <div className="mb-12 flex flex-col gap-7 border-b border-[var(--border)] pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#efff00]">
                    Nights We Created
                  </p>

                  <h2 className="font-display text-6xl leading-[0.82] tracking-[-0.03em] sm:text-8xl">
                    PAST
                    <br />
                    EXPERIENCES.
                  </h2>
                </div>

                <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)] md:text-right">
                  Some nights end.
                  <br />
                  The energy doesn&apos;t.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {past.map(
                (event, index) => (
                  <Reveal
                    key={event.id}
                    delay={index * 0.08}
                  >
                    <EventCard
                      event={event}
                      number={String(
                        index + 1
                      ).padStart(2, "0")}
                      variant="past"
                    />
                  </Reveal>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
