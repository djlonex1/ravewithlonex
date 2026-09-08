import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

function requiredEnv(
  name: string
) {
  const value =
    process.env[name];

  if (!value) {
    throw new Error(
      `${name} is missing`
    );
  }

  return value.trim();
}

function clean(
  value: unknown
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function escapeHtml(
  value: string
) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function chunks<T>(
  items: T[],
  size: number
) {
  const result: T[][] = [];

  for (
    let i = 0;
    i < items.length;
    i += size
  ) {
    result.push(
      items.slice(
        i,
        i + size
      )
    );
  }

  return result;
}

function emailHtml({
  message,
  buttonText,
  buttonUrl,
  unsubscribeUrl,
}: {
  message: string;
  buttonText: string;
  buttonUrl: string;
  unsubscribeUrl: string;
}) {
  const safeMessage =
    escapeHtml(message)
      .replaceAll(
        "\n",
        "<br />"
      );

  const button =
    buttonText &&
    buttonUrl
      ? `
        <div style="margin:32px 0;">
          <a
            href="${escapeHtml(buttonUrl)}"
            style="
              display:inline-block;
              background:#efff00;
              color:#000;
              padding:16px 24px;
              font-weight:900;
              text-decoration:none;
              text-transform:uppercase;
              letter-spacing:2px;
            "
          >
            ${escapeHtml(buttonText)}
          </a>
        </div>
      `
      : "";

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#050505;color:#fff;font-family:Arial,sans-serif;">
        <div style="max-width:620px;margin:auto;padding:48px 24px;">
          <div style="font-size:12px;font-weight:900;letter-spacing:4px;color:#efff00;text-transform:uppercase;">
            RAVEWITHLONEX
          </div>

          <h1 style="font-size:42px;line-height:1;margin:24px 0;">
            THE MOVEMENT.
          </h1>

          <div style="font-size:16px;line-height:1.7;color:#d5d5d5;">
            ${safeMessage}
          </div>

          ${button}

          <div style="border-top:1px solid #222;margin-top:48px;padding-top:24px;font-size:11px;line-height:1.6;color:#777;">
            You received this because you joined the Ravewithlonex movement.

            <br /><br />

            <a
              href="${escapeHtml(unsubscribeUrl)}"
              style="color:#999;"
            >
              Unsubscribe
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
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
    const body =
      await request.json();

    const mode =
      clean(body.mode);

    const subject =
      clean(body.subject);

    const message =
      clean(body.message);

    const buttonText =
      clean(body.buttonText);

    const buttonUrl =
      clean(body.buttonUrl);

    if (
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          error:
            "Subject and message are required.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey =
      requiredEnv(
        "RESEND_API_KEY"
      );

    const from =
      process.env.EMAIL_FROM?.trim() ||
      "Ravewithlonex <onboarding@resend.dev>";

    const resend =
      new Resend(apiKey);

    const origin =
      new URL(
        request.url
      ).origin;

    if (mode === "test") {
      const adminEmail =
        requiredEnv(
          "ADMIN_EMAIL"
        );

      const unsubscribeUrl =
        `${origin}/`;

      const {
        error,
      } =
        await resend.emails.send({
          from,
          to: [
            adminEmail,
          ],
          subject:
            `[TEST] ${subject}`,
          html:
            emailHtml({
              message,
              buttonText,
              buttonUrl,
              unsubscribeUrl,
            }),
        });

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

      return NextResponse.json({
        success: true,
        message:
          `Test email sent to ${adminEmail}`,
      });
    }

    if (mode !== "send") {
      return NextResponse.json(
        {
          error:
            "Invalid send mode.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      from.includes(
        "onboarding@resend.dev"
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Full broadcasts require a verified Resend sending domain. Update EMAIL_FROM after verifying your domain.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data: subscribers,
      error:
        subscribersError,
    } =
      await supabaseAdmin
        .from(
          "join_requests"
        )
        .select(
          "email, unsubscribe_token"
        )
        .eq(
          "subscribed",
          true
        )
        .not(
          "email",
          "is",
          null
        );

    if (
      subscribersError
    ) {
      return NextResponse.json(
        {
          error:
            subscribersError.message,
        },
        {
          status: 500,
        }
      );
    }

    const recipients =
      subscribers || [];

    if (
      recipients.length ===
      0
    ) {
      return NextResponse.json(
        {
          error:
            "There are no active subscribers.",
        },
        {
          status: 400,
        }
      );
    }

    const {
      data:
        broadcast,
      error:
        broadcastError,
    } =
      await supabaseAdmin
        .from(
          "broadcasts"
        )
        .insert({
          subject,
          message,
          button_text:
            buttonText ||
            null,
          button_url:
            buttonUrl ||
            null,
          status:
            "sending",
          recipient_count:
            recipients.length,
        })
        .select()
        .single();

    if (
      broadcastError ||
      !broadcast
    ) {
      return NextResponse.json(
        {
          error:
            broadcastError?.message ||
            "Unable to create broadcast.",
        },
        {
          status: 500,
        }
      );
    }

    let sent = 0;
    let failed = 0;

    const batches =
      chunks(
        recipients,
        100
      );

    for (
      let i = 0;
      i <
      batches.length;
      i++
    ) {
      const batch =
        batches[i];

      const emails =
        batch.map(
          (subscriber) => {
            const token =
              subscriber.unsubscribe_token;

            const unsubscribeUrl =
              `${origin}/unsubscribe/${token}`;

            const oneClickUrl =
              `${origin}/api/unsubscribe/${token}`;

            return {
              from,

              to: [
                subscriber.email,
              ],

              subject,

              html:
                emailHtml({
                  message,
                  buttonText,
                  buttonUrl,
                  unsubscribeUrl,
                }),

              headers: {
                "List-Unsubscribe":
                  `<${oneClickUrl}>`,

                "List-Unsubscribe-Post":
                  "List-Unsubscribe=One-Click",
              },
            };
          }
        );

      const {
        error:
          batchError,
      } =
        await resend.batch.send(
          emails,
          {
            idempotencyKey:
              `rwl-broadcast-${broadcast.id}-${i}`,
          }
        );

      if (
        batchError
      ) {
        console.error(
          "Broadcast batch error:",
          batchError
        );

        failed +=
          batch.length;
      } else {
        sent +=
          batch.length;
      }
    }

    await supabaseAdmin
      .from(
        "broadcasts"
      )
      .update({
        status:
          failed ===
          recipients.length
            ? "failed"
            : "sent",

        sent_count:
          sent,

        failed_count:
          failed,

        sent_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        broadcast.id
      );

    return NextResponse.json({
      success:
        sent > 0,

      sent,
      failed,
      total:
        recipients.length,
    });
  } catch (error) {
    console.error(
      "Broadcast error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to send broadcast.",
      },
      {
        status: 500,
      }
    );
  }
}
