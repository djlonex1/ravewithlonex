import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-black px-5 py-16 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition hover:text-[#efff00]"
        >
          <ArrowLeft
            size={14}
          />
          Back To Website
        </Link>

        <div className="mb-5 inline-flex border border-[#efff00]/30 bg-[#efff00]/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Restricted Area
        </div>

        <h1 className="font-display text-7xl leading-[0.8]">
          RAVE
          <br />
          CONTROL.
        </h1>

        <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
          Manage Ravewithlonex events,
          announcements, media and community.
        </p>

        <AdminLoginForm />

        <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/20">
          Ravewithlonex Administration
        </p>
      </div>
    </main>
  );
}
