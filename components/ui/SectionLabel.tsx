import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small eyebrow label displayed above section headings.
 * e.g.  ── ABOUT ME ──
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3",
        className,
      )}
    >
      <span className="h-px w-6 bg-accent" />
      <span
        className={cn(
          "text-xs font-semibold tracking-[0.2em] uppercase",
          "text-accent",
        )}
      >
        {children}
      </span>
    </div>
  );
}
