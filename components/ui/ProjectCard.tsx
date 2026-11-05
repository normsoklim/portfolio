import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/types/project";
import { ChevronRight, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-lg">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-foreground hover:bg-white/10 hover:text-primary transition-colors"
          >
            View Details <ChevronRight className="h-4 w-4" />
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted-foreground hover:text-primary transition-colors"
            title="GitHub Repository"
          >
            <FiGithub className="h-4 w-4" />
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-muted-foreground hover:text-primary transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}