"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  loading?:  boolean;
  href?:     string;
  external?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-white",
    "hover:bg-accentHover",
    "border border-accent hover:border-accentHover",
    "shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_28px_rgba(99,102,241,0.25)]",
  ].join(" "),

  outline: [
    "bg-transparent text-textPrimary",
    "border border-border hover:border-borderLight",
    "hover:bg-elevated",
  ].join(" "),

  ghost: [
    "bg-transparent text-textSecondary",
    "border border-transparent",
    "hover:text-textPrimary hover:bg-elevated",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = "primary",
      size     = "md",
      loading  = false,
      href,
      external = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base = [
      "inline-flex items-center justify-center gap-2",
      "font-semibold tracking-wide rounded-lg",
      "transition-all duration-200",
      "active:scale-[0.97] hover:scale-[1.02]",
      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
      "select-none",
    ].join(" ");

    const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
