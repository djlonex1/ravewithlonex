"use client";

import {
  Loader2,
  Mail,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

export default function AdminBroadcastForm({
  subscriberCount,
}: {
  subscriberCount: number;
}) {
  const [
    subject,
    setSubject,
  ] =
    useState("");

  const [
    message,
    setMessage,
  ] =
    useState("");

  const [
    buttonText,
    setButtonText,
  ] =
    useState("");

  const [
    buttonUrl,
    setButtonUrl,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState<
      "test" |
      "send" |
      null
    >(null);

  const [
    status,
    setStatus,
  ] =
    useState("");

  const [
    error,
    setError,
  ] =
    useState("");

  async function submit(
    mode:
      | "test"
      | "send"
  ) {
    if (
      !subject.trim() ||
      !message.trim()
    ) {
      setError(
        "Subject and message are required."
      );

      return;
    }

    if (
      mode === "send"
    ) {
      const confirmed =
        window.confirm(
          `Send this email to ${subscriberCount} active subscribers?`
        );

      if (!confirmed) {
        return;
      }
    }

    setLoading(mode);
    setError("");
    setStatus("");

    const response =
      await fetch(
        "/api/admin/broadcasts",
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              mode,
              subject,
              message,
              buttonText,
              buttonUrl,
            }),
        }
      );

    const result =
      await response.json();

    setLoading(null);

    if (!response.ok) {
      setError(
        result.error ||
          "Unable to send email."
      );

      return;
    }

    if (
      mode === "test"
    ) {
      setStatus(
        result.message ||
          "Test email sent."
      );
    } else {
      setStatus(
        `Broadcast complete — ${result.sent} sent, ${result.failed} failed.`
      );
    }
  }

  const inputClass =
    "w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#efff00]";

  const labelClass =
    "mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-white/35";

  return (
    <div className="space-y-6">
      {status && (
        <div className="border border-[#efff00]/30 bg-[#efff00]/10 px-5 py-4 text-sm text-[#efff00]">
          {status}
        </div>
      )}

      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
              Movement Broadcast
            </p>

            <h2 className="mt-2 font-display text-5xl">
              SEND THE DROP.
            </h2>
          </div>

          <Mail
            size={28}
            className="text-[#efff00]"
          />
        </div>

        <div className="mt-8 border border-white/10 p-5">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
            Active Subscribers
          </p>

          <p className="mt-2 font-display text-6xl">
            {subscriberCount}
          </p>
        </div>

        <div className="mt-8">
          <label
            className={
              labelClass
            }
          >
            Subject
          </label>

          <input
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            className={
              inputClass
            }
            placeholder="THE LAST DANCE — TICKETS ARE LIVE 🔥"
          />
        </div>

        <div className="mt-6">
          <label
            className={
              labelClass
            }
          >
            Message
          </label>

          <textarea
            rows={9}
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            className={
              inputClass
            }
            placeholder="Ede, the wait is over..."
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              className={
                labelClass
              }
            >
              Button Text
            </label>

            <input
              value={
                buttonText
              }
              onChange={(e) =>
                setButtonText(
                  e.target.value
                )
              }
              className={
                inputClass
              }
              placeholder="GET TICKETS"
            />
          </div>

          <div>
            <label
              className={
                labelClass
              }
            >
              Button URL
            </label>

            <input
              value={
                buttonUrl
              }
              onChange={(e) =>
                setButtonUrl(
                  e.target.value
                )
              }
              className={
                inputClass
              }
              placeholder="https://..."
            />
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/30">
          Every recipient receives an individual unsubscribe link.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            submit(
              "test"
            )
          }
          disabled={
            loading !==
            null
          }
          className="flex min-h-14 items-center justify-center gap-3 border border-[#efff00] px-6 text-xs font-black uppercase tracking-[0.18em] text-[#efff00] disabled:opacity-40"
        >
          {loading ===
          "test" ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Mail
              size={17}
            />
          )}

          Send Test
        </button>

        <button
          type="button"
          onClick={() =>
            submit(
              "send"
            )
          }
          disabled={
            loading !==
              null ||
            subscriberCount ===
              0
          }
          className="flex min-h-14 items-center justify-center gap-3 bg-[#efff00] px-6 text-xs font-black uppercase tracking-[0.18em] text-black disabled:opacity-40"
        >
          {loading ===
          "send" ? (
            <Loader2
              size={17}
              className="animate-spin"
            />
          ) : (
            <Send
              size={17}
            />
          )}

          Send To Movement
        </button>
      </div>
    </div>
  );
}
