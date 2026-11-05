"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  CheckCircle2,
  Globe,
  Lock,
  Play,
  ZoomIn,
  Sparkles,
} from "lucide-react";
import { scaleIn, smoothTransition } from "@/lib/animations";
import { SkillBadge } from "./SkillBadge";
import { Button } from "./Button";
import { ImageLightbox } from "./ImageLightbox";
import { VideoPlayerModal } from "./VideoPlayerModal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";
import { AppleIcon } from "@/components/ui/BrandIcons";

// ─── Compact / Academic Project Card ─────────────────────────────────────────

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
        "group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-7",
        "transition-all duration-300",
        "hover:border-borderLight hover:bg-elevated/70 shadow-lg",
        "overflow-hidden",
      )}
    >
      {/* Accent glow on top */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 opacity-60"
        style={{ backgroundColor: project.color }}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-textPrimary group-hover:text-white transition-colors">
            {project.title}
          </h3>
          {project.category && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-border bg-surface text-textSecondary">
              {project.category}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-textMuted">{project.subtitle}</p>

        <p className="text-sm text-textSecondary leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2">
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-textSecondary">
              <CheckCircle2
                className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                style={{ color: project.color }}
              />
              {h}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <SkillBadge key={t} label={t} />
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          {project.links.github && project.links.github !== "#" && (
            <Button variant="ghost" size="sm" href={project.links.github} external>
              <Github className="h-3.5 w-3.5" />
              GitHub
            </Button>
          )}
          {project.links.website && project.links.website !== "#" && (
            <Button variant="ghost" size="sm" href={project.links.website} external>
              <Globe className="h-3.5 w-3.5" />
              Live Demo
            </Button>
          )}
          {project.links.appStore && project.links.appStore !== "#" && (
            <Button variant="ghost" size="sm" href={project.links.appStore} external>
              <AppleIcon className="h-3.5 w-3.5" />
              App Store
            </Button>
          )}
        </div>
        {!project.links.github && !project.links.appStore && !project.links.website && (
          <span className="inline-flex items-center gap-1.5 text-xs text-textSecondary font-medium px-2.5 py-1 rounded-md bg-elevated border border-border">
            <Lock className="h-3 w-3 text-textMuted" />
            Academic / 3D Build
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Featured Flagship Project Card ──────────────────────────────────────────

interface FeaturedProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export function FeaturedProjectCard({ project, reverse = false }: FeaturedProjectCardProps) {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "group relative rounded-3xl border border-border/80 bg-card/90",
          "overflow-hidden transition-all duration-300",
          "hover:border-borderLight shadow-2xl backdrop-blur-sm",
        )}
      >
        {/* Subtle accent glow at top */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${project.color}80, transparent)`,
          }}
        />

        <div
          className={cn(
            "flex flex-col",
            reverse ? "lg:flex-row-reverse" : "lg:flex-row",
          )}
        >
          {/* Text column */}
          <div className="flex flex-col justify-between p-7 sm:p-9 lg:w-1/2 lg:p-12">
            <div className="space-y-5">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border text-xs font-semibold tracking-wider uppercase"
                  style={{
                    backgroundColor: `${project.color}15`,
                    borderColor: `${project.color}40`,
                    color: project.color,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: project.color }}
                  />
                  <span>{project.badge || "Featured Product"}</span>
                </div>

                {project.category && (
                  <span className="text-xs font-mono text-textMuted px-2.5 py-0.5 rounded-full border border-border bg-surface">
                    {project.category}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-3xl font-bold text-textPrimary tracking-tight sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-base text-textSecondary font-medium">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-sm text-textSecondary leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-2.5 pt-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-textSecondary">
                    <CheckCircle2
                      className="h-4 w-4 flex-shrink-0 mt-0.5"
                      style={{ color: project.color }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t) => (
                  <SkillBadge key={t} label={t} />
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-border/70">
              {project.links.website && project.links.website !== "#" && (
                <Button
                  variant="primary"
                  size="md"
                  href={project.links.website}
                  external
                >
                  <Globe className="h-4 w-4" />
                  {project.id === "crown-barber" ? "Official Website" : "Live Web App"}
                </Button>
              )}

              {project.links.appStore && project.links.appStore !== "#" && (
                <Button
                  variant="outline"
                  size="md"
                  href={project.links.appStore}
                  external
                >
                  <AppleIcon className="h-4 w-4" />
                  App Store
                </Button>
              )}

              {project.video && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <Play className="h-4 w-4 text-accent fill-accent/20" />
                  Watch Video Demo
                </Button>
              )}

              {project.links.github && project.links.github !== "#" && (
                <Button
                  variant="outline"
                  size="md"
                  href={project.links.github}
                  external
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              )}
            </div>
          </div>

          {/* Mockups / Media Column */}
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-surface/80 to-background/90 lg:w-1/2 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border/60">
            {/* Ambient background glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at center, ${project.color}25 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 w-full">
              {project.images.length > 0 ? (
                <div className="flex gap-3 sm:gap-4 items-end justify-start sm:justify-center overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2 w-full">
                  {project.images.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setLightboxImg({
                          src,
                          alt: `${project.title} screenshot ${i + 1}`,
                        })
                      }
                      className={cn(
                        "group/img relative overflow-hidden rounded-2xl border border-border/80 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
                        "transition-all duration-500 flex-shrink-0 snap-center cursor-pointer",
                        i === 1
                          ? "w-40 sm:w-44 lg:w-44 xl:w-48 h-[320px] sm:h-[370px] lg:h-[345px] xl:h-[400px] z-10 border-borderLight shadow-2xl hover:-translate-y-3"
                          : "w-36 sm:w-40 lg:w-36 xl:w-40 h-[290px] sm:h-[330px] lg:h-[310px] xl:h-[360px] opacity-90 hover:opacity-100 hover:-translate-y-2",
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                      />
                      {/* Hover zoom pill */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white border border-white/20 backdrop-blur-sm">
                          <ZoomIn className="h-3.5 w-3.5" /> Zoom
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 items-end justify-center py-10">
                  <div className="rounded-2xl border border-border bg-elevated flex items-center justify-center w-40 h-[320px]">
                    <span className="text-xs text-textMuted">Preview In Review</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between w-full px-2 text-[11px] text-textMuted">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-accent" /> Click any screen to expand
              </span>
              <span className="sm:hidden">Swipe ← →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <ImageLightbox
          isOpen={!!lightboxImg}
          onClose={() => setLightboxImg(null)}
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          title={project.title}
          subtitle="Click anywhere outside or press Esc to close"
        />
      )}

      {/* Video Modal */}
      {project.video && (
        <VideoPlayerModal
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          videoUrl={project.video}
          title={`${project.title} — Video Demo`}
          subtitle={project.subtitle}
        />
      )}
    </>
  );
}
