import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
        404
      </p>
      <h1 className="text-4xl font-bold text-textPrimary mb-3 tracking-tight md:text-6xl">
        Page not found
      </h1>
      <p className="text-base text-textSecondary mb-10 max-w-sm">
        This page doesn&apos;t exist. Let&apos;s get you back to the portfolio.
      </p>
      <Button href="/" variant="primary" size="lg">
        ← Back to Home
      </Button>
    </div>
  );
}
