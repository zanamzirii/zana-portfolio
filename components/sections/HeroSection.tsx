"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ArrowDown, Instagram, MapPin } from "lucide-react";
import { siteData } from "@/lib/data";
import { fadeUp, fadeIn, staggerContainer, smoothTransition } from "@/lib/animations";
import { AppleIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

// ─── Role Cycler ─────────────────────────────────────────────────────────────

function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <div className="relative h-8 md:h-10 overflow-hidden w-full flex items-center justify-center lg:justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-lg font-light text-textSecondary md:text-2xl"
        >
          {roles[index]}
          <span className="ml-1.5 inline-block h-4 md:h-5 w-0.5 animate-blink bg-accent align-middle" />
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── Real Branded Social Links ───────────────────────────────────────────────

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

// ─── Hero Section ────────────────────────────────────────────────────────────

export function HeroSection() {
  const { personal } = siteData;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 sm:pt-20 lg:pt-24 pb-12 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-100"
        aria-hidden="true"
      />

      {/* Radial fade at center so grid recedes */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-radial"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #050505 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main Content Layout */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto max-w-5xl w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Column: Headline, Titles & Socials */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0 }}
              className="mb-3 sm:mb-4 font-bold leading-tight tracking-tight text-textPrimary text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Zana Rajab<br className="hidden sm:inline" /> Abdulrahman
            </motion.h1>

            {/* Cycling role */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.12 }}
              className="mb-3 sm:mb-4 w-full"
            >
              <RoleCycler roles={personal.roles} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.18 }}
              className="mb-5 max-w-lg text-sm text-textSecondary md:text-base leading-relaxed"
            >
              {personal.tagline}
            </motion.p>

            {/* Location Pill */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.22 }}
              className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3 py-1 text-xs text-textSecondary"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" />
              <span>{personal.location}</span>
            </motion.div>

            {/* Real, High-Contrast Branded Social Buttons */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.28 }}
              className="flex items-center gap-3 sm:gap-4"
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
          </div>

          {/* Right Column: High-Resolution Portrait Card */}
          <motion.div
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.14 }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative group w-52 sm:w-60 md:w-72 lg:w-80">
              {/* Ambient purple/blue glow halo */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-accent/30 via-indigo-500/20 to-transparent opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl p-2.5 transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-elevated">
                  <Image
                    src="/images/personal/zana.jpg"
                    alt="Zana Rajab Abdulrahman"
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 280px, 340px"
                    priority
                    className="object-cover object-top"
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate={visible ? "animate" : { opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-textMuted">
        scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-4 w-4 text-textMuted" />
      </motion.div>
    </motion.div>
  );
}
