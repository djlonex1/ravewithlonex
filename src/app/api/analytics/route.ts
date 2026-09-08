import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

const ALLOWED_ACTIONS = new Set([
  "page_view",
  "ticket_click",
  "whatsapp_share",
  "calendar_add",
]);

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const eventId = clean(body.eventId);
    const action = clean(body.action);

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_ACTIONS.has(action)) {
      return NextResponse.json(
        { error: "Invalid analytics action." },
        { status: 400 }
      );
    }

    const { data: event, error: eventError } =
      await supabaseAdmin
        .from("events")
        .select("id")
        .eq("id", eventId)
        .maybeSingle();

    if (eventError || !event) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from("analytics_events")
      .insert({
        event_id: eventId,
        action,
      });

    if (error) {
      console.error("Analytics insert error:", error);

      return NextResponse.json(
        { error: "Unable to record analytics." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Analytics route error:", error);

    return NextResponse.json(
      { error: "Unable to record analytics." },
      { status: 500 }
    );
  }
}
