import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Tailwind gradient class string — defaults to indigo→purple */
  gradient?: string;
}

/**
 * Text with a CSS gradient fill.
 * Used sparingly — only for hero italic phrases or key words.
 */
export function GradientText({
  children,
  className,
  gradient = "from-accent via-purple-400 to-accent",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent",
        gradient,
        className,
      )}
    >
      {children}
    </span>
  );
}
