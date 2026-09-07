export type RaveEvent = {
  title: string;
  date: string;
  location: string;
  status: string;
  image: string;
  href: string;
};

export const events: RaveEvent[] = [
  {
    title: "THE LAST DANCE",
    date: "09 OCT 2026",
    location: "FLORIDA KING'S, EDE",
    status: "NEXT RAVE",
    image: "/images/last-dance-card.jpg",
    href: "#tickets",
  },
  {
    title: "LOST IN THE NIGHT",
    date: "15 AUG 2026",
    location: "LAGOS",
    status: "PAST EXPERIENCE",
    image: "/images/lost-in-the-night.jpg",
    href: "#experience",
  },
 {
  title: "MIDNIGHT RAVE",
  date: "12 MAR 2026",
  location: "SURULERE, LAGOS",
  status: "PAST EXPERIENCE",
  image: "/images/midnight-rave.jpg",
  href: "#experience",
},
];
