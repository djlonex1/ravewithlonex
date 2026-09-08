import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import AdminEventForm from "@/components/admin/AdminEventForm";
import AdminLineupManager from "@/components/admin/AdminLineupManager";
import AdminMediaManager from "@/components/admin/AdminMediaManager";

import {
  supabaseAdmin,
} from "@/lib/supabase-admin";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdminEventPage({
  params,
}: PageProps) {
  const { id } =
    await params;

  const {
    data: event,
    error,
  } =
    await supabaseAdmin
      .from("events")
      .select("*")
      .eq("id", id)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Unable to load event: ${error.message}`
    );
  }

  if (!event) {
    notFound();
  }

  const [
    lineupResult,
    mediaResult,
  ] =
    await Promise.all([
      supabaseAdmin
        .from(
          "event_lineup"
        )
        .select("*")
        .eq(
          "event_id",
          id
        )
        .order(
          "sort_order",
          {
            ascending:
              true,
          }
        ),

      supabaseAdmin
        .from(
          "event_media"
        )
        .select("*")
        .eq(
          "event_id",
          id
        )
        .order(
          "sort_order",
          {
            ascending:
              true,
          }
        ),
    ]);

  if (
    lineupResult.error
  ) {
    throw new Error(
      `Unable to load lineup: ${lineupResult.error.message}`
    );
  }

  if (
    mediaResult.error
  ) {
    throw new Error(
      `Unable to load media: ${mediaResult.error.message}`
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/35 transition hover:text-[#efff00]"
        >
          <ArrowLeft
            size={14}
          />

          Back To Events
        </Link>

        <Link
          href={`/events/${event.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/35 transition hover:text-[#efff00]"
        >
          View Event

          <ArrowUpRight
            size={14}
          />
        </Link>
      </div>

      <div className="mt-8 border-b border-white/10 pb-8">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Edit Experience
        </p>

        <h1 className="font-display text-6xl leading-[0.8] md:text-8xl">
          {event.title}
        </h1>
      </div>

      <div className="mt-8">
        <AdminEventForm
          initialEvent={{
            id:
              event.id,

            title:
              event.title,

            slug:
              event.slug,

            startsAt:
              event.starts_at,

            displayDate:
              event.display_date ||
              "",

            location:
              event.location ||
              "",

            venue:
              event.venue ||
              "",

            timeLabel:
              event.time_label ||
              "",

            status:
              event.status,

            description:
              event.description ||
              "",

            coverUrl:
              event.cover_url ||
              "",

            flyerUrl:
              event.flyer_url ||
              "",

            ticketUrl:
              event.ticket_url ||
              "",

            instagramUrl:
              event.instagram_url ||
              "",

            published:
              event.published,

            sortOrder:
              event.sort_order ||
              0,
          }}
        />
      </div>

      <div className="my-14 border-t border-white/10" />

      <AdminLineupManager
        eventId={event.id}
        eventSlug={
          event.slug
        }
        initialMembers={
          lineupResult.data ||
          []
        }
      />

      <div className="my-14 border-t border-white/10" />

      <AdminMediaManager
        eventId={event.id}
        eventSlug={
          event.slug
        }
        initialMedia={
          mediaResult.data ||
          []
        }
      />
    </>
  );
}
