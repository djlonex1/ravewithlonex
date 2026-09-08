"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminSignOut() {
  const router =
    useRouter();

  async function signOut() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.replace(
      "/admin/login"
    );

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 transition hover:text-[#efff00]"
    >
      <LogOut size={15} />
      Sign Out
    </button>
  );
}
