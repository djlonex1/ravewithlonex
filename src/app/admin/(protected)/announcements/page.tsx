import AdminAnnouncementForm from "@/components/admin/AdminAnnouncementForm";

import {
  supabaseAdmin,
} from "@/lib/supabase-admin";

export default async function AdminAnnouncementsPage() {
  const {
    data,
    error,
  } =
    await supabaseAdmin
      .from(
        "announcements"
      )
      .select("*")
      .order(
        "updated_at",
        {
          ascending:
            false,
        }
      )
      .limit(1)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load announcement: ${error.message}`
    );
  }

  return (
    <>
      <div className="border-b border-white/10 pb-8">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Communication
        </p>

        <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
          ANNOUNCEMENTS.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/40">
          Control the message displayed across the public Ravewithlonex website.
        </p>
      </div>

      <div className="mt-8 max-w-4xl">
        <AdminAnnouncementForm
          initialAnnouncement={
            data
              ? {
                  id:
                    data.id,
                  active:
                    data.active,
                  type:
                    data.type,
                  message:
                    data.message,
                  cta:
                    data.cta ||
                    "",
                  href:
                    data.href ||
                    "",
                }
              : undefined
          }
        />
      </div>
    </>
  );
}
