"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Star,
  CheckCircle2,
  Smartphone,
  Compass,
  Coffee,
} from "lucide-react";
import { AppleIcon } from "@/components/ui/BrandIcons";
import { siteData } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = 4;

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

  const crownBarber = siteData.projects[0];
  const bahdinanCars = siteData.projects[1];
  const timeCafe = siteData.projects[2];

  return (
    <section id="projects" className="relative bg-[#050505] text-textPrimary">
      {/* ── Horizontal Pin-Scroll Track (Title Slide + 3 Real Platforms) ───── */}
      <div ref={containerRef} className="relative h-[400vh] lg:h-[420vh]">
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
                  ? "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.2) 0%, transparent 60%)"
                  : activeSlide === 2
                  ? "radial-gradient(circle at 70% 50%, rgba(245,158,11,0.25) 0%, transparent 60%)"
                  : activeSlide === 3
                  ? "radial-gradient(circle at 70% 50%, rgba(59,130,246,0.25) 0%, transparent 60%)"
                  : "radial-gradient(circle at 70% 50%, rgba(217,119,6,0.25) 0%, transparent 60%)",
            }}
            aria-hidden="true"
          />

          {/* Sliding Track */}
          <motion.div
            style={{ x }}
            className="flex h-full w-[400vw] flex-shrink-0"
          >
            {/* ═══════════════════════════════════════════════════════════════
                SLIDE 01: CINEMATIC TITLE SLIDE (AYMAN.KRD STYLE)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex items-center justify-center overflow-hidden bg-black">
              {/* Background Moody Workspace Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/workspace-bg.jpg"
                  alt="Developer Workspace"
                  fill
                  priority
                  className="object-cover opacity-20 filter blur-[2px] scale-105"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/75" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
              </div>

              {/* Centered Content */}
              <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-mono font-semibold text-blue-300 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>PRODUCTION SYSTEMS &amp; SOFTWARE ARCHITECTURE</span>
                </div>

                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-5 select-none">
                  My <span className="text-blue-500">Projects</span>
                </h2>

                <p className="max-w-2xl text-center text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed font-normal mb-8">
                  Proudly engineered production platforms for startups, enterprises, and local businesses.
                  Every project is built with precision, Clean Architecture, and shipped to the highest standards.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => scrollToSlide(2)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-blue-600/30"
                  >
                    <span>View Projects</span>
                    <span className="text-blue-200">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                PROJECT 01: CROWN BARBER STUDIO (GOLD / AMBER)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#120a02] via-[#080501] to-[#040200]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-amber-300 w-fit backdrop-blur-md">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>PROJECT 01 · APP STORE LIVE</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Crown Barber{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                    Studio
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-amber-200/80">
                  {crownBarber?.subtitle || "Multi-Branch Mobile Barbershop Booking & Queue Management Platform"}
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Solo-Engineered Startup:</strong> Evaluated as &quot;Excellent&quot; graduation project, scaled to production
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">4.9 ★ Rating:</strong> Live on Apple App Store, Google Play Store, and Web
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Multi-Role RBAC:</strong> Customers, barbers, branch owners, and system administrators
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Rigorous QA Cycle:</strong> Functional, regression, UAT, cross-device, and API testing
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {crownBarber?.links?.appStore && (
                    <a
                      href={crownBarber.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-amber-300 hover:scale-[1.02] shadow-lg shadow-amber-500/20"
                    >
                      <AppleIcon className="h-4 w-4 text-black" />
                      <span>App Store Live</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {crownBarber?.links?.website && (
                    <a
                      href={crownBarber.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-200"
                    >
                      <span>Web Platform</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <a
                    href="#creative"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("creative");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
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
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-amber-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  02
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

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

            {/* ═══════════════════════════════════════════════════════════════
                PROJECT 02: BAHDINAN CARS (ELECTRIC BLUE / COBALT)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#030d1c] via-[#020710] to-[#010408]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-blue-300 w-fit backdrop-blur-md">
                  <Smartphone className="h-3 w-3 text-blue-400" />
                  <span>ENTERPRISE AUTOMOTIVE · IN STORE REVIEW</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Bahdinan{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                    Cars
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-blue-200/80">
                  {bahdinanCars?.subtitle || "Interactive Multi-Screen Showroom Marketplace & Vehicle Specs Engine"}
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clean Architecture:</strong> Riverpod, GoRouter, and Freezed for bulletproof predictability
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cloud Functions v2:</strong> Automated vehicle lifecycle, OTP auth &amp; subscription tiers
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">App Store Reviewed:</strong> Successfully passed Apple App Store Review for production release
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Live Dealership Routing:</strong> USD/IQD currency engine &amp; direct WhatsApp inquiry
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  {bahdinanCars?.links?.website && (
                    <a
                      href={bahdinanCars.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:bg-blue-400 hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                    >
                      <span>Explore Web App</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <a
                    href="#creative"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("creative");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
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
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-blue-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  03
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

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

            {/* ═══════════════════════════════════════════════════════════════
                PROJECT 03: TIME CAFE ZAXO (WARM BRONZE / ORANGE)
               ═══════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 relative flex flex-col lg:flex-row overflow-hidden bg-gradient-to-br from-[#170e04] via-[#0b0601] to-[#050300]">
              <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 pt-20 lg:pt-0 z-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-semibold text-orange-300 w-fit backdrop-blur-md">
                  <Coffee className="h-3 w-3 text-orange-400" />
                  <span>HOSPITALITY SYSTEM · LIVE PRODUCTION</span>
                </div>

                <h2 className="mb-2 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                  Time Cafe{" "}
                  <span className="bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                    Zaxo
                  </span>
                </h2>

                <p className="mb-5 text-sm sm:text-base font-medium text-orange-200/80">
                  {timeCafe?.subtitle || "Digital QR Menu & Real-Time Tablet Order Administration System"}
                </p>

                <div className="mb-6 space-y-2.5 max-w-lg">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">End-to-End Client Delivery:</strong> Built software infrastructure and custom physical QR stands
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">QR Digital Menu Web App:</strong> Fast mobile-optimized digital ordering for guests
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Real-Time Admin Dashboard:</strong> Secure menu pricing, availability &amp; kitchen orders
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Live in Duhok:</strong> Successfully deployed and operating in Zaxo
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <a
                    href="https://timecafezaxo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all duration-200 hover:bg-orange-400 hover:scale-[1.02] shadow-lg shadow-orange-500/25"
                  >
                    <span>View Live Menu</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

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
                    className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-orange-200 hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-200"
                  >
                    <span>View QR Stand Collateral</span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden">
                <div
                  className="pointer-events-none absolute right-6 top-10 font-black font-mono text-8xl lg:text-9xl text-orange-500/[0.05] select-none tracking-tighter"
                  aria-hidden="true"
                >
                  04
                </div>

                <div className="absolute w-72 h-72 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

                <div className="relative group w-52 sm:w-64 md:w-80 lg:w-[340px] aspect-[9/18] rounded-[2.5rem] border-2 border-orange-500/30 bg-gradient-to-b from-[#1c1105] to-[#0a0601] p-3 shadow-2xl shadow-orange-950/50 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                  <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
                    <Image
                      src="/images/time-cafe/phone/menu-iPhone_17_Pro_Max.png"
                      alt="Time Cafe Digital Menu Interface"
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-orange-500/20 rounded-[2rem] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Luxury Floating Pin Controller Pill (Projects: 01 to 04) ─── */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-2xl shadow-2xl z-30 pointer-events-auto">
            <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
              <span
                className={cn(
                  "transition-colors duration-300",
                  activeSlide === 1 && "text-blue-400",
                  activeSlide === 2 && "text-amber-400",
                  activeSlide === 3 && "text-blue-400",
                  activeSlide === 4 && "text-orange-400",
                )}
              >
                0{activeSlide}
              </span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400">0{totalSlides}</span>
            </span>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  onClick={() => scrollToSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === i
                      ? cn(
                          "w-6 shadow-md",
                          i === 1 && "bg-blue-400 shadow-blue-400/50",
                          i === 2 && "bg-amber-400 shadow-amber-400/50",
                          i === 3 && "bg-blue-400 shadow-blue-400/50",
                          i === 4 && "bg-orange-400 shadow-orange-400/50",
                        )
                      : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={
                    i === 1
                      ? "Jump to Projects Overview"
                      : `Jump to Project 0${i - 1}`
                  }
                />
              ))}
            </div>

            <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden hidden xs:block">
              <motion.div
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-blue-500 via-amber-400 via-blue-500 to-orange-400 rounded-full"
              />
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Scroll or Drag →</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
