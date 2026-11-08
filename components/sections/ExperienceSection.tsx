"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Users,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MapPin,
  Database,
  Briefcase,
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

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 3;

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
    <section id="experience" className="relative bg-[#050505] text-textPrimary">
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
              <SectionLabel>Leadership &amp; Career Milestones</SectionLabel>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>GOVERNORATE-SCALE FIELD COORDINATION</span>
              </div>
            </motion.div>
          </div>

          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Field Leadership &amp; Experience
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed"
          >
            Proven executive field coordination, database system administration, and technical co-founding across Duhok Governorate and Iraqi Kurdistan.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Horizontal Pin-Scroll Track (3 Experience Panels) ─────────────── */}
      <div ref={containerRef} className="relative h-[300vh] lg:h-[320vh]">
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
                  ? "radial-gradient(circle at 70% 50%, rgba(16,185,129,0.25) 0%, transparent 60%)"
                  : activeSlide === 2
                  ? "radial-gradient(circle at 70% 50%, rgba(139,92,246,0.25) 0%, transparent 60%)"
                  : "radial-gradient(circle at 70% 50%, rgba(6,182,212,0.25) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Sliding Track */}
          <motion.div
            style={{ x }}
            className="flex h-full w-[300vw] flex-shrink-0"
          >
            {/* ═══════════════════════════════════════════════════════════════
                EXPERIENCE 01: RUNAKI DUHOK FIELD LEAD (EMERALD GREEN)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#04160d] via-[#020b06] to-[#010503]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-300 w-fit backdrop-blur-md">
                  <Users className="h-3 w-3 text-emerald-400" />
                  <span>FIELD LEADERSHIP &amp; OPERATIONAL EXCELLENCE</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Runaki Duhok{" "}
                  <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Field Lead
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-emerald-200/80">
                  Governorate-Scale Biometric Field Operations &amp; Team Management
                </p>

                {/* 4-Box Metrics Grid */}
                <div className="mb-6 grid grid-cols-2 gap-3 max-w-lg">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      11 Agents
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-300">
                      Led, Trained &amp; Coached Daily
                    </span>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      817 km²
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-300">
                      Territory Managed Across Duhok
                    </span>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      18,002
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-300">
                      Household Biometric Field Visits
                    </span>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                      55.2%
                    </span>
                    <span className="text-[11px] sm:text-xs text-neutral-300">
                      Door-Open Rate (Top Regional Efficiency)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href={siteData.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-black" />
                    <span>Hire Zana Directly</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
                  >
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>Duhok Governorate</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-emerald-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  01
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border-2 border-emerald-500/30 bg-[#081a10]/90 p-3 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/images/personal/zana-suit-full-body.jpg"
                      alt="Zana Rajab Abdulrahman — Operations Leadership & Management"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-emerald-500/20 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-emerald-400/20 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Runaki Duhok</p>
                        <p className="text-[10px] text-emerald-300">Field Operations Team Lead</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400">11 Agents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                EXPERIENCE 02: CENTRAL UNIVERSITY LIBRARY IT (VIOLET / INDIGO)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#120822] via-[#090414] to-[#04010a]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-purple-300 w-fit backdrop-blur-md">
                  <Database className="h-3 w-3 text-purple-400" />
                  <span>ACADEMIC IT INFRASTRUCTURE · 2023</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Central Library{" "}
                  <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    IT Specialist
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-purple-200/80">
                  Database Administration &amp; Enterprise Academic Systems Operations
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Database Administration:</strong> Maintained relational catalog database and integrity
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Campus Network Uptime:</strong> Managed hardware workstations across 4 library floors (99.8%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Staff Training:</strong> Trained university librarians on automated catalog workflows
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">System Diagnostics:</strong> Resolved hardware, operating system, and network bottlenecks
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href="#about"
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-purple-400 hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                  >
                    <span>View University Credentials</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={siteData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-200 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-200"
                  >
                    <span>LinkedIn Endorsements</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-purple-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  02
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border-2 border-purple-500/30 bg-[#140822]/90 p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/images/personal/zana-gradation.jpeg"
                      alt="Central University Library IT Specialist — University of Duhok"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-purple-500/20 rounded-2xl pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-purple-400/20 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">Central Library</p>
                        <p className="text-[10px] text-purple-300">IT &amp; Database Administration</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-purple-400">99.8% Uptime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                EXPERIENCE 03: VIRASTACK SOFTWARE AGENCY (CYAN / COBALT)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#04151e] via-[#020b12] to-[#010508]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-cyan-300 w-fit backdrop-blur-md">
                  <Briefcase className="h-3 w-3 text-cyan-400" />
                  <span>AGENCY CO-FOUNDER · 2023–PRESENT</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  ViraStack{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                    Software Agency
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-cyan-200/80">
                  Client Engineering Delivery &amp; Full-Stack Digital Systems
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Commercial Deliveries:</strong> Custom business web apps, digital QR menus &amp; booking systems
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Full-Stack Tech:</strong> Next.js, Node.js, Firebase Auth &amp; serverless Cloud Functions
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digital Brand Direction:</strong> Complete social media decks, Figma design systems &amp; video reels
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Active Agency:</strong> Based in Duhok, serving businesses across Kurdistan Region
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href="#creative"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("creative");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(
                          new CustomEvent("select-creative-brand", {
                            detail: { brand: "virastack.iq" },
                          }),
                        );
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-cyan-400 hover:scale-[1.02] shadow-lg shadow-cyan-500/25"
                  >
                    <span>View Agency Decks</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href="https://www.instagram.com/virastack.iq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-200"
                  >
                    <span>@virastack.iq</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-cyan-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  03
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-52 sm:w-64 md:w-80 lg:w-[350px] aspect-[4/3] rounded-3xl border-2 border-cyan-500/30 bg-[#06151f]/90 p-3 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                    <Image
                      src="/images/instagram-post-pages/virastack.iq/virastack.iq-logo.jpeg"
                      alt="ViraStack Software Agency Brand & Logo"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-cyan-500/20 rounded-2xl pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Luxury Floating Pin Controller Pill (Experience) ──────────── */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
            <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
              <span
                className={cn(
                  "transition-colors duration-300",
                  activeSlide === 1 && "text-emerald-400",
                  activeSlide === 2 && "text-purple-400",
                  activeSlide === 3 && "text-cyan-400",
                )}
              >
                0{activeSlide}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400">0{totalSlides}</span>
            </span>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === i
                      ? cn(
                          "w-6 shadow-md",
                          i === 1 && "bg-emerald-400 shadow-emerald-400/50",
                          i === 2 && "bg-purple-400 shadow-purple-400/50",
                          i === 3 && "bg-cyan-400 shadow-cyan-400/50",
                        )
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={`Jump to experience 0${i}`}
                />
              ))}
            </div>

            <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-emerald-400 via-purple-400 to-cyan-400 rounded-full"
              />
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="h-3 w-3 text-emerald-400" />
              <span>Scroll or Drag →</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
