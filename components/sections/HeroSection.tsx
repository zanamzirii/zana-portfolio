"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  MapPin,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { siteData } from "@/lib/data";
import { AppleIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import {
  fadeUp,
  fadeIn,
  staggerContainer,
  smoothTransition,
} from "@/lib/animations";

// ─── Role Cycler from Official CV ─────────────────────────────────────────────

const cvRoles = [
  "Full-Stack & Mobile Developer",
  "Team Leader & Operations",
  "QA & Software Testing Engineer",
  "Graphic Design & Video Editing",
];

function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <div className="relative h-8 sm:h-9 overflow-hidden w-full flex items-center justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-amber-300 tracking-tight"
        >
          {roles[index]}
          <span className="ml-2 inline-block h-5 sm:h-6 w-0.5 animate-blink bg-amber-400 align-middle" />
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

// ─── Hero Section (Option A: Single Powerful 100vh Full-Screen Showstopper) ──

export function HeroSection() {
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

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center px-6 pt-20 sm:pt-24 lg:pt-0 pb-12 overflow-hidden bg-[#050505] text-white"
    >
      {/* Background Subtle Grid & Radial Glow Mesh */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99, 102, 241, 0.12) 0%, #050505 75%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Layout */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto max-w-6xl w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Cycling Roles, CV Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            
            {/* Top Luxury Badge */}
            <motion.div
              variants={fadeUp}
              transition={smoothTransition}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono text-neutral-300 backdrop-blur-md shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PORTFOLIO 2026 · COMPUTER SCIENCE BSc</span>
            </motion.div>

            {/* Giant Name Headline */}
            <motion.h1
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.06 }}
              className="mb-3 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              I AM{" "}
              <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                ZANA RAJAB
              </span>
            </motion.h1>

            {/* Official CV Roles Cycler */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.12 }}
              className="mb-4 w-full"
            >
              <RoleCycler roles={cvRoles} />
            </motion.div>

            {/* Official CV Professional Profile Bio */}
            <motion.p
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.18 }}
              className="mb-6 max-w-xl text-sm sm:text-base text-neutral-300/90 leading-relaxed font-normal"
            >
              Full-Stack &amp; Mobile Application Developer and Computer Science graduate from Duhok, Kurdistan Region, Iraq.
              Engineered, designed, and deployed Crown Barber across iOS, Android, and Web, alongside interactive digital solutions and governorate-scale field team leadership.
            </motion.p>

            {/* Location & Availability Pill */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.22 }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-neutral-300 backdrop-blur-md"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>Duhok, Kurdistan Region, Iraq</span>
              <span className="text-neutral-600">•</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available for High-Impact Roles
              </span>
            </motion.div>

            {/* Real High-Contrast Social Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.26 }}
              className="mb-8 flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center lg:justify-start"
            >
              {socials.map(({ label, href, Icon, hoverBg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-300 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm ${hoverBg}`}
                >
                  <Icon className="h-5 w-5 transition-colors" />
                </a>
              ))}
            </motion.div>

            {/* Direct Action CTAs */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.3 }}
              className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.02] shadow-xl shadow-white/10"
              >
                <Smartphone className="h-4 w-4 text-black" />
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href={siteData.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-neutral-200 hover:bg-white/10 hover:border-white/30 transition-all duration-200 shadow-sm"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                <span>WhatsApp Directly</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: High-Resolution Authentic Portrait Card */}
          <motion.div
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.16 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative group w-52 sm:w-64 md:w-72 lg:w-80 xl:w-[350px]">
              {/* Luxury Ambient Glow Halo */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-accent/30 via-indigo-500/20 to-transparent opacity-60 blur-2xl group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

              {/* Watermark 01 */}
              <div
                className="pointer-events-none absolute -right-6 -top-8 font-black font-mono text-8xl lg:text-9xl text-white/[0.035] select-none tracking-tighter"
                aria-hidden="true"
              >
                01
              </div>

              {/* Card Container */}
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0e0e14]/90 shadow-2xl p-3 backdrop-blur-xl transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-900">
                  <Image
                    src="/images/personal/zana.jpg"
                    alt="Zana Rajab Abdulrahman"
                    fill
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 380px"
                    className="object-cover object-top"
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Floating Verified Badge */}
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/15 bg-black/75 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Zana Rajab</p>
                      <p className="text-[10px] text-neutral-400">Software Engineer &amp; Team Lead</p>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Floating Scroll Indicator Arrow */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6, duration: 0.5 }}
        onClick={() => scrollToSection("projects")}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-20 group"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-hover:text-accent transition-colors flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-accent" />
          Scroll to Projects
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-neutral-400 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
