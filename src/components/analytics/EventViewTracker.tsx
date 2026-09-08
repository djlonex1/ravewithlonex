"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/track-event";

export default function EventViewTracker({
  eventId,
}: {
  eventId: string;
}) {
  useEffect(() => {
    const key = `rwl-event-view-${eventId}`;

    try {
      if (sessionStorage.getItem(key)) {
        return;
      }

      sessionStorage.setItem(key, "1");
    } catch {
      // Continue even if sessionStorage is unavailable.
    }

    void trackEvent(
      eventId,
      "page_view"
    );
  }, [eventId]);

  return null;
}
