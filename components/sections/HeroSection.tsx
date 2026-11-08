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
  ExternalLink,
  Sparkles,
  Star,
  CheckCircle2,
  Award,
  GraduationCap,
  Users,
  Smartphone,
  Compass,
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

// ─── Hero Section with Cinematic 5-Panel Horizontal Pin-Scroll ───────────────

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 5;

  // Track vertical scroll progress across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring physics (Ayman.krd feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Translate horizontal track from 0vw to -400vw across the 5 panels
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * 100}vw`],
  );

  // Sync active slide index (1 to 5)
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

  // Smooth scroll to a section on the page
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
      className="relative h-[480vh] lg:h-[500vh] bg-[#050505] text-white"
    >
      {/* ── Sticky 100vh Viewport ─────────────────────────────────────────── */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050505]"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none" />

        {/* ── The 5-Panel Horizontal Sliding Track ──────────────────────────── */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[500vw] flex-shrink-0"
        >
          {/* ═════════════════════════════════════════════════════════════════
              PANEL 1: IDENTITY & INTRO ("I AM ZANA RAJAB")
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#08080c] via-[#050505] to-[#0d0714]">
            {/* Subtle background grid pattern */}
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

              {/* Giant Name Headline (Ayman.krd Style) */}
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
                Shipped Crown Barber to the Apple App Store, engineered Bahdinan
                Cars, and directed 11 field agents across 817 km² with Runaki.
              </p>

              {/* Location Pill */}
              <div className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-400">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                <span>{siteData.personal.location}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400 font-medium">Available for Hire</span>
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
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => scrollToSlide(2)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.02] shadow-lg shadow-white/10"
                >
                  <span>Explore Showcase</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={siteData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-200 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
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
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Floating Verified Badge on Photo */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/70 backdrop-blur-md px-3 py-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Zana Rajab</p>
                      <p className="text-[10px] text-neutral-400">Software Engineer &amp; Lead</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              PANEL 2: CROWN BARBER STUDIO (GOLD / AMBER THEME)
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#120a02] via-[#080501] to-[#040200]">
            {/* Ambient Gold Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(245, 158, 11, 0.18) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: Description, Metrics, Gold Actions */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-amber-300 w-fit backdrop-blur-md">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span>SELF-FOUNDED APP · APP STORE LIVE</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Crown Barber{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Studio
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base font-medium text-amber-200/80">
                Multi-Branch Mobile Barbershop Booking &amp; Queue Management Platform
              </p>

              {/* Key Specs with Icons */}
              <div className="mb-6 space-y-2.5 max-w-lg">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">4.9 ★ Rating</strong> on Apple App Store with verified Duhok users
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Multi-Branch Architecture:</strong> Real-time slot locking &amp; dynamic waitlists
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Bilingual UX:</strong> Complete Kurdish &amp; English localization with dark aesthetics
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Production Stack:</strong> Flutter, Dart, Firebase Realtime Database &amp; Cloud Messaging
                  </span>
                </div>
              </div>

              {/* Gold Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <a
                  href={siteData.links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-amber-300 hover:scale-[1.02] shadow-lg shadow-amber-500/20"
                >
                  <AppleIcon className="h-4 w-4 text-black" />
                  <span>App Store Live</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href="https://www.instagram.com/crownbarber.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-200"
                >
                  <Instagram className="h-4 w-4 text-amber-400" />
                  <span>@crownbarber.app</span>
                </a>

                <button
                  onClick={() => {
                    scrollToSection("creative");
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("select-creative-brand", {
                          detail: { brand: "crownbarber.app" },
                        }),
                      );
                    }
                  }}
                  className="text-xs font-semibold text-amber-300/80 hover:text-amber-200 underline underline-offset-4"
                >
                  View Figma &amp; Video Ads →
                </button>
              </div>
            </div>

            {/* Right 50%: Crown Barber Phone Mockup Showcase */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              {/* Watermark */}
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-amber-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                02
              </div>

              {/* Glowing Ambient Halo */}
              <div className="absolute w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

              {/* iPhone Mockup Card */}
              <div className="relative group w-52 sm:w-64 md:w-80 lg:w-[340px] aspect-[9/18] rounded-[2.5rem] border-2 border-amber-500/30 bg-gradient-to-b from-[#1a1204] to-[#0a0701] p-3 shadow-2xl shadow-amber-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
                  <Image
                    src="/images/crown-barber/mockup-1.png"
                    alt="Crown Barber Studio App Store Mockup"
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-[2rem] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              PANEL 3: BAHDINAN CARS (ELECTRIC BLUE / COBALT THEME)
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#030d1c] via-[#020710] to-[#010408]">
            {/* Ambient Blue Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(59, 130, 246, 0.18) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: Automotive Platform Info */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-300 w-fit backdrop-blur-md">
                <Smartphone className="h-3 w-3 text-blue-400" />
                <span>ENTERPRISE AUTOMOTIVE · IN STORE REVIEW</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Bahdinan{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                  Cars
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base font-medium text-blue-200/80">
                Interactive Multi-Screen Showroom Marketplace &amp; Vehicle Specs Engine
              </p>

              {/* Key Specs with Icons */}
              <div className="mb-6 space-y-2.5 max-w-lg">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Clean Architecture:</strong> Domain-driven separation with Riverpod state management
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Cloud Functions:</strong> Automated multi-resolution Retina image optimization
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Interactive Showroom:</strong> Real-time WhatsApp dealer inquiries &amp; specs comparator
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Responsive Retina:</strong> Pixel-perfect layouts for iPhone, iPad mini, and iPad Pro
                  </span>
                </div>
              </div>

              {/* Blue Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {siteData.projects[1]?.links?.website && (
                  <a
                    href={siteData.projects[1].links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-blue-400 hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                  >
                    <span>Explore Web App</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  onClick={() => {
                    scrollToSection("creative");
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("select-creative-brand", {
                          detail: { brand: "bahdinan-cars" },
                        }),
                      );
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-blue-200 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200"
                >
                  <Compass className="h-4 w-4 text-blue-400" />
                  <span>Figma Design System</span>
                </button>

                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-xs font-semibold text-blue-300/80 hover:text-blue-200 underline underline-offset-4"
                >
                  Technical Architecture →
                </button>
              </div>
            </div>

            {/* Right 50%: Bahdinan Cars Screen Mockup */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              {/* Watermark */}
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-blue-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                03
              </div>

              {/* Glowing Ambient Halo */}
              <div className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

              {/* Bahdinan Phone Screenshot Container */}
              <div className="relative group w-52 sm:w-64 md:w-80 lg:w-[340px] aspect-[9/18] rounded-[2.5rem] border-2 border-blue-500/30 bg-gradient-to-b from-[#0a182e] to-[#030914] p-3 shadow-2xl shadow-blue-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
                  <Image
                    src="/images/bahdinan-cars/1_iPhone_Medium_1179x2556/1_Home.jpg"
                    alt="Bahdinan Cars iOS App Screen"
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-blue-500/20 rounded-[2rem] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              PANEL 4: ACADEMIC FOUNDATION (ROYAL PURPLE THEME)
              (Matching Ayman.krd University of Chester Purple Slide)
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#120520] via-[#090310] to-[#05010a]">
            {/* Ambient Purple Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.18) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: Academic Credentials & Capstone */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-purple-300 w-fit backdrop-blur-md">
                <GraduationCap className="h-3 w-3 text-purple-400" />
                <span>UNIVERSITY OF DUHOK · CLASS OF 2024</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                BSc in{" "}
                <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Computer Science
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base font-medium text-purple-200/80">
                Foundational Systems Engineering &amp; &apos;Excellent&apos; Capstone Project
              </p>

              {/* Key Highlights */}
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
                    <strong className="text-white">4-Year Rigorous Curriculum:</strong> Algorithms, Relational Databases, Networks &amp; OS
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Central University Library:</strong> Intensive IT &amp; Database Administration Internship
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <Award className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Enterprise Systems:</strong> Network uptime, database backups, and hardware diagnostics
                  </span>
                </div>
              </div>

              {/* Purple Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSection("education")}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-purple-400 hover:scale-[1.02] shadow-lg shadow-purple-500/25"
                >
                  <GraduationCap className="h-4 w-4 text-white" />
                  <span>View Academic Record</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a
                  href={siteData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-200 hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-200"
                >
                  <Linkedin className="h-4 w-4 text-purple-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Right 50%: Graduation Portrait of Zana */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              {/* Watermark */}
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-purple-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                04
              </div>

              {/* Glowing Purple Halo */}
              <div className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              {/* Authentic Graduation Photo Card */}
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

                  {/* University Seal Pill */}
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

          {/* ═════════════════════════════════════════════════════════════════
              PANEL 5: HIGH-IMPACT FIELD LEADERSHIP (EMERALD GREEN THEME)
              (Matching Ayman.krd Green Award Slide in User Screenshot)
             ═════════════════════════════════════════════════════════════════ */}
          <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#04160d] via-[#020b06] to-[#010503]">
            {/* Ambient Emerald Radial Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 75% 50%, rgba(16, 185, 129, 0.18) 0%, transparent 60%)",
              }}
            />

            {/* Left 50%: Field Leadership Metrics */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-emerald-300 w-fit backdrop-blur-md">
                <Users className="h-3 w-3 text-emerald-400" />
                <span>FIELD LEADERSHIP &amp; OPERATIONAL EXCELLENCE</span>
              </div>

              {/* Giant Title */}
              <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Runaki Duhok{" "}
                <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Field Lead
                </span>
              </h2>

              <p className="mb-5 text-sm sm:text-base font-medium text-emerald-200/80">
                Governorate-Scale Biometric Field Operations &amp; Team Direction
              </p>

              {/* 4-Box High-Impact Metrics Grid (Ayman.krd Card Style) */}
              <div className="mb-6 grid grid-cols-2 gap-3 max-w-lg">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    11
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    Field Agents Led &amp; Coached Daily
                  </span>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-3 sm:p-4 backdrop-blur-md">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    817 km²
                  </span>
                  <span className="text-[11px] sm:text-xs text-neutral-300">
                    Geographic Sector Covered in Duhok
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

              {/* Emerald Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <button
                  onClick={() => scrollToSection("experience")}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
                >
                  <Users className="h-4 w-4 text-black" />
                  <span>View Leadership Breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a
                  href={siteData.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  <span>Hire Zana Directly</span>
                </a>
              </div>
            </div>

            {/* Right 50%: Authentic Suit Portrait of Zana */}
            <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
              {/* Watermark */}
              <div
                className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-emerald-500/[0.05] select-none tracking-tighter"
                aria-hidden="true"
              >
                05
              </div>

              {/* Glowing Emerald Halo */}
              <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

              {/* Authentic Professional Suit Photo */}
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

                  {/* Leadership Badge */}
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
        </motion.div>

        {/* ── Luxury Floating Pin Controller Pill (Ayman.krd Agency Signature) ── */}
        <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
          {/* Active Slide Counter */}
          <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
            <span
              className={cn(
                "transition-colors duration-300",
                activeSlide === 1 && "text-white",
                activeSlide === 2 && "text-amber-400",
                activeSlide === 3 && "text-blue-400",
                activeSlide === 4 && "text-purple-400",
                activeSlide === 5 && "text-emerald-400",
              )}
            >
              0{activeSlide}
            </span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">0{totalSlides}</span>
          </span>

          {/* Quick Interactive Slide Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  activeSlide === i
                    ? cn(
                        "w-6 shadow-md",
                        i === 1 && "bg-white shadow-white/50",
                        i === 2 && "bg-amber-400 shadow-amber-400/50",
                        i === 3 && "bg-blue-400 shadow-blue-400/50",
                        i === 4 && "bg-purple-400 shadow-purple-400/50",
                        i === 5 && "bg-emerald-400 shadow-emerald-400/50",
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
              className="h-full bg-gradient-to-r from-white via-amber-400 to-emerald-400 rounded-full"
            />
          </div>

          {/* Scroll / Swipe Indicator Hint */}
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Scroll or Drag →</span>
          </span>
        </div>
      </div>
    </section>
  );
}
