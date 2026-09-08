import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

type Context = {
  params: Promise<{
    token: string;
  }>;
};

async function unsubscribe(token: string) {
  const { error } = await supabaseAdmin
    .from("join_requests")
    .update({
      subscribed: false,
    })
    .eq("unsubscribe_token", token);

  return error;
}

export async function POST(
  _request: Request,
  context: Context
) {
  const { token } = await context.params;

  const error =
    await unsubscribe(token);

  if (error) {
    return NextResponse.json(
      {
        error:
          "Unable to unsubscribe.",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({
    success: true,
  });
}

export async function GET(
  request: Request,
  context: Context
) {
  const { token } = await context.params;

  const error =
    await unsubscribe(token);

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/unsubscribe/${token}?error=1`,
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      `/unsubscribe/${token}?success=1`,
      request.url
    )
  );
}
