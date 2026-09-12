"use client";

import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  className?: string;
}

export function SkillBadge({ label, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs",
        "bg-elevated text-textSecondary border border-border",
        "transition-all duration-200 cursor-default",
        "hover:bg-accentMuted hover:text-accent hover:border-accentBorder",
        className,
      )}
    >
      {label}
    </span>
  );
}
