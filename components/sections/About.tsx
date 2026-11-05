"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { educations } from "@/data/experience";

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="About Me"
          description="MIS student passionate about building scalable software solutions"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              className="relative rounded-xl border border-white/10"
              width={400}
              height={400}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Background
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a Management Information Systems (MIS) student at SETEC
                Institute with a passion for software development. I specialize
                in building full-stack web applications, backend systems, and
                mobile applications with clean, maintainable code.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                What I Do
              </h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex items-center gap-3">
                  <span className="text-primary">▹</span>
                  Full-stack web development with Next.js and NestJS
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary">▹</span>
                  Mobile development with Flutter and Laravel
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary">▹</span>
                  Backend systems with C# and ASP.NET Core
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-primary">▹</span>
                  Database design and management with PostgreSQL
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Education
              </h3>
              {educations.map((edu) => (
                <div key={edu.id} className="mb-6">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-lg font-semibold text-foreground">
                      {edu.institution}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    {edu.degree} in {edu.field}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.location}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}