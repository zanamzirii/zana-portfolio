"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle2, Globe, Lock } from "lucide-react";
import { scaleIn, smoothTransition } from "@/lib/animations";
import { SkillBadge } from "./SkillBadge";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      transition={{ ...smoothTransition, delay: index * 0.08 }}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-6",
        "transition-all duration-300",
        "hover:border-borderLight hover:bg-elevated",
        "overflow-hidden",
      )}
    >
      {/* Left accent bar using project color */}
      <div
        className="absolute left-0 top-0 h-full w-0.5 rounded-l-2xl opacity-60"
        style={{ backgroundColor: project.color }}
      />

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-textMuted">{project.subtitle}</p>
        </div>

        <p className="text-sm text-textSecondary leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-textSecondary">
              <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: project.color }} />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <SkillBadge key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          {project.links.github && project.links.github !== "#" && (
            <Button variant="ghost" size="sm" href={project.links.github} external>
              <Github className="h-3.5 w-3.5" />
              GitHub
            </Button>
          )}
          {project.links.appStore && project.links.appStore !== "#" && (
            <Button variant="ghost" size="sm" href={project.links.appStore} external>
              <ExternalLink className="h-3.5 w-3.5" />
              App Store
            </Button>
          )}
        </div>
        {!project.links.github && !project.links.appStore && (
          <span className="inline-flex items-center gap-1.5 text-xs text-textSecondary font-medium px-2.5 py-1 rounded-md bg-elevated border border-border">
            <Lock className="h-3 w-3 text-textMuted" />
            Private / Academic Build
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Featured project card (Crown Barber) ────────────────────────────────────

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-card",
        "overflow-hidden transition-all duration-300",
        "hover:border-borderLight",
      )}
    >
      {/* Subtle accent glow at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="flex flex-col lg:flex-row">
        {/* Text column */}
        <div className="flex flex-col justify-between p-8 lg:w-1/2 lg:p-10">
          <div className="space-y-5">
            {/* Featured chip */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-accentBorder bg-accentMuted px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-semibold text-accent tracking-widest uppercase">
                Featured Project
              </span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-textPrimary tracking-tight md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-1 text-base text-textSecondary">{project.subtitle}</p>
            </div>

            <p className="text-sm text-textSecondary leading-relaxed">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-textSecondary">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-accent" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.tech.map((t) => (
                <SkillBadge key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.links.appStore && (
              <Button
                variant="primary"
                size="lg"
                href={project.links.appStore}
                external={project.links.appStore !== "#"}
              >
                <ExternalLink className="h-4 w-4" />
                View on App Store
              </Button>
            )}
            {project.links.website && (
              <Button
                variant="outline"
                size="lg"
                href={project.links.website}
                external={project.links.website !== "#"}
              >
                <Globe className="h-4 w-4" />
                Live Web App
              </Button>
            )}
            {project.links.github && (
              <Button
                variant="outline"
                size="lg"
                href={project.links.github}
                external={project.links.github !== "#"}
              >
                <Github className="h-4 w-4" />
                View GitHub
              </Button>
            )}
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-elevated/70 px-3 py-2 text-xs text-textSecondary">
              <Lock className="h-3 w-3 text-accent" />
              <span>Private Commercial Project</span>
            </div>
          </div>
        </div>

        {/* Mockup images column */}
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-surface to-background lg:w-1/2 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border/60">
          {/* Subtle radial ambient glow behind mockups */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(circle at center, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full">
            {project.images.length > 0 ? (
              <div className="flex gap-3 sm:gap-4 items-end justify-start sm:justify-center overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2 w-full">
                {project.images.map((src, i) => (
                  <div
                    key={i}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border border-border/80 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
                      "transition-all duration-500 flex-shrink-0 snap-center",
                      i === 0 && "w-36 sm:w-40 lg:w-36 xl:w-44 h-[290px] sm:h-[330px] lg:h-[300px] xl:h-[370px] hover:-translate-y-2 opacity-90 hover:opacity-100",
                      i === 1 && "w-40 sm:w-44 lg:w-40 xl:w-48 h-[320px] sm:h-[370px] lg:h-[335px] xl:h-[410px] hover:-translate-y-3 z-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-borderLight",
                      i === 2 && "w-36 sm:w-40 lg:w-36 xl:w-44 h-[290px] sm:h-[330px] lg:h-[300px] xl:h-[370px] hover:-translate-y-2 opacity-90 hover:opacity-100",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screen ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Placeholder when images aren't provided yet */
              <div className="flex gap-4 items-end justify-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl border border-border bg-elevated flex items-center justify-center",
                      i === 1 ? "w-40 h-[320px]" : "w-36 h-[290px]",
                    )}
                  >
                    <span className="text-xs text-textMuted">Screenshot {i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-textMuted flex items-center gap-1 sm:hidden">
            <span>←</span> Swipe to preview all screens <span>→</span>
          </p>
        </div>
      </div>
    </div>
  );
}
