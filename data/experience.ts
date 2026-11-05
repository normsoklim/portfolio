import type { Experience, Education } from "@/types/project";

export const experiences: Experience[] = [
  {
    id: "internship-1",
    company: "Tech Solutions Co.",
    position: "Software Development Intern",
    duration: "Jun 2025 - Aug 2025",
    location: "Phnom Penh, Cambodia",
    description:
      "Developed and maintained web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes.",
    responsibilities: [
      "Developed RESTful APIs using Node.js and Express",
      "Built responsive frontend components with React and Tailwind CSS",
      "Participated in code reviews and agile stand-up meetings",
      "Integrated third-party APIs and payment gateways",
      "Wrote unit tests and integration tests",
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "internship-2",
    company: "Digital Agency Ltd.",
    position: "Frontend Developer Intern",
    duration: "Jan 2025 - May 2025",
    location: "Phnom Penh, Cambodia",
    description:
      "Worked on client projects building responsive websites and web applications. Focused on UI/UX implementation and frontend performance optimization.",
    responsibilities: [
      "Converted Figma designs into responsive web pages",
      "Optimized website performance and loading speed",
      "Implemented animations and interactive elements",
      "Ensured cross-browser compatibility",
      "Collaborated with designers and backend developers",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
];

export const educations: Education[] = [
  {
    id: "setec",
    institution: "SETEC Institute",
    degree: "Bachelor's Degree",
    field: "Management Information Systems (MIS)",
    duration: "2022 - 2026",
    location: "Phnom Penh, Cambodia",
    description:
      "Studying Management Information Systems with focus on business analysis, database management, and information systems development. Relevant coursework includes Software Engineering, Database Systems, Web Development, and Systems Analysis & Design.",
  },
];