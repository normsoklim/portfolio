"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skills } from "@/data/skills";
import { SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";

const categoryIcons: Record<string, any> = {
  frontend: SiNextdotjs,
  backend: SiReact,
  database: SiTypescript,
  mobile: SiNextdotjs,
  tools: SiReact,
};

const categoryColors: Record<string, string> = {
  frontend: "text-blue-400",
  backend: "text-green-400",
  database: "text-purple-400",
  mobile: "text-orange-400",
  tools: "text-pink-400",
};

export function Skills() {
  const categories = [
    "frontend",
    "backend",
    "database",
    "mobile",
    "tools",
  ] as const;

  const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    mobile: "Mobile",
    tools: "Tools",
  };

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Technical Skills"
          description="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            const Icon = categoryIcons[category] || SiNextdotjs;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${categoryColors[category]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-xs font-mono text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}