"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

type Status =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function InquiryForm() {
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

    const data =
      new FormData(form);

    const payload = {
      inquiryType:
        data.get("inquiryType"),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      website: data.get("website"),
    };

    try {
      const response =
        await fetch("/api/inquiry", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to send enquiry."
        );
      }

      setStatus("success");

      setMessage(
        "Your enquiry has been received. The Ravewithlonex team will get back to you."
      );

      form.reset();
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[#efff00]/40 bg-[#efff00]/5 p-8 md:p-12">
        <CheckCircle2
          size={42}
          className="text-[#efff00]"
        />

        <h3 className="mt-6 font-display text-5xl">
          MESSAGE RECEIVED.
        </h3>

        <p className="mt-4 max-w-xl text-white/50">
          {message}
        </p>

        <button
          onClick={() =>
            setStatus("idle")
          }
          className="mt-8 border-b border-[#efff00] pb-2 text-xs font-black uppercase tracking-[0.2em] text-[#efff00]"
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-x-5 md:grid-cols-2"
    >
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="md:col-span-2">
        <select
          required
          name="inquiryType"
          defaultValue=""
          className="w-full border-b border-white/20 bg-black py-5 text-sm font-bold uppercase outline-none focus:border-[#efff00]"
        >
          <option
            value=""
            disabled
          >
            SELECT ENQUIRY TYPE
          </option>

          <option value="partnership">
            Partnership / Sponsorship
          </option>

          <option value="booking">
            DJ Lonex Booking
          </option>

          <option value="general">
            General Enquiry
          </option>
        </select>
      </div>

      <input
        required
        name="name"
        maxLength={100}
        placeholder="YOUR NAME"
        className="border-b border-white/20 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-white/30 focus:border-[#efff00]"
      />

      <input
        required
        type="email"
        name="email"
        placeholder="EMAIL ADDRESS"
        className="border-b border-white/20 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-white/30 focus:border-[#efff00]"
      />

      <input
        type="tel"
        name="phone"
        placeholder="PHONE / WHATSAPP"
        className="border-b border-white/20 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-white/30 focus:border-[#efff00] md:col-span-2"
      />

      <textarea
        required
        name="message"
        minLength={5}
        maxLength={2000}
        rows={5}
        placeholder="TELL US WHAT YOU HAVE IN MIND..."
        className="resize-none border-b border-white/20 bg-transparent py-5 text-sm font-bold outline-none placeholder:text-white/30 focus:border-[#efff00] md:col-span-2"
      />

      {status === "error" && (
        <p className="mt-5 text-sm text-[#efff00] md:col-span-2">
          {message}
        </p>
      )}

      <button
        disabled={status === "loading"}
        className="rave-button mt-8 flex items-center justify-between bg-[#efff00] px-7 py-5 text-xs font-black uppercase tracking-[0.2em] text-black disabled:opacity-50 md:col-span-2"
      >
        <span className="relative z-10">
          {status === "loading"
            ? "Sending..."
            : "Send Enquiry"}
        </span>

        {status === "loading" ? (
          <LoaderCircle
            size={18}
            className="relative z-10 animate-spin"
          />
        ) : (
          <ArrowUpRight
            size={18}
            className="relative z-10"
          />
        )}
      </button>
    </form>
  );
}
