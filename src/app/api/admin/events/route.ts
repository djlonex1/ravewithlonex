import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function cleanNullableText(value: unknown) {
  const text = cleanText(value);
  return text || null;
}

export async function POST(request: Request) {
  const user = await getAdminUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const title = cleanText(body.title);
    const slug = cleanText(body.slug)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const startsAt = cleanText(body.startsAt);

    if (!title) {
      return NextResponse.json(
        { error: "Event title is required." },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "Event slug is required." },
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

    const { data, error } = await supabaseAdmin
      .from("events")
      .insert({
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
      .select()
      .single();

    if (error) {
      console.error("Create event error:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          { error: "An event with that slug already exists." },
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

    return NextResponse.json({
      success: true,
      event: data,
    });
  } catch (error) {
    console.error("Create event route error:", error);

    return NextResponse.json(
      { error: "Unable to create event." },
      { status: 500 }
    );
  }
}
