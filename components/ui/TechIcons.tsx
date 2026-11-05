import React from "react";

interface IconProps {
  className?: string;
}

// ─── Authentic Technology & Tool Vectors ─────────────────────────────────────

export function FlutterIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M14.314 0L2.3 12 6 15.7 21.684 0z" fill="#42A5F5" />
      <path d="M14.328 11.072L7.685 17.714l3.69 3.714 6.643-6.643 6.643 6.643 3.69-3.714z" fill="#02569B" />
      <path d="M18.018 14.786l-3.69 3.69 3.69 3.69 3.69-3.69z" fill="#0175C2" />
    </svg>
  );
}

export function DartIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M4.125 0L0 4.125v15.75L4.125 24H19.875L24 19.875V4.125L19.875 0H4.125z" fill="#0175C2" />
      <path d="M12 4.125L4.125 12 12 19.875 19.875 12z" fill="#54C5F8" />
    </svg>
  );
}

export function FirebaseIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.89 15.672L6.255.461a.542.542 0 011.015-.174l3.543 6.634-6.923 8.751z" fill="#FFC107" />
      <path d="M14.28 8.016l-3.468-6.5a.542.542 0 00-.98-.027L3.89 15.672l10.39-7.656z" fill="#FFA000" />
      <path d="M19.662 19.394L17.21 4.542a.54.54 0 00-.97-.22L3.89 15.672l7.733 4.354a1.86 1.86 0 001.815 0l6.224-3.632z" fill="#FF5722" />
    </svg>
  );
}

export function TypeScriptIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M11.5 13.5H9.5v5H7.5v-5H5.5V12h6v1.5zm6.5 1.5c0 2.2-1.3 3.5-3.5 3.5-1.5 0-2.8-.8-3.2-2l1.6-.9c.3.7.9 1.2 1.6 1.2.9 0 1.5-.5 1.5-1.3 0-.8-.6-1.1-1.7-1.4-1.8-.4-3-1.1-3-2.6 0-1.8 1.4-3 3.2-3 1.3 0 2.3.6 2.8 1.6l-1.5.9c-.3-.5-.7-.8-1.3-.8-.7 0-1.2.4-1.2 1 0 .6.5.9 1.5 1.2 1.8.5 3.2 1.1 3.2 2.6z" fill="#FFFFFF" />
    </svg>
  );
}

export function NodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 1L2 6.8v11.4L12 24l10-5.8V6.8L12 1zm0 2.3l7.9 4.6v9.2L12 21.7 4.1 17.1V7.9L12 3.3z" fill="#5FA04E" />
    </svg>
  );
}

export function ReactIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
        <ellipse rx="10" ry="4.2" cx="12" cy="12" />
        <ellipse rx="10" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)" />
        <ellipse rx="10" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

export function NextjsIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#000" stroke="#fff" strokeWidth="1" />
      <path d="M7 8v8h2v-4.5l5.5 6.5h2.5V8h-2v4.5L9.5 8H7z" fill="#fff" />
    </svg>
  );
}

export function FigmaIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 24c2.209 0 4-1.791 4-4v-4H8c-2.209 0-4 1.791-4 4s1.791 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.209 1.791-4 4-4h4v8H8c-2.209 0-4-1.791-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.209 1.791-4 4-4h4v8H8C5.791 8 4 6.209 4 4z" fill="#F24E1E" />
      <path d="M12 0h4c2.209 0 4 1.791 4 4s-1.791 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z" fill="#1ABCFE" />
    </svg>
  );
}

export function PremiereIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#00005B" />
      <path d="M6 6h4.5c2 0 3.5 1.2 3.5 3s-1.5 3-3.5 3H8v6H6V6zm2 4.5h2.5c.8 0 1.5-.5 1.5-1.5s-.7-1.5-1.5-1.5H8v3zM15 11h2v1.5c.5-1 1.5-1.5 2.5-1.5v2.2c-.3-.1-.7-.2-1-.2-1.2 0-2 1-2 2.5V18h-2v-7z" fill="#9999FF" />
    </svg>
  );
}

export function AfterEffectsIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#00005B" />
      <path d="M5.5 18l3.8-12h2.2l3.8 12H13l-.8-2.8H8.8L8 18H5.5zm3.8-4.6h2.4L10.5 9l-1.2 4.4zM15.5 13.5c0-1.8 1.4-3.2 3.2-3.2 1.8 0 3.1 1.3 3.1 3.2v.6h-4.5c.1.9.8 1.6 1.8 1.6.7 0 1.2-.3 1.5-.7l1.3.8c-.6.9-1.6 1.4-2.8 1.4-2 0-3.6-1.5-3.6-3.7zm4.5-.8c-.1-.8-.7-1.4-1.5-1.4-.8 0-1.4.6-1.5 1.4h3z" fill="#D291FF" />
    </svg>
  );
}

