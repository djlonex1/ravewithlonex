"use client";

import {
  Film,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AdminImageUpload from "@/components/admin/AdminImageUpload";

type MediaItem = {
  id: string;
  media_type: "image" | "video";
  media_url: string;
  alt_text: string | null;
  sort_order: number;
};

type Props = {
  eventId: string;
  eventSlug: string;
  initialMedia: MediaItem[];
};

export default function AdminMediaManager({
  eventId,
  eventSlug,
  initialMedia,
}: Props) {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function addMedia(
    mediaType: "image" | "video",
    mediaUrl: string
  ) {
    if (!mediaUrl) return;

    setAdding(true);
    setError("");

    const response = await fetch(
      `/api/admin/events/${eventId}/media`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaType,
          mediaUrl,
          altText:
            mediaType === "image"
              ? caption
              : "Event aftermovie",
          sortOrder: initialMedia.length + 1,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to add media.");
      setAdding(false);
      return;
    }

    setImageUrl("");
    setCaption("");
    setVideoUrl("");
    setAdding(false);

    router.refresh();
  }

  return (
    <section className="border border-white/10 bg-black p-5 md:p-8">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
        Event Media
      </p>

      <h2 className="mt-2 font-display text-5xl">
        GALLERY & AFTERMOVIES.
      </h2>

      <div className="mt-8 grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-2">
        <div>
          <AdminImageUpload
            label="Gallery Photo"
            value={imageUrl}
            folder={`gallery/${eventSlug}`}
            onChange={setImageUrl}
          />

          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Photo caption"
            className="mt-4 w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#efff00]"
          />

          <button
            type="button"
            disabled={!imageUrl || adding}
            onClick={() => addMedia("image", imageUrl)}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 bg-[#efff00] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-black disabled:opacity-40"
          >
            {adding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ImagePlus size={16} />
            )}

            Add To Gallery
          </button>
        </div>

        <div>
          <div className="flex h-56 items-center justify-center border border-white/10 bg-white/[0.02]">
            <Film size={42} className="text-white/15" />
          </div>

          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Direct video URL"
            className="mt-4 w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#efff00]"
          />

          <button
            type="button"
            disabled={!videoUrl || adding}
            onClick={() => addMedia("video", videoUrl)}
            className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 border border-[#efff00] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-[#efff00] disabled:opacity-40"
          >
            <Plus size={16} />
            Add Aftermovie
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-5 text-xs text-red-400">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {initialMedia.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {initialMedia.length === 0 && (
        <p className="mt-8 text-sm text-white/30">
          No gallery media yet.
        </p>
      )}
    </section>
  );
}

function MediaCard({
  item,
}: {
  item: MediaItem;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function remove() {
    if (!window.confirm("Remove this media item?")) {
      return;
    }

    setDeleting(true);

    const response = await fetch(
      `/api/admin/media/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <div className="overflow-hidden border border-white/10 bg-white/[0.02]">
      <div className="h-52 bg-[#080808]">
        {item.media_type === "image" ? (
          <img
            src={item.media_url}
            alt={item.alt_text || "Event gallery"}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={item.media_url}
            controls
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-4 p-4">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#efff00]">
            {item.media_type}
          </p>

          {item.alt_text && (
            <p className="mt-1 text-xs text-white/40">
              {item.alt_text}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={remove}
          disabled={deleting}
          className="flex h-10 w-10 items-center justify-center border border-red-500/30 text-red-400"
        >
          {deleting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </div>
  );
}
