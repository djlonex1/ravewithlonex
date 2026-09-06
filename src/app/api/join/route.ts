import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendJoinNotification } from "@/lib/email";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const whatsapp = String(
      body.whatsapp || ""
    ).trim();

    const city = String(body.city || "").trim();

    // Honeypot spam field
    if (body.website) {
      return NextResponse.json({
        success: true,
      });
    }

    // Validate name
    if (!name || name.length > 100) {
      return NextResponse.json(
        {
          error: "Please enter a valid name.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate email
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // Validate optional fields
    if (whatsapp.length > 40) {
      return NextResponse.json(
        {
          error: "Please enter a valid WhatsApp number.",
        },
        {
          status: 400,
        }
      );
    }

    if (city.length > 100) {
      return NextResponse.json(
        {
          error: "Please enter a valid city.",
        },
        {
          status: 400,
        }
      );
    }

    // Save to Supabase
    const { error } = await supabaseAdmin
      .from("join_requests")
      .insert({
        name,
        email,
        whatsapp: whatsapp || null,
        city: city || null,
      });

    // Handle database errors
    if (error) {
      // Email already exists
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          alreadyJoined: true,
        });
      }

      console.error(
        "Join request database error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "We couldn't add you to the movement. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    // Send notification email to you
    // Signup remains successful even if the email notification fails.
    try {
      await sendJoinNotification({
        name,
        email,
        whatsapp,
        city,
      });
    } catch (emailError) {
      console.error(
        "Join notification email failed:",
        emailError
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Join API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}