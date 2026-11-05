"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Copy, Check, ExternalLink } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string;
  title: string;
  subtitle?: string;
  linkUrl?: string;
}

export function QRCodeModal({
  isOpen,
  onClose,
  qrCodeUrl,
  title,
  subtitle,
  linkUrl,
}: QRCodeModalProps) {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    if (!linkUrl) return;
    navigator.clipboard.writeText(linkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900/80 text-white hover:bg-neutral-800 transition-all shadow-lg"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#121215] p-6 sm:p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
              <QrCode className="h-6 w-6" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed">{subtitle}</p>
            )}

            {/* QR Code Container with High Contrast Background */}
            <div className="mx-auto my-6 flex h-60 w-60 items-center justify-center rounded-2xl border border-white/10 bg-white p-4 shadow-xl">
              <div className="relative h-full w-full">
                <Image
                  src={qrCodeUrl}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <p className="text-[11px] text-neutral-400">
              Open your smartphone camera and point it at the code to test instantly.
            </p>

            {linkUrl && (
              <div className="mt-5 flex items-center justify-center gap-2 pt-4 border-t border-white/10">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Copied URL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Direct Link</span>
                    </>
                  )}
                </button>
                <a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open URL</span>
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
