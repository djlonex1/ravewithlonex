import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanNullableText(value: unknown) {
  const text = cleanText(value);
  return text || null;
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const user = await getAdminUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    const body = await request.json();

    const title = cleanText(body.title);

    const slug = cleanText(body.slug)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const startsAt = cleanText(body.startsAt);

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required." },
        { status: 400 }
      );
    }

    if (!startsAt || Number.isNaN(new Date(startsAt).getTime())) {
      return NextResponse.json(
        { error: "A valid event date and time is required." },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "upcoming",
      "past",
      "sold-out",
      "cancelled",
    ];

    const status = allowedStatuses.includes(body.status)
      ? body.status
      : "upcoming";

    const { data: oldEvent } = await supabaseAdmin
      .from("events")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const { data, error } = await supabaseAdmin
      .from("events")
      .update({
        slug,
        title,
        starts_at: new Date(startsAt).toISOString(),
        display_date: cleanText(body.displayDate),
        location: cleanText(body.location),
        venue: cleanText(body.venue),
        time_label: cleanText(body.timeLabel),
        status,
        description: cleanText(body.description),
        cover_url: cleanNullableText(body.coverUrl),
        flyer_url: cleanNullableText(body.flyerUrl),
        ticket_url: cleanNullableText(body.ticketUrl),
        instagram_url: cleanNullableText(body.instagramUrl),
        published: body.published !== false,
        sort_order: Number(body.sortOrder) || 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Update event error:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Another event already uses that slug." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    revalidatePath("/");
    revalidatePath("/admin/events");
    revalidatePath(`/events/${slug}`);

    if (oldEvent?.slug && oldEvent.slug !== slug) {
      revalidatePath(`/events/${oldEvent.slug}`);
    }

    return NextResponse.json({
      success: true,
      event: data,
    });
  } catch (error) {
    console.error("Update event route error:", error);

    return NextResponse.json(
      { error: "Unable to update event." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  const user = await getAdminUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  const { error } = await supabaseAdmin
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete event error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/admin/events");

  return NextResponse.json({
    success: true,
  });
}
