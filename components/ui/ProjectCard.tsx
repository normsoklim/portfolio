import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/types/project";
import { ChevronRight, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6),0_0_0_1px_rgba(99,102,241,0.15)]">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Always-on subtle vignette; deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500 group-hover:from-black/70" />
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30">
            Featured
          </span>
        )}
        {/* Quick actions slide in over the image */}
        <div className="absolute right-4 top-4 flex translate-y-[-8px] gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-foreground backdrop-blur-sm transition-colors hover:text-primary"
            title="GitHub Repository"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-foreground backdrop-blur-sm transition-colors hover:text-primary"
              title="Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4">
          <Link
            href={`/projects/${project.id}`}
            className="group/link flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            View Details
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
