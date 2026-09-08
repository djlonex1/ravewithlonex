import {
  CalendarPlus,
  Eye,
  MessageCircle,
  MousePointerClick,
  TrendingUp,
  UserPlus,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function AnalyticsPage() {
  const [
    analyticsResult,
    eventsResult,
    joinsResult,
    inquiriesResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("analytics_events")
      .select("event_id, action, created_at"),

    supabaseAdmin
      .from("events")
      .select("id, title, slug, display_date")
      .order("starts_at", {
        ascending: false,
      }),

    supabaseAdmin
      .from("join_requests")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabaseAdmin
      .from("inquiries")
      .select("id", {
        count: "exact",
        head: true,
      }),
  ]);

  if (analyticsResult.error) {
    throw new Error(
      `Analytics error: ${analyticsResult.error.message}`
    );
  }

  const analytics =
    analyticsResult.data || [];

  const events =
    eventsResult.data || [];

  function total(action: string) {
    return analytics.filter(
      (row) =>
        row.action === action
    ).length;
  }

  const views =
    total("page_view");

  const ticketClicks =
    total("ticket_click");

  const shares =
    total("whatsapp_share");

  const calendarAdds =
    total("calendar_add");

  const conversion =
    views > 0
      ? (
          (ticketClicks / views) *
          100
        ).toFixed(1)
      : "0.0";

  const eventStats =
    events.map((event) => {
      const rows =
        analytics.filter(
          (row) =>
            row.event_id ===
            event.id
        );

      const eventViews =
        rows.filter(
          (row) =>
            row.action ===
            "page_view"
        ).length;

      const tickets =
        rows.filter(
          (row) =>
            row.action ===
            "ticket_click"
        ).length;

      const whatsapp =
        rows.filter(
          (row) =>
            row.action ===
            "whatsapp_share"
        ).length;

      const calendars =
        rows.filter(
          (row) =>
            row.action ===
            "calendar_add"
        ).length;

      return {
        ...event,
        views: eventViews,
        tickets,
        whatsapp,
        calendars,
        conversion:
          eventViews > 0
            ? (
                (tickets /
                  eventViews) *
                100
              ).toFixed(1)
            : "0.0",
      };
    });

  return (
    <>
      <div className="border-b border-white/10 pb-8">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Performance
        </p>

        <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
          ANALYTICS.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/40">
          Track how people interact with your events and how much attention turns into ticket interest.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Event Views"
          value={views}
          icon={<Eye size={19} />}
        />

        <Stat
          label="Ticket Clicks"
          value={ticketClicks}
          icon={<MousePointerClick size={19} />}
        />

        <Stat
          label="WhatsApp Shares"
          value={shares}
          icon={<MessageCircle size={19} />}
        />

        <Stat
          label="Calendar Adds"
          value={calendarAdds}
          icon={<CalendarPlus size={19} />}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Ticket Conversion"
          value={`${conversion}%`}
          icon={<TrendingUp size={19} />}
        />

        <Stat
          label="Movement Signups"
          value={joinsResult.count || 0}
          icon={<UserPlus size={19} />}
        />

        <Stat
          label="Inquiries"
          value={inquiriesResult.count || 0}
          icon={<MessageCircle size={19} />}
        />
      </div>

      <section className="mt-10 border border-white/10 bg-black p-5 md:p-8">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Event Performance
        </p>

        <h2 className="mt-2 font-display text-5xl">
          BY EXPERIENCE.
        </h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-[9px] font-black uppercase tracking-[0.17em] text-white/30">
                <th className="pb-4">Event</th>
                <th className="pb-4">Views</th>
                <th className="pb-4">Tickets</th>
                <th className="pb-4">Shares</th>
                <th className="pb-4">Calendar</th>
                <th className="pb-4">Conversion</th>
              </tr>
            </thead>

            <tbody>
              {eventStats.map(
                (event) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/10"
                  >
                    <td className="py-5">
                      <p className="font-display text-2xl">
                        {event.title}
                      </p>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/25">
                        {event.display_date || ""}
                      </p>
                    </td>

                    <td className="py-5 font-display text-2xl">
                      {event.views}
                    </td>

                    <td className="py-5 font-display text-2xl">
                      {event.tickets}
                    </td>

                    <td className="py-5 font-display text-2xl">
                      {event.whatsapp}
                    </td>

                    <td className="py-5 font-display text-2xl">
                      {event.calendars}
                    </td>

                    <td className="py-5">
                      <span className="bg-[#efff00] px-3 py-2 text-xs font-black text-black">
                        {event.conversion}%
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Stat({
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
      <div className="flex items-start justify-between gap-4">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
          {label}
        </p>

        <span className="text-[#efff00]">
          {icon}
        </span>
      </div>

      <p className="mt-7 font-display text-5xl md:text-6xl">
        {value}
      </p>
    </div>
  );
}
