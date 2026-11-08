"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Server,
  Rocket,
  PenTool,
  Film,
  ShieldCheck,
  Code2,
  Users,
  Layers,
  Boxes,
  Languages,
  Database,
  Shield,
  HardDrive,
  KeyRound,
  Lock,
  Workflow,
  Layout,
  Sparkles,
  Palette,
  Video,
  Cpu,
  Mic,
  CheckCircle2,
  MapPin,
  BarChart3,
  Globe,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteData } from "@/lib/data";
import {
  scaleIn,
  staggerContainer,
  fadeUp,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";
import { AppleIcon } from "@/components/ui/BrandIcons";
import {
  FlutterIcon,
  DartIcon,
  SwiftIcon,
  FirebaseIcon,
  TypeScriptIcon,
  NodeIcon,
  ReactIcon,
  NextjsIcon,
  FigmaIcon,
  PremiereIcon,
  AfterEffectsIcon,
  IllustratorIcon,
  PhotoshopIcon,
  GitIcon,
  AndroidIcon,
  GooglePlayIcon,
  TestFlightIcon,
  VSCodeIcon,
  PostmanIcon,
  CapCutIcon,
  XcodeIcon,
  AndroidStudioIcon,
} from "@/components/ui/TechIcons";

// ─── Category Visual Styling ──────────────────────────────────────────────────

const categoryStyles: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    borderGlow: string;
    lineGlow: string;
    iconBg: string;
  }
> = {
  "Mobile Architecture": {
    icon: Smartphone,
    accentColor: "text-blue-400",
    borderGlow: "group-hover:border-blue-500/40",
    lineGlow: "from-blue-500 via-indigo-400 to-transparent",
    iconBg: "bg-blue-500/10 border-blue-500/25 text-blue-400",
  },
  "Cloud, Backend & Web": {
    icon: Server,
    accentColor: "text-amber-400",
    borderGlow: "group-hover:border-amber-500/40",
    lineGlow: "from-amber-500 via-orange-400 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
  },
  "Backend & Cloud Systems": {
    icon: Server,
    accentColor: "text-amber-400",
    borderGlow: "group-hover:border-amber-500/40",
    lineGlow: "from-amber-500 via-orange-400 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
  },
  "IDEs & Store Release": {
    icon: Rocket,
    accentColor: "text-sky-400",
    borderGlow: "group-hover:border-sky-500/40",
    lineGlow: "from-sky-500 via-blue-400 to-transparent",
    iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
  },
  "IDEs, DevOps & Store Release": {
    icon: Rocket,
    accentColor: "text-sky-400",
    borderGlow: "group-hover:border-sky-500/40",
    lineGlow: "from-sky-500 via-blue-400 to-transparent",
    iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
  },
  "DevOps & Store Release": {
    icon: Rocket,
    accentColor: "text-sky-400",
    borderGlow: "group-hover:border-sky-500/40",
    lineGlow: "from-sky-500 via-blue-400 to-transparent",
    iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
  },
  "UI/UX & Product Design": {
    icon: PenTool,
    accentColor: "text-purple-400",
    borderGlow: "group-hover:border-purple-500/40",
    lineGlow: "from-purple-500 via-pink-400 to-transparent",
    iconBg: "bg-purple-500/10 border-purple-500/25 text-purple-400",
  },
  "Video Editing & Motion": {
    icon: Film,
    accentColor: "text-fuchsia-400",
    borderGlow: "group-hover:border-fuchsia-500/40",
    lineGlow: "from-fuchsia-500 via-violet-400 to-transparent",
    iconBg: "bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-400",
  },
  "QA, Security & Leadership": {
    icon: ShieldCheck,
    accentColor: "text-emerald-400",
    borderGlow: "group-hover:border-emerald-500/40",
    lineGlow: "from-emerald-500 via-teal-400 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
  },
};

// ─── Authentic Brand Icon Matcher ─────────────────────────────────────────────

