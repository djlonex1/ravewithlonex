"use client";

import {
  Loader2,
  Megaphone,
  Save,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

type AnnouncementData = {
  id?: string;
  active: boolean;
  type: string;
  message: string;
  cta: string;
  href: string;
};

export default function AdminAnnouncementForm({
  initialAnnouncement,
}: {
  initialAnnouncement?: AnnouncementData;
}) {
  const router =
    useRouter();

  const [form, setForm] =
    useState<AnnouncementData>({
      id:
        initialAnnouncement?.id,

      active:
        initialAnnouncement?.active ??
        false,

      type:
        initialAnnouncement?.type ||
        "general",

      message:
        initialAnnouncement?.message ||
        "",

      cta:
        initialAnnouncement?.cta ||
        "",

      href:
        initialAnnouncement?.href ||
        "",
    });

  const [saving, setSaving] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  function update<
    K extends keyof AnnouncementData
  >(
    key: K,
    value:
      AnnouncementData[K]
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]:
          value,
      })
    );
  }

  async function save(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const response =
      await fetch(
        "/api/admin/announcement",
        {
          method:
            "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              form
            ),
        }
      );

    const result =
      await response.json();

    if (!response.ok) {
      setError(
        result.error ||
          "Unable to save announcement."
      );

      setSaving(false);
      return;
    }

    if (
      result.announcement
        ?.id
    ) {
      setForm(
        (current) => ({
          ...current,
          id:
            result
              .announcement
              .id,
        })
      );
    }

    setSuccess(
      "Announcement updated."
    );

    setSaving(false);

    router.refresh();
  }

  const inputClass =
    "w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#efff00]";

  const labelClass =
    "mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-white/35";

  return (
    <form
      onSubmit={save}
      className="space-y-6"
    >
      {success && (
        <div className="border border-[#efff00]/30 bg-[#efff00]/10 px-5 py-4 text-sm text-[#efff00]">
          {success}
        </div>
      )}

      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="border border-white/10 bg-black p-5 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
              Site Announcement
            </p>

            <h2 className="mt-2 font-display text-5xl">
              CONTROL THE BANNER.
            </h2>
          </div>

          <Megaphone
            size={28}
            className="text-[#efff00]"
          />
        </div>

        <label className="mb-8 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={
              form.active
            }
            onChange={(e) =>
              update(
                "active",
                e.target
                  .checked
              )
            }
            className="h-5 w-5 accent-[#efff00]"
          />

          <span className="text-xs font-black uppercase tracking-[0.18em]">
            Banner Active
          </span>
        </label>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              className={
                labelClass
              }
            >
              Type
            </label>

            <select
              value={
                form.type
              }
              onChange={(e) =>
                update(
                  "type",
                  e.target
                    .value
                )
              }
              className={
                inputClass
              }
            >
              <option value="general">
                General
              </option>

              <option value="tickets">
                Tickets
              </option>

              <option value="venue">
                Venue Update
              </option>

              <option value="warning">
                Warning
              </option>

              <option value="sold-out">
                Sold Out
              </option>
            </select>
          </div>

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
                form.cta
              }
              onChange={(e) =>
                update(
                  "cta",
                  e.target
                    .value
                )
              }
              className={
                inputClass
              }
              placeholder="GET TICKETS"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            className={
              labelClass
            }
          >
            Announcement Message
          </label>

          <textarea
            required
            rows={4}
            value={
              form.message
            }
            onChange={(e) =>
              update(
                "message",
                e.target
                  .value
              )
            }
            className={
              inputClass
            }
            placeholder="THE LAST DANCE — TICKETS ARE NOW LIVE."
          />
        </div>

        <div className="mt-6">
          <label
            className={
              labelClass
            }
          >
            Button Destination
          </label>

          <input
            value={
              form.href
            }
            onChange={(e) =>
              update(
                "href",
                e.target
                  .value
              )
            }
            className={
              inputClass
            }
            placeholder="/events/the-last-dance"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={
          saving
        }
        className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#efff00] px-6 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:opacity-50"
      >
        {saving ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <Save
            size={18}
          />
        )}

        {saving
          ? "Saving"
          : "Save Announcement"}
      </button>
    </form>
  );
}
