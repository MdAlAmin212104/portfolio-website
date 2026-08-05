import { FaFacebook } from "react-icons/fa6";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "Shopify Store" | "Shopify App" | "Front End";
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
];
