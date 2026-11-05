"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";
import { InteractiveIdCard } from "./InteractiveIdCard";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/username",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/username",
    icon: FiLinkedin,
  },
  {
    name: "Telegram",
    url: "https://t.me/username",
    icon: RiTelegramLine,
  },
  {
    name: "Email",
    url: "mailto:norm.soklim@example.com",
    icon: FiMail,
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"></div>
          <div className="absolute bottom-20 right-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px]"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl font-bold tracking-tight leading-none sm:text-6xl"
          >
            Norm <span className="text-primary">Soklim</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-xl text-muted-foreground"
          >
            Full-Stack Developer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
          >
            Building modern web applications and scalable backend systems with
            clean, maintainable code.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button size="lg" asChild>
              <Link href="#projects">View My Projects</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/cv.pdf" download>Download CV</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/10 transition-colors"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <InteractiveIdCard />
      </div>
    </section>
  );
}