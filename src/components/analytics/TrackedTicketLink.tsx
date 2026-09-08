"use client";

import { ArrowUpRight } from "lucide-react";

import { trackEvent } from "@/lib/track-event";

export default function TrackedTicketLink({
  eventId,
  href,
}: {
  eventId: string;
  href: string;
}) {
  function handleClick() {
    void trackEvent(
      eventId,
      "ticket_click"
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className="rave-button mt-10 flex w-full items-center justify-between bg-[#efff00] px-6 py-5 text-xs font-black uppercase tracking-[0.18em] text-black"
    >
      <span className="relative z-10">
        Get Tickets
      </span>

      <ArrowUpRight
        size={19}
        className="relative z-10"
      />
    </a>
  );
}
