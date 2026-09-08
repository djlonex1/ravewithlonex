import "server-only";

import { supabaseAdmin } from "@/lib/supabase-admin";

export type EventPhase =
  | "upcoming"
  | "past"
  | "sold-out"
  | "cancelled";

export type LineupMember = {
  name: string;
  role: string;
  image?: string;
  instagram?: string;
};

export type EventGalleryItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type RaveEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  startsAt: string;
  location: string;
  venue: string;
  time: string;
  status: string;
  phase: EventPhase;
  description: string;
  image: string;
  flyer?: string;
  ticketUrl?: string;
  instagramUrl?: string;
  href: string;
  lineup: LineupMember[];
  gallery: EventGalleryItem[];
};

type EventRow = {
  id: string;
  slug: string;
  title: string;
  starts_at: string;
  display_date: string | null;
  location: string | null;
  venue: string | null;
  time_label: string | null;
  status: EventPhase;
  description: string | null;
  cover_url: string | null;
  flyer_url: string | null;
  ticket_url: string | null;
  instagram_url: string | null;
  published: boolean;
  sort_order: number | null;
};

function getPhase(row: EventRow): EventPhase {
  if (
    row.status === "sold-out" ||
    row.status === "cancelled"
  ) {
    return row.status;
  }

  const hasPassed =
    new Date(row.starts_at).getTime() < Date.now();

  if (
    row.status === "past" ||
    hasPassed
  ) {
    return "past";
  }

  return "upcoming";
}

function getDisplayStatus(row: EventRow) {
  const phase = getPhase(row);

  if (phase === "sold-out") {
    return "SOLD OUT";
  }

  if (phase === "cancelled") {
    return "CANCELLED";
  }

  if (phase === "past") {
    return "PAST EXPERIENCE";
  }

  return "NEXT RAVE";
}

function mapEvent(row: EventRow): RaveEvent {
  return {
    id: row.id,
    slug: row.slug,

    title: row.title,

    date:
      row.display_date ||
      new Date(row.starts_at)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Africa/Lagos",
        })
        .toUpperCase(),

    startsAt: row.starts_at,

    location: row.location || "",

    venue: row.venue || "",

    time: row.time_label || "",

    status: getDisplayStatus(row),

    phase: getPhase(row),

    description: row.description || "",

    image:
      row.cover_url ||
      "/images/hero.jpg",

    flyer:
      row.flyer_url ||
      undefined,

    ticketUrl:
      row.ticket_url ||
      undefined,

    instagramUrl:
      row.instagram_url ||
      undefined,

    href: `/events/${row.slug}`,

    lineup: [],

    gallery: [],
  };
}

export async function getAllPublishedEvents(): Promise<RaveEvent[]> {
  const { data, error } =
    await supabaseAdmin
      .from("events")
      .select("*")
      .eq("published", true)
      .order("starts_at", {
        ascending: true,
      });

  if (error) {
    console.error(
      "Unable to load events from Supabase:",
      error
    );

    return [];
  }

  return (data || []).map((row) =>
    mapEvent(row as EventRow)
  );
}

export async function getUpcomingEventsDB(): Promise<RaveEvent[]> {
  const events =
    await getAllPublishedEvents();

  return events
    .filter(
      (event) =>
        event.phase === "upcoming" ||
        event.phase === "sold-out"
    )
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() -
        new Date(b.startsAt).getTime()
    );
}

export async function getPastEventsDB(): Promise<RaveEvent[]> {
  const events =
    await getAllPublishedEvents();

  return events
    .filter(
      (event) =>
        event.phase === "past"
    )
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() -
        new Date(a.startsAt).getTime()
    );
}

export async function getEventBySlugDB(
  slug: string
): Promise<RaveEvent | null> {
  const {
    data: eventRow,
    error: eventError,
  } =
    await supabaseAdmin
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

  if (eventError) {
    console.error(
      "Unable to load event:",
      eventError
    );

    return null;
  }

  if (!eventRow) {
    return null;
  }

  const event =
    mapEvent(eventRow as EventRow);

  const [
    lineupResult,
    mediaResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("event_lineup")
      .select(
        "name, role, image_url, instagram_url, sort_order"
      )
      .eq("event_id", event.id)
      .order("sort_order", {
        ascending: true,
      }),

    supabaseAdmin
      .from("event_media")
      .select(
        "media_type, media_url, alt_text, sort_order"
      )
      .eq("event_id", event.id)
      .order("sort_order", {
        ascending: true,
      }),
  ]);

  if (lineupResult.error) {
    console.error(
      "Unable to load lineup:",
      lineupResult.error
    );
  }

  if (mediaResult.error) {
    console.error(
      "Unable to load event media:",
      mediaResult.error
    );
  }

  event.lineup =
    (lineupResult.data || []).map(
      (member) => ({
        name: member.name,
        role: member.role,
        image:
          typeof member.image_url === "string" &&
          member.image_url.trim()
            ? member.image_url.trim()
            : undefined,
        instagram:
          member.instagram_url ||
          undefined,
      })
    );

  event.gallery =
    (mediaResult.data || []).map(
      (item) => ({
        type:
          item.media_type === "video"
            ? "video"
            : "image",

        src: item.media_url,

        alt:
          item.alt_text ||
          undefined,
      })
    );

  return event;
}

