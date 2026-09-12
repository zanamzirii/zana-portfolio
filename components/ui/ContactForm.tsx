"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const inputBase = [
  "w-full rounded-xl border bg-elevated px-4 py-3 text-sm text-textPrimary",
  "placeholder:text-textMuted",
  "transition-all duration-200 outline-none",
  "focus:border-accent focus:ring-2 focus:ring-accent/20",
  "border-border hover:border-borderLight",
].join(" ");

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Server error");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center gap-4 min-h-[340px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="h-7 w-7 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-textPrimary">Message received.</h3>
          <p className="mt-1.5 text-sm text-textSecondary max-w-xs">
            I&rsquo;ll get back to you within 24 hours.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-textMuted hover:text-accent transition-colors mt-2 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 rounded-2xl border border-border bg-card p-8"
    >
      {/* Honeypot — hidden from real users */}
      <input
        {...register("website")}
        type="text"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0"
      />

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-textSecondary">
          Name <span className="text-accent">*</span>
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Your name"
          className={cn(inputBase, errors.name && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-textSecondary">
          Email <span className="text-accent">*</span>
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="your@email.com"
          className={cn(inputBase, errors.email && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-textSecondary">
          Subject
        </label>
        <input
          {...register("subject")}
          id="subject"
          type="text"
          placeholder="What's this about? (optional)"
          className={inputBase}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-textSecondary">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          placeholder="Tell me about your project, role, or idea..."
          className={cn(
            inputBase,
            "resize-none",
            errors.message && "border-red-500/50 focus:border-red-500 focus:ring-red-500/20",
          )}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-400">
            Something went wrong. Try emailing me directly at{" "}
            <a
              href="mailto:zanarajababdulrahman@gmail.com"
              className="underline hover:text-red-300"
            >
              zanarajababdulrahman@gmail.com
            </a>
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={status === "loading"}
        className="w-full mt-2"
      >
        {status === "loading" ? "Sending..." : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
