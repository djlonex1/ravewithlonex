import Link from "next/link";
import {
  ArrowRight,
  Plus,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function AdminEventsPage() {
  const { data: events, error } =
    await supabaseAdmin
      .from("events")
      .select("*")
      .order("starts_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(
      `Unable to load events: ${error.message}`
    );
  }

  return (
    <>
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
            Event Management
          </p>

          <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
            EVENTS.
          </h1>
        </div>

        <Link
          href="/admin/events/new"
          className="flex min-h-12 items-center justify-center gap-2 bg-[#efff00] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
        >
          <Plus size={16} />
          Create Event
        </Link>
      </div>

      <div className="mt-8">
        {events?.length ? (
          <div className="divide-y divide-white/10 border-y border-white/10">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/admin/events/${event.id}`}
                className="group grid gap-4 py-6 transition hover:bg-white/[0.02] md:grid-cols-[1fr_auto_auto] md:items-center md:px-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-3xl md:text-4xl">
                      {event.title}
                    </h2>

                    {!event.published && (
                      <span className="border border-white/15 px-2 py-1 text-[8px] font-black uppercase tracking-[0.15em] text-white/30">
                        Draft
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-[9px] font-black uppercase tracking-[0.17em] text-white/30">
                    {event.display_date || "NO DATE LABEL"}
                    {" • "}
                    {event.venue || "NO VENUE"}
                  </p>
                </div>

                <span
                  className={
                    event.status === "upcoming"
                      ? "w-fit bg-[#efff00] px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-black"
                      : event.status === "sold-out"
                        ? "w-fit bg-white px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-black"
                        : "w-fit border border-white/10 px-3 py-2 text-[8px] font-black uppercase tracking-[0.15em] text-white/40"
                  }
                >
                  {event.status}
                </span>

                <ArrowRight
                  size={18}
                  className="text-white/20 transition group-hover:translate-x-1 group-hover:text-[#efff00]"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-white/10 p-12 text-center">
            <p className="font-display text-4xl">
              NO EVENTS YET.
            </p>

            <p className="mt-3 text-sm text-white/35">
              Create your first event from RAVE CONTROL.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
