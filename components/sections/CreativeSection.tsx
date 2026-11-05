"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Play,
  Figma,
  Instagram,
  Layers,
  Film,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
import type { CreativeItem } from "@/lib/types";

type FilterTab = "all" | "ui-ux" | "brand-social" | "video-motion";

// ─── Individual Creative Card with Auto-Slide & Touch ─────────────────────────

interface CreativeCardProps {
  item: CreativeItem;
  onOpenLightbox: (src: string, alt: string, title?: string) => void;
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
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#111114]/95",
        "overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-[#141418] shadow-xl",
      )}
    >
      {/* ── Media Showcase Box ─────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[16/10] w-full overflow-hidden bg-black/80 border-b border-white/[0.08] cursor-pointer select-none"
        onClick={() => {
          if (item.type === "video" && item.videoUrl) {
            onOpenVideo(item.videoUrl, item.title, item.subtitle);
          } else {
            onOpenLightbox(currentImgSrc, item.title, `${item.title} (Slide ${slideIndex + 1} of ${slides.length})`);
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImgSrc}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImgSrc}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority={slideIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          {item.type === "video" ? (
            <span className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-2xl">
              <Play className="h-4 w-4 fill-white" /> Play Video Reel
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1.5 text-xs text-white border border-white/20 backdrop-blur-sm shadow-xl">
              <ZoomIn className="h-3.5 w-3.5" /> Retina Zoom
            </span>
          )}
        </div>

        {/* Top-Left Category Brand Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {item.type === "figma" && <Figma className="h-3 w-3 text-pink-400" />}
          {item.type === "instagram" && <Instagram className="h-3 w-3 text-amber-400" />}
          {item.type === "video" && <Play className="h-3 w-3 text-accent fill-accent" />}
          <span>{item.brand || item.type.toUpperCase()}</span>
        </div>

        {/* Multi-Slide Step Counter */}
        {slides.length > 1 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="rounded-md border border-white/20 bg-black/80 px-2 py-0.5 text-[10px] font-mono text-neutral-200 backdrop-blur-md">
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
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 active:scale-95"
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
              <span>{item.linkLabel || "Explore Project"}</span>
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

// ─── Creative Section Component ───────────────────────────────────────────────

export function CreativeSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedLightbox, setSelectedLightbox] = useState<{
    src: string;
    alt: string;
    title?: string;
  } | null>(null);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  const filteredItems =
    activeTab === "all"
      ? siteData.creative
      : siteData.creative.filter((item) => item.category === activeTab);

  const filterTabs: { id: FilterTab; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    {
      id: "all",
      label: "All Works",
      icon: Layers,
      count: siteData.creative.length,
    },
    {
      id: "ui-ux",
      label: "UI/UX & Figma",
      icon: Figma,
      count: siteData.creative.filter((i) => i.category === "ui-ux").length,
    },
    {
      id: "brand-social",
      label: "Brand & Social",
      icon: Instagram,
      count: siteData.creative.filter((i) => i.category === "brand-social").length,
    },
    {
      id: "video-motion",
      label: "Motion & Video",
      icon: Film,
      count: siteData.creative.filter((i) => i.category === "video-motion").length,
    },
  ];

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
          className="mb-12"
        >
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4">
            <SectionLabel>Creative &amp; Design Studio</SectionLabel>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.h2
                variants={fadeUp}
                transition={{ ...smoothTransition, delay: 0.06 }}
                className="text-3xl font-bold tracking-tight text-white md:text-5xl"
              >
                UI/UX, Motion &amp; Brand Systems
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ ...smoothTransition, delay: 0.12 }}
                className="mt-3 text-base text-neutral-400 max-w-xl leading-relaxed"
              >
                From interactive Figma design systems and promotional video production to commercial Instagram marketing campaigns for active brands.
              </motion.p>
            </div>

            {/* Filter Tabs */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.16 }}
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md self-start md:self-auto"
            >
              {filterTabs.map(({ id, label, icon: Icon, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    activeTab === id
                      ? "bg-accent text-white shadow-lg shadow-accent/25"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.06]",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                      activeTab === id ? "bg-white/20 text-white" : "bg-white/10 text-neutral-400",
                    )}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <CreativeCard
                key={item.id}
                item={item}
                onOpenLightbox={(src, alt, title) =>
                  setSelectedLightbox({ src, alt, title })
                }
                onOpenVideo={(url, title, subtitle) =>
                  setActiveVideo({ url, title, subtitle })
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      {selectedLightbox && (
        <ImageLightbox
          isOpen={!!selectedLightbox}
          onClose={() => setSelectedLightbox(null)}
          src={selectedLightbox.src}
          alt={selectedLightbox.alt}
          title={selectedLightbox.title}
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
