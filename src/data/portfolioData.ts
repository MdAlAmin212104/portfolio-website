export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "Creative Dev" | "E-Commerce" | "3D Web" | "Mobile & UI";
  image: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  metrics?: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    icon: string; // icon identifier or label
    highlight?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  type: "Full-time" | "Contract" | "Freelance";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export const PERSONAL_INFO = {
  name: "Alamin Hossain",
  role: "Senior Frontend Engineer & Creative Developer",
  roles: [
    "Senior Frontend Engineer",
    "Creative Web Developer",
    "3D Interactive Architect",
    "UI/UX Systems Specialist",
  ],
  bio: "Crafting digital experiences at the intersection of pixel-perfect engineering, fluid animations, and high-performance WebGL graphics.",
  longBio: "With over 5 years of experience architecting web platforms for global brands, startups, and agencies, I specialize in building ultra-responsive, accessible, and visual-first web applications. My work blends cutting-edge design aesthetics (Awwwards-inspired motion) with solid engineering principles (Next.js 15, React 19, TypeScript, dynamic WebGL shaders).",
  location: "Dhaka, Bangladesh (UTC+6) • Remote Worldwide",
  availability: "Available for Select Contracts & Full-time Roles",
  email: "alamin.dev.contact@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  dribbble: "https://dribbble.com",
  stats: [
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Projects Completed", value: 35, suffix: "+" },
    { label: "Happy Clients", value: 24, suffix: "" },
    { label: "Code Commits", value: 2800, suffix: "+" },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: "frontend-arch",
    title: "Next.js & Frontend Architecture",
    description: "Enterprise-grade web applications built with Next.js 15, React 19, and TypeScript designed for 95+ Lighthouse scores and extreme speed.",
    iconName: "Code2",
    features: ["Server Components & SSR", "Type-safe State Management", "Clean Architecture", "Modular Design Systems"],
  },
  {
    id: "creative-dev",
    title: "Creative Development & 3D",
    description: "Immersive WebGL interactions, Three.js 3D models, GSAP scroll magic, and custom Framer Motion animations that capture audience attention.",
    iconName: "Sparkles",
    features: ["Interactive 3D Canvas", "GSAP ScrollTrigger Magic", "Custom Shaders & Canvas", "Lenis Smooth Scroll"],
  },
  {
    id: "ecommerce-shopify",
    title: "Headless E-Commerce & Shopify",
    description: "High-converting online storefronts using Shopify Liquid, Storefront API, and headless architecture tailored for rapid scaling.",
    iconName: "ShoppingBag",
    features: ["Headless Next.js Commerce", "Custom Shopify Themes", "High Speed Optimization", "Custom Checkout Flows"],
  },
  {
    id: "uiux-design",
    title: "UI/UX & Design Systems",
    description: "Designing intuitive, accessible glassmorphic interfaces and cohesive component design systems with dark-mode tailored elegance.",
    iconName: "Palette",
    features: ["Tailwind Token Systems", "Dark Mode First Aesthetics", "Figma to Code Fidelity", "ARIA & Accessibility"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Core",
    skills: [
      { name: "React 19 / Next.js 15", level: 96, icon: "React", highlight: "Expert" },
      { name: "TypeScript", level: 94, icon: "TypeScript", highlight: "Expert" },
      { name: "Tailwind CSS & Design Tokens", level: 98, icon: "Tailwind", highlight: "Master" },
      { name: "HTML5 / CSS3 / SASS", level: 96, icon: "HTML5" },
    ],
  },
  {
    title: "Animations & 3D",
    skills: [
      { name: "Framer Motion", level: 95, icon: "Framer", highlight: "Expert" },
      { name: "GSAP & ScrollTrigger", level: 92, icon: "GSAP", highlight: "Advanced" },
      { name: "Three.js / React Three Fiber", level: 85, icon: "ThreeJS", highlight: "Advanced" },
      { name: "Lenis Smooth Scroll", level: 95, icon: "Lenis" },
    ],
  },
  {
    title: "E-Commerce & CMS",
    skills: [
      { name: "Shopify Theme Dev & Liquid", level: 94, icon: "Shopify", highlight: "Expert" },
      { name: "Headless Storefront API", level: 90, icon: "GraphQL" },
      { name: "Sanity.io / Strapi", level: 88, icon: "CMS" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub Workflows", level: 95, icon: "Git" },
      { name: "Vercel / Netlify Deployments", level: 94, icon: "Vercel" },
      { name: "Webpack / Vite / Turbopack", level: 88, icon: "Vite" },
      { name: "Lighthouse & Web Vitals", level: 96, icon: "Speed" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Lead Creative Frontend Engineer",
    company: "Nexus Digital Agency",
    period: "2024 — Present",
    location: "Remote",
    description: "Engineered high-end web portals and interactive brand experiences for Fortune 500 clients and VC-backed tech startups.",
    achievements: [
      "Built 12+ award-nominated marketing sites using Next.js 15, GSAP, and Tailwind CSS.",
      "Improved mobile load times by 45% through aggressive bundle splitting and WebGL shader optimization.",
      "Mentored a team of 6 frontend developers on modern animation techniques and React 19 standards.",
    ],
    techStack: ["Next.js 15", "TypeScript", "GSAP", "Framer Motion", "Three.js", "Tailwind CSS"],
    type: "Full-time",
  },
  {
    id: "exp-2",
    role: "Senior Frontend & Shopify Developer",
    company: "Vanguard Commerce Studio",
    period: "2022 — 2024",
    location: "Remote",
    description: "Spearheaded custom Shopify Plus theme development and Headless Next.js storefronts generating $20M+ in annual client GMV.",
    achievements: [
      "Architected custom Liquid sections with modular schema configurations for 15+ high-volume stores.",
      "Achieved average 96/100 Lighthouse performance scores across all deployed headless commerce apps.",
      "Integrated real-time cart drawer animations and dynamic currency conversion engines.",
    ],
    techStack: ["Shopify Liquid", "Next.js", "GraphQL", "Tailwind CSS", "Framer Motion"],
    type: "Full-time",
  },
  {
    id: "exp-3",
    role: "Frontend Engineer & Interactive Web Developer",
    company: "Aether Labs",
    period: "2021 — 2022",
    location: "Hybrid",
    description: "Developed visual interactive web apps, WebGL particle backgrounds, and real-time dashboards for SaaS products.",
    achievements: [
      "Created reusable UI component libraries adopted across 4 internal SaaS products.",
      "Reduced CSS bundle size by 60% through custom utility extraction and Tailwind migration.",
    ],
    techStack: ["React", "TypeScript", "Three.js", "CSS Modules", "Webpack"],
    type: "Full-time",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "nexus-aurora",
    title: "Aetheria 3D SaaS Platform",
    subtitle: "Next-Gen AI Workspace with Interactive WebGL Visualizer",
    category: "3D Web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    description: "An Awwwards-inspired futuristic web portal featuring real-time 3D camera controls, glowing particle canvas, and glassmorphic dashboards.",
    fullDescription: "Aetheria is an experimental SaaS website designed to push the boundaries of WebGL inside Next.js 15. It incorporates custom HLSL shaders for dynamic liquid distortion, Lenis smooth scrolling, split-text physics, and seamless modal route previews.",
    techStack: ["Next.js 15", "Three.js", "R3F", "Framer Motion", "GSAP", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    metrics: "+180% Engagement Rate",
    highlights: [
      "60fps WebGL particle simulation reacting to mouse velocity",
      "Dynamic glassmorphic UI dock with magnetic physics",
      "Comprehensive dark/light ambient lighting system",
    ],
  },
  {
    id: "luminance-fashion",
    title: "Luminance Luxury E-Commerce",
    subtitle: "Headless Shopify Storefront for High-End Fashion",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    description: "A ultra-fast headless e-commerce store with liquid smooth product transition animations, quick checkout drawer, and video lookbooks.",
    fullDescription: "Luminance merges editorial fashion photography with lightning-fast React 19 architecture. Using the Shopify Storefront API, customers can filter products in real-time with instant state updates and micro-animated add-to-cart interactions.",
    techStack: ["Next.js 15", "Shopify Storefront API", "Tailwind CSS", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    metrics: "98 Lighthouse Speed",
    highlights: [
      "Instant checkout drawer with sub-100ms response time",
      "Custom cursor product zoom and video preview modal",
      "Seamless multi-currency and localization support",
    ],
  },
  {
    id: "cyber-pulse",
    title: "CyberPulse Financial Protocol",
    subtitle: "DeFi Dashboard & Real-Time Crypto Analytics",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description: "A sleek, dark-themed real-time trading dashboard built with SVG chart animations, live WebSocket data feeds, and cyber glow accents.",
    fullDescription: "CyberPulse delivers institutional-grade financial analytics with consumer-grade design elegance. Key highlights include zero-latency chart updates, customized glowing sparklines, keyboard shortcut navigation, and ARIA-compliant data tables.",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
    metrics: "10k+ Daily Active Traders",
    highlights: [
      "Real-time WebSocket market ticker with smooth interpolation",
      "Interactive technical indicators with custom hover tooltips",
      "Responsive grid layout with drag-and-drop widget customization",
    ],
  },
  {
    id: "hyperion-agency",
    title: "Hyperion Design Studio",
    subtitle: "Awwwards Nominated Creative Agency Site",
    category: "Creative Dev",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    description: "Minimalist editorial creative portfolio featuring custom cursor magnetic snapping, horizontal scroll galleries, and SVG mask reveals.",
    fullDescription: "Hyperion is a showcase of fluid typography, smooth parallax image scaling, and cinematic section transitions designed for creative directors and luxury brands.",
    techStack: ["Next.js 15", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    highlights: [
      "Horizontal scroll showcase powered by GSAP ScrollTrigger",
      "Custom magnetic cursor snapping to interactive elements",
      "Zero layout shift image lazy loading with blur placeholders",
    ],
  },
  {
    id: "zenith-audio",
    title: "Zenith Spatial Audio",
    subtitle: "Interactive Product Experience for Wireless Headphones",
    category: "3D Web",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    description: "360-degree interactive 3D product showcase with exploded view component breakdown and audio frequency visualizers.",
    fullDescription: "Built for high-end audio enthusiasts, Zenith allows users to rotate, explode, and inspect headphones in high-definition WebGL 3D directly in the browser.",
    techStack: ["Three.js", "React Three Fiber", "Drei", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    highlights: [
      "Exploded view 3D assembly animation with step slider",
      "Spatial audio frequency analyzer rendered on HTML5 canvas",
      "Dynamic color customizer with real-time PBR material swap",
    ],
  },
  {
    id: "velox-design-system",
    title: "Velox React UI Kit",
    subtitle: "Accessible Dark Glassmorphism Component Library",
    category: "Mobile & UI",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    description: "An open-source React & Tailwind CSS component library optimized for micro-interactions, dark mode aesthetics, and keyboard accessibility.",
    fullDescription: "Velox offers 40+ production-ready UI components engineered with Radix primitives, Framer Motion transitions, and strict TypeScript types.",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    highlights: [
      "40+ accessible UI components with full WAI-ARIA compliance",
      "Built-in spring physics and magnetic button handlers",
      "Automatic dark and aurora theme tokens",
    ],
  },
];
