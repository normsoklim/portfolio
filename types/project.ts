export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: "fullstack" | "mobile" | "backend" | "frontend";
  image: string;
  images?: string[];
  github: string;
  liveDemo?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "mobile";
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description: string;
}