function getTechIcon(name: string) {
  const lower = name.toLowerCase();

  // Mobile
  if (lower.includes("flutter")) return FlutterIcon;
  if (lower.includes("dart")) return DartIcon;
  if (lower.includes("swift")) return SwiftIcon;
  if (lower.includes("apple") || lower.includes("ios") || lower.includes("app store"))
    return AppleIcon;
  if (lower.includes("android studio")) return AndroidStudioIcon;
  if (lower.includes("android")) return AndroidIcon;
  if (lower.includes("google play")) return GooglePlayIcon;
  if (lower.includes("riverpod")) return Layers;
  if (lower.includes("clean architecture") || lower.includes("freezed")) return Boxes;
  if (lower.includes("rtl")) return Languages;

  // Cloud & Backend
  if (lower.includes("firebase") || lower.includes("cloud function")) return FirebaseIcon;
  if (lower.includes("typescript")) return TypeScriptIcon;
  if (lower.includes("node")) return NodeIcon;
  if (lower.includes("react")) return ReactIcon;
  if (lower.includes("next")) return NextjsIcon;
  if (lower.includes("firestore")) return Database;
  if (lower.includes("app check")) return Shield;
  if (lower.includes("storage") || lower.includes("cdn")) return HardDrive;
  if (lower.includes("api")) return PostmanIcon;
  if (lower.includes("otp") || lower.includes("auth")) return KeyRound;

  // IDEs & Store Release
  if (lower.includes("testflight")) return TestFlightIcon;
  if (lower.includes("git")) return GitIcon;
  if (lower.includes("codemagic") || lower.includes("ci/cd")) return Workflow;
  if (lower.includes("provisioning") || lower.includes("code signing")) return Lock;
  if (lower.includes("vscode") || lower.includes("vs code")) return VSCodeIcon;
  if (lower.includes("xcode")) return XcodeIcon;
  if (lower.includes("android studio")) return AndroidStudioIcon;

  // Design
  if (lower.includes("figma")) return FigmaIcon;
  if (lower.includes("illustrator")) return IllustratorIcon;
  if (lower.includes("photoshop")) return PhotoshopIcon;
  if (lower.includes("wirefram")) return Layout;
  if (lower.includes("prototype")) return Globe;
  if (lower.includes("design system") || lower.includes("systems")) return Boxes;
  if (lower.includes("brand") || lower.includes("style")) return Sparkles;
  if (lower.includes("visual") || lower.includes("canva")) return Palette;

  // Video
  if (lower.includes("premiere")) return PremiereIcon;
  if (lower.includes("after effects")) return AfterEffectsIcon;
  if (lower.includes("capcut")) return CapCutIcon;
  if (lower.includes("commercial")) return Film;
  if (lower.includes("motion")) return Video;
  if (lower.includes("ai video") || lower.includes("prompting")) return Cpu;
  if (lower.includes("voiceover") || lower.includes("audio")) return Mic;

  // QA & Operations
  if (lower.includes("functional") || lower.includes("qa")) return ShieldCheck;
  if (lower.includes("regression") || lower.includes("security")) return ShieldCheck;
  if (lower.includes("matrix") || lower.includes("device")) return Smartphone;
  if (lower.includes("uat") || lower.includes("acceptance")) return CheckCircle2;
  if (lower.includes("rbac")) return Lock;
  if (lower.includes("coordination") || lower.includes("agent") || lower.includes("leader"))
    return Users;
  if (lower.includes("route") || lower.includes("logistics")) return MapPin;
  if (lower.includes("analytics") || lower.includes("excel")) return BarChart3;

  return Code2;
}

// ─── Skills Section Component ─────────────────────────────────────────────────

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-[#09090b] relative overflow-hidden">
      {/* Subtle top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">

        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-14 text-center"
        >
          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="mb-4 flex justify-center"
          >
            <SectionLabel>Technical &amp; Creative Stack</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Core Technologies &amp; Toolchain
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mt-3 text-sm md:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed"
          >
            Real production frameworks, official IDEs, creative design suites, and operational methodologies I use daily to build and ship software.
          </motion.p>
        </motion.div>

        {/* 6-Category Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {siteData.skills.map((category, i) => {
            const style = categoryStyles[category.category] ?? {
              icon: Code2,
              accentColor: "text-accent",
              borderGlow: "group-hover:border-accent/40",
              lineGlow: "from-accent to-transparent",
              iconBg: "bg-accentMuted border-accentBorder text-accent",
            };
            const CategoryIcon = style.icon;

            return (
              <motion.div
                key={category.category}
                variants={scaleIn}
                transition={{ ...smoothTransition, delay: i * 0.06 }}
                className={`group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0c10]/95 backdrop-blur-xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-[#121217] overflow-hidden ${style.borderGlow}`}
              >
                {/* Editorial Watermark Number (Ayman.krd Luxury Style) */}
                <div
                  className="pointer-events-none absolute top-3 right-5 font-black font-mono text-7xl text-white/[0.035] select-none z-0 tracking-tighter"
                  aria-hidden="true"
                >
                  0{i + 1}
                </div>

                {/* Accent Top Line Glow */}
                <div
                  className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${style.lineGlow}`}
                />

                <div className="relative z-10">
                  {/* Category Header with Prominent Glowing Squircle Icon (Ayman.krd Style) */}
                  <div className="mb-6 flex flex-col items-start gap-4">
                    <div
                      className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border shadow-xl transition-transform duration-300 group-hover:scale-105 ${style.iconBg}`}
                    >
                      <CategoryIcon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                        {category.category}
                      </h3>
                      <span className="text-xs font-medium text-neutral-400">
                        {category.items.length} verified tools &amp; frameworks
                      </span>
                    </div>
                  </div>

                  {/* Skill Badges with Authentic Brand Icons */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {category.items.map((item) => {
                      const IconComponent = getTechIcon(item);

                      return (
                        <div
                          key={item}
                          className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs sm:text-[13px] font-medium text-neutral-200 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.08] hover:text-white cursor-default"
                        >
                          <IconComponent className="h-5 w-5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Intentional Bottom Footer */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-pulse" />
                    Production Stack
                  </span>
                  <span className="font-mono text-neutral-500 uppercase tracking-wider">Verified</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
