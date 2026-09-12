"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCounter } from "@/components/ui/StatCounter";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

export function StatsSection() {
  return (
    <section id="stats" className="py-20 md:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4 flex justify-center">
            <SectionLabel>By the Numbers</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Leading at Scale
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mx-auto mt-4 max-w-lg text-base text-textSecondary"
          >
            In 2026, I led a 2-phase field campaign across the Sarsink district —
            here&rsquo;s what we achieved.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: i * 0.1 }}
              className="relative text-center"
            >
              {/* Divider between items (desktop) */}
              {i < siteData.stats.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border lg:block" />
              )}

              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>

        {/* Context note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ ...smoothTransition, delay: 0.5 }}
          className="mt-12 text-center text-xs text-textMuted"
        >
          Runaki KYC Campaign · KRG Electricity Distribution · Sarsink, Duhok · Phase 1 &amp; Phase 2
        </motion.p>

      </div>
    </section>
  );
}
