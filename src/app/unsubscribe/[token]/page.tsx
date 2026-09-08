import Link from "next/link";

import { supabaseAdmin } from "@/lib/supabase-admin";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function UnsubscribePage({
  params,
}: Props) {
  const { token } =
    await params;

  const { error } =
    await supabaseAdmin
      .from(
        "join_requests"
      )
      .update({
        subscribed: false,
      })
      .eq(
        "unsubscribe_token",
        token
      );

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="w-full max-w-xl border border-white/10 p-8 text-center md:p-12">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Ravewithlonex
        </p>

        <h1 className="mt-4 font-display text-6xl">
          {error
            ? "SOMETHING WENT WRONG."
            : "YOU'RE UNSUBSCRIBED."}
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45">
          {error
            ? "We couldn't update your subscription preference. Please try again later."
            : "You will no longer receive Ravewithlonex event-drop emails. You can still visit the website whenever you want."}
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex bg-[#efff00] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-black"
        >
          Back To Ravewithlonex
        </Link>
      </div>
    </main>
  );
}
