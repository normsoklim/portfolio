"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { VIEWPORT, fadeUpStagger } from "@/lib/animations";

export function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative overflow-hidden py-28 px-6 lg:px-12">
      <div
        className="glow-blob absolute right-[-10%] top-0 h-[400px] w-[400px] bg-purple-700/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="My Work"
          title="Featured Projects"
          description="A selection of my work"
        />

        {/* Featured Projects - Full width grid */}
        <div className="mb-20 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUpStagger(i * 0.12)}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* All Projects */}
        <motion.div
          variants={fadeUpStagger(0)}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT}
          className="mb-8 flex items-end justify-between"
        >
          <h2 className="text-2xl font-bold text-foreground">All Projects</h2>
          <Link
            href="/projects"
            className="group flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUpStagger((i % 3) * 0.1)}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
