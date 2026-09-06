import "server-only";

import { Resend } from "resend";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is missing from environment variables`
    );
  }

  return value.trim();
}

const apiKey = getRequiredEnv(
  "RESEND_API_KEY"
);

const notifyEmail = getRequiredEnv(
  "NOTIFY_EMAIL"
);

const emailFrom =
  process.env.EMAIL_FROM?.trim() ||
  "Ravewithlonex <onboarding@resend.dev>";

const resend = new Resend(apiKey);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendJoinNotification({
  name,
  email,
  whatsapp,
  city,
}: {
  name: string;
  email: string;
  whatsapp: string;
  city: string;
}) {
  const { error } =
    await resend.emails.send({
      from: emailFrom,

      to: notifyEmail,

      subject:
        `🔥 New Ravewithlonex member — ${name}`,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            background: #050505;
            color: #ffffff;
            padding: 32px;
          "
        >
          <h1 style="color:#efff00;">
            NEW MOVEMENT SIGNUP
          </h1>

          <p>
            Someone just joined the
            Ravewithlonex movement.
          </p>

          <hr style="border-color:#333;" />

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>WhatsApp:</strong>
            ${escapeHtml(
              whatsapp || "Not provided"
            )}
          </p>

          <p>
            <strong>City:</strong>
            ${escapeHtml(
              city || "Not provided"
            )}
          </p>

          <hr style="border-color:#333;" />

          <p style="color:#888;">
            Ravewithlonex Website
          </p>
        </div>
      `,
    });

  if (error) {
    throw new Error(
      error.message
    );
  }
}

export async function sendInquiryNotification({
  inquiryType,
  name,
  email,
  phone,
  message,
}: {
  inquiryType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const readableType =
    inquiryType === "partnership"
      ? "Partnership / Sponsorship"
      : inquiryType === "booking"
        ? "DJ Lonex Booking"
        : "General Enquiry";

  const subject =
    inquiryType === "booking"
      ? `🎧 New DJ Lonex booking — ${name}`
      : inquiryType === "partnership"
        ? `🤝 New Ravewithlonex partnership enquiry — ${name}`
        : `📩 New Ravewithlonex enquiry — ${name}`;

  const { error } =
    await resend.emails.send({
      from: emailFrom,

      to: notifyEmail,

      subject,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            background: #050505;
            color: #ffffff;
            padding: 32px;
          "
        >
          <h1 style="color:#efff00;">
            ${escapeHtml(
              readableType.toUpperCase()
            )}
          </h1>

          <p>
            A new enquiry has been submitted
            through the Ravewithlonex website.
          </p>

          <hr style="border-color:#333;" />

          <p>
            <strong>Type:</strong>
            ${escapeHtml(readableType)}
          </p>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>
              Phone / WhatsApp:
            </strong>

            ${escapeHtml(
              phone || "Not provided"
            )}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div
            style="
              padding: 20px;
              background: #111;
              border-left:
                4px solid #efff00;
            "
          >
            ${escapeHtml(message).replaceAll(
              "\n",
              "<br />"
            )}
          </div>

          <hr
            style="
              border-color:#333;
              margin-top:24px;
            "
          />

          <p style="color:#888;">
            Ravewithlonex Website
          </p>
        </div>
      `,
    });

  if (error) {
    throw new Error(
      error.message
    );
  }
}