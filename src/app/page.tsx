"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Project } from "@/data/portfolioData";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// Dynamically import heavy WebGL background canvas (extracts Three.js out of main bundle)
const BackgroundCanvas = dynamic(
  () => import("@/components/ui/BackgroundCanvas").then((m) => m.BackgroundCanvas),
  { ssr: false }
);

const CustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false }
);

const AllProjects = dynamic(
  () => import("@/components/sections/AllProjects").then((m) => m.AllProjects)
);

const EducationCertifications = dynamic(
  () => import("@/components/sections/EducationCertifications").then((m) => m.EducationCertifications)
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => m.Contact)
);

const Footer = dynamic(
  () => import("@/components/sections/Footer").then((m) => m.Footer)
);

const ProjectModal = dynamic(
  () => import("@/components/ui/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <BackgroundCanvas />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <FeaturedProjects onSelectProject={(p) => setSelectedProject(p)} />
          <AllProjects onSelectProject={(p) => setSelectedProject(p)} />
          <EducationCertifications />
          <Contact />
        </main>
        <Footer />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SmoothScrollProvider>
  );
}
