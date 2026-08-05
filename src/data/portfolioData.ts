import { FaFacebook } from "react-icons/fa6";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "Shopify Store" | "Shopify App" | "E-commerce";
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
  type: "Full-time" | "Contract" | "Freelance" | "Internship" | "Learning" | "Government Certification" | "Professional Training";
  icon?: "briefcase" | "laptop" | "code" | "smartphone" | "graduation-cap" | "graduation-cap";
  metrics?: { label: string; value: string }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  status: "Running" | "Completed";
  description: string;
  highlights: string[];
  fieldOfStudy: string;
  type: "University" | "Polytechnic Institute";
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  description: string;
  skills: string[];
  driveUrl?: string;
  verificationUrl?: string;
  type: "Professional Training" | "Government Certification" | "Industry Course";
}

export const PERSONAL_INFO = {
  name: "Md Al Amin Islam",
  role: "Shopify App & Shopify Developer",

  roles: [
    "Shopify App Developer",
    "Shopify Theme Developer",
    "Shopify Expert",
    "Frontend Developer",
    "React & Next.js Developer",
    "MERN Stack Developer",
  ],

  bio: "Building scalable Shopify Apps, high-converting Shopify Themes, and modern eCommerce experiences with Next.js, React, TypeScript, and Shopify's latest technologies.",

  longBio:
    "I am a Shopify App & Theme Developer with 3+ years of experience building custom Shopify Apps, high-performance Shopify themes, and scalable eCommerce solutions. I specialize in embedded Shopify App development using Shopify CLI, Remix, React, Node.js, TypeScript, Polaris, App Bridge, GraphQL, REST APIs, Webhooks, and Theme App Extensions. I also develop custom Shopify themes with Liquid and Online Store 2.0, creating responsive, conversion-focused storefronts featuring custom sections, metafields, product customization, AJAX cart functionality, dynamic filtering, performance optimization, and seamless third-party integrations. Committed to clean, maintainable, and scalable code, I follow Shopify best practices and App Store guidelines to deliver reliable, high-quality Shopify Apps and themes that enhance user experience and help merchants grow their businesses.",
  location: "Banasree, Dhaka, Bangladesh",
  availability: "Available for Select Contracts & Full-time Roles",
  email: "mdalamin212104@gmail.com",
  github: "https://github.com/MdAlAmin212104",
  linkedin: "https://www.linkedin.com/in/al-amin21",
  facebook: "https://www.facebook.com/md.al.amin.716294/",
  stats: [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 120, suffix: "+" },
    { label: "Shopify Apps Published", value: 1, suffix: "" },
  ],
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    institution: "Northern University Bangladesh",
    period: "2025 - Present",
    location: "Dhaka, Bangladesh",
    status: "Running",
    type: "University",
    fieldOfStudy: "Computer Science & Engineering",
    description: "Currently pursuing Bachelor of Science degree in Computer Science & Engineering. Building strong academic foundations in computer architecture, data structures, algorithm design, software engineering principles, and modern computing trends.",
    highlights: [
      "Enrolled Admission 2025 (Active Undergraduate Student)",
      "Focus on Advanced Algorithms & Software Architecture",
      "Object-Oriented System Analysis & Software Engineering",
    ],
  },
  {
    id: "edu-2",
    degree: "Diploma in Computer Technology & Engineering",
    institution: "Kurigram Polytechnic Institute",
    period: "2020 - 2024",
    location: "Kurigram, Bangladesh",
    status: "Completed",
    type: "Polytechnic Institute",
    fieldOfStudy: "Computer Engineering & Information Technology",
    description: "Successfully completed 4-year Diploma in Computer Technology & Engineering, mastering practical web technologies, software development, database management systems, and core computer architecture.",
    highlights: [
      "Completed 4-Year Diploma in Computer Technology",
      "Practical Hands-on Software & Frontend Web Labs",
      "Database Management Systems & Networking Foundations",
    ],
  },
];

