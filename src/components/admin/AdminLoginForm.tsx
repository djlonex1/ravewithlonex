"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, LockKeyhole } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase =
      createClient();

    const {
      error: signInError,
    } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (signInError) {
      setError(
        signInError.message
      );

      setLoading(false);
      return;
    }

    router.replace(
      "/admin"
    );

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-white/45"
        >
          Admin Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="you@example.com"
          className="w-full border border-white/15 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#efff00]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-[10px] font-black uppercase tracking-[0.22em] text-white/45"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="••••••••"
          className="w-full border border-white/15 bg-white/[0.04] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#efff00]"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-14 w-full items-center justify-between bg-[#efff00] px-5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex items-center gap-3">
          <LockKeyhole
            size={17}
          />

          {loading
            ? "Signing In"
            : "Enter Dashboard"}
        </span>

        {loading ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <ArrowRight
            size={18}
          />
        )}
      </button>
    </form>
  );
}
