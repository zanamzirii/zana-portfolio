"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  subtitle?: string;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  subtitle,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Auto play video when modal opens
      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 200);
    } else {
      document.body.style.overflow = "auto";
      videoRef.current?.pause();
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
            aria-label="Close video"
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
            className="relative flex flex-col items-center max-w-4xl w-full"
          >
            {/* Video frame */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-black shadow-2xl aspect-video max-h-[75vh]">
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title & subtitle */}
            {(title || subtitle) && (
              <div className="mt-4 flex flex-col items-center text-center px-4">
                {title && (
                  <p className="text-base font-semibold text-textPrimary">{title}</p>
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
