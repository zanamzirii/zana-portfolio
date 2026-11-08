"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  GraduationCap,
  Award,
  Sparkles,
  ExternalLink,
  Globe,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 2;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * 100}vw`],
  );

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const step = 1 / totalSlides;
      const index = Math.min(
        totalSlides,
        Math.max(1, Math.floor(latest / step) + 1),
      );
      setActiveSlide(index);
    });
  }, [smoothProgress, totalSlides]);

  const scrollToSlide = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll =
        containerTop + ((index - 1) / (totalSlides - 1)) * totalScrollable;

      if (
        typeof window !== "undefined" &&
        (
          window as unknown as {
            __lenis?: { scrollTo: (y: number, opts?: object) => void };
          }
        ).__lenis
      ) {
        (
          window as unknown as {
            __lenis: { scrollTo: (y: number, opts?: object) => void };
          }
        ).__lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [totalSlides],
  );

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0 && activeSlide < totalSlides) {
        scrollToSlide(activeSlide + 1);
      } else if (deltaX > 0 && activeSlide > 1) {
        scrollToSlide(activeSlide - 1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="about" className="relative bg-[#050505] text-textPrimary">
      {/* ── Section Header (Vertical Introduction) ───────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel>Education &amp; Background</SectionLabel>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-300 shadow-sm">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>BSc COMPUTER SCIENCE · UNIVERSITY OF DUHOK</span>
              </div>
            </motion.div>
          </div>

          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Academic Foundation &amp; Story
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed"
          >
            Four years of foundational computer science, algorithm design, and relational database systems combined with practical enterprise operations.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Horizontal Pin-Scroll Track (2 About Panels) ──────────────────── */}
      <div ref={containerRef} className="relative h-[220vh] lg:h-[240vh]">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050505]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                activeSlide === 1
                  ? "radial-gradient(circle at 70% 50%, rgba(139,92,246,0.25) 0%, transparent 60%)"
                  : "radial-gradient(circle at 70% 50%, rgba(59,130,246,0.25) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Sliding Track */}
          <motion.div
            style={{ x }}
            className="flex h-full w-[200vw] flex-shrink-0"
          >
            {/* ═══════════════════════════════════════════════════════════════
                ABOUT 01: ACADEMIC DEGREE & CAPSTONE (ROYAL PURPLE)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#120520] via-[#090310] to-[#05010a]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-purple-300 w-fit backdrop-blur-md">
                  <GraduationCap className="h-3 w-3 text-purple-400" />
                  <span>UNIVERSITY OF DUHOK · CLASS OF 2024</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  BSc in{" "}
                  <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                    Computer Science
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-purple-200/80">
                  Distinguished Academic Degree &amp; &apos;Excellent&apos; Capstone Project
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Awarded &apos;Excellent&apos; Grade:</strong> AI-driven desktop graduation project
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4-Year Curriculum (2020–2024):</strong> Algorithms, Data Structures, DB, OS &amp; Networks
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Central University Library:</strong> Database administration &amp; enterprise network internship
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Enterprise Systems:</strong> Hardware diagnostics, backup automation &amp; catalog indexing
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href={siteData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-purple-400 hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                  >
                    <span>Connect on LinkedIn</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={siteData.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-200 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-200"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    <span>WhatsApp Zana</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-purple-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  01
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border-2 border-purple-500/30 bg-[#160826]/90 p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/images/personal/zana-gradation.jpeg"
                      alt="Zana Rajab Abdulrahman Graduation — University of Duhok"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-purple-500/20 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-purple-400/20 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">University of Duhok</p>
                        <p className="text-[10px] text-purple-300">College of Science · Computer Science</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-purple-400">2020–2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                ABOUT 02: STORY, VALUES & LANGUAGES (SLATE / GOLD)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#0c0c14] via-[#06060a] to-[#020204]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono font-semibold text-neutral-300 w-fit backdrop-blur-md">
                  <Globe className="h-3 w-3 text-accent" />
                  <span>IDENTITY, VALUES &amp; LANGUAGES</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Building Beyond{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-neutral-100 to-white bg-clip-text text-transparent">
                    the Screen
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base text-neutral-300/90 leading-relaxed max-w-lg">
                  Born and based in Duhok, I have always believed that great engineers understand both the underlying code and the human operations around it. Whether leading 11 field agents or publishing on the App Store, I focus on reliability, clear communication, and high aesthetic finish.
                </p>

                {/* Languages Badges */}
                <div className="mb-6 flex flex-wrap gap-2.5 max-w-lg">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Kurdish (Native / Mother Tongue)</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <span>English (Professional Working B1)</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>Arabic (Professional Working)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.02] shadow-lg shadow-white/10"
                  >
                    <span>Hire Zana Today</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={siteData.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    <span>Direct Message</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-white/[0.03] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  02
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border-2 border-white/15 bg-[#0e0e14]/90 p-3 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/images/personal/zana-with-kurdish-flags.jpg"
                      alt="Zana Rajab Abdulrahman — Engineering Philosophy & Heritage"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Zana Rajab</p>
                        <p className="text-[10px] text-neutral-400">Duhok, Kurdistan Region, Iraq</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400">Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Luxury Floating Pin Controller Pill (About) ────────────────── */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
            <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
              <span
                className={cn(
                  "transition-colors duration-300",
                  activeSlide === 1 && "text-purple-400",
                  activeSlide === 2 && "text-white",
                )}
              >
                0{activeSlide}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400">0{totalSlides}</span>
            </span>

            <div className="flex items-center gap-1.5">
              {[1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === i
                      ? cn(
                          "w-6 shadow-md",
                          i === 1 && "bg-purple-400 shadow-purple-400/50",
                          i === 2 && "bg-white shadow-white/50",
                        )
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={`Jump to about slide 0${i}`}
                />
              ))}
            </div>

            <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-purple-400 to-white rounded-full"
              />
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Scroll or Drag →</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
