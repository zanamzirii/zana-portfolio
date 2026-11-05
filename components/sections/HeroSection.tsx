"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ExternalLink, MessageCircle, ArrowDown, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/lib/data";
import { fadeUp, fadeIn, staggerContainer, smoothTransition } from "@/lib/animations";

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
    <div className="relative h-8 md:h-10 overflow-hidden w-full flex items-center justify-center">
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

// ─── Social Links ─────────────────────────────────────────────────────────────

const socials = [
  { label: "GitHub",    href: siteData.links.github,   Icon: Github,        hoverColor: "hover:text-white"       },
  { label: "LinkedIn",  href: siteData.links.linkedin,  Icon: Linkedin,      hoverColor: "hover:text-[#0A66C2]"  },
  { label: "Instagram", href: "https://www.instagram.com/zanarajab.builds", Icon: Instagram, hoverColor: "hover:text-[#E4405F]" },
  { label: "App Store", href: siteData.links.appStore,  Icon: ExternalLink,  hoverColor: "hover:text-accent"     },
  { label: "WhatsApp",  href: siteData.links.whatsapp,  Icon: MessageCircle, hoverColor: "hover:text-[#25D366]"  },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

export function HeroSection() {
  const { personal } = siteData;

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 pb-12 overflow-hidden"
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
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #080808 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto max-w-4xl w-full text-center"
      >
        {/* Availability badge */}
        <motion.div
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-1.5 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-textSecondary">
            {personal.availabilityNote}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.08 }}
          className="mb-5 font-bold leading-none tracking-tight text-textPrimary"
          style={{ fontSize: "clamp(2.5rem, 9vw, 6.5rem)" }}
        >
          {personal.name.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </motion.h1>

        {/* Cycling role */}
        <motion.div
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.16 }}
          className="mb-5 flex justify-center"
        >
          <RoleCycler roles={personal.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.22 }}
          className="mx-auto mb-8 max-w-lg text-sm text-textSecondary md:text-base leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* 2 Clean & Focused Action Buttons */}
        <motion.div
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.28 }}
          className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work →
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social icons */}
        <motion.div
          variants={fadeUp}
          transition={{ ...smoothTransition, delay: 0.34 }}
          className="flex items-center justify-center gap-5"
        >
          {socials.map(({ label, href, Icon, hoverColor }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`text-textMuted transition-colors duration-200 ${hoverColor}`}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
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
