import { Github, Linkedin, ExternalLink, MessageCircle } from "lucide-react";
import { siteData } from "@/lib/data";

const socialLinks = [
  {
    label: "GitHub",
    href:  siteData.links.github,
    Icon:  Github,
  },
  {
    label: "LinkedIn",
    href:  siteData.links.linkedin,
    Icon:  Linkedin,
  },
  {
    label: "App Store",
    href:  siteData.links.appStore,
    Icon:  ExternalLink,
  },
  {
    label: "WhatsApp",
    href:  siteData.links.whatsapp,
    Icon:  MessageCircle,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Monogram + credit */}
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-accent px-2 py-0.5 text-sm font-bold text-white">
              {siteData.personal.initials}
            </span>
            <span className="text-sm text-textSecondary">
              Designed &amp; built by{" "}
              <span className="text-textPrimary font-medium">
                {siteData.personal.name}
              </span>
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-textMuted hover:text-textPrimary transition-colors duration-200"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-xs text-textMuted sm:text-right">
          © {year} {siteData.personal.name} · All rights reserved
        </p>
      </div>
    </footer>
  );
}
