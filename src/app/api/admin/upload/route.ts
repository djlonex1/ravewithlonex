import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const BUCKET = "event-assets";

const MAX_FILE_SIZE =
  8 * 1024 * 1024;

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function extensionForFile(
  file: File
) {
  const fromName =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase();

  const safeExtensions =
    new Set([
      "jpg",
      "jpeg",
      "png",
      "webp",
      "avif",
    ]);

  if (
    fromName &&
    safeExtensions.has(
      fromName
    )
  ) {
    return fromName ===
      "jpeg"
      ? "jpg"
      : fromName;
  }

  switch (
    file.type
  ) {
    case "image/png":
      return "png";

    case "image/webp":
      return "webp";

    case "image/avif":
      return "avif";

    default:
      return "jpg";
  }
}

function cleanFolder(
  value: FormDataEntryValue | null
) {
  const folder =
    typeof value ===
    "string"
      ? value
      : "misc";

  return folder
    .toLowerCase()
    .replace(
      /[^a-z0-9-_]/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    ) || "misc";
}

export async function POST(
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
    const formData =
      await request.formData();

    const file =
      formData.get(
        "file"
      );

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          error:
            "No image was selected.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !ALLOWED_TYPES.has(
        file.type
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG, WebP and AVIF images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          error:
            "Image must be 8MB or smaller.",
        },
        {
          status: 400,
        }
      );
    }

    const folder =
      cleanFolder(
        formData.get(
          "folder"
        )
      );

    const extension =
      extensionForFile(
        file
      );

    const filename =
      `${Date.now()}-${randomUUID()}.${extension}`;

    const path =
      `${folder}/${filename}`;

    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      );

    const {
      error: uploadError,
    } =
      await supabaseAdmin.storage
        .from(BUCKET)
        .upload(
          path,
          buffer,
          {
            contentType:
              file.type,
            cacheControl:
              "31536000",
            upsert: false,
          }
        );

    if (uploadError) {
      console.error(
        "Storage upload error:",
        uploadError
      );

      return NextResponse.json(
        {
          error:
            uploadError.message,
        },
        {
          status: 500,
        }
      );
    }

    const {
      data: publicUrlData,
    } =
      supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(
          path
        );

    return NextResponse.json({
      success: true,
      path,
      url:
        publicUrlData.publicUrl,
    });
  } catch (error) {
    console.error(
      "Admin image upload error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to upload image.",
      },
      {
        status: 500,
      }
    );
  }
}