export const CERTIFICATION_DATA: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Complete Web Development (Level-1, Batch 9)",
    issuer: "Programming Hero",
    issueDate: "2024",
    type: "Professional Training",
    description: "Completed an intensive 7-month Full-Stack Web Development training course, mastering modern frontend and backend technologies including HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, Node.js, Express.js, and MongoDB.",
    skills: ["React.js", "JavaScript (ES6+)", "Next.js", "Express.js", "MongoDB", "Tailwind CSS", "REST API", "Git & GitHub"],
    driveUrl: "https://drive.google.com/file/d/1nY9_yoE88IJuKJXZI33dPgqFn1h_2Jn2/view",
  },
  {
    id: "cert-2",
    title: "National Skill Certificate in Web Design & Development (Level-3)",
    issuer: "National Skills Development Authority (NSDA)",
    issueDate: "2024",
    type: "Government Certification",
    credentialId: "NSDA-LEVEL3-WEB-2024",
    description: "Earned government-recognized Level-3 Skill Qualification in Web Design & Development under the Prime Minister's Office NSDA, validating standard competencies in modern web layout design, accessibility, responsiveness, and web standards.",
    skills: ["HTML5 & CSS3", "Bootstrap & Flexbox", "JavaScript", "Responsive UI Design", "Industry Best Practices"],
    driveUrl: "https://drive.google.com/file/d/1uqIIjC-Dfpei1pwsSGM3vwsbLYuPMVwK/view",
  },
  {
    id: "cert-3",
    title: "Frontend Web Development Training & Internship",
    issuer: "European IT Ltd",
    issueDate: "2024",
    type: "Professional Training",
    description: "Professional training and hands-on frontend web developer internship, building responsive React web interfaces from Figma prototypes, integrating REST APIs, and implementing optimal component architecture.",
    skills: ["React.js", "Figma to Code", "REST API Integration", "Tailwind CSS", "Bootstrap", "Git Workflow"],
    driveUrl: "https://drive.google.com/file/d/1Q5HC5Kebnoz0bDuvgT5ftt6uEsRBNPl1/view",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Shopify Ecosystem",
    skills: [
      { name: "Liquid", highlight: "Theme Core", icon: "code" },
      { name: "Online Store 2.0", highlight: "Architecture", icon: "layers" },
      { name: "Shopify CLI", highlight: "Dev Tool", icon: "terminal" },
      { name: "Remix", highlight: "App Framework", icon: "zap" },
      { name: "App Bridge", highlight: "Embedded App", icon: "box" },
      { name: "Polaris Web Components", highlight: "UI Library", icon: "layout" },
      { name: "GraphQL Admin API", highlight: "API", icon: "database" },
      { name: "Theme App Extensions", highlight: "Extension", icon: "blocks" },
      { name: "App Blocks", highlight: "Storefront UI", icon: "grid" },
      { name: "Metafields", highlight: "Custom Data", icon: "file-code" },
      { name: "Shopify Functions", highlight: "Backend Logic", icon: "cpu" },
      { name: "Billing API", highlight: "Monetization", icon: "key" },
      { name: "Theme Dev", highlight: "Custom Themes", icon: "code" },
      { name: "React Router", highlight: "Navigation", icon: "globe" },
      { name: "HTML", highlight: "Structure", icon: "file-code" },
      { name: "CSS", highlight: "Styling", icon: "sparkles" },
      { name: "Schema", highlight: "Custom Settings", icon: "settings" },
      { name: "Sections", highlight: "Dynamic UI", icon: "layers" },
      { name: "Blocks", highlight: "Modular Units", icon: "blocks" },
      { name: "Snippets", highlight: "Reusable Code", icon: "braces" },
    ],
  },
  {
    title: "Client Side",
    skills: [
      { name: "JavaScript", highlight: "ES6+", icon: "code" },
      { name: "TypeScript", highlight: "Type Safe", icon: "shield" },
      { name: "React.js", highlight: "Frontend Core", icon: "zap" },
      { name: "Next.js", highlight: "Fullstack Framework", icon: "globe" },
      { name: "Redux.js", highlight: "State Management", icon: "layers" },
      { name: "Tailwind CSS", highlight: "Styling", icon: "sparkles" },
      { name: "Bootstrap CSS", highlight: "UI Framework", icon: "layout" },
      { name: "Material UI", highlight: "Component Library", icon: "grid" },
      { name: "Firebase", highlight: "BaaS & Auth", icon: "key" },
      { name: "Stripe", highlight: "Payment Gateway", icon: "dollar" },
    ],
  },
  {
    title: "Server Side",
    skills: [
      { name: "Node.js", highlight: "Runtime Environment", icon: "cpu" },
      { name: "Express", highlight: "Backend Framework", icon: "server" },
      { name: "MongoDB", highlight: "NoSQL Database", icon: "database" },
      { name: "PostgreSQL", highlight: "Relational DB", icon: "database" },
      { name: "Prisma", highlight: "ORM", icon: "layers" },
      { name: "JWT", highlight: "Authentication", icon: "shield" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", highlight: "Version Control", icon: "git" },
      { name: "GitHub", highlight: "Code Hosting", icon: "github" },
      { name: "Git Bash", highlight: "Command Line", icon: "terminal" },
      { name: "npm", highlight: "Package Manager", icon: "box" },
      { name: "Yarn", highlight: "Package Manager", icon: "box" },
      { name: "Chrome DevTools", highlight: "Debugging", icon: "wrench" },
      { name: "VS Code", highlight: "IDE", icon: "code" },
      { name: "Vercel", highlight: "Deployment", icon: "globe" },
      { name: "Netlify", highlight: "Deployment", icon: "globe" },
      { name: "Firebase Hosting", highlight: "Hosting", icon: "cloud" },
      { name: "Render", highlight: "Cloud Host", icon: "server" },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Web Developer",
    company: "SM Technology",
    period: "Sep 2024 - Aug 2026",
    location: "Banasree, Dhaka, Bangladesh",
    icon: "briefcase",
    description: "Developed custom Shopify stores, customized themes, implemented custom features, integrated third-party apps, and optimized store performance.",
    achievements: [
      "Developed custom Shopify stores with responsive, conversion-focused user experiences.",
      "Customized Shopify Online Store 2.0 themes using Liquid, JavaScript, HTML, and CSS.",
      "Collaborated with clients to deliver scalable Shopify solutions and ongoing store enhancements.",
    ],
    techStack: [
      "Shopify",
      "Liquid",
      "Shopify CLI",
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Shopify Admin API",
      "Shopify Polaris",
      "Webhooks",
    ],
    type: "Full-time",
    metrics: [
      { label: "PROJECTS", value: "150+" },
      { label: "TEAM SIZE", value: "40+" },
      { label: "TECHNOLOGIES", value: "10+" },
    ],
  },
  {
  id: "exp-2",
  role: "Frontend Web Developer",
  company: "European IT Ltd",
  period: "Jun 2024 - Sep 2024",
  location: "Mirpur-10, Dhaka, Bangladesh",
  icon: "laptop",
  description: "Built responsive and user-friendly web interfaces, converted UI/UX designs into reusable React components, integrated REST APIs, optimized website performance, and collaborated with the development team to deliver modern web applications.",
  achievements: [
    "Developed responsive web pages and reusable React components from Figma designs.",
    "Integrated REST APIs and implemented dynamic data rendering with React.",
    "Improved website performance, responsiveness, and cross-browser compatibility.",
    "Collaborated with senior developers using Git and Agile development workflows."
  ],
  techStack: [
    "React.js",
    "JavaScript (ES6+)",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "REST APIs",
    "Git",
    "GitHub",
    "Vite"
  ],
  type: "Internship",
  metrics: [
    { label: "PROJECTS", value: "4" },
    { label: "TEAM SIZE", value: "15" },
    { label: "TECHNOLOGIES", value: "7" }
  ],
},
  {
  id: "exp-3",
  role: "Web Design & Development Trainee",
  company: "National Skills Development Authority (NSDA), Level-3",
  period: "April 2024 - June 2024",
  location: "Dhaka, Bangladesh",
  icon: "graduation-cap",
  description: "Completed a government-certified Level-3 training program in Web Design & Development, gaining practical skills in building responsive websites using modern frontend technologies and industry best practices for freelancing and real-world client projects.",
  achievements: [
    "Learned HTML5, CSS3, Bootstrap, and JavaScript fundamentals for modern web development.",
    "Built responsive and mobile-friendly websites following industry best practices.",
    "Completed hands-on projects focused on UI implementation and frontend development.",
    "Strengthened problem-solving, debugging, and version control skills for real-world client work."
  ],
  techStack: [
    "HTML5",
    "CSS3",
    "Bootstrap",
    "JavaScript",
    "Responsive Design",
    "Git",
    "GitHub",
    "VS Code"
  ],
  type: "Government Certification",
  metrics: [
    { label: "LEVEL", value: "3" },
    { label: "DURATION", value: " 3 months" },
    { label: "PROJECTS", value: "5+" }
  ],
},
  {
  id: "exp-4",
  role: "Web Development Trainee",
  company: "Programming Hero",
  period: "Dec, 2023 - Jun, 2024",
  location: "Online (Batch-9)",
  icon: "code",
  description: "Completed an intensive Full-Stack Web Development course, gaining hands-on experience in modern frontend and backend technologies while building multiple real-world web applications and responsive websites.",
  achievements: [
    "Learned HTML5, CSS3, JavaScript, React.js, Next.js, Express.js, and MongoDB.",
    "Built multiple responsive full-stack web applications through hands-on projects.",
    "Developed REST APIs and implemented CRUD functionality using the MERN stack.",
    "Strengthened problem-solving, debugging, Git, and deployment skills for real-world development."
  ],
  techStack: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Git",
    "GitHub"
  ],
  type: "Professional Training",
  metrics: [
    { label: "DURATION", value: "7 Months" },
    { label: "PROJECTS", value: "15+" },
    { label: "TECHNOLOGIES", value: "11" }
  ],
},
];

