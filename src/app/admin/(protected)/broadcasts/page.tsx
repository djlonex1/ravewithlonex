import AdminBroadcastForm from "@/components/admin/AdminBroadcastForm";

import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function BroadcastsPage() {
  const {
    count,
    error,
  } =
    await supabaseAdmin
      .from(
        "join_requests"
      )
      .select(
        "id",
        {
          count:
            "exact",
          head:
            true,
        }
      )
      .eq(
        "subscribed",
        true
      );

  if (error) {
    throw new Error(
      `Unable to count subscribers: ${error.message}`
    );
  }

  const {
    data:
      recentBroadcasts,
  } =
    await supabaseAdmin
      .from(
        "broadcasts"
      )
      .select(
        "id, subject, status, recipient_count, sent_count, failed_count, created_at"
      )
      .order(
        "created_at",
        {
          ascending:
            false,
        }
      )
      .limit(10);

  return (
    <>
      <div className="border-b border-white/10 pb-8">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Community
        </p>

        <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
          BROADCASTS.
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/40">
          Send ticket drops, venue updates and rave announcements directly to the movement.
        </p>
      </div>

      <div className="mt-8 max-w-4xl">
        <AdminBroadcastForm
          subscriberCount={
            count || 0
          }
        />
      </div>

      {recentBroadcasts &&
        recentBroadcasts.length >
          0 && (
          <section className="mt-14 border border-white/10 bg-black p-5 md:p-8">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
              History
            </p>

            <h2 className="mt-2 font-display text-5xl">
              RECENT DROPS.
            </h2>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {recentBroadcasts.map(
                (
                  broadcast
                ) => (
                  <div
                    key={
                      broadcast.id
                    }
                    className="grid gap-3 py-5 sm:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <p className="font-bold">
                        {
                          broadcast.subject
                        }
                      </p>

                      <p className="mt-2 text-[9px] uppercase tracking-[0.17em] text-white/30">
                        {
                          broadcast.status
                        }
                        {" • "}
                        {
                          broadcast.sent_count
                        }{" "}
                        sent
                        {" • "}
                        {
                          broadcast.failed_count
                        }{" "}
                        failed
                      </p>
                    </div>

                    <p className="text-xs text-white/30">
                      {
                        broadcast.recipient_count
                      }{" "}
                      recipients
                    </p>
                  </div>
                )
              )}
            </div>
          </section>
        )}
    </>
  );
}
