"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, GraduationCap, Award, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import {
  fadeUp,
  fadeLeft,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";

const personalPhotos = [
  {
    src: "/images/personal/zana.jpg",
    alt: "Zana Rajab Abdulrahman — Executive Portrait",
  },
  {
    src: "/images/personal/zana-suit-full-body.jpg",
    alt: "Zana Rajab Abdulrahman — Full-Body Suit Presence",
  },
];

const infoChips = [
  { icon: MapPin,         text: "Duhok, Kurdistan Region, Iraq" },
  { icon: GraduationCap,  text: "BSc Computer Science — Excellent Capstone" },
  { icon: Award,          text: "Lead Mobile & Full-Stack Developer" },
  { icon: Globe,          text: "Open to Remote & Relocation" },
];

export function AboutSection() {
  const [photoIndex, setPhotoIndex] = useState(0);

  // Subtle auto-advance every 8 seconds if not interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % personalPhotos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % personalPhotos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + personalPhotos.length) % personalPhotos.length);
  };

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* ── Photo Gallery Card ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            transition={{ ...smoothTransition, delay: 0.1 }}
            className="flex flex-col items-center lg:w-2/5 lg:items-start"
          >
            <div className="group relative w-full max-w-sm">
              {/* Subtle ambient glow behind card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/25 via-indigo-500/10 to-transparent opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

              {/* Main Photo Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl p-2 transition-transform duration-500 ease-out">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-elevated">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photoIndex}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={personalPhotos[photoIndex].src}
                        alt={personalPhotos[photoIndex].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        priority
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Subtle bottom vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                  {/* Hover navigation arrows */}
                  <button
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 active:scale-95 z-20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 active:scale-95 z-20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Minimalist Indicator Dots (No text labels) */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {personalPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      photoIndex === i
                        ? "w-6 bg-accent"
                        : "w-2 bg-border hover:bg-borderLight"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Story & Credential Details ─────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewportOnce}
            className="lg:w-3/5"
          >
            <motion.div variants={fadeUp} transition={smoothTransition}>
              <SectionLabel className="mb-4">About Me</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.06 }}
              className="mb-6 text-3xl font-bold tracking-tight text-textPrimary md:text-5xl text-balance"
            >
              Building things since I could touch a keyboard.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.12 }}
              className="space-y-4 text-base text-textSecondary leading-relaxed"
            >
              <p>
                I&rsquo;m a Computer Science graduate from Duhok, Kurdistan Region, Iraq. I build software from first principles — combining rigorous mobile engineering with human-centric UI/UX design, end-to-end video motion production, and high-stakes operational leadership.
              </p>
              <p>
                As <span className="text-textPrimary font-semibold">Lead Developer at Bahdinan Cars</span>, I architected an enterprise automotive marketplace across iOS, Android, and Web using Flutter, Riverpod, and 2nd Gen Firebase Cloud Functions. As <span className="text-textPrimary font-semibold">Founder of Crown Barber</span>, I engineered a multi-role capstone platform from scratch and published it live to the Apple App Store, owning the entire product lifecycle from Figma wireframes to store approval.
              </p>
              <p>
                I also direct client deliveries like <span className="text-textPrimary font-semibold">Time Cafe Zaxo</span> (bilingual digital dining &amp; QR architecture) and coordinated 11 field agents across 817 km² on the Runaki Project with 18,000+ completed field visits. I work fast, obsess over quality, and ship software that performs in production.
              </p>
            </motion.div>

            {/* Distinction chips */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {infoChips.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 backdrop-blur-sm px-4 py-2.5 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-textSecondary">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              variants={fadeUp}
              transition={{ ...smoothTransition, delay: 0.24 }}
              className="mt-8 flex items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let&rsquo;s Work Together →
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Projects
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
