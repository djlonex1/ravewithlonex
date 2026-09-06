import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedTypes = new Set([
  "partnership",
  "booking",
  "general",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const inquiryType =
      String(
        body.inquiryType || ""
      ).trim();

    const name =
      String(body.name || "").trim();

    const email =
      String(body.email || "")
        .trim()
        .toLowerCase();

    const phone =
      String(body.phone || "").trim();

    const message =
      String(body.message || "").trim();

    if (body.website) {
      return NextResponse.json({
        success: true,
      });
    }

    if (!allowedTypes.has(inquiryType)) {
      return NextResponse.json(
        {
          error:
            "Please select an enquiry type.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !name ||
      name.length > 100
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter your name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      message.length < 5 ||
      message.length > 2000
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid message.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } =
      await supabaseAdmin
        .from("inquiries")
        .insert({
          inquiry_type:
            inquiryType,
          name,
          email,
          phone: phone || null,
          message,
        });

    if (error) {
      console.error(
        "Inquiry database error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Your enquiry couldn't be sent. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Inquiry API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
