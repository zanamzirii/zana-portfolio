"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteData } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  slideInRight,
  fastTransition,
  staggerContainer,
  fadeUp,
} from "@/lib/animations";

const navLinks = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

function smoothScrollTo(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const active   = useActiveSection();

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      smoothScrollTo(href);
      setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      {/* ── Desktop / Top Bar ───────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border"
            : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo / Monogram */}
          <button
            onClick={() => handleNavClick("#home")}
            className="group flex items-center gap-0 text-lg font-bold text-textPrimary
                       hover:text-accent transition-colors duration-200 select-none"
            aria-label="Go to top"
          >
            <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-bold text-white
                              group-hover:bg-accentHover transition-colors duration-200">
              {siteData.personal.initials}
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      "rounded-md hover:text-textPrimary",
                      isActive ? "text-textPrimary" : "text-textSecondary",
                    )}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick("#contact")}
              className="hover:border-accent hover:text-accent"
            >
              Hire Me →
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-textSecondary hover:text-textPrimary
                       hover:bg-elevated transition-colors duration-200"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              variants={slideInRight}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={fastTransition}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs
                         bg-surface border-l border-border flex flex-col lg:hidden"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-bold text-white">
                  {siteData.personal.initials}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-textSecondary hover:text-textPrimary
                             hover:bg-elevated transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex-1 flex flex-col gap-1 px-4 py-6"
              >
                {navLinks.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <motion.li key={link.href} variants={fadeUp}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "w-full text-left px-4 py-3.5 rounded-xl text-base font-medium",
                          "transition-all duration-200",
                          isActive
                            ? "bg-accentMuted text-accent border border-accentBorder"
                            : "text-textSecondary hover:text-textPrimary hover:bg-elevated",
                        )}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Panel Footer */}
              <div className="px-6 py-6 border-t border-border space-y-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => handleNavClick("#contact")}
                >
                  Hire Me →
                </Button>
                <div className="flex justify-center gap-4">
                  <a
                    href={siteData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-textMuted hover:text-textPrimary transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteData.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-textMuted hover:text-textPrimary transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteData.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-textMuted hover:text-textPrimary transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
