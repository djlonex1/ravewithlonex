import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const socials = [
  {
    name: "Ravewithlonex",
    href: siteConfig.socials.instagram,
  },
  {
    name: "DJ Lonex",
    href: siteConfig.socials.djInstagram,
  },
  {
    name: "TikTok",
    href: siteConfig.socials.tiktok,
  },
  {
    name: "YouTube",
    href: siteConfig.socials.youtube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-black px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 border-b border-white/15 pb-16 lg:grid-cols-2">
          <div>
            <div className="font-display text-5xl sm:text-7xl">
              RAVE
              <span className="text-[#efff00]">
                WITHLONEX
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/45">
              Music. Culture. Energy. Experiences.
              <br />
              Built for the nights you never forget.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                Explore
              </p>

              <div className="space-y-3">
                <a
                  href="#movement"
                  className="block hover:text-[#efff00]"
                >
                  Movement
                </a>

                <a
                  href="#events"
                  className="block hover:text-[#efff00]"
                >
                  Events
                </a>

                <a
                  href="#experience"
                  className="block hover:text-[#efff00]"
                >
                  Experience
                </a>

                <a
                  href="#tickets"
                  className="block hover:text-[#efff00]"
                >
                  Tickets
                </a>

                <a
                  href="#contact"
                  className="block hover:text-[#efff00]"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <p className="mb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                Social
              </p>

              <div className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 transition hover:text-[#efff00]"
                  >
                    {social.name}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30 sm:flex-row sm:justify-between">
          <p>
            © 2026 Ravewithlonex. All Rights Reserved.
          </p>

          <p>
            A DJ Lonex Experience.
          </p>
        </div>
      </div>
    </footer>
  );
}