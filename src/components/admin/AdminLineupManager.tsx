"use client";

import {
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AdminImageUpload from "@/components/admin/AdminImageUpload";

type Member = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  instagram_url: string | null;
  sort_order: number;
};

type Props = {
  eventId: string;
  eventSlug: string;
  initialMembers: Member[];
};

export default function AdminLineupManager({
  eventId,
  eventSlug,
  initialMembers,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  async function addMember() {
    if (!name.trim() || !role.trim()) return;

    setAdding(true);
    setError("");

    const response = await fetch(
      `/api/admin/events/${eventId}/lineup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          role,
          imageUrl,
          instagramUrl,
          sortOrder: initialMembers.length + 1,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.error ||
          "Unable to add lineup member."
      );

      setAdding(false);
      return;
    }

    setName("");
    setRole("");
    setImageUrl("");
    setInstagramUrl("");
    setAdding(false);

    router.refresh();
  }

  return (
    <section className="border border-white/10 bg-black p-5 md:p-8">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#efff00]">
        Lineup
      </p>

      <h2 className="mt-2 font-display text-5xl">
        WHO&apos;S ON THE NIGHT.
      </h2>

      <div className="mt-8 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-2">
        <AdminImageUpload
          label="New Member Profile Image"
          value={imageUrl}
          folder={`lineup/${eventSlug}`}
          onChange={setImageUrl}
        />

        <div className="space-y-4">
          <Field
            label="Name"
            value={name}
            onChange={setName}
            placeholder="DJ LONEX"
          />

          <Field
            label="Role"
            value={role}
            onChange={setRole}
            placeholder="HOST / DJ"
          />

          <Field
            label="Instagram URL"
            value={instagramUrl}
            onChange={setInstagramUrl}
            placeholder="https://instagram.com/..."
          />

          <button
            type="button"
            onClick={addMember}
            disabled={
              adding ||
              !name.trim() ||
              !role.trim()
            }
            className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#efff00] px-5 text-[10px] font-black uppercase tracking-[0.18em] text-black disabled:opacity-40"
          >
            {adding ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Plus size={16} />
            )}

            Add To Lineup
          </button>

          {error && (
            <p className="text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {initialMembers.map((member) => (
          <MemberEditor
            key={member.id}
            member={member}
            eventSlug={eventSlug}
          />
        ))}
      </div>
    </section>
  );
}

function MemberEditor({
  member,
  eventSlug,
}: {
  member: Member;
  eventSlug: string;
}) {
  const router = useRouter();

  const [name, setName] =
    useState(member.name);

  const [role, setRole] =
    useState(member.role);

  const [imageUrl, setImageUrl] =
    useState(member.image_url || "");

  const [instagramUrl, setInstagramUrl] =
    useState(member.instagram_url || "");

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [status, setStatus] =
    useState("");

  async function saveMember(
    nextImageUrl = imageUrl
  ) {
    setSaving(true);
    setStatus("");

    try {
      const response = await fetch(
        `/api/admin/lineup/${member.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            role,
            imageUrl: nextImageUrl,
            instagramUrl,
            sortOrder: member.sort_order,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        setStatus(
          `❌ ${result.error || "Save failed"}`
        );

        setSaving(false);
        return;
      }

      setStatus("✅ SAVED");

      router.refresh();
    } catch {
      setStatus("❌ SAVE FAILED");
    }

    setSaving(false);
  }

  async function imageChanged(
    url: string
  ) {
    setImageUrl(url);

    if (!url) {
      await saveMember("");
      return;
    }

    setStatus(
      "Uploading complete — saving..."
    );

    await saveMember(url);
  }

  async function removeMember() {
    if (
      !window.confirm(
        `Remove ${name} from the lineup?`
      )
    ) {
      return;
    }

    setDeleting(true);

    const response = await fetch(
      `/api/admin/lineup/${member.id}`,
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
    <div className="grid gap-6 border border-white/10 bg-white/[0.02] p-5 lg:grid-cols-[280px_1fr]">
      <div>
        <AdminImageUpload
          label={`${name} Profile Image`}
          value={imageUrl}
          folder={`lineup/${eventSlug}`}
          onChange={imageChanged}
        />

        {status && (
          <p className="mt-3 text-xs font-bold text-[#efff00]">
            {status}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            value={name}
            onChange={setName}
          />

          <Field
            label="Role"
            value={role}
            onChange={setRole}
          />
        </div>

        <Field
          label="Instagram URL"
          value={instagramUrl}
          onChange={setInstagramUrl}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              saveMember()
            }
            disabled={saving}
            className="flex min-h-12 items-center justify-center gap-2 bg-[#efff00] px-4 text-[9px] font-black uppercase tracking-[0.18em] text-black"
          >
            {saving ? (
              <Loader2
                size={15}
                className="animate-spin"
              />
            ) : (
              <Save size={15} />
            )}

            Save Member
          </button>

          <button
            type="button"
            onClick={removeMember}
            disabled={deleting}
            className="flex min-h-12 items-center justify-center gap-2 border border-red-500/30 px-4 text-[9px] font-black uppercase tracking-[0.18em] text-red-400"
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-white/35">
        {label}
      </label>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#efff00]"
      />
    </div>
  );
}
