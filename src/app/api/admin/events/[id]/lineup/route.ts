import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  const user = await getAdminUser();

  if (!user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { id: eventId } =
    await context.params;

  try {
    const body =
      await request.json();

    const name =
      clean(body.name);

    const role =
      clean(body.role);

    const imageUrl =
      clean(body.imageUrl);

    const instagramUrl =
      clean(body.instagramUrl);

    const sortOrder =
      Number(body.sortOrder) || 0;

    if (!name) {
      return NextResponse.json(
        {
          error: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!role) {
      return NextResponse.json(
        {
          error: "Role is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Confirm the event exists
    const {
      data: event,
      error: eventError,
    } =
      await supabaseAdmin
        .from("events")
        .select("id, slug")
        .eq("id", eventId)
        .maybeSingle();

    if (eventError) {
      console.error(
        "Event lookup error:",
        eventError
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify event.",
        },
        {
          status: 500,
        }
      );
    }

    if (!event) {
      return NextResponse.json(
        {
          error:
            "Event not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("event_lineup")
        .insert({
          event_id: eventId,
          name,
          role,
          image_url:
            imageUrl || null,
          instagram_url:
            instagramUrl || null,
          sort_order:
            sortOrder,
        })
        .select()
        .single();

    if (error) {
      console.error(
        "Add lineup member error:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status: 500,
        }
      );
    }

    revalidatePath(
      `/events/${event.slug}`
    );

    revalidatePath(
      `/admin/events/${eventId}`
    );

    return NextResponse.json({
      success: true,
      member: data,
    });
  } catch (error) {
    console.error(
      "Add lineup route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to add lineup member.",
      },
      {
        status: 500,
      }
    );
  }
}
