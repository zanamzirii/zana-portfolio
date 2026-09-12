import type { SiteData } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// lib/data.ts — All site content lives here.
// Never hardcode content in components. Update this file only.
// ─────────────────────────────────────────────────────────────────────────────

export const siteData: SiteData = {

  // ─── Personal ───────────────────────────────────────────────────────────────
  personal: {
    name: "Zana Rajab Abdulrahman",
    nameShort: "Zana",
    initials: "ZR",
    tagline: "I build things that work — and make them look good doing it.",
    roles: [
      "Flutter Developer",
      "Team Leader",
      "QA Engineer",
      "UI/UX Designer",
    ],
    bio: `Computer Science graduate from Duhok, Iraq. I design, build, and ship
mobile applications — including Crown Barber, a multi-role Flutter app I
independently built and published to the Apple App Store. Outside of code,
I lead teams, design interfaces, edit video, and bring structure to complex
problems.`,
    location: "Duhok, Kurdistan Region, Iraq",
    email: "zanarajababdulrahman@gmail.com",
    phone: "+964 750 214 49 23",
    available: true,
    availabilityNote: "Open to remote work and suitable relocation",
  },

  // ─── Links ──────────────────────────────────────────────────────────────────
  // TODO: Replace placeholder values with Zana's real URLs before launch
  links: {
    github: "https://github.com/zanamzirii",
    linkedin: "https://linkedin.com/in/zanarajab",   // TODO: correct URL
    appStore: "https://apps.apple.com/us/app/crown-barber/id6785096600",
    cv: "/cv/zana-cv.pdf",
    whatsapp: "https://wa.me/9647502144923",
  },

  // ─── Stats ──────────────────────────────────────────────────────────────────
  stats: [
    { value: 18002, label: "Places Visited", suffix: "" },
    { value: 5755, label: "KYC Completed", suffix: "" },
    { value: 11, label: "Agents Led", suffix: "" },
    { value: 817, label: "km² Covered", suffix: " km²" },
  ],

  // ─── Skills ─────────────────────────────────────────────────────────────────
  skills: [
    {
      category: "Mobile Development",
      icon: "smartphone",
      items: [
        "Flutter", "Dart", "Firebase Auth", "Firestore",
        "Cloud Functions", "Firebase Cloud Messaging", "App Store Release",
      ],
    },
    {
      category: "Design & Creative",
      icon: "pen-tool",
      items: [
        "UI/UX Design", "Figma", "Adobe Illustrator",
        "Adobe After Effects", "Video Editing", "Graphic Design",
      ],
    },
    {
      category: "QA & Testing",
      icon: "shield-check",
      items: [
        "Functional Testing", "Regression Testing", "UAT",
        "Cross-device Testing", "API Testing", "Bug Reporting",
      ],
    },
    {
      category: "Code & Tools",
      icon: "code-2",
      items: [
        "Git", "GitHub", "JavaScript", "PHP", "HTML/CSS",
        "MySQL", "Python", "Java", "C#", "Unity 3D",
      ],
    },
    {
      category: "Leadership & Ops",
      icon: "users",
      items: [
        "Team Leadership", "Field Operations", "Data Reporting",
        "Google Workspace", "Microsoft Excel", "Zone Planning",
      ],
    },
  ],

  // ─── Projects ───────────────────────────────────────────────────────────────
  projects: [
    {
      id: "crown-barber",
      featured: true,
      title: "Crown Barber",
      subtitle: "Multi-role Barber Booking App",
      description: `Built and published a complete barber shop management platform with
four distinct user roles: customers, barbers, branch owners, and
administrators. Handles appointment booking, branch and service management,
availability scheduling, real-time notifications, multilingual support,
and map integration.`,
      longDescription: `Started as a graduation project, rebranded and shipped as a real product
on the Apple App Store in July 2026. Independently managed the full product
lifecycle: UI/UX design, Flutter development, Firebase architecture, QA
testing, and App Store submission. A two-person team, with the majority of
engineering and design work done by me.`,
      tech: [
        "Flutter", "Dart", "Firebase", "Firestore",
        "Cloud Functions", "FCM", "Firebase Auth", "Google Maps",
      ],
      links: {
        appStore: "https://apps.apple.com/us/app/crown-barber/id6785096600",
        website: "https://crown-barber-prod.web.app/",
      },
      images: [
        "/images/crown-barber/mockup-1.png",
        "/images/crown-barber/mockup-2.png",
        "/images/crown-barber/mockup-3.png",
      ],
      highlights: [
        "Published on Apple App Store — July 2026",
        "4 distinct user roles with role-based permissions",
        "Real-time booking, notifications, and availability",
        "Multilingual support (Arabic, Kurdish, English)",
        "Full QA cycle: functional, regression, UAT, API testing",
      ],
      color: "#6366F1",
    },
    {
      id: "discussion-forum",
      featured: false,
      title: "Online Discussion Forum",
      subtitle: "Full-Stack Web Application",
      description: `A responsive web forum with role-based administration, multimedia posts,
threaded comments, reposts, and post-like functionality built on a
normalized MySQL schema.`,
      tech: ["PHP", "JavaScript", "HTML", "CSS", "MySQL"],
      links: {
        github: "https://github.com/zanamzirii/Online-Discussion-Forum",
      },
      images: [],
      highlights: [
        "Role-based admin panel",
        "Threaded replies and reposts",
        "Responsive design",
        "Normalized MySQL database schema",
      ],
      color: "#10B981",
    },
    {
      id: "vr-racing",
      featured: false,
      title: "VR Car Racing Game",
      subtitle: "3D Virtual Reality Game",
      description: `A fully playable 3D VR racing game with vehicle physics, drifting
mechanics, collision detection, race-track design, menus, and a
heads-up display.`,
      tech: ["Unity 3D", "C#", "Virtual Reality"],
      links: {},
      images: [],
      highlights: [
        "Full vehicle physics + drifting",
        "VR-compatible gameplay",
        "Custom HUD and race-track design",
        "Collision detection system",
      ],
      color: "#F59E0B",
    },
  ],

  // ─── Experience ─────────────────────────────────────────────────────────────
  experience: [
    {
      title: "Team Leader — KYC & Field Operations",
      company: "High Performance Company · Runaki Project",
      period: "May 2026 — September 2026",
      location: "Sarsink, Duhok, Iraq",
      type: "full-time",
      description: [
        "Led and coordinated 11 field agents across an 817 km² service area on the Runaki KYC campaign for KRG Electricity Distribution.",
        "Planned daily routes, assigned zones and shifts, managed transportation and agent responsibilities.",
        "Trained new agents, monitored performance, resolved field issues, and reported daily to management.",
        "Consolidated operational data in Excel and Google Sheets including KYC totals, leaflet distribution, and individual agent output.",
        "Completed both Phase 1 and Phase 2 on schedule — 18,002 places visited, 5,755 KYC registrations completed.",
      ],
    },
    {
      title: "Founder & Mobile Application Developer",
      company: "Crown Barber — Self-Founded",
      period: "November 2025 — Present",
      location: "Duhok, Iraq",
      type: "founder",
      description: [
        "Led the full product lifecycle of Crown Barber from a graduation project to a published App Store product.",
        "Designed and developed a multi-role Flutter application for customers, barbers, branch owners, and admins.",
        "Built appointment booking, branch management, notifications, maps, and multilingual support.",
        "Performed all QA phases: functional, regression, UAT, cross-device, API, and notification testing.",
        "Managed App Store submission and release — Crown Barber live on Apple App Store since July 2026.",
      ],
    },
    {
      title: "Freelance Graphic Designer & Video Editor",
      company: "Self-Employed",
      period: "March 2024 — Present",
      location: "Duhok, Iraq · Remote",
      type: "freelance",
      description: [
        "Created UI designs and marketing images for mobile applications and app store presentation.",
        "Produced high-quality promotional videos for real estate businesses to support property marketing.",
        "Delivered client-ready assets end-to-end using Adobe Illustrator and After Effects.",
      ],
    },
    {
      title: "Library Intern",
      company: "University of Duhok Library",
      period: "February 2026 — May 2026",
      location: "Duhok, Iraq",
      type: "internship",
      description: [
        "Verified and entered book metadata including titles, authors, classifications, and shelf locations.",
        "Used AI-assisted research tools to identify missing bibliographic information.",
        "Completed final-year internship with a Very Good evaluation.",
      ],
    },
  ],

  // ─── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Duhok",
      period: "2022 — July 2026",
      location: "Duhok, Kurdistan Region, Iraq",
      grade: "Graduation Project: Excellent | Internship: Very Good",
      highlights: [
        "Graduation Project: Barber Shop Management App — Excellent",
        "Internship: University of Duhok Library — Very Good",
        "Web Design: Very Good",
      ],
    },
  ],

  // ─── Certifications ─────────────────────────────────────────────────────────
  certifications: [
    {
      title: "IELTS Academic",
      issuer: "British Council",
      score: "5.0 (CEFR B1)",
      date: "July 2024",
    },
  ],

  // ─── Languages ──────────────────────────────────────────────────────────────
  languages: [
    { language: "Kurdish", level: "Native" },
    { language: "English", level: "Working Proficiency (B1)" },
    { language: "Arabic", level: "Limited Working Proficiency" },
  ],

};
