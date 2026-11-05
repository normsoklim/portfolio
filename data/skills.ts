import type { Skill } from "@/types/project";

export const skills: Skill[] = [
  // Frontend
  {
    name: "Next.js",
    level: 90,
    category: "frontend",
    icon: "SiNextdotjs",
  },
  {
    name: "React",
    level: 85,
    category: "frontend",
    icon: "SiReact",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "frontend",
    icon: "SiTypescript",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    category: "frontend",
    icon: "SiTailwindcss",
  },
  {
    name: "JavaScript",
    level: 85,
    category: "frontend",
    icon: "SiJavascript",
  },
  {
    name: "HTML5",
    level: 90,
    category: "frontend",
    icon: "SiHtml5",
  },
  {
    name: "CSS3",
    level: 85,
    category: "frontend",
    icon: "SiCss3",
  },

  // Backend
  {
    name: "NestJS",
    level: 75,
    category: "backend",
    icon: "SiNestjs",
  },
  {
    name: "Node.js",
    level: 80,
    category: "backend",
    icon: "SiNodedotjs",
  },
  {
    name: "Express",
    level: 75,
    category: "backend",
    icon: "SiExpress",
  },
  {
    name: "PHP",
    level: 70,
    category: "backend",
    icon: "SiPhp",
  },
  {
    name: "Laravel",
    level: 75,
    category: "backend",
    icon: "SiLaravel",
  },
  {
    name: "ASP.NET Core",
    level: 70,
    category: "backend",
    icon: "SiDotnet",
  },
  {
    name: "C#",
    level: 70,
    category: "backend",
    icon: "SiCsharp",
  },
  {
    name: "JAVA",
    level: 70,
    category: "backend",
    icon: "SiJava",
  },
  {
    name: "Spring Boot",
    level: 75,
    category: "backend",
    icon: "SiSpringboot",
  },

  // Database
  {
    name: "PostgreSQL",
    level: 75,
    category: "database",
    icon: "SiPostgresql",
  },
  {
    name: "Oracle Database",
    level: 70,
    category: "database",
    icon: "SiOracle",
  },
  {
    name: "MySQL",
    level: 70,
    category: "database",
    icon: "SiMysql",
  },
  {
    name: "SQL SERVER",
    level: 70,
    category: "database",
    icon: "SiMicrosoftsqlserver",
  },

  // Mobile
  {
    name: "Flutter",
    level: 75,
    category: "mobile",
    icon: "SiFlutter",
  },
  {
    name: "Dart",
    level: 70,
    category: "mobile",
    icon: "SiDart",
  },

  // Tools
  {
    name: "Git",
    level: 80,
    category: "tools",
    icon: "SiGit",
  },
  {
    name: "Docker",
    level: 60,
    category: "tools",
    icon: "SiDocker",
  },
  {
    name: "Vercel",
    level: 85,
    category: "tools",
    icon: "SiVercel",
  },
] as const;
