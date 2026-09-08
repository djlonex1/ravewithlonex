"use client";

import {
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import { usePathname } from "next/navigation";

const COMMUNITY_URL =
  "https://chat.whatsapp.com/FYavPrewOTLHZkTbzMjoz4?mode=gi_t";

const BUSINESS_WHATSAPP =
  "https://wa.me/2348146675314";

const BUSINESS_CALL =
  "tel:+2348146675314";

const CALL_NUMBER =
  "tel:+2349073687106";

export default function WhatsAppCommunityButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2 md:bottom-7 md:right-7">
      <a
        href={COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join the Ravewithlonex WhatsApp Community"
        className="flex items-center gap-3 border border-[#efff00]/40 bg-black/95 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-[#efff00] shadow-xl backdrop-blur-md transition hover:bg-[#efff00] hover:text-black"
      >
        <Users size={17} />

        <span className="hidden sm:inline">
          Join WhatsApp Community
        </span>

        <span className="sm:hidden">
          Community
        </span>
      </a>

      <a
        href={BUSINESS_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Ravewithlonex on WhatsApp"
        className="flex items-center gap-3 border border-white/15 bg-black/95 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-xl backdrop-blur-md transition hover:border-[#efff00] hover:text-[#efff00]"
      >
        <MessageCircle size={17} />

        <span className="hidden sm:inline">
          Business WhatsApp
        </span>

        <span className="sm:hidden">
          WhatsApp
        </span>
      </a>

      <a
        href={BUSINESS_CALL}
        aria-label="Call Ravewithlonex business line"
        className="flex items-center gap-3 border border-white/15 bg-black/95 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-xl backdrop-blur-md transition hover:border-[#efff00] hover:text-[#efff00]"
      >
        <Phone size={17} />

        <span className="hidden sm:inline">
          Call 08146675314
        </span>

        <span className="sm:hidden">
          Call Business
        </span>
      </a>

      <a
        href={CALL_NUMBER}
        aria-label="Call Ravewithlonex"
        className="flex items-center gap-3 border border-white/15 bg-black/95 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-xl backdrop-blur-md transition hover:border-[#efff00] hover:text-[#efff00]"
      >
        <Phone size={17} />

        <span className="hidden sm:inline">
          Call 09073687106
        </span>

        <span className="sm:hidden">
          Call
        </span>
      </a>
    </div>
  );
}
