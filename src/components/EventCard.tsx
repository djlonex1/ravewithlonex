import { ArrowUpRight } from "lucide-react";
import type { RaveEvent } from "@/data/events";

type EventCardProps = {
  event: RaveEvent;
  number: string;
};

export default function EventCard({
  event,
  number,
}: EventCardProps) {
  return (
    <a
      href={event.href}
      className="always-dark rave-glow group relative block min-h-[520px] overflow-hidden border border-white/10 bg-[#0c0c0c] transition duration-500 hover:border-[#efff00]/50"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `
            linear-gradient(
              to top,
              rgba(0,0,0,1),
              rgba(0,0,0,.3) 60%,
              rgba(0,0,0,.25)
            ),
            url('${event.image}')
          `,
        }}
      />

      <div className="absolute inset-0 bg-[#efff00]/0 transition duration-500 group-hover:bg-[#efff00]/10" />

      <div className="relative flex min-h-[520px] flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="font-display text-4xl text-white/25">
            {number}
          </span>

          <ArrowUpRight
            size={28}
            className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#efff00]"
          />
        </div>

        <div>
          <div className="mb-4 inline-block bg-[#efff00] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
            {event.status}
          </div>

          <h3 className="font-display text-5xl leading-[0.9] md:text-6xl">
            {event.title}
          </h3>

          <div className="mt-5 flex flex-wrap gap-5 border-t border-white/20 pt-5 text-xs font-bold uppercase tracking-[0.15em] text-white/60">
            <span>{event.date}</span>
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
