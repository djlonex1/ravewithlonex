"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/FYavPrewOTLHZkTbzMjoz4?mode=gi_t";

export default function WhatsAppCommunityButton() {
  return (
    <a
      href={WHATSAPP_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the Ravewithlonex WhatsApp Community"
      className="fixed bottom-5 right-5 z-[90] flex items-center gap-3 border border-[#efff00]/40 bg-black/95 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#efff00] shadow-2xl backdrop-blur-md transition hover:bg-[#efff00] hover:text-black md:bottom-7 md:right-7 md:px-5"
    >
      <MessageCircle size={18} />

      <span className="hidden sm:inline">
        Join WhatsApp Community
      </span>

      <span className="sm:hidden">
        Join Community
      </span>
    </a>
  );
}
