export type AnnouncementType =
  | "tickets"
  | "venue"
  | "warning"
  | "sold-out"
  | "general";

export type Announcement = {
  active: boolean;
  type: AnnouncementType;
  message: string;
  cta?: string;
  href?: string;
};

export const announcement: Announcement = {
  active: true,

  type: "tickets",

  message:
    "THE LAST DANCE — TICKETS ARE NOW LIVE.",

  cta:
    "GET TICKETS",

  href:
    "/events/the-last-dance",
};
