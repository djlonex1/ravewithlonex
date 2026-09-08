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
  slug: string;

  title: string;

  // Human-readable date used by homepage cards
  date: string;

  // Real date used for countdowns/sorting
  startsAt: string;

  location: string;

  venue: string;

  time: string;

  // Existing EventCard can continue displaying this
  status: string;

  // Used by our new automatic event system
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

export const events: RaveEvent[] = [
  {
    slug: "the-last-dance",

    title: "THE LAST DANCE",

    date: "09 OCT 2026",

    startsAt: "2026-10-09T21:00:00+01:00",

    location: "EDE, OSUN STATE",

    venue: "FLORIDA KING'S, EDE",

    time: "9PM — TILL DAWN",

    status: "NEXT RAVE",

    phase: "upcoming",

    description:
      "One night. One crowd. One final dance. Ravewithlonex takes over Ede for an unforgettable night of music, energy and culture.",

    image:
      "/events/the-last-dance/cover.jpg",

    flyer:
      "/events/the-last-dance/cover.jpg",

    ticketUrl: "",

    instagramUrl: "",

    href:
      "/events/the-last-dance",

    lineup: [
      {
        name: "DJ LONEX",
        role: "HOST / DJ",
      },
      {
        name: "ONLY1SKILLZ",
        role: "HYPEMAN",
      },
    ],

    gallery: [],
  },

  {
    slug: "lost-in-the-night",

    title: "LOST IN THE NIGHT",

    date: "15 AUG 2026",

    startsAt: "2026-08-15T21:00:00+01:00",

    location: "LAGOS",

    venue: "LAGOS",

    time: "9PM — LATE",

    status: "PAST EXPERIENCE",

    phase: "past",

    description:
      "A night of music, energy and unforgettable Ravewithlonex moments.",

    image:
      "/images/lost-in-the-night.jpg",

    href:
      "/events/lost-in-the-night",

    lineup: [],

    gallery: [],
  },

  {
    slug: "midnight-rave",

    title: "MIDNIGHT RAVE",

    date: "12 MAR 2026",

    startsAt: "2026-03-12T21:00:00+01:00",

    location: "SURULERE, LAGOS",

    venue: "SURULERE, LAGOS",

    time: "9PM — LATE",

    status: "PAST EXPERIENCE",

    phase: "past",

    description:
      "A late-night Ravewithlonex experience in Surulere, Lagos.",

    image:
      "/images/midnight-rave.jpg",

    href:
      "/events/midnight-rave",

    lineup: [],

    gallery: [],
  },
];


export function getEventBySlug(
  slug: string
) {
  return events.find(
    (event) => event.slug === slug
  );
}

export function isEventPast(
  event: RaveEvent
) {
  return (
    new Date(event.startsAt).getTime() <
    Date.now()
  );
}

export function getUpcomingEvents() {
  return events
    .filter((event) => {
      if (
        event.phase === "cancelled"
      ) {
        return false;
      }

      return !isEventPast(event);
    })
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() -
        new Date(b.startsAt).getTime()
    );
}

export function getPastEvents() {
  return events
    .filter((event) =>
      isEventPast(event)
    )
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() -
        new Date(a.startsAt).getTime()
    );
}
