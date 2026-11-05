import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero banner */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/60" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <span className="inline-block mb-4 px-4 py-1 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-primary tracking-wider uppercase">
              {project.category}
            </span>
            <h1 className="text-5xl font-bold text-foreground tracking-tight sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {project.description}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="lead text-muted-foreground">
                {project.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-foreground hover:bg-white/10 hover:text-primary transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c-5.523 0-10 4.477-10 10 0 4.46 2.865 8.254 6.839 9.582.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026.953-.223 1.983-.336 3-.341 1.017.005 2.047.118 3 .341 1.91-1.292 2.547-1.026 2.547-1.026.544 1.378.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.852 0 1.338-.012 2.414-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12c0-5.523-4.477-10-10-10"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub Repository
              </a>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-4l-4.586 4.586a2 2 0 11-2.828-2.828L14.586 6M16 10l2.586-2.586a2 2 0 112.828 2.828L18.828 10"
                    />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>

            {/* Images gallery */}
            {project.images && project.images.length > 1 && (
              <div className="mt-16 grid grid-cols-2 gap-4">
                {project.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="rounded-xl object-cover"
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}