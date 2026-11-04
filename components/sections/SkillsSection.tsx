"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Rocket,
  PenTool,
  Film,
  ShieldCheck,
  Code2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { siteData } from "@/lib/data";
import {
  scaleIn,
  staggerContainer,
  fadeUp,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  server: Server,
  rocket: Rocket,
  "pen-tool": PenTool,
  film: Film,
  "shield-check": ShieldCheck,
  "code-2": Code2,
  users: Users,
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4 flex justify-center">
            <SectionLabel>Cross-Functional Stack</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Engineering, Design &amp; Leadership Mastery
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-base text-textSecondary max-w-xl mx-auto"
          >
            A cohesive skill ecosystem: writing scalable code, architecting backends, designing high-converting UI/UX, and leading field operations.
          </motion.p>
        </motion.div>

        {/* 6-Category Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {siteData.skills.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <motion.div
                key={category.category}
                variants={scaleIn}
                transition={{ ...smoothTransition, delay: i * 0.06 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-accentBorder hover:bg-elevated/70 shadow-lg hover:-translate-y-1"
              >
                {/* Accent top line */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent group-hover:via-accent/80 transition-all" />

                <div>
                  {/* Icon + Title */}
                  <div className="mb-5 flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accentMuted border border-accentBorder/60 group-hover:border-accent transition-colors">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-textPrimary group-hover:text-white transition-colors">
                        {category.category}
                      </h3>
                      <span className="text-[11px] font-mono text-textMuted">
                        {category.items.length} core competencies
                      </span>
                    </div>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <SkillBadge key={item} label={item} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
