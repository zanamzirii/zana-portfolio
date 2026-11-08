"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  MapPin,
  ArrowRight,
  Sparkles,
  Smartphone,
  Code2,
  Users,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { siteData } from "@/lib/data";
import { AppleIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

// ─── Role Cycler for Panel 1 ──────────────────────────────────────────────────

function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <div className="relative h-7 sm:h-9 overflow-hidden w-full flex items-center justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-2xl font-medium text-amber-300/90 tracking-tight"
        >
          {roles[index]}
          <span className="ml-2 inline-block h-4 sm:h-5 w-0.5 animate-blink bg-amber-400 align-middle" />
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Branded Social Links ─────────────────────────────────────────────────────

const socials = [
  {
    label: "GitHub",
    href: siteData.links.github,
    Icon: Github,
    hoverBg: "hover:bg-white/10 hover:border-white/30 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: siteData.links.linkedin,
    Icon: Linkedin,
    hoverBg: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40 hover:text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zanarajab.builds",
    Icon: Instagram,
    hoverBg: "hover:bg-[#E4405F]/20 hover:border-[#E4405F]/40 hover:text-[#E4405F]",
  },
  {
    label: "Apple Developer",
    href: siteData.links.appStore,
    Icon: AppleIcon,
    hoverBg: "hover:bg-white/15 hover:border-white/40 hover:text-white",
  },
  {
    label: "WhatsApp",
    href: siteData.links.whatsapp,
    Icon: WhatsAppIcon,
    hoverBg: "hover:bg-[#25D366]/20 hover:border-[#25D366]/40 hover:text-[#25D366]",
  },
];

// ─── Hero Section (Home Tab — Dedicated Identity & Executive Showcase) ────────

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 3;

  // Track vertical scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Translate horizontal track from 0vw to -200vw across the 3 Home panels
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * 100}vw`],
  );

  // Sync active slide index (1 to 3)
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

  // Jump to specific slide smoothly
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

  // Smooth scroll to another section
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      (
        window as unknown as {
          __lenis?: { scrollTo: (el: HTMLElement, opts?: object) => void };
        }
      ).__lenis
    ) {
      (
        window as unknown as {
          __lenis: { scrollTo: (el: HTMLElement, opts?: object) => void };
        }
      ).__lenis.scrollTo(el, { offset: -40, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile horizontal swipe detection
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
    <section
      id="home"
      ref={containerRef}
      className="relative h-[300vh] lg:h-[320vh] bg-[#050505] text-white"
    >
      {/* ── Sticky 100vh Viewport ─────────────────────────────────────────── */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050505]"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none" />

        {/* ── The Horizontal Sliding Track (3 Home Panels) ──────────────────── */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[300vw] flex-shrink-0"
        >
          {/* ═════════════════════════════════════════════════════════════════
              HOME PANEL 1: EXECUTIVE IDENTITY & HERO INTRODUCTION
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#08080c] via-[#050505] to-[#0d0714]">
            {/* Background Grid Pattern & Radial Mesh */}
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
              }}
            />

            {/* Left 50%: Typography, Roles & Bio */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Luxury Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-mono text-neutral-300 w-fit backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>PORTFOLIO 2026 · COMPUTER SCIENCE BSc</span>
              </div>

              {/* Giant Name Headline */}
              <h1 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                I AM{" "}
                <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                  ZANA RAJAB
                </span>
              </h1>

              {/* Cycling Role */}
              <div className="mb-3">
                <RoleCycler roles={siteData.personal.roles} />
              </div>

              {/* Bio / Tagline */}
              <p className="mb-5 max-w-lg text-sm sm:text-base text-neutral-300/90 leading-relaxed">
                Computer Science graduate from Duhok, Kurdistan Region, Iraq.
                Mobile App Developer, Team Leader, QA &amp; Testing Engineer, and
                Creative Visual Director. Shipped Crown Barber and Bahdinan Cars
                to production standards.
              </p>

              {/* Location Pill */}
              <div className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{siteData.personal.location}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400 font-medium">Available for High-Impact Roles</span>
              </div>

              {/* Real High-Contrast Social Buttons */}
              <div className="mb-7 flex items-center gap-2.5 sm:gap-3 flex-wrap">
                {socials.map(({ label, href, Icon, hoverBg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-300 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm ${hoverBg}`}
                  >
                    <Icon className="h-4 sm:h-5 w-4 sm:w-5 transition-colors" />
                  </a>
                ))}
              </div>

              {/* Slide Navigation CTAs */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSlide(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.02] shadow-lg shadow-white/10"
                >
                  <span>Explore Mission</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-200"
                >
                  <Smartphone className="h-4 w-4 text-amber-400" />
                  <span>Jump to Projects →</span>
                </button>
              </div>
            </div>

            {/* Right 50%: High-Res Portrait Card */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              {/* Giant Luxury Watermark Number */}
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-white/[0.03] select-none tracking-tighter"
                aria-hidden="true"
              >
                01
              </div>

              {/* Ambient purple/blue halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/30 via-indigo-500/20 to-transparent opacity-60 blur-3xl pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border border-white/15 bg-[#0e0e14]/90 p-3 shadow-2xl backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900">
                  <Image
                    src="/images/personal/zana.jpg"
                    alt="Zana Rajab Abdulrahman"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Floating Verified Badge on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Zana Rajab</p>
                      <p className="text-[10px] text-neutral-400">Software Engineer &amp; Operations Lead</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              HOME PANEL 2: THE CORE MISSION & EXECUTIVE METRICS
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#0c0914] via-[#050508] to-[#040912]">
            {/* Ambient Violet Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: Mission Narrative & Headline Stats */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-purple-300 w-fit backdrop-blur-md">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>FULL-STACK ENGINEERING &amp; LEADERSHIP</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Bridging Code,{" "}
                <span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  Design &amp; Ops
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base text-neutral-300/90 leading-relaxed max-w-lg">
                I do not just write code — I build complete digital ecosystems.
                From architecting Clean Flutter mobile frontends, to authoring
                Firebase Cloud Functions, to leading multi-agent field operations
                across Iraqi Kurdistan, I turn ideas into production reality.
              </p>

              {/* 4-Box High-Impact Metrics Grid */}
              <div className="mb-6 grid grid-cols-2 gap-3 max-w-lg">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    2 Apps
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    Shipped to iOS App Store &amp; Web
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    18,002
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    Field Visits Coordinated
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-blue-400 font-mono">
                    11 Agents
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    Coached Daily Across 817 km²
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-purple-400 font-mono">
                    Excellent
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    University Degree Capstone Grade
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSlide(3)}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-purple-400 hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                >
                  <span>Explore Pillars</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection("experience")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span>Leadership Record →</span>
                </button>
              </div>
            </div>

            {/* Right 50%: Pride Photo of Zana */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-purple-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                02
              </div>

              <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              <div className="relative group w-48 sm:w-64 md:w-80 lg:w-[380px] aspect-[3/4] rounded-3xl border-2 border-purple-500/30 bg-[#140b22]/90 p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/personal/zana-with-kurdish-flags.jpg"
                    alt="Zana Rajab Abdulrahman — Engineering & Executive Leadership"
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-purple-500/20 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-purple-400/20 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Full-Stack &amp; Operations</p>
                      <p className="text-[10px] text-purple-300">Duhok, Kurdistan Region, Iraq</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-purple-400">100% Shipped</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              HOME PANEL 3: THREE ENGINEERING PILLARS & NAVIGATION GATEWAY
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#04121a] via-[#02090e] to-[#010507]">
            {/* Ambient Cyan Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: The 3 Pillars */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-cyan-300 w-fit backdrop-blur-md">
                <Layers className="h-3 w-3 text-cyan-400" />
                <span>CORE DISCIPLINES &amp; ARCHITECTURE</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Three Pillars of{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Execution
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base text-cyan-200/80">
                Ready to deliver across software engineering, cloud systems, and creative design.
              </p>

              {/* 3 Pillars List */}
              <div className="mb-6 space-y-3 max-w-lg">
                <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-950/20 p-3">
                  <Smartphone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">1. Mobile Engineering (Flutter &amp; Dart)</h4>
                    <p className="text-xs text-neutral-300">Clean Architecture, Riverpod, App Store submissions, and real-time syncing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-950/20 p-3">
                  <Code2 className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">2. Cloud Backends &amp; Full-Stack Web</h4>
                    <p className="text-xs text-neutral-300">Firebase Cloud Functions v2, Next.js, Node.js, and secure multi-role databases.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-purple-500/20 bg-purple-950/20 p-3">
                  <Sparkles className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">3. Brand Systems, UI/UX &amp; Video Ads</h4>
                    <p className="text-xs text-neutral-300">Figma design systems, bilingual marketing decks, and AI motion commercials.</p>
                  </div>
                </div>
              </div>

              {/* Navigation CTAs */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-cyan-400 hover:scale-[1.02] shadow-lg shadow-cyan-500/25"
                >
                  <Smartphone className="h-4 w-4 text-black" />
                  <span>View All Projects</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a
                  href={siteData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  <span>Start Conversation</span>
                </a>
              </div>
            </div>

            {/* Right 50%: Visual Gateway Showcase */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-cyan-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                03
              </div>

              <div className="absolute w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

              <div className="relative group w-52 sm:w-64 md:w-80 lg:w-[350px] aspect-[9/16] rounded-3xl border-2 border-cyan-500/30 bg-[#06151f]/90 p-3 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                  <Image
                    src="/images/crown-barber/mockup-1.png"
                    alt="Crown Barber & Bahdinan Cars Production Showcase"
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-cyan-500/20 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-cyan-400/20 bg-black/75 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Shipped Production</p>
                      <p className="text-[10px] text-cyan-300">Apple App Store &amp; Cloud Web</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Luxury Floating Pin Controller Pill (Home) ────────────────────── */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
          {/* Active Slide Counter */}
          <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
            <span
              className={cn(
                "transition-colors duration-300",
                activeSlide === 1 && "text-white",
                activeSlide === 2 && "text-purple-400",
                activeSlide === 3 && "text-cyan-400",
              )}
            >
              0{activeSlide}
            </span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">0{totalSlides}</span>
          </span>

          {/* Interactive Slide Dots */}
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
                        i === 1 && "bg-white shadow-white/50",
                        i === 2 && "bg-purple-400 shadow-purple-400/50",
                        i === 3 && "bg-cyan-400 shadow-cyan-400/50",
                      )
                    : "w-2 bg-white/20 hover:bg-white/40",
                )}
                aria-label={`Jump to slide 0${i}`}
              />
            ))}
          </div>

          {/* Smooth Track Progress Bar */}
          <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
            <motion.div
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-white via-purple-400 to-cyan-400 rounded-full"
            />
          </div>

          {/* Scroll / Swipe Indicator Hint */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Scroll or Drag →</span>
          </span>
        </div>
      </div>
    </section>
  );
}
