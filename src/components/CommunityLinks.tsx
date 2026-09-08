import {
  ArrowUpRight,
  MessageCircle,
  Phone,
  PhoneCall,
  Users,
} from "lucide-react";

const COMMUNITY_URL =
  "https://chat.whatsapp.com/FYavPrewOTLHZkTbzMjoz4?mode=gi_t";

const BUSINESS_WHATSAPP =
  "https://wa.me/2348146675314?text=Hi%20Ravewithlonex%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

export default function CommunityLinks() {
  return (
    <section className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#111] p-3 sm:p-4">

      {/* HEADER */}
      <div className="flex flex-col gap-4 px-3 pb-6 pt-3 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:pt-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
            Connect With Us
          </p>

          <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
            Stay connected with Ravewithlonex.
          </h3>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-white/45">
          Join the community, make an enquiry or reach the team directly.
        </p>
      </div>

      {/* COMMUNITY */}
      <a
        href={COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex min-h-[170px] overflow-hidden rounded-[22px] bg-[#efff00] p-6 text-black transition duration-300 hover:-translate-y-1 sm:p-7"
      >
        <div className="flex w-full items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#efff00]">
                <Users size={17} />
              </div>

              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/55">
                Official Community
              </p>
            </div>

            <h4 className="mt-5 text-2xl font-black tracking-[-0.03em] text-black sm:text-3xl">
              Join the Ravewithlonex
              <br className="hidden sm:block" />
              WhatsApp Community
            </h4>

            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-black/60">
              Get event announcements, ticket updates and important drops directly on WhatsApp.
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-[#efff00] transition duration-300 group-hover:rotate-45">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </a>

      {/* CONTACT OPTIONS */}
      <div className="mt-3 grid gap-3 md:grid-cols-3">

        <a
          href={BUSINESS_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-[20px] bg-white p-5 text-black transition duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#efff00]">
              <MessageCircle size={18} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-black/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
            />
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
              WhatsApp
            </p>

            <h5 className="mt-2 text-lg font-black text-black">
              Business Enquiries
            </h5>

            <p className="mt-2 text-sm font-semibold text-black/60">
              08146675314
            </p>
          </div>
        </a>

        <a
          href="tel:+2348146675314"
          className="group rounded-[20px] bg-white p-5 text-black transition duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#efff00]">
              <PhoneCall size={18} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-black/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
            />
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
              Business Line
            </p>

            <h5 className="mt-2 text-lg font-black text-black">
              Call Ravewithlonex
            </h5>

            <p className="mt-2 text-sm font-semibold text-black/60">
              08146675314
            </p>
          </div>
        </a>

        <a
          href="tel:+2349073687106"
          className="group rounded-[20px] bg-white p-5 text-black transition duration-300 hover:-translate-y-1 hover:bg-[#f5f5f5]"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#efff00]">
              <Phone size={18} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-black/35 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
            />
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
              Direct Line
            </p>

            <h5 className="mt-2 text-lg font-black text-black">
              Call Directly
            </h5>

            <p className="mt-2 text-sm font-semibold text-black/60">
              09073687106
            </p>
          </div>
        </a>

      </div>

      {/* FOOTER */}
      <div className="flex flex-col gap-2 px-3 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/25">
          Official Ravewithlonex contact channels
        </p>

        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#efff00]/70">
          Music • Energy • Culture
        </p>
      </div>

    </section>
  );
}
