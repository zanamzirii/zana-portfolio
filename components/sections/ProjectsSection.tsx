"use client";

import { motion } from "framer-motion";
import { Code2, ArrowDownRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeaturedProjectCard, ProjectCard } from "@/components/ui/ProjectCard";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

export function ProjectsSection() {
  const featuredProjects = siteData.projects.filter((p) => p.featured);
  const otherProjects = siteData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-14"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel>Software Engineering &amp; Code</SectionLabel>
            </motion.div>

            {/* Cross-Link Pill to Creative Studio */}
            <motion.div variants={fadeUp} transition={{ ...smoothTransition, delay: 0.1 }}>
              <a
                href="#creative"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("creative");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-200 shadow-sm group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>UI/UX &amp; Marketing Decks?</span>
                <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Creative Studio <ArrowDownRight className="h-3 w-3" />
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.04 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-[11px] font-mono font-medium text-blue-300 mb-3"
          >
            <Code2 className="h-3 w-3 text-blue-400" />
            <span>PRODUCTION CODE · CLEAN ARCHITECTURE · MULTI-ROLE BACKENDS</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Shipped Products &amp; Enterprise Platforms
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-base text-textSecondary max-w-2xl leading-relaxed"
          >
            Production software engineered with Flutter, Dart, Riverpod, Next.js, and Firebase. Built from scratch with clean architectural separation, strict security, and live on the App Store and Web.
          </motion.p>
        </motion.div>

        {/* Featured Flagship Projects Stack */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: idx * 0.1 }}
            >
              <FeaturedProjectCard
                project={project}
                reverse={idx % 2 === 1}
              />
            </motion.div>
          ))}
        </div>

        {/* Academic & 3D Projects Sub-heading */}
        {otherProjects.length > 0 && (
          <div className="pt-8 border-t border-border/80">
            <h3 className="text-xl font-bold text-textPrimary mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Academic Research &amp; 3D Game Builds
            </h3>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportOnce}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {otherProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </div>
        )}

      </div>
    </section>
  );
}
