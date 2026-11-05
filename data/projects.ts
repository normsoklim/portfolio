import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with product management, authentication, and checkout system.",
    longDescription:
      "A comprehensive full-stack e-commerce platform built with Next.js and NestJS. Features include product catalog management, user authentication with JWT, shopping cart, Stripe payment integration, order management, and admin dashboard. The platform supports product search, filtering, reviews, and email notifications for order updates.",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "TypeScript", "Tailwind CSS", "Stripe"],
    category: "fullstack",
    image: "/images/web.png",
    images: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg",
    ],
    github: "https://github.com/normsoklim/ecommercer_front_end_nextjs",
    liveDemo: "https://ecommerce-demo.vercel.app",
    featured: true,
  },
  {
    id: "tinh-shop",
    title: "Tinh Shop",
    description:
      "Mobile e-commerce application with product browsing, shopping cart, and order management.",
    longDescription:
      "A mobile e-commerce application built with Flutter and Laravel. Users can browse products, add items to cart, place orders, and track delivery. Includes admin panel for managing products, categories, and orders. Integrated with payment gateway and push notifications.",
    technologies: ["Flutter", "Laravel", "PostgreSQL", "Dart", "PHP"],
    category: "mobile",
    image: "/images/mobile.png",
    images: [
      "/images/mobile.png",
      "/images/mobile.png",
    ],
    github: "https://github.com/username/tinh-shop",
    liveDemo: undefined,
    featured: true,
  },
  {
    id: "Bus and Car Booking Ticketing System",
    title: "Bus and Car Booking Ticketing System",
    description:
      "Web application for booking bus and car tickets with user authentication, payment integration, and admin management.", 
    longDescription:
      "A robust bus and car booking ticketing system built with JAVA and Spring Boot. Features include user authentication, Booking Ticket, payment integration, and admin management.",
    technologies: ["Angular JS","JAVA", "Spring Boot", "PostgreSQL", "JWT"],
    category: "fullstack",
    image: "/images/java.png",
    images: [
      "/images/projects/pos-1.jpg",
      "/images/projects/pos-2.jpg",
    ],
    github: "https://github.com/username/pos-management-system",
    liveDemo: undefined,
    featured: false,
  },
  {
    id: "Canteen System",
    title: "Canteen Ordering food System",
    description:
      "Web application for ordering food from canteen with user authentication, payment integration, and admin management.", 
    longDescription:
      "A robust canteen ordering food system built with React JS and Nest JS. Features include user authentication, Ordering food, payment integration, and admin management.",
    technologies: ["React JS", "Nest JS", "PostgreSQL", "JWT"],
    category: "fullstack",
    image: "/images/canteen.png",
    images: [
      "/images/projects/pos-1.jpg",
      "/images/projects/pos-2.jpg",
    ],
    github: "https://github.com/normsoklim/canteen-system-front-end",
    liveDemo: undefined,
    featured: false,
  },
  {
    id: "Ecommerce Shopping",
    title: "Ecommerce Shopping",
    description:
      "Web application for shopping from ecommerce with user authentication, payment integration, and admin management.", 
    longDescription:
      "A robust ecommerce shopping system built with Angular JS and Node JS. Features include user authentication, Ordering Product, payment integration, and admin management.",
    technologies: ["Angular JS","Node JS", "Express JS", "MongoDB", "JWT"],
    category: "backend",
    image: "/images/ecommerce.png",
    images: [
      "/images/projects/pos-1.jpg",
      "/images/projects/pos-2.jpg",
    ],
    github: "https://github.com/normsoklim/E-Commerce-App-Api",
    liveDemo: undefined,
    featured: false,
  },
] as const;