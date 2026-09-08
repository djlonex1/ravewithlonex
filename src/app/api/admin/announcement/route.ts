import {
  NextResponse,
} from "next/server";

import {
  revalidatePath,
} from "next/cache";

import {
  getAdminUser,
} from "@/lib/admin-auth";

import {
  supabaseAdmin,
} from "@/lib/supabase-admin";

function clean(
  value: unknown
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

export async function PUT(
  request: Request
) {
  const user =
    await getAdminUser();

  if (!user) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    const message =
      clean(body.message);

    if (!message) {
      return NextResponse.json(
        {
          error:
            "Announcement message is required.",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [
      "tickets",
      "venue",
      "warning",
      "sold-out",
      "general",
    ];

    const type =
      allowedTypes.includes(
        body.type
      )
        ? body.type
        : "general";

    const active =
      body.active === true;

    const id =
      clean(body.id);

    if (active) {
      const {
        error:
          deactivateError,
      } =
        await supabaseAdmin
          .from(
            "announcements"
          )
          .update({
            active: false,
          })
          .neq(
            "id",
            id ||
              "00000000-0000-0000-0000-000000000000"
          );

      if (
        deactivateError
      ) {
        console.error(
          "Deactivate announcements:",
          deactivateError
        );
      }
    }

    if (id) {
      const {
        data,
        error,
      } =
        await supabaseAdmin
          .from(
            "announcements"
          )
          .update({
            active,
            type,
            message,
            cta:
              clean(
                body.cta
              ) || null,
            href:
              clean(
                body.href
              ) || null,
          })
          .eq("id", id)
          .select()
          .single();

      if (error) {
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

      revalidatePath("/");

      return NextResponse.json({
        success: true,
        announcement:
          data,
      });
    }

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          "announcements"
        )
        .insert({
          active,
          type,
          message,
          cta:
            clean(
              body.cta
            ) || null,
          href:
            clean(
              body.href
            ) || null,
        })
        .select()
        .single();

    if (error) {
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

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      announcement:
        data,
    });
  } catch (error) {
    console.error(
      "Announcement update:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to update announcement.",
      },
      {
        status: 500,
      }
    );
  }
}
