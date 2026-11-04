"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export function ImageLightbox({
  isOpen,
  onClose,
  src,
  alt,
  title,
  subtitle,
}: ImageLightboxProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-textPrimary hover:bg-elevated hover:text-white transition-all shadow-lg"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-h-[92vh] max-w-5xl w-full"
          >
            {/* Image frame */}
            <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-surface shadow-2xl">
              <div className="relative w-full h-[70vh] sm:h-[78vh]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              </div>
            </div>

            {/* Captions */}
            {(title || subtitle) && (
              <div className="mt-3 flex flex-col items-center text-center px-4">
                {title && (
                  <p className="text-sm font-semibold text-textPrimary">{title}</p>
                )}
                {subtitle && (
                  <p className="text-xs text-textSecondary mt-0.5">{subtitle}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
