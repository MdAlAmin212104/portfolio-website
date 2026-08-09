"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { SectionHeader } from "../ui/SectionHeader";
import {
  ShoppingBag,
  Code2,
  Server,
  Wrench,
} from "lucide-react";
import {
  SiShopify,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiMui,
  SiFirebase,
  SiStripe,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiJsonwebtokens,
  SiExpress,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiNpm,
  SiYarn,
  SiGooglechrome,
  SiNetlify,
  SiVercel,
  SiRender,
  SiReactrouter,
  SiRemix,
  SiGraphql,
} from "react-icons/si";
import { TbBrandVscode, TbBrandCss3, TbBrandHtml5 } from "react-icons/tb";

export function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex];

  const getCategoryIcon = (categoryTitle: string) => {
    switch (categoryTitle) {
      case "Shopify Ecosystem":
        return <ShoppingBag className="w-4 h-4 text-[#95bf47]" aria-hidden="true" />;
      case "Client Side":
        return <Code2 className="w-4 h-4 text-[#61dafb]" aria-hidden="true" />;
      case "Server Side":
        return <Server className="w-4 h-4 text-[#5fa04e]" aria-hidden="true" />;
      case "Tools & Platforms":
        return <Wrench className="w-4 h-4 text-[#00c7b7]" aria-hidden="true" />;
      default:
        return <Code2 className="w-4 h-4" aria-hidden="true" />;
    }
  };

  const getOfficialSkillIcon = (skillName: string) => {
    switch (skillName) {
      // Shopify Ecosystem
      case "Liquid":
      case "Online Store 2.0":
      case "Shopify CLI":
      case "App Bridge":
      case "Polaris Web Components":
      case "Theme App Extensions":
      case "App Blocks":
      case "Metafields":
      case "Shopify Metaobjects":
      case "Shopify Functions":
      case "Billing API":
      case "Theme Dev":
      case "Schema":
      case "Sections":
      case "Blocks":
      case "Snippets":
        return <SiShopify className="w-5 h-5 text-[#95bf47]" title={skillName} aria-label={skillName} />;
      case "Remix":
        return <SiRemix className="w-5 h-5 text-[#3992ff]" title={skillName} aria-label={skillName} />;
      case "GraphQL Admin API":
        return <SiGraphql className="w-5 h-5 text-[#e10098]" title={skillName} aria-label={skillName} />;
      case "React Router":
        return <SiReactrouter className="w-5 h-5 text-[#ca4245]" title={skillName} aria-label={skillName} />;
      case "HTML":
        return <TbBrandHtml5 className="w-5 h-5 text-[#e34f26]" title={skillName} aria-label={skillName} />;
      case "CSS":
        return <TbBrandCss3 className="w-5 h-5 text-[#1572b6]" title={skillName} aria-label={skillName} />;

      // Client Side
      case "JavaScript":
        return <SiJavascript className="w-5 h-5 text-[#f7df1e]" title={skillName} aria-label={skillName} />;
      case "TypeScript":
        return <SiTypescript className="w-5 h-5 text-[#3178c6]" title={skillName} aria-label={skillName} />;
      case "React.js":
        return <SiReact className="w-5 h-5 text-[#61dafb]" title={skillName} aria-label={skillName} />;
      case "Next.js":
        return <SiNextdotjs className="w-5 h-5 text-white" title={skillName} aria-label={skillName} />;
      case "Redux.js":
        return <SiRedux className="w-5 h-5 text-[#764abc]" title={skillName} aria-label={skillName} />;
      case "Tailwind CSS":
        return <SiTailwindcss className="w-5 h-5 text-[#06b6d4]" title={skillName} aria-label={skillName} />;
      case "Bootstrap CSS":
        return <SiBootstrap className="w-5 h-5 text-[#7952b3]" title={skillName} aria-label={skillName} />;
      case "Material UI":
        return <SiMui className="w-5 h-5 text-[#007fff]" title={skillName} aria-label={skillName} />;
      case "Firebase":
        return <SiFirebase className="w-5 h-5 text-[#ffca28]" title={skillName} aria-label={skillName} />;
      case "Stripe":
        return <SiStripe className="w-5 h-5 text-[#635bff]" title={skillName} aria-label={skillName} />;

      // Server Side
      case "Node.js":
        return <SiNodedotjs className="w-5 h-5 text-[#5fa04e]" title={skillName} aria-label={skillName} />;
      case "Express":
        return <SiExpress className="w-5 h-5 text-white" title={skillName} aria-label={skillName} />;
      case "MongoDB":
        return <SiMongodb className="w-5 h-5 text-[#47a248]" title={skillName} aria-label={skillName} />;
      case "PostgreSQL":
        return <SiPostgresql className="w-5 h-5 text-[#4169e1]" title={skillName} aria-label={skillName} />;
      case "Prisma":
        return <SiPrisma className="w-5 h-5 text-[#5a67d8]" title={skillName} aria-label={skillName} />;
      case "JWT":
        return <SiJsonwebtokens className="w-5 h-5 text-[#d63af9]" title={skillName} aria-label={skillName} />;

      // Tools & Platforms
      case "Git":
      case "Git Bash":
        return <SiGit className="w-5 h-5 text-[#f05032]" title={skillName} aria-label={skillName} />;
      case "GitHub":
        return <SiGithub className="w-5 h-5 text-white" title={skillName} aria-label={skillName} />;
      case "npm":
        return <SiNpm className="w-5 h-5 text-[#cb3837]" title={skillName} aria-label={skillName} />;
      case "Yarn":
        return <SiYarn className="w-5 h-5 text-[#2c8ebb]" title={skillName} aria-label={skillName} />;
      case "Chrome DevTools":
        return <SiGooglechrome className="w-5 h-5 text-[#4285f4]" title={skillName} aria-label={skillName} />;
      case "VS Code":
        return <TbBrandVscode className="w-5 h-5 text-[#007acc]" title={skillName} aria-label={skillName} />;
      case "Firebase Hosting":
        return <SiFirebase className="w-5 h-5 text-[#ffca28]" title={skillName} aria-label={skillName} />;
      case "Netlify":
        return <SiNetlify className="w-5 h-5 text-[#00c7b7]" title={skillName} aria-label={skillName} />;
      case "Vercel":
        return <SiVercel className="w-5 h-5 text-white" title={skillName} aria-label={skillName} />;
      case "Render":
        return <SiRender className="w-5 h-5 text-[#46e3b7]" title={skillName} aria-label={skillName} />;

      default:
        return <SiShopify className="w-5 h-5 text-[#95bf47]" title={skillName} aria-label={skillName} />;
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge="Technical Expertise"
          title="Skills & Technology Stack"
          subtitle="Specialized in Shopify App & Theme Development, Frontend Architectures, Fullstack Engineering, and DevOps Tools."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-neon border-primary/50"
                    : "text-gray-400 hover:text-white glass-dock border-white/5 hover:border-white/15"
                }`}
                data-cursor="pointer"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{getCategoryIcon(cat.title)}</span>
                <span className="relative z-10">{cat.title}</span>
                <span
                  className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-gray-300"
                  }`}
                >
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Info Subtitle */}
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-mono font-medium text-gray-400">
            Showing <span className="text-accent font-bold">{activeCategory.skills.length}</span> technologies in{" "}
            <span className="text-white font-bold">{activeCategory.title}</span>
          </span>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4"
          >
            {activeCategory.skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: idx * 0.02 }}
                className="glass-card p-4 rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-300 group hover:shadow-neon hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Ambient Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-10 h-10 rounded-xl glass-dock border border-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-accent/40 transition-all duration-300 shadow-md bg-white/5">
                      {getOfficialSkillIcon(skill.name)}
                    </div>

                    {skill.highlight && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider bg-accent/15 text-accent border border-accent/30 font-semibold text-right shrink-0">
                        {skill.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors leading-tight">
                    {skill.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


