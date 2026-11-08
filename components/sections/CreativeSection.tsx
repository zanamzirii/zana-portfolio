"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Play,
  Figma,
  Instagram,
  Layers,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  ArrowUpRight,
  Palette,
  Code2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { VideoPlayerModal } from "@/components/ui/VideoPlayerModal";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { CreativeItem, BrandProfile } from "@/lib/types";

// ─── Individual Creative Card with Auto-Slide & Touch ─────────────────────────

interface CreativeCardProps {
  item: CreativeItem;
  onOpenLightbox: (
    src: string,
    alt: string,
    title?: string,
    images?: string[],
    initialIndex?: number,
  ) => void;
  onOpenVideo: (url: string, title: string, subtitle?: string) => void;
}

function CreativeCard({ item, onOpenLightbox, onOpenVideo }: CreativeCardProps) {
  const slides = item.images && item.images.length > 0 ? item.images : [item.thumbnail];
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance slides every 2.5s if multiple slides exist and not hovered
  useEffect(() => {
    if (isHovered || slides.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      touchStartX.current = null;
    }
    setTimeout(() => setIsHovered(false), 2000);
  };

  const currentImgSrc = slides[slideIndex] || item.thumbnail;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28 }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#111115]/95",
        "overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-[#15151a] shadow-xl hover:shadow-2xl",
      )}
    >
      {/* ── Media Showcase Box ─────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[16/10] w-full overflow-hidden bg-black/90 border-b border-white/[0.08] cursor-pointer select-none"
        onClick={() => {
          if (item.type === "video" && item.videoUrl) {
            onOpenVideo(item.videoUrl, item.title, item.subtitle);
          } else {
            onOpenLightbox(
              currentImgSrc,
              item.title,
              item.title,
              slides,
              slideIndex,
            );
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgSrc}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImgSrc}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Preload all slides in this card to prevent blank frames during transitions */}
        <div className="hidden" aria-hidden="true">
          {slides.map((s) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s} src={s} alt="" loading="eager" />
          ))}
        </div>

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35 pointer-events-none" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          {item.type === "video" ? (
            <span className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-2xl">
              <Play className="h-4 w-4 fill-white" /> Play Video Reel
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-black/85 px-3.5 py-1.5 text-xs text-white border border-white/20 backdrop-blur-md shadow-xl">
              <ZoomIn className="h-3.5 w-3.5" /> Fullscreen Retina Zoom
            </span>
          )}
        </div>

        {/* Top-Left Category Brand Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-lg">
          {item.type === "figma" && <Figma className="h-3 w-3 text-pink-400" />}
          {item.type === "instagram" && <Instagram className="h-3 w-3 text-amber-400" />}
          {item.type === "video" && <Play className="h-3 w-3 text-accent fill-accent" />}
          <span>{item.brand || item.type.toUpperCase()}</span>
        </div>

        {/* Multi-Slide Step Counter */}
        {slides.length > 1 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-md border border-white/20 bg-black/85 px-2 py-0.5 text-[10px] font-mono text-neutral-200 backdrop-blur-md shadow-md">
              0{slideIndex + 1} / 0{slides.length}
            </span>
          </div>
        )}

        {/* Interactive Manual Flip Arrows on Hover */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/95 active:scale-95 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/95 active:scale-95 shadow-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Slide Progress Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-2.5 inset-x-0 z-10 flex items-center justify-center gap-1.5 pointer-events-none">
            {slides.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  slideIndex === i ? "w-4 bg-accent" : "w-1 bg-white/40",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content & Spec Box ─────────────────────────────────────────── */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="text-xs font-medium text-accent mt-0.5">
              {item.subtitle}
            </p>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.04] text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          {item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accentHover transition-colors"
            >
              <span>{item.linkLabel || "Explore Deck"}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : item.videoUrl ? (
            <button
              onClick={() => onOpenVideo(item.videoUrl!, item.title, item.subtitle)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accentHover transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-accent" />
              <span>Watch Video Reel</span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
              <Sparkles className="h-3 w-3 text-accent" />
              Case Study
            </span>
          )}

          <span className="text-[11px] font-mono text-neutral-400 uppercase">
            {item.category.replace("-", " ")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Brand Profile Header Component ───────────────────────────────────────────

interface BrandHeaderCardProps {
  profile: BrandProfile;
  itemCount: number;
}

function BrandHeaderCard({ profile, itemCount }: BrandHeaderCardProps) {
  return (
    <motion.div
      key={profile.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#131318]/95 via-[#0e0e12]/95 to-[#16161d]/95 p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Ambient Radial Accent Glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: profile.accentColor }}
      />
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: profile.accentColor }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
        {/* Left: Avatar & Identity Details */}
        <div className="flex flex-row items-center sm:items-start lg:items-center gap-3.5 sm:gap-5">
          {/* Avatar Squircle */}
          <div className="relative h-14 w-14 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border-2 border-white/20 bg-black/60 shadow-xl">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              className="object-cover"
            />
            {/* Live Glow Ring */}
            <div
              className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 opacity-60 pointer-events-none"
              style={{ borderColor: profile.accentColor }}
            />
          </div>

          {/* Titles & Bio */}
          <div className="space-y-1 sm:space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-neutral-300">
                <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" style={{ color: profile.accentColor }} />
                <span>{profile.badge}</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                {itemCount} Works
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white truncate">
                {profile.name}
              </h3>
              {/* Blue Verified Badge */}
              <span className="inline-flex items-center justify-center rounded-full bg-blue-500 text-white p-0.5 shadow-md shadow-blue-500/30 flex-shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-blue-500 text-black stroke-[2.5]" />
              </span>
            </div>

            <p className="text-[11px] sm:text-xs font-mono text-neutral-400">
              {profile.handle}
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed pt-0.5 sm:pt-1 hidden sm:block">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Bio for mobile screen */}
        <p className="text-xs text-neutral-300 leading-relaxed sm:hidden">
          {profile.bio}
        </p>

        {/* Right: Stats & CTA Link */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-between gap-3 sm:gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-3 sm:pt-4 lg:pt-0 lg:pl-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full sm:w-auto">
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-lg sm:rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 sm:px-3.5 sm:py-2 text-center"
              >
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider truncate max-w-full">
                  {stat.label}
                </span>
                <span className="text-xs sm:text-xs font-bold text-white mt-0.5 whitespace-nowrap">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            {/* Direct Bridge to Software Projects */}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-semibold text-neutral-200 transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md"
            >
              <Code2 className="h-3.5 w-3.5 text-blue-400" />
              <span>
                {profile.id === "crown-barber"
                  ? "View Flutter App"
                  : profile.id === "bahdinan-cars"
                  ? "View Marketplace App"
                  : profile.id === "virastack"
                  ? "View Web App"
                  : "View Software Code"}
              </span>
            </a>

            {/* External Profile Link */}
            {profile.link && (
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-white/15"
                style={{
                  backgroundColor: profile.accentColor,
                  boxShadow: `0 8px 24px -6px ${profile.accentColor}55`,
                }}
              >
                <span>{profile.linkLabel || "Visit Profile"}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Creative Section Component (Option A: Tabbed Brand Hub) ─────────────────

type SubFilter = "all" | "deck" | "video" | "figma";

export function CreativeSection() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("crown-barber");
  const [subFilter, setSubFilter] = useState<SubFilter>("all");
  const [selectedLightbox, setSelectedLightbox] = useState<{
    src: string;
    alt: string;
    title?: string;
    images?: string[];
    initialIndex?: number;
  } | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // Listen for brand switch requests from other tabs/sections
  useEffect(() => {
    const handleSelectBrand = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setSelectedBrandId(custom.detail);
        setSubFilter("all");
      }
    };
    window.addEventListener("select-creative-brand", handleSelectBrand);
    return () => window.removeEventListener("select-creative-brand", handleSelectBrand);
  }, []);

  const brandProfiles = siteData.brandProfiles || [];

  // Filter items by selected brand (or all)
  const brandItems = useMemo(() => {
    if (selectedBrandId === "all") {
      return siteData.creative;
    }
    return siteData.creative.filter((item) => item.brandId === selectedBrandId);
  }, [selectedBrandId]);

  // Apply secondary media type filter
  const displayedItems = useMemo(() => {
    if (subFilter === "all") return brandItems;
    if (subFilter === "deck") {
      return brandItems.filter(
        (item) => item.images && item.images.length > 1 && item.type !== "video",
      );
    }
    if (subFilter === "video") {
      return brandItems.filter((item) => item.type === "video");
    }
    if (subFilter === "figma") {
      return brandItems.filter((item) => item.type === "figma");
    }
    return brandItems;
  }, [brandItems, subFilter]);

  const activeProfile = brandProfiles.find((b) => b.id === selectedBrandId);

  // Sub-filter tab options with counts
  const subFilterTabs = [
    { id: "all" as SubFilter, label: "All Posts", count: brandItems.length },
    {
      id: "deck" as SubFilter,
      label: "Multi-Slide Decks",
      count: brandItems.filter((i) => i.images && i.images.length > 1 && i.type !== "video").length,
    },
    {
      id: "video" as SubFilter,
      label: "Video Reels",
      count: brandItems.filter((i) => i.type === "video").length,
    },
    {
      id: "figma" as SubFilter,
      label: "Figma & UI Systems",
      count: brandItems.filter((i) => i.type === "figma").length,
    },
  ].filter((t) => t.count > 0 || t.id === "all");

  return (
    <section id="creative" className="py-20 md:py-32 relative bg-[#09090b]">
      {/* Subtle top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel>UI/UX &amp; Creative Studio</SectionLabel>
            </motion.div>

            {/* Cross-Link Pill to Software Projects */}
            <motion.div variants={fadeUp} transition={{ ...smoothTransition, delay: 0.1 }}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-200 shadow-sm group"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                <span className="hidden sm:inline">Looking for Code &amp; Architecture?</span>
                <span className="sm:hidden text-[11px]">Software Projects</span>
                <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  &uarr;
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.04 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-purple-500/30 bg-purple-500/10 text-[10px] sm:text-[11px] font-mono font-medium text-purple-300 mb-3 max-w-full overflow-hidden"
          >
            <Palette className="h-3 w-3 text-purple-400 flex-shrink-0" />
            <span className="hidden sm:inline">FIGMA PROTOTYPES · MOTION VIDEO ADS · MULTI-BRAND MARKETING DECKS</span>
            <span className="sm:hidden truncate">FIGMA · MOTION &amp; MARKETING DECKS</span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
            <div>
              <motion.h2
                variants={fadeUp}
                transition={{ ...smoothTransition, delay: 0.06 }}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white md:text-5xl"
              >
                Brand Ecosystems &amp; Design Systems
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ ...smoothTransition, delay: 0.12 }}
                className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed"
              >
                Figma design systems, motion video ads, and multi-slide Instagram brand carousels across Crown Barber, ViraStack, and Zana Rajab Builds. Select a brand below to inspect its dedicated profile and published creative decks.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ── Brand Switcher Tab Bar (Single Horizontal Swipe Bar on Mobile) ── */}
        <div className="mb-6 flex flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap items-center">
          {brandProfiles.map((brand) => {
            const isSelected = selectedBrandId === brand.id;
            const count = siteData.creative.filter((item) => item.brandId === brand.id).length;

            return (
              <button
                key={brand.id}
                onClick={() => {
                  setSelectedBrandId(brand.id);
                  setSubFilter("all");
                }}
                className={cn(
                  "group relative flex-shrink-0 flex items-center gap-2 sm:gap-3 rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold transition-all duration-300",
                  "border backdrop-blur-md shadow-md",
                  isSelected
                    ? "bg-[#181820] text-white shadow-xl scale-[1.02]"
                    : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06]",
                )}
                style={{
                  borderColor: isSelected ? brand.accentColor : undefined,
                  boxShadow: isSelected ? `0 8px 20px -6px ${brand.accentColor}40` : undefined,
                }}
              >
                {/* Brand Squircle Avatar Thumbnail */}
                <div
                  className="relative h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 overflow-hidden rounded-lg border border-white/20 bg-black/60"
                  style={{ borderColor: isSelected ? brand.accentColor : undefined }}
                >
                  <Image
                    src={brand.avatar}
                    alt={brand.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <span className="font-bold text-white text-xs whitespace-nowrap leading-tight">
                    {brand.name}
                  </span>
                  <span className="hidden sm:block text-[10px] font-mono text-neutral-400">
                    {brand.handle}
                  </span>
                </div>

                {/* Count Badge */}
                <span
                  className={cn(
                    "ml-0.5 sm:ml-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[10px] font-mono",
                    isSelected
                      ? "bg-white/15 text-white"
                      : "bg-white/[0.06] text-neutral-400 group-hover:text-white",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* All Brands Tab */}
          <button
            onClick={() => {
              setSelectedBrandId("all");
              setSubFilter("all");
            }}
            className={cn(
              "flex-shrink-0 flex items-center gap-2 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs font-semibold transition-all duration-300 whitespace-nowrap",
              "border backdrop-blur-md",
              selectedBrandId === "all"
                ? "border-accent bg-accent text-white shadow-xl shadow-accent/25 scale-[1.02]"
                : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06]",
            )}
          >
            <Layers className="h-4 w-4" />
            <span>All Works</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-mono",
                selectedBrandId === "all" ? "bg-white/25 text-white" : "bg-white/10 text-neutral-400",
              )}
            >
              {siteData.creative.length}
            </span>
          </button>
        </div>

        {/* ── Active Brand Profile Header Card ───────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeProfile && selectedBrandId !== "all" ? (
            <BrandHeaderCard
              key={activeProfile.id}
              profile={activeProfile}
              itemCount={brandItems.length}
            />
          ) : (
            <motion.div
              key="all-overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#121217]/90 p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-accent uppercase tracking-wider">
                    <Compass className="h-3.5 w-3.5" /> Complete Design Portfolio
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5 sm:mt-1">
                    Multi-Brand Design Showcase
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                    Showing all {siteData.creative.length} verified creative productions: interactive Figma wireframes, multi-card commercial marketing carousels, and high-impact motion video reels across all active client ecosystems.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono text-neutral-300">
                    4 Active Brands · {siteData.creative.length} Productions
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sub-Filter Bar (Within Active Brand) ────────────────────────── */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-accent" />
            <span>Filter Media:</span>
          </div>

          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            {subFilterTabs.map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setSubFilter(id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap",
                  subFilter === id
                    ? "bg-white/15 text-white border border-white/20 shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.05]",
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                    subFilter === id ? "bg-white/20 text-white" : "bg-white/10 text-neutral-400",
                  )}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Posts Gallery Grid ─────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item) => (
              <CreativeCard
                key={item.id}
                item={item}
                onOpenLightbox={(src, alt, title, images, initialIndex) =>
                  setSelectedLightbox({ src, alt, title, images, initialIndex })
                }
                onOpenVideo={(url, title, subtitle) =>
                  setActiveVideo({ url, title, subtitle })
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {displayedItems.length === 0 && (
          <div className="py-20 text-center text-sm text-neutral-400">
            No productions match this filter. Try selecting &ldquo;All Posts&rdquo;.
          </div>
        )}
      </div>

      {/* Lightbox Modal with Full Fast Gallery Navigation */}
      {selectedLightbox && (
        <ImageLightbox
          isOpen={!!selectedLightbox}
          onClose={() => setSelectedLightbox(null)}
          src={selectedLightbox.src}
          alt={selectedLightbox.alt}
          title={selectedLightbox.title}
          images={selectedLightbox.images}
          initialIndex={selectedLightbox.initialIndex}
        />
      )}

      {/* Video Modal */}
      {activeVideo && (
        <VideoPlayerModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoUrl={activeVideo.url}
          title={activeVideo.title}
          subtitle={activeVideo.subtitle}
        />
      )}
    </section>
  );
}