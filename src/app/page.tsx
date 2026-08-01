"use client";

import { useState } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundCanvas } from "@/components/ui/BackgroundCanvas";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AllProjects } from "@/components/sections/AllProjects";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Project } from "@/data/portfolioData";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
          <Services />
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
