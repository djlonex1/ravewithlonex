"use client";

import {
  ArrowRight,
  X,
} from "lucide-react";

import { useState } from "react";

import type { PublicAnnouncement } from "@/lib/announcements-db";

export default function AnnouncementBanner({
  announcement,
}: {
  announcement: PublicAnnouncement;
}) {
  const [visible, setVisible] =
    useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="relative z-40 mt-20 border-b border-black/10 bg-[#efff00] text-black">
      <div className="mx-auto flex min-h-12 max-w-[1500px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <div className="flex min-w-0 items-center gap-4">
          <span className="hidden h-2 w-2 shrink-0 animate-pulse rounded-full bg-black sm:block" />

          <p className="text-[10px] font-black uppercase tracking-[0.17em] sm:text-xs sm:tracking-[0.22em]">
            {announcement.message}
          </p>

          {announcement.href &&
            announcement.cta && (
              <a
                href={announcement.href}
                className="hidden shrink-0 items-center gap-2 border-b border-black pb-1 text-[10px] font-black uppercase tracking-[0.18em] md:flex"
              >
                {announcement.cta}

                <ArrowRight size={13} />
              </a>
            )}
        </div>

        <button
          type="button"
          onClick={() =>
            setVisible(false)
          }
          aria-label="Close announcement"
          className="shrink-0 transition hover:rotate-90"
        >
          <X size={18} />
        </button>
      </div>

      {announcement.href &&
        announcement.cta && (
          <a
            href={announcement.href}
            className="flex items-center justify-center gap-2 border-t border-black/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] md:hidden"
          >
            {announcement.cta}

            <ArrowRight size={13} />
          </a>
        )}
    </div>
  );
}
