"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { educations } from "@/data/experience";
import { VIEWPORT, fadeUpStagger } from "@/lib/animations";

const highlights = [
  "Full-stack web development with Next.js and NestJS",
  "Mobile development with Flutter and Laravel",
  "Backend systems with Node.js, Express, NestJS and Laravel",
  "Database design and management with PostgreSQL",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28 px-6 lg:px-12">
      <div
        className="glow-blob absolute left-[-15%] top-1/3 h-[420px] w-[420px] bg-indigo-700/10"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Who I Am"
          title="About Me"
          description="MIS student passionate about building scalable software solutions"
        />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={fadeUpStagger(0)}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT}
            className="group relative mx-auto w-full max-w-md"
          >
            {/* Rotating halo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-3xl bg-[conic-gradient(from_0deg,rgba(99,102,241,0.35),transparent_40%,rgba(168,85,247,0.35),transparent_90%)] opacity-70 blur-xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                className="transition-transform duration-700 ease-out group-hover:scale-105"
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpStagger(0.15)}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Background
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                I&apos;m a Management Information Systems (MIS) student at SETEC
                Institute with a passion for software development. I specialize
                in building full-stack web applications, backend systems, and
                mobile applications with clean, maintainable code.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                What I Do
              </h3>
              <ul className="space-y-3">
                {highlights.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                    className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[10px] text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      ✓
                    </span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                Education
              </h3>
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="mb-5 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04]"
                >
                  <div className="mb-1 flex items-start justify-between gap-4">
                    <h4 className="font-semibold text-foreground">
                      {edu.institution}
                    </h4>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-muted-foreground">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-muted-foreground">{edu.location}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
