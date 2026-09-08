import { NextResponse } from "next/server";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    memberId: string;
  }>;
};

function clean(value: unknown) {
  return typeof value === "string"
    ? value.trim()
    : "";
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

  const { memberId } = await context.params;

  try {
    const body = await request.json();

    const name = clean(body.name);
    const role = clean(body.role);
    const imageUrl = clean(body.imageUrl);
    const instagramUrl = clean(body.instagramUrl);

    if (!name || !role) {
      return NextResponse.json(
        {
          error: "Name and role are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("event_lineup")
      .update({
        name,
        role,
        image_url: imageUrl || null,
        instagram_url: instagramUrl || null,
        sort_order: Number(body.sortOrder) || 0,
      })
      .eq("id", memberId)
      .select()
      .single();

    if (error) {
      console.error("Lineup update error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      member: data,
    });
  } catch (error) {
    console.error("Lineup update route error:", error);

    return NextResponse.json(
      {
        error: "Unable to update lineup member.",
      },
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

  const { memberId } = await context.params;

  const { error } = await supabaseAdmin
    .from("event_lineup")
    .delete()
    .eq("id", memberId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
