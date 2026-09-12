"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function StatCounter({ value, suffix = "", label, className }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  const formatted = count.toLocaleString();

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-5xl font-bold tracking-tight text-textPrimary md:text-7xl">
        {formatted}
        {count === value && suffix ? (
          <span className="text-accent">{suffix}</span>
        ) : null}
      </div>
      <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-textSecondary">
        {label}
      </div>
    </div>
  );
}
