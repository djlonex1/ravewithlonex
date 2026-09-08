import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  ImageIcon,
  Megaphone,
  Mail,
  Ticket,
  Users,
} from "lucide-react";

import AdminSignOut from "@/components/admin/AdminSignOut";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    redirect(
      "/admin/login"
    );
  }

  const adminEmail =
    process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

  if (
    !adminEmail ||
    user.email
      ?.toLowerCase() !==
      adminEmail
  ) {
    redirect(
      "/admin/login?error=unauthorized"
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-5 md:px-8">
          <div>
            <Link
              href="/admin"
              className="font-display text-3xl tracking-tight"
            >
              RAVE
              <span className="text-[#efff00]">
                CONTROL
              </span>
            </Link>

            <p className="mt-1 hidden text-[9px] font-black uppercase tracking-[0.2em] text-white/25 sm:block">
              Ravewithlonex Administration
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-[#efff00] sm:flex"
            >
              View Site
              <ArrowUpRight
                size={14}
              />
            </Link>

            <AdminSignOut />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] md:grid-cols-[230px_1fr]">
        <aside className="hidden min-h-[calc(100vh-85px)] border-r border-white/10 p-5 md:block">
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 bg-[#efff00] px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-black"
            >
              <Ticket size={16} />
              Dashboard
            </Link>

            <Link
              href="/admin/events"
              className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:bg-white/[0.04] hover:text-[#efff00]"
            >
              <Ticket size={16} />
              Events
            </Link>

            <Link
              href="/admin/announcements"
              className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:bg-white/[0.04] hover:text-[#efff00]"
            >
              <Megaphone size={16} />
              Announcements
            </Link>

            <div className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/30">
              <ImageIcon size={16} />
              Media
            </div>

            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:bg-white/[0.04] hover:text-[#efff00]"
            >
              <BarChart3 size={16} />
              Analytics
            </Link>

            <Link
              href="/admin/broadcasts"
              className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:bg-white/[0.04] hover:text-[#efff00]"
            >
              <Mail size={16} />
              Broadcasts
            </Link>

            <div className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/30">
              <Users size={16} />
              Community
            </div>
          </nav>

          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-white/25">
              Signed in as
            </p>

            <p className="mt-2 truncate text-xs text-white/60">
              {user.email}
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-5 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
