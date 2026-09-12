"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={smoothTransition}
            className="mb-4"
          >
            <SectionLabel>Experience</SectionLabel>
          </motion.div>
          <motion.h2
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Where I&rsquo;ve Been
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {siteData.experience.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              index={i}
              isLast={i === siteData.experience.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
