import "server-only";

import { supabaseAdmin } from "@/lib/supabase-admin";

export type PublicAnnouncement = {
  id: string;
  active: boolean;
  type:
    | "tickets"
    | "venue"
    | "warning"
    | "sold-out"
    | "general";
  message: string;
  cta?: string;
  href?: string;
};

export async function getActiveAnnouncement(): Promise<PublicAnnouncement | null> {
  const { data, error } =
    await supabaseAdmin
      .from("announcements")
      .select("id, active, type, message, cta, href")
      .eq("active", true)
      .order("updated_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (error) {
    console.error(
      "Unable to load active announcement:",
      error
    );

    return null;
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    active: data.active,
    type: data.type,
    message: data.message,
    cta: data.cta || undefined,
    href: data.href || undefined,
  };
}
