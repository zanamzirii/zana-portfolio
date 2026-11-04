"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Compass,
  CheckCircle,
  FileSpreadsheet,
  TrendingUp,
  Layers,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCounter } from "@/components/ui/StatCounter";
import { siteData } from "@/lib/data";
import {
  fadeUp,
  staggerContainer,
  smoothTransition,
  viewportOnce,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

export function StatsSection() {
  const [selectedPhase, setSelectedPhase] = useState<"all" | "phase1" | "phase2">("all");
  const { headline, phase1, phase2 } = siteData.kyc;

  return (
    <section id="stats" className="py-20 md:py-32 bg-surface relative overflow-hidden">
      {/* Background ambient radial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at top center, rgba(99,102,241,0.15) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp} transition={smoothTransition} className="mb-4 flex justify-center">
            <SectionLabel>Field Operations &amp; Leadership</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.06 }}
            className="text-3xl font-bold tracking-tight text-textPrimary md:text-5xl"
          >
            Leading at Scale — Runaki Project
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ ...smoothTransition, delay: 0.12 }}
            className="mx-auto mt-4 max-w-2xl text-base text-textSecondary"
          >
            Coordinated 11 field agents across an 817 km² service area for the KRG Electricity Distribution Initiative. 100% on-time milestone delivery across both campaign phases.
          </motion.p>
        </motion.div>

        {/* 4 Main Headline Counters */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mb-12">
          {[
            { value: headline.placesVisited, label: "Places Visited", suffix: "" },
            { value: headline.doorsOpened, label: "Doors Opened", suffix: "", badge: `${headline.doorOpenRate} Open Rate` },
            { value: headline.kycCompleted, label: "KYC Completed", suffix: "" },
            { value: headline.areaCoveredKm2, label: "km² Territory", suffix: " km²", badge: `${headline.agentsLed} Field Agents` },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...smoothTransition, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm text-center shadow-lg"
            >
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
              {stat.badge && (
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-accentBorder bg-accentMuted text-[11px] font-semibold text-accent">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.badge}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Campaign Breakdown & Phase Deep-Dive Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...smoothTransition, delay: 0.2 }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-border/80">
            <div>
              <h3 className="text-xl font-bold text-textPrimary flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-accent" />
                Verified Operational Metrics (Zone 1)
              </h3>
              <p className="text-xs text-textSecondary mt-1">
                Data consolidated daily via Microsoft Excel, Google Sheets, and Google Earth spatial tracking.
              </p>
            </div>

            {/* Phase Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface self-start md:self-auto">
              {[
                { id: "all", label: "Combined Total" },
                { id: "phase1", label: "Phase 1" },
                { id: "phase2", label: "Phase 2" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedPhase(id as "all" | "phase1" | "phase2")}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all",
                    selectedPhase === id
                      ? "bg-accent text-white shadow-sm"
                      : "text-textSecondary hover:text-textPrimary",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Phase Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-border/80">
            {selectedPhase === "all" && (
              <>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Total Places</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">18,002</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">KYC Completed</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">5,755</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Leaflets Given</p>
                  <p className="text-2xl font-bold text-accent mt-1">10,019</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Average Open Rate</p>
                  <p className="text-2xl font-bold text-indigo-400 mt-1">55.2%</p>
                </div>
              </>
            )}

            {selectedPhase === "phase1" && (
              <>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Phase 1 Places</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">{phase1.placesVisited.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Phase 1 KYC</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{phase1.kycCompleted.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Door Open Rate</p>
                  <p className="text-2xl font-bold text-indigo-400 mt-1">{phase1.doorOpenRate}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Status</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> 100% On-Time
                  </p>
                </div>
              </>
            )}

            {selectedPhase === "phase2" && (
              <>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Phase 2 Places</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">{phase2.placesVisited.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Phase 2 KYC</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">{phase2.kycCompleted.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Door Open Rate</p>
                  <p className="text-2xl font-bold text-indigo-400 mt-1">{phase2.doorOpenRate}</p>
                </div>
                <div className="p-4 rounded-xl bg-surface/60 border border-border/50">
                  <p className="text-xs text-textMuted font-mono">Status</p>
                  <p className="text-sm font-semibold text-emerald-400 mt-2 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" /> Campaign Closed
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Operational Methodology Highlights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-textSecondary">
            <div className="flex items-start gap-2.5">
              <Compass className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Route optimization &amp; zone planning across Sarsink via Google My Maps &amp; Earth.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Users className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Direct management, daily briefings, and QA spot-checks for 11 field agents.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Layers className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Strict compliance tracking: already-registered audits and zero meter exclusions.</span>
            </div>
          </div>
        </motion.div>

        {/* Footer citation */}
        <p className="mt-8 text-center text-xs text-textMuted">
          Runaki KYC Campaign · KRG Electricity Distribution Initiative · High Performance Company · Sarsink, Duhok
        </p>

      </div>
    </section>
  );
}
