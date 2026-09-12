import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display:  "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight:  ["400"],
  style:   ["normal", "italic"],
  variable: "--font-serif",
  display:  "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://zanarajab.vercel.app"),
  title: "Zana Rajab Abdulrahman — Flutter Developer & Mobile Engineer",
  description:
    "Computer Science graduate from Duhok, Iraq. Flutter developer, QA engineer, team leader, and graphic designer. Built and published Crown Barber on the Apple App Store. Open to remote work.",
  keywords: [
    "Zana Rajab Abdulrahman",
    "Flutter developer",
    "mobile app developer Kurdistan",
    "Firebase developer Iraq",
    "Crown Barber app",
    "remote Flutter developer",
    "QA engineer Kurdistan",
    "UI/UX designer Iraq",
  ],
  authors: [{ name: "Zana Rajab Abdulrahman" }],
  openGraph: {
    type:      "website",
    locale:    "en_US",
    url:       "https://zanarajab.vercel.app",
    siteName:  "Zana Rajab Abdulrahman",
    title:     "Zana Rajab Abdulrahman — Flutter Developer",
    description:
      "Flutter developer, QA engineer & team leader from Kurdistan, Iraq.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zana Rajab Abdulrahman Portfolio" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Zana Rajab Abdulrahman — Flutter Developer",
    description: "Flutter developer, QA engineer & team leader from Kurdistan, Iraq.",
    images:      ["/og-image.png"],
  },
  robots: {
    index:  true,
    follow: true,
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type":    "Person",
  name:       "Zana Rajab Abdulrahman",
  jobTitle:   "Mobile Application Developer",
  description:
    "Flutter developer and mobile engineer from Kurdistan, Iraq.",
  email:     "zanarajababdulrahman@gmail.com",
  telephone: "+9647502144923",
  address: {
    "@type":          "PostalAddress",
    addressLocality:  "Duhok",
    addressRegion:    "Kurdistan Region",
    addressCountry:   "IQ",
  },
  url: "https://zanarajab.vercel.app",
  sameAs: [
    "https://github.com/zanamzirii",
    "https://linkedin.com/in/zanarajab",
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background font-sans text-textPrimary antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