export function IllustratorIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#330000" />
      <path d="M5.5 18l3.8-12h2.2l3.8 12H13l-.8-2.8H8.8L8 18H5.5zm3.8-4.6h2.4L10.5 9l-1.2 4.4zM16.5 9h2v9h-2V9zm0-3h2v2h-2V6z" fill="#FF9A00" />
    </svg>
  );
}

export function PhotoshopIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4" fill="#001E36" />
      <path d="M5.5 6h4.5c2.2 0 3.5 1.3 3.5 3.3s-1.3 3.3-3.5 3.3H7.5V18h-2V6zm2 5h2.5c1 0 1.5-.6 1.5-1.7s-.5-1.7-1.5-1.7H7.5V11zm9 3c0-1.8 1.3-2.5 2.5-2.8 1.2-.3 1.5-.6 1.5-1.1 0-.6-.5-1-1.3-1-.9 0-1.5.5-1.7 1.2l-1.6-.7c.4-1.3 1.7-2.1 3.3-2.1 2 0 3.3 1.1 3.3 2.7 0 1.6-1.2 2.3-2.6 2.7-1.1.3-1.4.6-1.4 1.1 0 .6.6 1.1 1.5 1.1 1 0 1.6-.5 1.9-1.2l1.6.7c-.5 1.4-1.8 2.2-3.5 2.2-2.1 0-3.5-1.2-3.5-2.9z" fill="#31A8FF" />
    </svg>
  );
}

export function GitIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M23.546 10.93L13.067.452a1.505 1.505 0 00-2.128 0L8.881 2.51l3.003 3.003a1.777 1.777 0 012.185 2.185l3.228 3.229a1.773 1.773 0 011.83 2.784 1.775 1.775 0 01-2.502-2.502l-3.053-3.053v6.314a1.777 1.777 0 011.08 1.636 1.777 1.777 0 01-3.553 0c0-.65.35-1.218.868-1.531V7.935a1.77 1.77 0 01-.868-.277L8.033 10.69a1.775 1.775 0 01-2.484 2.484 1.775 1.775 0 012.484-2.484l2.97-2.97-2.98-2.98L.452 12.29a1.505 1.505 0 000 2.128l10.479 10.479a1.505 1.505 0 002.128 0l10.479-10.479a1.505 1.505 0 00.008-2.488z" fill="#F05032" />
    </svg>
  );
}

export function AndroidIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4128 13.8533 8.125 12 8.125s-3.5902.2878-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" fill="#3DDC84" />
    </svg>
  );
}

export function GooglePlayIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 01-.61-1.424V3.238c0-.555.228-1.057.609-1.424z" fill="#00E676" />
      <path d="M17.18 8.613L4.697.525A1.97 1.97 0 003.61 1.814L13.792 12l3.388-3.387z" fill="#FFD600" />
      <path d="M17.18 15.387L13.792 12l-10.182 10.186a1.97 1.97 0 001.087 1.289l12.483-8.088z" fill="#FF1744" />
      <path d="M21.59 11.39l-4.41-2.777-3.388 3.387 3.388 3.387 4.41-2.777c.81-.51.81-1.71 0-2.22z" fill="#00B0FF" />
    </svg>
  );
}

export function TestFlightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0071E3" />
      <path d="M12 4l2 6h5l-4 3 1.5 5.5L12 15l-4.5 3.5L9 13l-4-3h5l2-6z" fill="#fff" />
    </svg>
  );
}

export function VSCodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M17.7 1.2L6.3 10.5 2.1 7.3.7 8.3v7.4l1.4 1 4.2-3.2 11.4 9.3 5.6-2.7V3.9l-5.6-2.7zm-11.4 12L2.7 16V8l3.6 2.8v2.4zm15 6l-3.9 1.8-6.1-5 6.1-5 3.9 1.8v6.4z" fill="#007ACC" />
    </svg>
  );
}

export function PostmanIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#FF6C37" />
      <path d="M6 12h12M14 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function CapCutIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#111" stroke="#fff" strokeWidth="1" />
      <path d="M6 8l6 4-6 4V8zm12 0l-6 4 6 4V8z" fill="#fff" />
    </svg>
  );
}

export function XcodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#147EFB" />
      <path d="M16.5 6.5l1 1-6 6-1-1 6-6zm-4 4l1 1-6 6-1-1 6-6zm-4 4l1 1-2 2-1-1 2-2z" fill="#fff" />
    </svg>
  );
}

export function AndroidStudioIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#3DDC84" />
      <circle cx="12" cy="12" r="7" fill="#2C3437" />
      <path d="M12 7l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3L12 7z" fill="#3DDC84" />
    </svg>
  );
}
