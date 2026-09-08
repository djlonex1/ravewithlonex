import {
  ArrowUpRight,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

export default function CommunityLinks() {
  return (
    <div className="mt-8 border-t border-white/10 pt-8">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/35">
        Stay Connected
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href="https://chat.whatsapp.com/FYavPrewOTLHZkTbzMjoz4?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-16 items-center justify-between bg-[#efff00] px-5 text-xs font-black uppercase tracking-[0.16em] text-black"
        >
          <span className="flex items-center gap-3">
            <Users size={18} />
            Join WhatsApp Community
          </span>

          <ArrowUpRight
            size={18}
            className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>

        <a
          href="https://wa.me/2348146675314"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-16 items-center justify-between border border-white/15 px-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:border-[#efff00] hover:text-[#efff00]"
        >
          <span className="flex items-center gap-3">
            <MessageCircle size={18} />
            Business WhatsApp
          </span>

          <ArrowUpRight
            size={18}
            className="transition group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </a>
      </div>

      <a
        href="tel:+2348146675314"
        className="mt-3 flex min-h-14 items-center gap-3 border border-white/10 px-5 text-xs font-bold uppercase tracking-[0.15em] text-white/55 transition hover:border-[#efff00]/50 hover:text-white"
      >
        <Phone size={17} className="text-[#efff00]" />

        Call Business Line — 08146675314
      </a>

      <a
        href="tel:+2349073687106"
        className="mt-3 flex min-h-14 items-center gap-3 border border-white/10 px-5 text-xs font-bold uppercase tracking-[0.15em] text-white/55 transition hover:border-[#efff00]/50 hover:text-white"
      >
        <Phone size={17} className="text-[#efff00]" />

        Call Ravewithlonex — 09073687106
      </a>
    </div>
  );
}
