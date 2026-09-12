"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, ClipboardList, Globe } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

const highlightIcons: Record<string, React.ReactNode> = {
  Excellent:  <Trophy className="h-3.5 w-3.5 text-amber-400" />,
  "Very Good": <ClipboardList className="h-3.5 w-3.5 text-accent" />,
  default:    <GraduationCap className="h-3.5 w-3.5 text-textMuted" />,
};

function getIcon(text: string) {
  if (text.includes("Excellent"))  return highlightIcons["Excellent"];
  if (text.includes("Very Good"))  return highlightIcons["Very Good"];
  return highlightIcons["default"];
}

const langLevelColor: Record<string, string> = {
  "Native":                      "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Working Proficiency (B1)":    "text-accent bg-accentMuted border-accentBorder",
  "Limited Working Proficiency": "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

export function EducationSection() {
  const edu  = siteData.education[0];
  const cert = siteData.certifications[0];

  return (
    <section id="education" className="py-20 md:py-32 bg-surface">
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
            <SectionLabel>Education</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Academic Background
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ── Education Card ─────────────────────────────────────────────── */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            {/* Icon */}
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accentMuted border border-accentBorder">
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>

            <h3 className="text-xl font-bold text-textPrimary">{edu.degree}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{edu.institution}</p>
            <p className="mt-0.5 text-xs text-textMuted">{edu.period} · {edu.location}</p>

            {/* Highlights */}
            <div className="mt-6 space-y-2.5">
              {edu.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  {getIcon(h)}
                  <span className="text-sm text-textSecondary">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Languages + Certification ──────────────────────────────────── */}
          <div className="flex flex-col gap-6">

            {/* Languages */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: 0.16 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accentMuted border border-accentBorder">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-textPrimary mb-4">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {siteData.languages.map(({ language, level }) => (
                  <div
                    key={language}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium
                               ${langLevelColor[level] ?? "text-textSecondary bg-elevated border-border"}`}
                  >
                    <span className="font-semibold">{language}</span>
                    <span className="opacity-70">·</span>
                    <span>{level}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certification */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: 0.22 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                    Certification
                  </p>
                  <h3 className="text-lg font-semibold text-textPrimary">{cert.title}</h3>
                  <p className="text-sm text-textSecondary mt-1">{cert.issuer}</p>
                  <p className="text-xs text-textMuted mt-0.5">{cert.date}</p>
                </div>
                <div className="flex-shrink-0 rounded-xl border border-accentBorder bg-accentMuted px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-accent">{cert.score.split(" ")[0]}</p>
                  <p className="text-[10px] text-textMuted mt-0.5 uppercase tracking-wider">Score</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
