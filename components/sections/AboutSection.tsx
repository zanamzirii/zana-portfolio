"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Download } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  fadeLeft,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

const infoChips = [
  { icon: MapPin,          text: siteData.personal.location },
  { icon: GraduationCap,  text: "BSc Computer Science — 2026" },
];

export function AboutSection() {
  const { personal, links } = siteData;

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Photo ─────────────────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="flex justify-center lg:w-2/5 lg:justify-start"
          >
            <div className="group relative w-full max-w-xs">
              {/* Accent border behind photo */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div
                className="relative overflow-hidden rounded-2xl border border-border bg-card
                           transition-transform duration-500 ease-out
                           rotate-[-2deg] group-hover:rotate-0"
              >
                {/* Photo — replace src with real image when available */}
                <div className="relative aspect-[4/5] w-full bg-elevated flex items-center justify-center">
                  {/* Fallback monogram behind photo */}
                  <div className="absolute inset-0 flex items-center justify-center z-0">
                    <span className="text-6xl font-bold text-textMuted select-none">
                      {personal.initials}
                    </span>
                  </div>
                  <Image
                    src="/images/zana.jpg"
                    alt="Zana Rajab Abdulrahman"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className="object-cover relative z-10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Text ──────────────────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="lg:w-3/5"
          >
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel className="mb-5">About Me</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.06 }}
              className="mb-6 text-3xl font-bold tracking-tight text-textPrimary md:text-5xl text-balance"
            >
              Building things since I could touch a keyboard.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.12 }}
              className="space-y-4 text-base text-textSecondary leading-relaxed"
            >
              <p>
                I&rsquo;m a Computer Science graduate from Duhok, Kurdistan. I
                started building because I wanted to solve real problems — and I
                haven&rsquo;t stopped since. My work spans mobile development,
                UI/UX design, QA engineering, and team leadership.
              </p>
              <p>
                Most recently I built{" "}
                <span className="text-textPrimary font-medium">Crown Barber</span>{" "}
                — a full Flutter &amp; Firebase app with four distinct user roles —
                and shipped it live to the Apple App Store. I handled the entire
                product lifecycle: design, code, QA, and release.
              </p>
              <p>
                I&rsquo;m looking for remote opportunities where I can keep
                building serious things with serious people. I work fast, I care
                about quality, and I don&rsquo;t stop until it&rsquo;s right.
              </p>
            </motion.div>

            {/* Info chips */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {infoChips.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5"
                >
                  <Icon className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-textSecondary">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Download CV */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.24 }}
              className="mt-8"
            >
              <Button variant="outline" size="lg" href={links.cv} external>
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
