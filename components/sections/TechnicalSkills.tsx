"use client";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiBootstrap,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPhp,
  SiLaravel,
  SiSharp,
  SiDotnet,
  SiSpringboot,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { SectionTitle } from "@/components/ui/SectionTitle";
import "@/components/sections/TechnicalSkills.css";

interface Skill {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * Technologies displayed in the infinite ticker (Option A: logo + name cards).
 * The list is rendered twice in the component so the CSS animation can loop
 * seamlessly by translating the track -50%.
 */
const skills: Skill[] = [
  // Frontend
  { name: "HTML5", Icon: SiHtml5 },
  { name: "CSS3", Icon: SiCss },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Angular", Icon: SiAngular },
  { name: "Vue.js", Icon: SiVuedotjs },
  { name: "Bootstrap", Icon: SiBootstrap },
  { name: "Tailwind CSS", Icon: SiTailwindcss },

  // Backend
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Express.js", Icon: SiExpress },
  { name: "NestJS", Icon: SiNestjs },
  { name: "PHP", Icon: SiPhp },
  { name: "Laravel", Icon: SiLaravel },
  { name: "C#", Icon: SiSharp },
  { name: "ASP.NET Core", Icon: SiDotnet },
  { name: "Spring Boot", Icon: SiSpringboot },

  // Database
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "MySQL", Icon: SiMysql },
  { name: "MongoDB", Icon: SiMongodb },

  // Tools
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Postman", Icon: SiPostman },
  { name: "Docker", Icon: SiDocker },
  { name: "Figma", Icon: SiFigma },
];

export function TechnicalSkills() {
  return (
    <section id="skills" className="py-24 px-6 lg:px-12 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Technical Skills"
          description="Technologies and tools I work with"
        />

        <div
          className="ticker"
          aria-label="Technologies I work with"
          role="marquee"
        >
          <div className="ticker-track">
            {/* First copy of the skills list */}
            {skills.map((skill) => (
              <div key={skill.name} className="ticker-item">
                <skill.Icon className="ticker-icon" aria-hidden="true" />
                <span className="ticker-name">{skill.name}</span>
              </div>
            ))}
            {/* Second copy – enables the seamless infinite loop */}
            {skills.map((skill) => (
              <div key={`${skill.name}-duplicate`} className="ticker-item">
                <skill.Icon className="ticker-icon" aria-hidden="true" />
                <span className="ticker-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
