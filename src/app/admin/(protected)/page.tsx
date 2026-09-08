import {
  CalendarDays,
  ImageIcon,
  Megaphone,
  Ticket,
  Users,
} from "lucide-react";

import {
  events,
  getPastEvents,
  getUpcomingEvents,
} from "@/data/events";

export default function AdminDashboardPage() {
  const upcoming =
    getUpcomingEvents();

  const past =
    getPastEvents();

  return (
    <>
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
            Control Centre
          </p>

          <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
            DASHBOARD.
          </h1>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-white/40">
          Your central control panel for
          Ravewithlonex events, announcements,
          media and community.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="All Events"
          value={events.length}
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          label="Upcoming"
          value={upcoming.length}
          icon={<Ticket size={20} />}
        />

        <StatCard
          label="Past Events"
          value={past.length}
          icon={<ImageIcon size={20} />}
        />

        <StatCard
          label="Announcement"
          value="LIVE"
          icon={<Megaphone size={20} />}
        />
      </div>

      <div className="mt-10 grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
        <section className="border border-white/10 bg-black p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#efff00]">
                Event Management
              </p>

              <h2 className="mt-2 font-display text-4xl">
                YOUR EVENTS.
              </h2>
            </div>

            <Ticket
              className="text-white/15"
              size={30}
            />
          </div>

          <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
            {events.map(
              (event) => (
                <div
                  key={event.slug}
                  className="flex items-center justify-between gap-5 py-5"
                >
                  <div>
                    <p className="font-display text-2xl">
                      {event.title}
                    </p>

                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-white/30">
                      {event.date} • {event.venue}
                    </p>
                  </div>

                  <span
                    className={
                      event.phase === "upcoming"
                        ? "bg-[#efff00] px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-black"
                        : "border border-white/10 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white/35"
                    }
                  >
                    {event.phase}
                  </span>
                </div>
              )
            )}
          </div>

          <p className="mt-5 text-xs text-white/30">
            Event editing will be connected to
            Supabase in the next step.
          </p>
        </section>

        <section className="border border-white/10 bg-[#efff00] p-6 text-black md:p-8">
          <Users size={28} />

          <p className="mt-10 text-[9px] font-black uppercase tracking-[0.22em]">
            Coming Next
          </p>

          <h2 className="mt-2 font-display text-5xl leading-[0.85]">
            NO MORE
            <br />
            CODE EDITS.
          </h2>

          <p className="mt-6 text-sm leading-relaxed text-black/65">
            We&apos;ll connect this dashboard
            directly to Supabase so events,
            ticket links, announcements,
            lineups and images can be changed
            here.
          </p>
        </section>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 bg-black p-5">
      <div className="flex items-start justify-between">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
          {label}
        </p>

        <span className="text-[#efff00]">
          {icon}
        </span>
      </div>

      <p className="mt-7 font-display text-6xl">
        {value}
      </p>
    </div>
  );
}
