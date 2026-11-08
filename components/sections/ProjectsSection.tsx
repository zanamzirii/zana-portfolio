"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Code2, ArrowDownRight, Sparkles } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeaturedProjectCard, ProjectCard } from "@/components/ui/ProjectCard";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const featuredProjects = siteData.projects.filter((p) => p.featured);
  const otherProjects = siteData.projects.filter((p) => !p.featured);

  // Horizontal Pin-Scroll Controller (Ayman.krd Luxury Style)
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate horizontal translation across all featured panels
  const totalPanels = featuredProjects.length;
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(totalPanels - 1) * 100}vw`],
  );

  // Sync active slide index (1-based)
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const step = 1 / totalPanels;
      const index = Math.min(
        totalPanels,
        Math.max(1, Math.floor(latest / step) + 1),
      );
      setActiveSlide(index);
    });
  }, [smoothProgress, totalPanels]);

  // Direct Jump to a specific slide
  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + ((index - 1) / (totalPanels - 1)) * totalScrollable;

    if (
      typeof window !== "undefined" &&
      (window as unknown as { __lenis?: { scrollTo: (y: number, opts?: object) => void } }).__lenis
    ) {
      (
        window as unknown as { __lenis: { scrollTo: (y: number, opts?: object) => void } }
      ).__lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="relative bg-[#050505] text-textPrimary">
      {/* ── Section Header (Vertical Introduction) ───────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-32 pb-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-8"
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
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Shipped Products &amp; Enterprise Platforms
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-base text-neutral-400 max-w-2xl leading-relaxed"
          >
            Production software engineered with Flutter, Dart, Riverpod, Next.js, and Firebase. Built from scratch with clean architectural separation, strict security, and live on the App Store and Web.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Horizontal Pin-Scroll Track (Ayman.krd Signature Scroll) ─────── */}
      <div ref={containerRef} className="relative h-[320vh] lg:h-[350vh]">
        {/* Sticky 100vh Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#050505]">
          
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                activeSlide === 1
                  ? "radial-gradient(circle at 70% 50%, rgba(245,158,11,0.2) 0%, transparent 60%)"
                  : activeSlide === 2
                  ? "radial-gradient(circle at 70% 50%, rgba(59,130,246,0.2) 0%, transparent 60%)"
                  : "radial-gradient(circle at 70% 50%, rgba(234,179,8,0.2) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Sliding Track of Flagship Project Panels */}
          <motion.div
            style={{ x }}
            className="flex h-full items-center"
          >
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="w-screen h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-16"
              >
                <div className="w-full max-w-6xl max-h-[88vh] overflow-y-auto lg:overflow-visible no-scrollbar">
                  <FeaturedProjectCard
                    project={project}
                    reverse={idx % 2 === 1}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Luxury Floating Pin Controller Pill (Ayman.krd Agency Style) */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
            {/* Active Slide Counter */}
            <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
              <span className="text-accent">0{activeSlide}</span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400">0{totalPanels}</span>
            </span>

            {/* Quick Interactive Slide Dots */}
            <div className="flex items-center gap-1.5">
              {featuredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i + 1)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === i + 1
                      ? "w-6 bg-accent shadow-md shadow-accent/50"
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={`Jump to project 0${i + 1}`}
                />
              ))}
            </div>

            {/* Smooth Track Progress Bar */}
            <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-indigo-500 rounded-full"
              />
            </div>

            {/* Scroll Indicator Hint */}
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="h-3 w-3 text-accent" />
              Scroll to Slide
            </span>
          </div>

        </div>
      </div>

      {/* ── Academic & 3D Projects (Resumes Normal Vertical Scroll) ─────── */}
      {otherProjects.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 border-t border-white/[0.08]">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Research &amp; Specialized Builds
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Academic Research &amp; 3D Game Builds
            </h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Foundational computer science research, normalized relational database platforms, and real-time 3D simulation engines.
            </p>
          </div>

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
    </section>
  );
}
