import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ravewithlonex.vercel.app"
  ),

  title: {
    default: "Ravewithlonex | More Than A Party",
    template: "%s | Ravewithlonex",
  },

  description:
    "Ravewithlonex is a nightlife movement built around music, culture, energy and unforgettable rave experiences.",

  keywords: [
    "Ravewithlonex",
    "DJ Lonex",
    "Rave Nigeria",
    "Nigeria nightlife",
    "Nigeria events",
    "Afrobeats",
    "Amapiano",
    "Rave events",
    "Nightlife Nigeria",
    "Party Nigeria",
  ],

  authors: [
    {
      name: "Ravewithlonex",
    },
  ],

  creator: "Ravewithlonex",
  publisher: "Ravewithlonex",

  openGraph: {
    title: "Ravewithlonex | More Than A Party",
    description:
      "Music. Energy. Culture. Chaos. Welcome to the movement.",
    url: "/",
    siteName: "Ravewithlonex",
    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ravewithlonex — More Than A Party. It's A Movement.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Ravewithlonex | More Than A Party",

    description:
      "Music. Energy. Culture. Chaos. Welcome to the movement.",

    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}