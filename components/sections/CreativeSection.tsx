"use client";

import { useState } from "react";
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

type FilterTab = "all" | "ui-ux" | "brand-social" | "video-motion";

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

  return (
    <section id="creative" className="py-20 md:py-32 relative bg-surface/40">
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
                className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
              >
                UI/UX, Motion &amp; Brand Systems
              </motion.h2>
              <motion.p
                variants={fadeUp}
                transition={{ ...smoothTransition, delay: 0.12 }}
                className="mt-3 text-base text-textSecondary max-w-xl"
              >
                From interactive Figma design systems and promotional video production to commercial Instagram marketing campaigns for active brands.
              </motion.p>
            </div>

            {/* Filter Tabs */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.16 }}
              className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-border bg-card/80 self-start md:self-auto"
            >
              {[
                { id: "all", label: "All Works", icon: Layers },
                { id: "ui-ux", label: "UI/UX & Figma", icon: Figma },
                { id: "brand-social", label: "Brand & Social", icon: Instagram },
                { id: "video-motion", label: "Motion & Video", icon: Film },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as FilterTab)}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    activeTab === id
                      ? "bg-accent text-white shadow-md shadow-accent/25"
                      : "text-textSecondary hover:text-textPrimary hover:bg-elevated",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
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
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border border-border bg-card",
                  "overflow-hidden transition-all duration-300 hover:border-borderLight hover:bg-elevated/70 shadow-lg",
                )}
              >
                {/* Media Preview Box */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 border-b border-border cursor-pointer"
                  onClick={() => {
                    if (item.type === "video" && item.videoUrl) {
                      setActiveVideo({
                        url: item.videoUrl,
                        title: item.title,
                        subtitle: item.subtitle,
                      });
                    } else if (item.thumbnail) {
                      setSelectedLightbox({
                        src: item.thumbnail,
                        alt: item.title,
                        title: item.title,
                      });
                    }
                  }}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {item.type === "video" ? (
                      <span className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-xl">
                        <Play className="h-4 w-4 fill-white" /> Play Video
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 rounded-full bg-black/80 px-3.5 py-1.5 text-xs text-white border border-white/20 backdrop-blur-sm">
                        <ZoomIn className="h-3.5 w-3.5" /> Preview Screen
                      </span>
                    )}
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-black/40 bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {item.type === "figma" && <Figma className="h-3 w-3 text-pink-400" />}
                    {item.type === "instagram" && <Instagram className="h-3 w-3 text-amber-400" />}
                    {item.type === "video" && <Play className="h-3 w-3 text-accent fill-accent" />}
                    <span>{item.brand || item.type.toUpperCase()}</span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-textPrimary group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-medium text-accent mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-textSecondary leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border bg-surface text-textMuted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between">
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
                        onClick={() =>
                          setActiveVideo({
                            url: item.videoUrl!,
                            title: item.title,
                            subtitle: item.subtitle,
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accentHover transition-colors"
                      >
                        <Play className="h-3.5 w-3.5 fill-accent" />
                        <span>Watch Video</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-textMuted italic">Portfolio Case</span>
                    )}

                    <span className="text-[11px] font-mono text-textMuted uppercase">
                      {item.category.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </motion.div>
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
