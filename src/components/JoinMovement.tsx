"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import CommunityLinks from "@/components/CommunityLinks";

type Status =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function JoinMovement() {
  const [status, setStatus] =
    useState<Status>("idle");

  const [message, setMessage] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;

    const formData =
      new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      whatsapp: formData.get("whatsapp"),
      city: formData.get("city"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch(
        "/api/join",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to submit."
        );
      }

      setStatus("success");

      if (data.alreadyJoined) {
        setMessage(
          "You're already part of the movement."
        );
      } else {
        setMessage(
          "You're officially on the list."
        );

        form.reset();
      }
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  return (
    <section
      id="join"
      className="relative overflow-hidden bg-[#efff00] px-5 py-24 text-black md:px-10 md:py-36"
    >
      <div className="absolute right-[-10%] top-[-25%] font-display text-[35vw] leading-none text-black/[0.04]">
        RAVE
      </div>

      <div className="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-xs font-black uppercase tracking-[0.3em]">
            Don&apos;t Hear About It Late
          </p>

          <h2 className="font-display text-7xl leading-[0.85] sm:text-8xl lg:text-[9rem]">
            JOIN THE
            <br />
            MOVEMENT.
          </h2>

          <p className="mt-7 max-w-lg text-base font-medium leading-relaxed text-black/65">
            Get early ticket access,
            location drops, lineup
            announcements and private
            Ravewithlonex updates before
            everybody else.
          </p>
        </div>

        <div className="flex items-end">
          {status === "success" ? (
            <div className="w-full border-y border-black/25 py-12">
              <CheckCircle2
                size={38}
                className="mb-5"
              />

              <p className="font-display text-5xl">
                YOU&apos;RE ON THE LIST.
              </p>

              <p className="mt-3 text-black/60">
                {message}
              </p>

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="mt-7 border-b border-black pb-1 text-xs font-black uppercase tracking-[0.2em]"
              >
                Add Another Person
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full"
            >
              {/* Spam trap */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <input
                required
                type="text"
                name="name"
                maxLength={100}
                placeholder="YOUR NAME"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                required
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                type="tel"
                name="whatsapp"
                maxLength={40}
                placeholder="WHATSAPP NUMBER"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              <input
                type="text"
                name="city"
                maxLength={100}
                placeholder="CITY"
                className="w-full border-b border-black/30 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-black/45 focus:border-black"
              />

              {status === "error" && (
                <p className="mt-4 text-sm font-bold">
                  {message}
                </p>
              )}

              <button
                disabled={status === "loading"}
                type="submit"
                className="mt-8 flex w-full items-center justify-between bg-black px-6 py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading"
                  ? "Joining..."
                  : "Join The Movement"}

                {status === "loading" ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>
          )}
        </div>
      </div>
          <div className="mx-auto mt-10 max-w-[1500px]">
        <CommunityLinks />
      </div>

</section>
  );
}