export const PROJECTS: Project[] = [
  {
    id: "autofit-pro",
    title: "AutoFit Pro ‑ Year Make Model",
    subtitle: "Published Embedded Shopify App for Vehicle Compatibility & Fitment",
    category: "Shopify App",
    image: "https://cdn.shopify.com/app-store/listing_images/0ac0060f6ea51175b356472ef876316b/promotional_image/CKjeqanwmJUDEAE=.png?height=720&width=1280",
    description: "Published Shopify App on the official Shopify App Store. AutoFit Pro helps merchants manage vehicle fitment data, assign product compatibility, and let shoppers search parts by Year, Make, and Model.",
    fullDescription: "AutoFit Pro is a production-ready, embedded Shopify App built using Remix, Shopify App Bridge, Polaris Web Components, Node.js, and GraphQL Admin API. It enables e-commerce merchants selling automotive parts, tires, and accessories to manage complex vehicle compatibility data from one dashboard and render responsive Year-Make-Model search widgets on storefronts.",
    techStack: [
      "Shopify App",
      "Remix",
      "Shopify Polaris",
      "GraphQL Admin API",
      "App Bridge",
      "React",
      "Node.js",
      "TypeScript"
    ],
    githubUrl: "",
    liveUrl: "https://apps.shopify.com/autofit-pro",
    featured: true,
    metrics: "Shopify App Store Live",
    highlights: [
      "Manage vehicle fitments & compatibility datasets from an embedded admin dashboard",
      "Responsive Year, Make, Model search filters for fast customer product discovery",
      "Integrated search analytics insights & GraphQL product compatibility assignments"
    ],
  },
  {
    id: "product-note",
    title: "Shopify Product Notes App",
    subtitle: "Merchant Product Notes, Internal Reminders & Activity Dashboard",
    category: "Shopify App",
    image: "/images/Product.webp",
    description: "This app allows merchants to create separate product notes for each of their products, helping them track issues, improvements, and important reminders. Merchants can add, update, or delete notes effortlessly.",
    fullDescription: "Shopify Product Notes empowers e-commerce merchants to attach internal notes, improvement ideas, and operational reminders directly to individual products. Integrated into Shopify Admin Actions and Admin Blocks using Metafields and GraphQL, the dashboard provides a clear overview of note counts, product coverage, and overall catalog activity insights.",
    techStack: [
      "React",
      "React Router",
      "Polaris Web Components",
      "GraphQL",
      "Metafields",
      "TypeScript",
      "Shopify Admin Actions",
      "Shopify Admin Blocks"
    ],
    githubUrl: "https://github.com/MdAlAmin212104/product-note",
    liveUrl: "https://github.com/MdAlAmin212104/product-note",
    featured: true,
    metrics: "Shopify Admin Extension",
    highlights: [
      "Create, update, & delete product-specific internal notes & operational reminders",
      "Deeply integrated with Shopify Admin Actions & Admin Blocks via Metafields",
      "Dashboard analytics overview of notes created & product coverage insights"
    ],
  },
  {
    id: "qr-code-app",
    title: "Shopify Product QR Code App",
    subtitle: "Instant Product Checkout QR Codes & Sales Analytics App",
    category: "Shopify App",
    image: "/images/qr.webp",
    description: "This application enables merchants to generate individual QR codes for their products. Each QR code is linked directly to the product's checkout page, allowing customers to scan and purchase instantly.",
    fullDescription: "Shopify Product QR Code App empowers merchants to generate, customize, and manage individual product QR codes linked directly to instant checkout pages. Built with React Router, Shopify Polaris, GraphQL, Metafields, and Admin Extensions, it simplifies buying journeys, boosts conversion rates, and tracks product-wise QR scan analytics.",
    techStack: [
      "React",
      "React Router",
      "Shopify Polaris",
      "GraphQL",
      "Shopify Metafields",
      "TypeScript",
      "Shopify Admin Actions",
      "Shopify Admin Blocks"
    ],
    githubUrl: "https://github.com/MdAlAmin212104/qr-code",
    liveUrl: "https://github.com/MdAlAmin212104/qr-code",
    featured: true,
    metrics: "Shopify Admin Extension",
    highlights: [
      "Generate individual product QR codes linking directly to instant checkout pages",
      "Track product-wise QR scan performance & offline-to-online conversion insights",
      "Seamlessly integrated into Shopify Admin Actions & Admin Blocks via Metafields"
    ],
  },

  // ── E-commerce Client Stores ──────────────────────────────────────────────

  {
    id: "fairbanks-company",
    title: "The Fairbanks Company",
    subtitle: "Industrial Material-Handling E-Commerce Store",
    category: "E-commerce",
    image: "/images/fairbanks.png",
    description: "A modern, high-performance e-commerce store specializing in industrial material-handling products—casters, wheels, hand trucks, and platform trucks—built for a clean, user-friendly, and conversion-focused shopping experience.",
    fullDescription: "The Fairbanks Company is a premium USA industrial e-commerce brand featuring material-handling products engineered with advanced manufacturing methods—robotic welding, CNC machining, and powder coating. I developed a custom Shopify theme with optimized product catalog structure, advanced filtering, and a seamless checkout experience engineered to drive B2B and B2C conversions for strength-focused, long-lasting industrial equipment.",
    techStack: ["Shopify", "Liquid", "Schema", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.thefairbankscompany.com/",
    featured: true,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Custom Shopify theme with advanced product catalog & filtering for industrial product lines",
      "Premium conversion-focused UX showcasing USA-made quality, certifications & product specs",
      "Robotic welding & CNC-engineered product storytelling via custom sections & metafields",
    ],
  },
  {
    id: "sleep-with-zen",
    title: "Sleep With Zen",
    subtitle: "Wellness Sleep-Enhancing Products Store — UK",
    category: "E-commerce",
    image: "/images/Sleep_With_Zen.png",
    description: "A modern wellness-focused e-commerce store offering sleep-enhancing products designed to improve breathing, reduce snoring, and promote deeper, uninterrupted sleep for better health and energy.",
    fullDescription: "Sleep With Zen is a UK-based wellness e-commerce brand focused on scientifically-backed, hypoallergenic sleep improvement products. I designed and developed the complete Shopify store from Figma prototype—delivering a calm, trust-building UI with clean product storytelling, optimized conversion flow, and mobile-responsive design tailored for health-conscious customers seeking restorative sleep solutions.",
    techStack: ["Shopify", "Liquid", "Schema", "JavaScript", "CSS3", "HTML5", "Figma to Shopify"],
    githubUrl: "",
    liveUrl: "https://sleepwithzen.co.uk/",
    featured: true,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Figma-to-Shopify conversion delivering a calming, wellness-focused brand storefront",
      "Safe, hypoallergenic product storytelling with trust signals & comfort-focused UX design",
      "Optimized for deep-sleep product discovery, mobile-first responsive checkout flow",
    ],
  },
  {
    id: "eichholtz-long-island",
    title: "Eichholtz Long Island",
    subtitle: "Premium Luxury European Furniture E-Commerce",
    category: "E-commerce",
    image: "/images/eichholtz.png",
    description: "A sleek, elegant luxury e-commerce store for Eichholtz Long Island—serving Long Island and Westchester County with a premium curated collection of high-end furnishings, décor, and European-inspired interior pieces.",
    fullDescription: "Eichholtz Long Island is a premium luxury e-commerce experience developed for a European furniture retailer serving the high-end market of Long Island and Westchester County, New York. I created a refined Shopify storefront with elegant typography, clean layout design, and a premium shopping experience that highlights each product's craftsmanship, timeless design, and European-inspired aesthetics—reflecting the Eichholtz brand identity at the highest level.",
    techStack: ["Shopify", "Liquid", "Schema", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://eichholtzlongisland.com/",
    featured: true,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Sleek, elegant storefront design reflecting luxury European furniture brand sophistication",
      "Refined typography, clean layout & premium product presentation with detail-focused UI",
      "Curated high-end shopping experience showcasing timeless craftsmanship & interior décor",
    ],
  },
  {
    id: "kosmic-mx",
    title: "Kosmic MX",
    subtitle: "Premium Korean Beauty & Lifestyle eCommerce Brand",
    category: "E-commerce",
    image: "/images/kosmoc.webp",
    description: "A premium Korean beauty and lifestyle eCommerce brand featuring a modern, clean, and user-friendly interface with smooth product navigation, secure payment integration, and mobile-first responsive design.",
    fullDescription: "Kosmic MX is a premium Korean beauty and lifestyle Shopify store designed to deliver a high-quality skincare shopping experience. I built a fully customized Shopify theme with smooth product navigation, secure payment gateway integration, optimized shipping setup, and a mobile-first responsive design—focused on enhancing customer engagement, building brand trust, and maximizing conversion rates.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://kosmicmx.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Fully customized Shopify theme with smooth product navigation & brand-consistent UI",
      "Secure payment integration, optimized shipping setup & mobile-first responsive design",
      "Enhanced customer engagement with conversion-focused product pages & trust signals",
    ],
  },
  {
    id: "guardian-avionics",
    title: "Guardian Avionics",
    subtitle: "Professional Aviation Products eCommerce Store",
    category: "E-commerce",
    image: "/images/guardian.png",
    description: "A professional e-commerce store for Guardian Avionics—delivering premium aviation electronics and cockpit products with a clean, trustworthy, and technically authoritative online shopping experience.",
    fullDescription: "Guardian Avionics is a professional aviation electronics e-commerce brand. I developed a custom Shopify storefront tailored for the precision-demanding aviation market—featuring clean, authoritative product presentations, technical specification layouts, secure checkout, and a mobile-responsive design built to inspire pilot confidence and drive professional-grade product sales.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://guardianavionics.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Precision-focused product pages with technical specification layouts for aviation professionals",
      "Trustworthy, authoritative storefront design tailored for the aviation electronics market",
      "Secure checkout & mobile-responsive design optimized for professional aviation buyers",
    ],
  },

  // ── Additional E-commerce Client Stores ───────────────────────────────────

  {
    id: "imaginovia",
    title: "Imaginovia",
    subtitle: "Creative Products & Innovative Design Store",
    category: "E-commerce",
    image: "/images/imaginovia.png",
    description: "A creative eCommerce store built on Shopify with a modern, engaging storefront, smooth product browsing, and a seamless shopping experience for innovative design-forward products.",
    fullDescription: "Imaginovia is a creative eCommerce brand delivering innovative design products. I developed a custom Shopify theme with modern UI patterns, smooth product navigation, and a shopping experience tailored to inspire creativity and drive conversions for design-forward customers.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://imaginovia.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Modern, creatively-designed Shopify storefront tailored for innovative products",
      "Smooth product navigation with intuitive UX & conversion-optimized checkout flow",
      "Mobile-first responsive design with brand-consistent styling and layout",
    ],
  },
  {
    id: "emprints-gifts",
    title: "Emprints Gifts",
    subtitle: "Custom Personalized Gifts & Printing eCommerce",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://emprintsgifts.com/",
    description: "A personalized gifting eCommerce store offering custom-printed gifts and keepsakes—developed on Shopify with intuitive customization, smooth ordering, and a warm, user-friendly shopping experience.",
    fullDescription: "Emprints Gifts is a custom personalized gifts and printing eCommerce brand. I built a complete Shopify store featuring intuitive product customization flows, warm and welcoming UI design, optimized gift product pages, and a seamless checkout experience—focused on helping customers easily create and order meaningful personalized gifts.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://emprintsgifts.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Intuitive product customization flow for personalized gift creation and ordering",
      "Warm, user-friendly storefront design tailored for gifting and special occasions",
      "Optimized checkout experience driving higher gift order conversion rates",
    ],
  },
  {
    id: "noctis-botanica",
    title: "Noctis Botanica",
    subtitle: "Botanical Beauty & Plant-Based Wellness Store",
    category: "E-commerce",
    image: "/images/noctis.png",
    description: "A premium botanical beauty and plant-based wellness eCommerce brand—developed on Shopify with a natural, earthy aesthetic, clean product storytelling, and an immersive brand-focused shopping experience.",
    fullDescription: "Noctis Botanica is a premium botanical beauty and wellness brand. I developed a Shopify store with an elegant, nature-inspired aesthetic—featuring clean product pages, botanical brand storytelling, ingredient transparency sections, and mobile-responsive design crafted to resonate with eco-conscious, wellness-focused customers.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.noctisbotanica.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Nature-inspired Shopify theme with botanical brand storytelling and earthy aesthetics",
      "Clean product pages with ingredient transparency and wellness-focused content sections",
      "Mobile-responsive design optimized for eco-conscious and wellness-driven customers",
    ],
  },
  {
    id: "your-cupcake-de",
    title: "Your Cupcake DE",
    subtitle: "German Artisan Cupcake & Bakery E-Commerce",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://www.yourcupcake.de/",
    description: "A delightful German artisan cupcake and bakery eCommerce store—built on Shopify with a warm, cheerful storefront, easy ordering experience, and beautiful product presentation for baked goods.",
    fullDescription: "Your Cupcake DE is a German artisan bakery eCommerce brand specializing in handcrafted cupcakes and baked goods. I built a custom Shopify storefront with a warm, inviting UI, beautiful product photography showcase, easy ordering flows, and a charming brand experience tailored for German-speaking sweet-lovers.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.yourcupcake.de/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Warm, cheerful Shopify theme with inviting bakery brand aesthetics and product showcase",
      "Easy, intuitive ordering experience optimized for German-speaking bakery customers",
      "Beautiful product photography presentation with custom sections and visual storytelling",
    ],
  },
  {
    id: "fatboy-design-usa",
    title: "Fatboy Design USA",
    subtitle: "Premium Furniture & Lifestyle Design Brand Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://fatboydesignusa.com/",
    description: "A premium furniture and lifestyle design brand eCommerce store—developed on Shopify with a bold, modern storefront, premium product presentation, and a seamless high-end shopping experience.",
    fullDescription: "Fatboy Design USA is a bold premium furniture and lifestyle design brand. I developed a custom Shopify store with a striking modern design, full-width product imagery, rich brand storytelling, and a premium checkout experience—built to showcase design-forward furniture and lifestyle products to discerning US customers.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://fatboydesignusa.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Bold, modern Shopify storefront with full-width imagery and premium brand positioning",
      "Rich product storytelling sections with design-focused UI for lifestyle furniture products",
      "High-end checkout experience and mobile-responsive design for the US market",
    ],
  },
  {
    id: "upper-carbon",
    title: "Upper Carbon",
    subtitle: "Carbon Fiber Performance Products eCommerce",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://uppercarbon.com/",
    description: "A sleek, performance-driven eCommerce store for carbon fiber products—built on Shopify with a dark, technical aesthetic and precision-focused product experience for performance enthusiasts.",
    fullDescription: "Upper Carbon is a carbon fiber and performance products eCommerce brand. I built a custom Shopify theme with a sleek dark aesthetic, technical product specifications presentation, performance-focused UI, and a seamless checkout experience—designed to appeal to performance enthusiasts and automotive professionals seeking premium carbon fiber solutions.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://uppercarbon.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Dark, technical Shopify theme with precision-focused carbon fiber product presentation",
      "Performance-oriented UI with detailed product specifications and material highlights",
      "Seamless checkout experience tailored for automotive enthusiasts and professionals",
    ],
  },
  {
    id: "penghao-furniture",
    title: "Penghao Furniture",
    subtitle: "Premium Home Furniture & Furnishings Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://penghaofurniture.com/",
    description: "A premium home furniture and furnishings eCommerce store—developed on Shopify with an elegant, clean layout, sophisticated product catalog, and a seamless browsing and purchasing experience.",
    fullDescription: "Penghao Furniture is a premium home furniture eCommerce brand. I developed a custom Shopify storefront with an elegant clean layout, filterable product collections, high-quality product photography presentation, and an intuitive browsing experience—crafted to help customers effortlessly discover and purchase premium home furnishings.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://penghaofurniture.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Elegant Shopify theme with clean layout and sophisticated furniture catalog presentation",
      "Filterable product collections with high-quality imagery and detailed product pages",
      "Intuitive browsing experience optimized for furniture discovery and conversion",
    ],
  },
  {
    id: "home-furniture-outlet",
    title: "The Home Furniture Outlet",
    subtitle: "Affordable Home Furniture Outlet eCommerce",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://thehomefurnitureoutlet.com/",
    description: "An affordable home furniture outlet eCommerce store—built on Shopify with a value-driven, user-friendly storefront, easy product discovery, and a streamlined checkout experience.",
    fullDescription: "The Home Furniture Outlet is an affordable home furniture eCommerce brand targeting value-conscious shoppers. I built a Shopify store with a clean, organized product catalog, price-focused product pages, easy navigation across furniture categories, and a streamlined checkout flow—designed to make furniture shopping fast, simple, and accessible.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://thehomefurnitureoutlet.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Value-driven Shopify storefront with organized furniture catalog and easy navigation",
      "Price-focused product pages with clear shipping info and trust-building elements",
      "Streamlined checkout experience optimized for value-conscious furniture shoppers",
    ],
  },
  {
    id: "mobbuu",
    title: "Mobbuu",
    subtitle: "Modern Lifestyle & Fashion eCommerce Brand",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://mobbuu.com/",
    description: "A modern lifestyle and fashion eCommerce brand—developed on Shopify with a stylish, contemporary storefront, smooth product browsing, and a trend-forward shopping experience.",
    fullDescription: "Mobbuu is a modern lifestyle and fashion eCommerce brand. I developed a custom Shopify theme with a stylish, contemporary aesthetic, smooth collection browsing, trend-forward product pages, and a mobile-first shopping experience—built to connect fashion-conscious customers with curated lifestyle products.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://mobbuu.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Stylish, contemporary Shopify theme with trend-forward product presentation",
      "Smooth collection browsing with mobile-first design and intuitive navigation",
      "Fashion-focused shopping experience designed to drive lifestyle product conversions",
    ],
  },
  {
    id: "dead-clean",
    title: "Dead Clean",
    subtitle: "Professional Cleaning Products eCommerce Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://www.deadclean.com/",
    description: "A professional cleaning products eCommerce store—developed on Shopify with a bold, clean brand identity, clear product benefits presentation, and a conversion-optimized shopping experience.",
    fullDescription: "Dead Clean is a bold professional cleaning products eCommerce brand. I developed a custom Shopify storefront with a strong brand identity, clear product benefits presentation, feature-highlight sections, and an optimized checkout experience—designed to communicate product effectiveness and drive conversions for professional and household cleaning solutions.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.deadclean.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Bold brand identity with clear product benefits and effectiveness highlights",
      "Conversion-focused product pages with feature demonstrations and trust signals",
      "Streamlined Shopify checkout optimized for cleaning product repeat purchase flows",
    ],
  },
  {
    id: "qwadrum",
    title: "Qwadrum",
    subtitle: "Musical Drum Kits & Percussion Instruments Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://www.qwadrum.com/en",
    description: "A specialized eCommerce store for Qwadrum—a musical drum kit and percussion instrument brand—built on Shopify with a vibrant, music-inspired storefront and intuitive instrument shopping experience.",
    fullDescription: "Qwadrum is a specialized musical drum and percussion instruments eCommerce brand. I developed a custom Shopify theme with a vibrant, music-inspired visual identity, detailed product specification pages, and a seamless international checkout experience—crafted to serve musicians and drumming enthusiasts worldwide.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.qwadrum.com/en",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Music-inspired Shopify theme with vibrant visual identity for drum and percussion products",
      "Detailed product specification pages for instrument discovery and comparison",
      "International-ready checkout experience tailored for global musician customers",
    ],
  },
  {
    id: "dog-squad-ie",
    title: "Dog Squad IE",
    subtitle: "Premium Irish Pet Care & Dog Accessories Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://dogsquad.ie/",
    description: "A premium Irish pet care and dog accessories eCommerce store—developed on Shopify with a fun, dog-loving brand identity, intuitive product catalog, and a delightful shopping experience for pet owners.",
    fullDescription: "Dog Squad IE is a premium Irish pet care eCommerce brand serving dog owners across Ireland. I built a custom Shopify store with a fun, energetic brand identity, well-organized pet accessories catalog, and a mobile-responsive shopping experience—designed to help Irish dog owners easily discover and purchase premium care products for their pets.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://dogsquad.ie/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Fun, energetic Shopify theme with dog-loving brand identity for Irish pet owners",
      "Well-organized pet accessories catalog with intuitive navigation and filtering",
      "Mobile-responsive shopping experience optimized for dog owner product discovery",
    ],
  },
  {
    id: "performance-bagger-suspension",
    title: "Performance Bagger Suspension",
    subtitle: "Motorcycle Suspension Upgrade Systems Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://performancebaggersuspension.com/",
    description: "A specialized motorcycle suspension upgrade eCommerce store—built on Shopify with a bold, performance-focused storefront, technical product specifications, and a seamless parts shopping experience.",
    fullDescription: "Performance Bagger Suspension is a specialized motorcycle suspension parts and upgrade systems eCommerce brand. I developed a custom Shopify theme with a bold, performance-driven aesthetic, technical product specification pages, fitment compatibility guides, and a seamless checkout—built to serve motorcycle enthusiasts and bagger builders seeking premium suspension solutions.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://performancebaggersuspension.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Bold performance-focused Shopify theme for motorcycle suspension parts and upgrades",
      "Technical product specification pages with fitment compatibility guides",
      "Seamless checkout experience tailored for motorcycle enthusiasts and bagger builders",
    ],
  },
  {
    id: "nordic-vintage-home",
    title: "Nordic Vintage Home",
    subtitle: "Scandinavian Vintage Home Décor eCommerce",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://nordicvintagehome.com/",
    description: "A curated Scandinavian vintage home décor eCommerce store—developed on Shopify with a clean, minimalist Nordic aesthetic, beautifully presented curated collections, and an effortless browsing experience.",
    fullDescription: "Nordic Vintage Home is a Scandinavian vintage home décor eCommerce brand curating timeless Nordic interior pieces. I built a Shopify storefront with a clean, minimalist aesthetic faithful to Nordic design principles, beautifully presented vintage collections, editorial-style product storytelling, and a seamless shopping experience—crafted for interior design enthusiasts and Scandinavian style lovers.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://nordicvintagehome.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Clean minimalist Shopify theme with authentic Nordic and Scandinavian design aesthetics",
      "Editorial-style curated vintage collection presentation and product storytelling",
      "Effortless browsing experience optimized for interior design and home décor enthusiasts",
    ],
  },
  {
    id: "pxle-uk",
    title: "PXLE",
    subtitle: "Digital Creative Products & Design Store (UK)",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://pxle.co.uk/",
    description: "A modern UK digital creative products eCommerce store—built on Shopify with a sleek, pixel-perfect design, intuitive product catalog, and a smooth digital shopping experience.",
    fullDescription: "PXLE is a UK-based digital and creative products eCommerce brand. I developed a custom Shopify theme with a sleek, pixel-perfect modern design, smooth product navigation, and a mobile-responsive storefront—crafted for creative professionals and digital product customers in the UK market.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://pxle.co.uk/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Sleek, pixel-perfect Shopify theme with modern design for UK creative customers",
      "Smooth product navigation with optimized digital product discovery flows",
      "Mobile-responsive storefront crafted for creative professionals in the UK market",
    ],
  },
  {
    id: "or-scent-fr",
    title: "OR Scent",
    subtitle: "French Artisan Luxury Perfume & Fragrance Brand",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://www.or-scent.fr/",
    description: "A French artisan luxury perfume and fragrance eCommerce brand—developed on Shopify with an elegant, sophisticated storefront, immersive scent storytelling, and a premium French luxury shopping experience.",
    fullDescription: "OR Scent is a premium French artisan luxury perfume and fragrance eCommerce brand. I crafted a custom Shopify storefront with an elegant, sophisticated visual identity, immersive scent and ingredient storytelling sections, refined French luxury aesthetics, and a premium checkout experience—designed to express artisanal craftsmanship and drive high-value fragrance purchases.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://www.or-scent.fr/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Elegant luxury Shopify theme with immersive French artisan brand storytelling",
      "Refined scent and ingredient storytelling sections with sophisticated typography",
      "Premium checkout experience tailored for luxury perfume and fragrance purchases",
    ],
  },
  {
    id: "dplans",
    title: "Dplans",
    subtitle: "Digital Design Plans & Blueprint Downloads Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://dplans.com/",
    description: "A digital design plans and blueprint downloads eCommerce store—built on Shopify with a clean, professional storefront, intuitive digital product catalog, and a streamlined download-focused shopping experience.",
    fullDescription: "Dplans is a digital design plans and blueprint downloads eCommerce brand. I built a custom Shopify store with a clean, professional aesthetic, well-organized digital product catalog, instant delivery setup for downloadable plans, and a streamlined checkout flow—crafted for architects, builders, and DIY enthusiasts seeking professional design blueprint downloads.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://dplans.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Clean professional Shopify theme with organized digital blueprint product catalog",
      "Instant digital delivery setup optimized for downloadable design plan purchases",
      "Streamlined checkout flow tailored for architects, builders, and DIY enthusiasts",
    ],
  },
  {
    id: "fell-plus",
    title: "Fell Plus",
    subtitle: "Outdoor Adventure & Performance Apparel Store",
    category: "E-commerce",
    image: "https://image.thum.io/get/width/1280/crop/630/https://fellplus.com/",
    description: "An outdoor adventure and performance apparel eCommerce store—developed on Shopify with a bold, adventure-driven storefront, dynamic product collections, and an energetic shopping experience for outdoor enthusiasts.",
    fullDescription: "Fell Plus is an outdoor adventure and performance apparel eCommerce brand. I developed a custom Shopify theme with a bold, adventure-driven visual identity, dynamic product collection pages, size and fit guides, and a mobile-first shopping experience—built to energize outdoor enthusiasts and drive conversions for performance apparel and adventure gear.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS3", "HTML5"],
    githubUrl: "",
    liveUrl: "https://fellplus.com/",
    featured: false,
    metrics: "Live E-Commerce Store",
    highlights: [
      "Bold adventure-driven Shopify theme with dynamic product collections for outdoor gear",
      "Size and fit guides with performance-focused product storytelling and specifications",
      "Mobile-first shopping experience optimized for outdoor enthusiasts and adventure seekers",
    ],
  },

  // ── Full Stack Projects ───────────────────────────────────────────────────

  {
    id: "invoice-pdf-generator",
    title: "Invoice PDF Generator",
    subtitle: "Dynamic Client Invoice Builder with Instant PDF Export",
    category: "Full Stack",
    image: "/images/invoice.png",
    description: "A powerful invoice generation web app that allows users to fill in client, service, and pricing details through an intuitive form interface and instantly generate a professionally formatted, downloadable PDF invoice.",
    fullDescription: "The Invoice PDF Generator is a fully client-side full-stack web application built with React.js and modern JavaScript. Users can input client details, itemized services, tax rates, and custom notes through a dynamic form interface. Upon submission, the app generates a pixel-perfect, professional invoice in PDF format—ready for immediate download and delivery. The app features real-time calculation of subtotals, tax, and grand totals, ensuring accuracy at every step. Built with a clean, minimal UI, it's designed for freelancers and small businesses who need fast, reliable invoice creation without any backend complexity.",
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "jsPDF", "Netlify"],
    githubUrl: "",
    liveUrl: "https://create-invoicepdf.netlify.app/",
    featured: true,
    metrics: "Live Full Stack App",
    highlights: [
      "Dynamic multi-field invoice form with real-time subtotal, tax & grand total calculations",
      "One-click professionally formatted PDF generation and instant browser download",
      "Clean, minimal UI optimized for freelancers and small businesses to create invoices fast",
    ],
  },
  {
    id: "spicy-king-restaurant",
    title: "Spicy King",
    subtitle: "Full Stack Restaurant Management System with Firebase Auth & Admin Panel",
    category: "Full Stack",
    image: "/images/spicy.png",
    description: "A full-featured restaurant management web app with Firebase authentication, an admin panel for managing menu items (Create, Read, Update, Delete), and a live menu display system for customers visiting the site.",
    fullDescription: "Spicy King is a complete full-stack restaurant management system built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Firebase Authentication for secure user login. The platform features a dual-role system: visitors can browse the live menu with rich item details, while admins log in to manage the entire menu catalog from a protected dashboard. Admins can add new dishes, update existing items with pricing and descriptions, and delete discontinued products—all changes reflect instantly on the live storefront. Firebase is used for both authentication and real-time updates, ensuring the customer-facing menu is always current. This project demonstrates end-to-end CRUD operations, role-based access control, and seamless frontend-backend integration.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JavaScript", "Tailwind CSS", "Firebase Hosting"],
    githubUrl: "",
    liveUrl: "https://spicyking-4c20c.web.app/",
    featured: true,
    metrics: "Live Full Stack App",
    highlights: [
      "Role-based access: admin panel with full CRUD menu management, live storefront for visitors",
      "Firebase Authentication with secure login and protected admin dashboard routes",
      "Real-time menu updates — admin changes instantly reflected on the customer-facing live site",
    ],
  },
  {
    id: "survey-app-firebase",
    title: "Survey Voting App",
    subtitle: "Role-Based Survey Platform with Admin Controls & Firebase Auth",
    category: "Full Stack",
    image: "/images/survey.png",
    description: "A full-featured survey management platform where admins can create and manage surveys, authenticated users can vote on them, and everyone can view detailed result breakdowns—all powered by Firebase and role-based access control.",
    fullDescription: "The Survey Voting App is a full-stack web application built with React.js and Firebase, featuring a comprehensive role-based access control system. Visitors can browse available surveys, but voting requires authentication. Once logged in, users can view their personalized survey list and cast votes. Admin users have elevated privileges to create new surveys, generate unique survey links, and view detailed voting analytics including per-option vote counts and participant breakdowns. Firebase is used for authentication, Firestore for real-time database storage of surveys and votes, and Firebase Hosting for deployment. The app enforces a strict one-vote-per-user rule per survey, ensuring data integrity. Role assignment is managed through Firestore user documents, supporting clean role-based routing and UI rendering.",
    techStack: ["React.js", "Firebase Auth", "Firestore", "JavaScript", "Tailwind CSS", "Firebase Hosting"],
    githubUrl: "",
    liveUrl: "https://simple-firebase-586eb.web.app/",
    featured: true,
    metrics: "Live Full Stack App",
    highlights: [
      "Admin dashboard to create surveys & generate links; users vote with enforced one-vote rule",
      "Role-based access control — admin, authenticated user, and guest visitor permission tiers",
      "Real-time Firestore vote tracking with detailed analytics and result breakdown per survey",
    ],
  },
  {
    id: "sunset-hotel-booking",
    title: "Sunset Hotel",
    subtitle: "Full Stack Hotel Management & Room Booking System",
    category: "Full Stack",
    image: "/images/sunset.png",
    description: "A complete hotel management and booking web application where admins can manage room listings from a protected dashboard, and visitors can browse available rooms, view detailed room information, and submit booking requests.",
    fullDescription: "Sunset Hotel is a full-stack hotel management system built with React.js, Node.js, Express.js, MongoDB, and Firebase Authentication. The platform features two distinct user flows: admins log in to a protected dashboard where they can add, update, and manage hotel room details including pricing, amenities, availability, and images—all instantly reflected on the public-facing site. Visitors can browse the live room listings, click 'View Details' to explore full room information, and submit booking requests. The system features a clean, modern hotel-themed UI with responsive design, real-time data updates via the backend API, and Firebase-powered authentication to secure the admin panel. This project showcases complete full-stack CRUD functionality with a polished hospitality-focused user experience.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "JavaScript", "Tailwind CSS", "Firebase Hosting"],
    githubUrl: "",
    liveUrl: "https://sunset-20cd7.web.app/",
    featured: true,
    metrics: "Live Full Stack App",
    highlights: [
      "Admin dashboard to add and manage hotel rooms — changes instantly visible on live site",
      "Guest-facing room listings with detailed view and booking request functionality",
      "Firebase Auth-secured admin panel with full CRUD room management via REST API",
    ],
  },
  {
    id: "journey-live-api",
    title: "Journey Live",
    subtitle: "API-Driven Travel & Destination Explorer with CRUD & Firebase Auth",
    category: "Full Stack",
    image: "/images/journey.png",
    description: "A dynamic travel and destination exploration platform powered by live API data, featuring full CRUD operations for managing travel entries, rich destination details, and Firebase-based user authentication with login functionality.",
    fullDescription: "Journey Live is a full-stack travel exploration web application built with React.js and Firebase that fetches and displays live destination data from an external API. The platform offers complete CRUD functionality—users can add new travel destinations, update existing entries with additional information (notes, tips, images), and delete records. Each destination features a richly detailed view with key travel information. Firebase Authentication powers the login system, enabling personalized experiences where authenticated users access their saved journey data. The app integrates smooth UI animations, responsive design, and a robust state management system to deliver a seamless travel discovery experience. This project demonstrates API consumption, real-time data management, and full-stack integration with a Firebase backend.",
    techStack: ["React.js", "Firebase Auth", "Firestore", "REST API", "JavaScript", "Tailwind CSS", "Firebase Hosting"],
    githubUrl: "",
    liveUrl: "https://journeylive.web.app/",
    featured: true,
    metrics: "Live Full Stack App",
    highlights: [
      "Live API-driven destination data with full Create, Read, Update & Delete functionality",
      "Firebase Authentication with personalized user journey data and protected routes",
      "Rich destination detail views with notes, tips, and additional travel info management",
    ],
  },
];
