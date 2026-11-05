"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  QrCode,
  Smartphone,
} from "lucide-react";
import { scaleIn, smoothTransition } from "@/lib/animations";
import { SkillBadge } from "./SkillBadge";
import { Button } from "./Button";
import { ImageLightbox } from "./ImageLightbox";
import { VideoPlayerModal } from "./VideoPlayerModal";
import { QRCodeModal } from "./QRCodeModal";
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
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; index?: number } | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Device Showcase Carousel Controls
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [project.images]);

  // Smooth auto-scroll every 2.2s when not hovered or interacting
  useEffect(() => {
    if (isHovered || project.images.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 215, behavior: "smooth" });
      }
    }, 2200);

    return () => clearInterval(interval);
  }, [isHovered, project.images.length]);

  const scrollCarousel = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 260;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={cn(
          "group relative rounded-3xl border border-white/[0.08] bg-[#111114]/95",
          "overflow-hidden transition-all duration-300",
          "hover:border-white/20 shadow-2xl backdrop-blur-md",
        )}
      >
        {/* Subtle accent glow at top */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${project.color}90, transparent)`,
          }}
        />

        <div
          className={cn(
            "flex flex-col",
            reverse ? "lg:flex-row-reverse" : "lg:flex-row",
          )}
        >
          {/* Text / Specification Column */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:w-1/2 lg:p-10 xl:p-12">
            <div className="space-y-6">
              {/* Badge Row */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 border text-xs font-semibold tracking-wider uppercase"
                  style={{
                    backgroundColor: `${project.color}15`,
                    borderColor: `${project.color}45`,
                    color: project.color,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full animate-pulse"
                    style={{ backgroundColor: project.color }}
                  />
                  <span>{project.badge || "Featured Product"}</span>
                </div>

                {project.category && (
                  <span className="text-xs font-mono text-neutral-400 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                    {project.category}
                  </span>
                )}

                {project.links.appStore && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-300 px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
                    <AppleIcon className="h-3 w-3 text-neutral-300" />
                    App Store Live
                  </span>
                )}
              </div>

              {/* Title & Official App Logo */}
              <div className="flex items-center gap-4">
                {project.appLogo && (
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-black shadow-xl ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={project.appLogo}
                      alt={`${project.title} icon`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-neutral-400 font-medium">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.description}
              </p>

              {/* Verified Product Highlights */}
              <ul className="space-y-2.5 pt-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2
                      className="h-4 w-4 flex-shrink-0 mt-0.5"
                      style={{ color: project.color }}
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tech.map((t) => (
                  <SkillBadge key={t} label={t} />
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
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

              {project.qrCode && (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setQrModalOpen(true)}
                >
                  <QrCode className="h-4 w-4 text-accent" />
                  Scan Mobile QR
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

          {/* Device Showcase Column */}
          <div className="relative flex flex-col justify-between bg-gradient-to-b from-[#16161b] to-[#0c0c0f] lg:w-1/2 p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.08]">
            {/* Ambient Background Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                background: `radial-gradient(circle at center, ${project.color}35 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {/* Showcase Header Controls */}
            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
                <Smartphone className="h-3.5 w-3.5 text-accent" />
                <span>{project.images.length} Verified Production Screens</span>
              </div>

              {project.images.length > 2 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => scrollCarousel("left")}
                    disabled={!canScrollLeft}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Scroll screens left"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => scrollCarousel("right")}
                    disabled={!canScrollRight}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    aria-label="Scroll screens right"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Scrollable Screens Track */}
            <div className="relative z-10 my-auto py-5">
              {project.images.length > 0 ? (
                <div
                  ref={scrollRef}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onTouchStart={() => setIsHovered(true)}
                  onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
                  className="flex gap-4 sm:gap-5 items-center overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 px-1 scroll-smooth select-none"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {project.images.map((src, i) => (
                    <div
                      key={src}
                      onClick={() =>
                        setLightboxImg({
                          src,
                          alt: `${project.title} screenshot ${i + 1}`,
                          index: i,
                        })
                      }
                      className={cn(
                        "group/img relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
                        "transition-all duration-300 flex-shrink-0 snap-center cursor-pointer",
                        "h-[330px] sm:h-[370px] lg:h-[350px] xl:h-[390px] w-[170px] sm:w-[195px] lg:w-[185px] xl:w-[205px]",
                        "hover:-translate-y-2 hover:border-white/35 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)]",
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 240px"
                        className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        priority={i < 4}
                        loading={i < 4 ? "eager" : "lazy"}
                      />

                      {/* Screen Step Badge */}
                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="rounded-md border border-white/20 bg-black/75 px-2 py-0.5 text-[10px] font-mono text-neutral-300 backdrop-blur-sm">
                          0{i + 1}
                        </span>
                      </div>

                      {/* Hover Zoom Pill */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-xs text-white border border-white/20 backdrop-blur-sm shadow-xl">
                          <ZoomIn className="h-3.5 w-3.5" /> High-Res
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 items-center justify-center py-10">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center w-40 h-[320px]">
                    <span className="text-xs text-neutral-400">Preview In Review</span>
                  </div>
                </div>
              )}
            </div>

            {/* Showcase Footer Hint */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Click any screen for retina zoom
              </span>
              <span className="sm:hidden font-mono">Swipe ← →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal with Fast Flip & Gallery Controls */}
      {lightboxImg && (
        <ImageLightbox
          isOpen={!!lightboxImg}
          onClose={() => setLightboxImg(null)}
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          title={project.title}
          subtitle="Use arrows or swipe to flip between production screens"
          images={project.images}
          initialIndex={lightboxImg.index ?? 0}
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

      {/* QR Code Modal */}
      {project.qrCode && (
        <QRCodeModal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          qrCodeUrl={project.qrCode}
          title={`${project.title} — Mobile QR`}
          subtitle="Scan with your phone camera to test live on your mobile device."
          linkUrl={project.links.website || project.links.appStore}
        />
      )}
    </>
  );
}
