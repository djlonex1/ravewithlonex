"use client";

import {
  Check,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";

type Props = {
  label: string;
  value: string;
  folder: string;
  onChange: (
    url: string
  ) => void;
};

export default function AdminImageUpload({
  label,
  value,
  folder,
  onChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  async function handleFile(
    file: File
  ) {
    setUploading(true);
    setError("");
    setSuccess(false);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    formData.append(
      "folder",
      folder
    );

    try {
      const response =
        await fetch(
          "/api/admin/upload",
          {
            method:
              "POST",
            body:
              formData,
          }
        );

      const result =
        await response.json();

      if (
        !response.ok
      ) {
        setError(
          result.error ||
            "Upload failed."
        );

        setUploading(
          false
        );

        return;
      }

      onChange(
        result.url
      );

      setSuccess(true);
    } catch {
      setError(
        "Unable to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>

      {value && (
        <div className="relative mb-4 overflow-hidden border border-white/10 bg-[#090909]">
          <img
            src={value}
            alt={label}
            className="h-56 w-full object-contain bg-[#090909] p-2"
          />

          <button
            type="button"
            onClick={() =>
              onChange("")
            }
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-black/80 text-white transition hover:bg-red-500"
            aria-label={`Remove ${label}`}
          >
            <Trash2
              size={16}
            />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(
          event
        ) => {
          const file =
            event.target
              .files?.[0];

          if (file) {
            handleFile(
              file
            );
          }

          event.target.value =
            "";
        }}
      />

      <button
        type="button"
        disabled={
          uploading
        }
        onClick={() =>
          inputRef.current?.click()
        }
        className="flex min-h-12 w-full items-center justify-center gap-3 border border-white/15 bg-white/[0.03] px-5 text-[10px] font-black uppercase tracking-[0.18em] transition hover:border-[#efff00] hover:text-[#efff00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />

            Uploading...
          </>
        ) : success ? (
          <>
            <Check
              size={16}
            />

            Uploaded
          </>
        ) : (
          <>
            <ImagePlus
              size={16}
            />

            {value
              ? "Replace Image"
              : "Choose Image"}
          </>
        )}
      </button>

      <p className="mt-2 text-[10px] text-white/25">
        JPG, PNG, WebP or
        AVIF • Maximum 8MB
      </p>

      {error && (
        <p className="mt-3 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
