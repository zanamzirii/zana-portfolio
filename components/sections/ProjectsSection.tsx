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
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4">
            <SectionLabel>Production Software</SectionLabel>
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
            className="mt-3 text-base text-textSecondary max-w-2xl"
          >
            Real systems in the hands of real users: automotive marketplaces, booking ecosystems, and live commercial dining platforms.
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
