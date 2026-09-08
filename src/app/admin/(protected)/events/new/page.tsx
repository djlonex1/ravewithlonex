import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AdminEventForm from "@/components/admin/AdminEventForm";

export default function NewAdminEventPage() {
  return (
    <>
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/35 transition hover:text-[#efff00]"
      >
        <ArrowLeft size={14} />
        Back To Events
      </Link>

      <div className="mt-8 border-b border-white/10 pb-8">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          New Experience
        </p>

        <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
          CREATE
          <br />
          EVENT.
        </h1>
      </div>

      <div className="mt-8">
        <AdminEventForm />
      </div>
    </>
  );
}
