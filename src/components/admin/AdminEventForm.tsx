"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  Loader2,
  Save,
  Trash2,
} from "lucide-react";

type EventData = {
  id?: string;
  title: string;
  slug: string;
  startsAt: string;
  displayDate: string;
  location: string;
  venue: string;
  timeLabel: string;
  status: string;
  description: string;
  coverUrl: string;
  flyerUrl: string;
  ticketUrl: string;
  instagramUrl: string;
  published: boolean;
  sortOrder: number;
};

type Props = {
  initialEvent?: EventData;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toLocalDateTime(value: string) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(
    date.getTime() - offset * 60 * 1000
  );

  return localDate
    .toISOString()
    .slice(0, 16);
}

export default function AdminEventForm({
  initialEvent,
}: Props) {
  const router = useRouter();

  const editing = Boolean(initialEvent?.id);

  const [form, setForm] = useState<EventData>({
    id: initialEvent?.id,
    title: initialEvent?.title || "",
    slug: initialEvent?.slug || "",
    startsAt: toLocalDateTime(
      initialEvent?.startsAt || ""
    ),
    displayDate: initialEvent?.displayDate || "",
    location: initialEvent?.location || "",
    venue: initialEvent?.venue || "",
    timeLabel: initialEvent?.timeLabel || "",
    status: initialEvent?.status || "upcoming",
    description: initialEvent?.description || "",
    coverUrl: initialEvent?.coverUrl || "",
    flyerUrl: initialEvent?.flyerUrl || "",
    ticketUrl: initialEvent?.ticketUrl || "",
    instagramUrl: initialEvent?.instagramUrl || "",
    published: initialEvent?.published ?? true,
    sortOrder: initialEvent?.sortOrder ?? 0,
  });

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  function update<K extends keyof EventData>(
    key: K,
    value: EventData[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug:
        !editing || !current.slug
          ? slugify(value)
          : current.slug,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const payload = {
      ...form,
      startsAt: form.startsAt
        ? new Date(form.startsAt).toISOString()
        : "",
    };

    const endpoint = editing
      ? `/api/admin/events/${form.id}`
      : "/api/admin/events";

    const response = await fetch(endpoint, {
      method: editing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.error ||
          "Something went wrong."
      );
      setSaving(false);
      return;
    }

    setMessage(
      editing
        ? "Event updated successfully."
        : "Event created successfully."
    );

    setSaving(false);

    if (!editing && result.event?.id) {
      router.replace(
        `/admin/events/${result.event.id}`
      );
    }

    router.refresh();
  }

  async function deleteEvent() {
    if (!form.id) return;

    const confirmed =
      window.confirm(
        `Delete "${form.title}"?\n\nThis cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    const response = await fetch(
      `/api/admin/events/${form.id}`,
      {
        method: "DELETE",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      setError(
        result.error ||
          "Unable to delete event."
      );
      setDeleting(false);
      return;
    }

    router.replace("/admin/events");
    router.refresh();
  }

  const inputClass =
    "w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#efff00]";

  const labelClass =
    "mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-white/35";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="border border-[#efff00]/30 bg-[#efff00]/10 px-5 py-4 text-sm text-[#efff00]">
          {message}
        </div>
      )}

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <p className="mb-7 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Basic Information
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className={labelClass}>
              Event Title
            </label>

            <input
              required
              value={form.title}
              onChange={(e) =>
                handleTitleChange(
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="THE LAST DANCE"
            />
          </div>

          <div>
            <label className={labelClass}>
              URL Slug
            </label>

            <input
              required
              value={form.slug}
              onChange={(e) =>
                update(
                  "slug",
                  slugify(
                    e.target.value
                  )
                )
              }
              className={inputClass}
              placeholder="the-last-dance"
            />

            <p className="mt-2 text-[10px] text-white/25">
              /events/{form.slug || "event-name"}
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Date & Time
            </label>

            <input
              required
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) =>
                update(
                  "startsAt",
                  e.target.value
                )
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Display Date
            </label>

            <input
              value={form.displayDate}
              onChange={(e) =>
                update(
                  "displayDate",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="09 OCT 2026"
            />
          </div>

          <div>
            <label className={labelClass}>
              Time Label
            </label>

            <input
              value={form.timeLabel}
              onChange={(e) =>
                update(
                  "timeLabel",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="9PM — TILL DAWN"
            />
          </div>

          <div>
            <label className={labelClass}>
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                update(
                  "status",
                  e.target.value
                )
              }
              className={inputClass}
            >
              <option value="upcoming">
                Upcoming
              </option>

              <option value="past">
                Past
              </option>

              <option value="sold-out">
                Sold Out
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>
      </section>

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <p className="mb-7 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Location
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className={labelClass}>
              Location
            </label>

            <input
              value={form.location}
              onChange={(e) =>
                update(
                  "location",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="EDE, OSUN STATE"
            />
          </div>

          <div>
            <label className={labelClass}>
              Venue
            </label>

            <input
              value={form.venue}
              onChange={(e) =>
                update(
                  "venue",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="FLORIDA KING'S, EDE"
            />
          </div>
        </div>
      </section>

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <p className="mb-7 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Event Details
        </p>

        <div>
          <label className={labelClass}>
            Description
          </label>

          <textarea
            rows={6}
            value={form.description}
            onChange={(e) =>
              update(
                "description",
                e.target.value
              )
            }
            className={inputClass}
            placeholder="Tell people about the experience..."
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <label className={labelClass}>
              Ticket URL
            </label>

            <input
              value={form.ticketUrl}
              onChange={(e) =>
                update(
                  "ticketUrl",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className={labelClass}>
              Instagram URL
            </label>

            <input
              value={form.instagramUrl}
              onChange={(e) =>
                update(
                  "instagramUrl",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>
      </section>

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <p className="mb-7 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Media
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <AdminImageUpload
            label="Cover Image"
            value={form.coverUrl}
            folder={`covers/${form.slug || "new-event"}`}
            onChange={(url) =>
              update(
                "coverUrl",
                url
              )
            }
          />

          <AdminImageUpload
            label="Event Flyer"
            value={form.flyerUrl}
            folder={`flyers/${form.slug || "new-event"}`}
            onChange={(url) =>
              update(
                "flyerUrl",
                url
              )
            }
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <label className={labelClass}>
              Cover URL
            </label>

            <input
              value={form.coverUrl}
              onChange={(e) =>
                update(
                  "coverUrl",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="Uploaded image URL"
            />
          </div>

          <div>
            <label className={labelClass}>
              Flyer URL
            </label>

            <input
              value={form.flyerUrl}
              onChange={(e) =>
                update(
                  "flyerUrl",
                  e.target.value
                )
              }
              className={inputClass}
              placeholder="Uploaded flyer URL"
            />
          </div>
        </div>
      </section>

      <section className="border border-white/10 bg-black p-5 md:p-8">
        <p className="mb-7 text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
          Publishing
        </p>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                update(
                  "published",
                  e.target.checked
                )
              }
              className="h-5 w-5 accent-[#efff00]"
            />

            <span className="text-xs font-black uppercase tracking-[0.18em]">
              Published
            </span>
          </label>

          <div className="sm:ml-auto">
            <label className={labelClass}>
              Sort Order
            </label>

            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                update(
                  "sortOrder",
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-28 border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#efff00]"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row">
        <button
          type="submit"
          disabled={saving}
          className="flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#efff00] px-6 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:opacity-50"
        >
          {saving ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Save size={18} />
          )}

          {saving
            ? "Saving"
            : editing
              ? "Save Changes"
              : "Create Event"}
        </button>

        {editing && (
          <button
            type="button"
            disabled={deleting}
            onClick={deleteEvent}
            className="flex min-h-14 items-center justify-center gap-3 border border-red-500/30 px-6 text-xs font-black uppercase tracking-[0.18em] text-red-400 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
          >
            {deleting ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Trash2
                size={18}
              />
            )}

            Delete Event
          </button>
        )}
      </div>
    </form>
  );
}
