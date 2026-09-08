import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";

import {
  getPastEventsDB,
  getUpcomingEventsDB,
} from "@/lib/events-db";

export default async function EventsSection() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEventsDB(),
    getPastEventsDB(),
  ]);

  return (
    <section
      id="events"
      className="bg-[var(--bg)] px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* UPCOMING EVENTS */}

        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                What&apos;s Next
              </p>

              <h2 className="font-display text-7xl leading-none sm:text-8xl lg:text-[9rem]">
                UPCOMING.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)] md:text-right">
              The next Ravewithlonex experiences.
              Get your tickets before the night arrives.
            </p>
          </div>
        </Reveal>

        {upcoming.length > 0 ? (
          <div
            className={`grid gap-4 ${
              upcoming.length === 1
                ? "lg:grid-cols-1"
                : upcoming.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3"
            }`}
          >
            {upcoming.map((event, index) => (
              <Reveal
                key={event.id}
                delay={index * 0.08}
              >
                <EventCard
                  event={event}
                  number={`0${index + 1}`}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="border border-[var(--border)] px-6 py-16 text-center">
              <p className="font-display text-4xl md:text-6xl">
                NEXT RAVE LOADING...
              </p>

              <p className="mt-4 text-sm text-[var(--muted)]">
                Join the movement so you hear about the next experience first.
              </p>
            </div>
          </Reveal>
        )}

        {/* PAST EVENTS */}

        {past.length > 0 && (
          <div className="mt-28 md:mt-40">
            <Reveal>
              <div className="mb-14">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#efff00]">
                  Nights We Created
                </p>

                <h2 className="font-display text-6xl leading-none sm:text-8xl">
                  PAST
                  <br />
                  EXPERIENCES.
                </h2>
              </div>
            </Reveal>

            <div className="grid gap-4 lg:grid-cols-3">
              {past.map((event, index) => (
                <Reveal
                  key={event.id}
                  delay={index * 0.08}
                >
                  <EventCard
                    event={event}
                    number={`0${index + 1}`}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
