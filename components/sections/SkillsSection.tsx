"use client";

import { motion } from "framer-motion";
import {
  Smartphone, PenTool, ShieldCheck, Code2, Users,
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
  "smartphone":    Smartphone,
  "pen-tool":      PenTool,
  "shield-check":  ShieldCheck,
  "code-2":        Code2,
  "users":         Users,
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
            <SectionLabel>Skills &amp; Tools</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            What I Bring to the Table
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {siteData.skills.map((category, i) => {
            const Icon = iconMap[category.icon] ?? Code2;
            return (
              <motion.div
                key={category.category}
                variants={scaleIn}
                transition={{ ...smoothTransition, delay: i * 0.08 }}
                className={`group rounded-2xl border border-border bg-card p-6
                           transition-all duration-300
                           hover:border-accentBorder hover:bg-elevated
                           ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              >
                {/* Icon + Title */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accentMuted border border-accentBorder">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold text-textPrimary group-hover:text-white transition-colors">
                    {category.category}
                  </h3>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <SkillBadge key={item} label={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
