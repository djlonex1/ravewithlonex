"use client";

import {
  CalendarPlus,
  Share2,
} from "lucide-react";

import { trackEvent } from "@/lib/track-event";

type EventActionsProps = {
  eventId: string;
  title: string;
  startsAt: string;
  venue: string;
  description: string;
};

export default function EventActions({
  eventId,
  title,
  startsAt,
  venue,
  description,
}: EventActionsProps) {
  function shareWhatsApp() {
    void trackEvent(
      eventId,
      "whatsapp_share"
    );

    const url =
      window.location.href;

    const text =
      `${title} — ${url}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function addToCalendar() {
    void trackEvent(
      eventId,
      "calendar_add"
    );

    const start =
      new Date(startsAt);

    const end =
      new Date(
        start.getTime() +
          8 * 60 * 60 * 1000
      );

    function formatDate(
      date: Date
    ) {
      return date
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
    }

    const calendar = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ravewithlonex//Events//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${title}`,
      `LOCATION:${venue}`,
      `DESCRIPTION:${description}`,
      `URL:${window.location.href}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob =
      new Blob(
        [calendar],
        {
          type:
            "text/calendar;charset=utf-8",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${title
        .toLowerCase()
        .replaceAll(" ", "-")}.ics`;

    document.body.appendChild(
      link
    );

    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={shareWhatsApp}
        className="flex items-center justify-center gap-3 border border-white/20 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:border-[#efff00] hover:text-[#efff00]"
      >
        <Share2 size={17} />
        Share on WhatsApp
      </button>

      <button
        type="button"
        onClick={addToCalendar}
        className="flex items-center justify-center gap-3 border border-white/20 px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:border-[#efff00] hover:text-[#efff00]"
      >
        <CalendarPlus size={17} />
        Add To Calendar
      </button>
    </div>
  );
}
