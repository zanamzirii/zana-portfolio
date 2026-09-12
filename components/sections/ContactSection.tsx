"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, MessageCircle, Copy, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/ui/ContactForm";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

// ─── Copy-to-clipboard hook ───────────────────────────────────────────────────

function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return { copied, copy };
}

// ─── Social links ─────────────────────────────────────────────────────────────

const socials = [
  { label: "GitHub",    href: siteData.links.github,   Icon: Github,        color: "hover:text-white"       },
  { label: "LinkedIn",  href: siteData.links.linkedin,  Icon: Linkedin,      color: "hover:text-[#0A66C2]"  },
  { label: "App Store", href: siteData.links.appStore,  Icon: ExternalLink,  color: "hover:text-accent"     },
  { label: "WhatsApp",  href: siteData.links.whatsapp,  Icon: MessageCircle, color: "hover:text-[#25D366]"  },
];

// ─── Contact Info Panel ────────────────────────────────────────────────────────

function ContactInfo() {
  const { email, phone, location, available, availabilityNote } = siteData.personal;
  const { copied, copy } = useCopyToClipboard(email);

  return (
    <motion.div
      variants={fadeLeft}
      transition={{ ...smoothTransition, delay: 0.1 }}
      className="flex flex-col gap-6"
    >
      {/* Contact rows */}
      <div className="rounded-2xl border border-border bg-card p-8 space-y-5">

        {/* Email */}
        <div className="group flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accentMuted border border-accentBorder">
            <Mail className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-textMuted mb-0.5">Email</p>
            <p className="text-sm text-textPrimary break-all">{email}</p>
          </div>
          <button
            onClick={copy}
            title="Copy email"
            className="mt-0.5 flex-shrink-0 rounded-lg p-1.5 text-textMuted hover:text-accent hover:bg-accentMuted transition-all duration-200"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accentMuted border border-accentBorder">
            <Phone className="h-4 w-4 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-textMuted mb-0.5">Phone</p>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${siteData.personal.phone.replace(/\s/g, "")}`}
                className="text-sm text-textPrimary hover:text-accent transition-colors"
              >
                {phone}
              </a>
              <a
                href={siteData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:opacity-80 transition-opacity"
              >
                <MessageCircle className="h-3 w-3" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accentMuted border border-accentBorder">
            <MapPin className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-xs text-textMuted mb-0.5">Location</p>
            <p className="text-sm text-textPrimary">{location}</p>
          </div>
        </div>
      </div>

      {/* Availability chip */}
      {available && (
        <div className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 self-start">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-sm font-medium text-emerald-400">{availabilityNote}</span>
        </div>
      )}

      {/* Social links */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-textMuted mb-4">
          Find me online
        </p>
        <div className="flex gap-3">
          {socials.map(({ label, href, Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card
                         text-textMuted transition-all duration-200 hover:border-borderLight hover:bg-elevated ${color}`}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-14"
        >
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4">
            <SectionLabel>Contact</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Let&rsquo;s Work Together
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-base text-textSecondary max-w-lg"
          >
            Have a project, a role, or just want to talk? I&rsquo;m listening.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ContactInfo />

          <motion.div
            variants={fadeRight}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={{ ...smoothTransition, delay: 0.18 }}
          >
            <ContactForm />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
