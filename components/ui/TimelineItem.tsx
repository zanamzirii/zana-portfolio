"use client";

import { motion } from "framer-motion";
import { fadeLeft, smoothTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ExperienceType = "full-time" | "founder" | "freelance" | "internship";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  location: string;
  type: ExperienceType;
  description: string[];
  isLast?: boolean;
  index: number;
}

const typeBadge: Record<ExperienceType, { label: string; classes: string }> = {
  "full-time":  { label: "Full-time",  classes: "bg-blue-500/10 text-blue-400 border-blue-500/20"   },
  founder:      { label: "Founder",    classes: "bg-accent/10 text-accent border-accentBorder"       },
  freelance:    { label: "Freelance",  classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  internship:   { label: "Internship", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export function TimelineItem({
  title,
  company,
  period,
  location,
  type,
  description,
  isLast = false,
  index,
}: TimelineItemProps) {
  const badge = typeBadge[type];

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeLeft}
      transition={{ ...smoothTransition, delay: index * 0.08 }}
      className="relative flex gap-6 pb-12"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
      )}

      {/* Dot */}
      <div className="relative z-10 mt-1 flex-shrink-0">
        <div
          className={cn(
            "h-4 w-4 rounded-full border-2",
            type === "founder"
              ? "border-accent bg-accentMuted animate-pulse-slow"
              : "border-border bg-elevated",
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-textPrimary">{title}</h3>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
              badge.classes,
            )}
          >
            {badge.label}
          </span>
        </div>

        <p className="text-sm font-medium text-accent mb-0.5">{company}</p>

        <p className="text-xs text-textMuted mb-4">
          {period} · {location}
        </p>

        <ul className="space-y-2">
          {description.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-textSecondary leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/50" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
