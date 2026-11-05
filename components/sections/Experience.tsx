"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { experiences } from "@/data/experience";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Experience"
          description="Internship and work experience"
        />

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-12 pl-12"
            >
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-black/80" />

              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.position}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                  Responsibilities
                </h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {exp.responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}