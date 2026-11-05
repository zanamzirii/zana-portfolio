"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Globe,
  Smartphone,
  Layers,
  Users,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import {
  fadeUp,
  fadeLeft,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

// ─── Scannable Executive Highlights ──────────────────────────────────────────

const capabilities = [
  {
    icon: Smartphone,
    title: "Mobile Engineering (iOS & Android)",
    desc: "Published production platforms live to the Apple App Store. Deep expertise in Flutter, Riverpod, reactive architecture, and end-to-end app store approval.",
    badge: "Apple App Store Live",
    accentColor: "border-blue-500/20 bg-blue-500/[0.04] text-blue-400",
  },
  {
    icon: Layers,
    title: "Modern Web & Cloud Systems",
    desc: "Architecting responsive, high-speed web apps and serverless backends using React, Next.js, TypeScript, and Firebase Cloud Functions.",
    badge: "Full-Stack Web",
    accentColor: "border-purple-500/20 bg-purple-500/[0.04] text-purple-400",
  },
  {
    icon: Users,
    title: "Team Leadership, QA & Operations",
    desc: "Directing technical teams, coordinating 11 field agents across 817 km² for 18,000+ operations, and enforcing automated QA testing and Git workflows.",
    badge: "18,000+ Operations",
    accentColor: "border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-400",
  },
];

const infoChips = [
  { icon: MapPin, text: "Duhok, Kurdistan Region, Iraq" },
  { icon: Globe, text: "Available for Remote & Relocation" },
];

// ─── About Section Component ─────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* ── Left Column: Executive Portrait Card ─────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="flex flex-col items-center lg:w-5/12 lg:items-start lg:sticky lg:top-28"
          >
            <div className="group relative w-full max-w-sm">
              {/* Subtle ambient glow behind card */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-accent/25 via-indigo-500/15 to-transparent opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

              {/* Main Photo Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl p-2.5 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-elevated">
                  {/* Zoomed crop to focus 100% on Zana's executive suit presence */}
                  <Image
                    src="/images/personal/zana-suit-full-body.jpg"
                    alt="Zana Rajab Abdulrahman — Mobile Engineer & Team Leader"
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                    className="object-cover scale-[1.38] origin-[50%_62%] transition-transform duration-700 group-hover:scale-[1.42]"
                  />

                  {/* Inner border vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                  {/* Badges anchored at bottom of portrait */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/75 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-white/95 border border-white/10 shadow-sm">
                      <GraduationCap className="h-3.5 w-3.5 text-accent" />
                      BSc Computer Science
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent/20 backdrop-blur-md px-2.5 py-1.5 text-xs font-semibold text-accent border border-accent/30 shadow-sm">
                      Lead Engineer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right Column: Story & Capabilities ───────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="lg:w-7/12"
          >
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel className="mb-4">About Me</SectionLabel>
            </motion.div>

            {/* Executive Headline */}
            <motion.h2
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.06 }}
              className="mb-5 text-3xl font-bold tracking-tight text-textPrimary md:text-5xl text-balance leading-tight"
            >
              Engineering high-performance mobile apps &amp; leading operations.
            </motion.h2>

            {/* High-Impact 2-Sentence Introduction */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.12 }}
              className="space-y-3 text-base text-textSecondary leading-relaxed"
            >
              <p>
                I engineer production-grade <span className="text-textPrimary font-semibold">iOS, Android, and Web applications</span> from first principles — combining rigorous software architecture with human-centric UI/UX design, end-to-end video motion production, and high-stakes operational leadership.
              </p>
              <p>
                From architecting an enterprise automotive marketplace to publishing a multi-role capstone platform live to the <span className="text-textPrimary font-semibold">Apple App Store</span>, I obsess over code quality, automated testing, and shipping software that performs in production.
              </p>
            </motion.div>

            {/* 3 Scannable Highlight Cards */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.18 }}
              className="mt-8 space-y-3.5"
            >
              {capabilities.map(({ icon: Icon, title, desc, badge, accentColor }) => (
                <div
                  key={title}
                  className={`group/card rounded-xl border p-4.5 transition-all duration-300 hover:border-white/20 bg-card/60 backdrop-blur-sm ${accentColor}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 flex-shrink-0">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="text-sm md:text-base font-semibold text-textPrimary">
                        {title}
                      </h3>
                    </div>
                    <span className="hidden sm:inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-textSecondary flex-shrink-0">
                      {badge}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-textSecondary leading-relaxed pl-10.5">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Distinction Chips */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.24 }}
              className="mt-6 flex flex-wrap gap-2.5"
            >
              {infoChips.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 backdrop-blur-sm px-3.5 py-2 shadow-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-textSecondary">
                    {text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Single Sleek CTA Button (No Clutter) */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.28 }}
              className="mt-8 flex items-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let&rsquo;s Work Together →
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
