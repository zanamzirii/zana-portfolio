"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  images?: string[];
  initialIndex?: number;
}

export function ImageLightbox({
  isOpen,
  onClose,
  src,
  alt,
  title,
  subtitle,
  images,
  initialIndex = 0,
}: ImageLightboxProps) {
  const gallery = images && images.length > 0 ? images : [src];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  // Sync currentIndex when initialIndex or src changes
  useEffect(() => {
    if (images && images.length > 0) {
      if (initialIndex >= 0 && initialIndex < images.length) {
        setCurrentIndex(initialIndex);
      } else {
        const found = images.indexOf(src);
        setCurrentIndex(found !== -1 ? found : 0);
      }
    } else {
      setCurrentIndex(0);
    }
  }, [src, images, initialIndex, isOpen]);

  const hasMultiple = gallery.length > 1;

  const nextImage = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [hasMultiple, gallery.length]);

  const prevImage = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [hasMultiple, gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, nextImage, prevImage]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextImage();
        else prevImage();
      }
      touchStartX.current = null;
    }
  };

  const activeSrc = gallery[currentIndex] || src;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-xl select-none"
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-50 flex items-center justify-between pointer-events-none">
            {/* Step Counter Pill */}
            {hasMultiple ? (
              <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 backdrop-blur-md shadow-xl">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono font-bold text-white">
                  0{currentIndex + 1} / 0{gallery.length}
                </span>
              </div>
            ) : <div />}

            {/* Close button */}
            <button
              onClick={onClose}
              className="pointer-events-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-neutral-300 hover:text-white hover:bg-black/95 transition-all shadow-xl active:scale-95"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Arrow Button */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white hover:bg-black/95 hover:border-white/40 hover:scale-105 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          )}

          {/* Next Arrow Button */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white hover:bg-black/95 hover:border-white/40 hover:scale-105 active:scale-95 transition-all shadow-2xl backdrop-blur-md"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </button>
          )}

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex flex-col items-center max-h-[92vh] max-w-5xl w-full px-2"
          >
            {/* Image frame */}
            <div className="relative w-full max-h-[72vh] sm:max-h-[76vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl backdrop-blur-md">
              <div className="relative w-full h-[62vh] sm:h-[72vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSrc}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeSrc}
                      alt={alt}
                      fill
                      priority
                      unoptimized
                      className="object-contain"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Captions */}
            <div className="mt-3 flex flex-col items-center text-center px-4">
              {title && (
                <p className="text-sm font-bold text-white tracking-wide">
                  {title} {hasMultiple && <span className="font-mono text-accent text-xs ml-1.5">(Slide {currentIndex + 1} of {gallery.length})</span>}
                </p>
              )}
              {subtitle && (
                <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>
              )}
            </div>

            {/* Quick-Jump Thumbnails Strip */}
            {hasMultiple && (
              <div className="mt-3 flex items-center gap-2 overflow-x-auto max-w-full px-2 py-1 no-scrollbar">
                {gallery.map((thumbSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 overflow-hidden rounded-lg border transition-all duration-200",
                      currentIndex === idx
                        ? "border-accent ring-2 ring-accent scale-105 shadow-lg"
                        : "border-white/20 opacity-50 hover:opacity-100 hover:border-white/40",
                    )}
                  >
                    <Image
                      src={thumbSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}