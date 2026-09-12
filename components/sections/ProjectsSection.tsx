"use client";

import { motion } from "framer-motion";
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
  const featured  = siteData.projects.find((p) => p.featured)!;
  const others    = siteData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32">
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
            <SectionLabel>Projects</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Things I&rsquo;ve Built
          </motion.h2>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...smoothTransition, delay: 0.1 }}
          className="mb-8"
        >
          <FeaturedProjectCard project={featured} />
        </motion.div>

        {/* Other projects grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
