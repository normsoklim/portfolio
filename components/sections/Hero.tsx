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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* ---------- Ambient background ---------- */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="bg-dots absolute inset-0" />
        <div className="glow-blob animate-float-slow absolute -top-32 left-1/2 h-[560px] w-[700px] -translate-x-1/2 bg-indigo-600/25" />
        <div className="glow-blob animate-float-slower absolute bottom-0 right-[-10%] h-[480px] w-[520px] bg-purple-600/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          >
            Norm{" "}
            <span className="gradient-text-primary">Soklim</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-2xl font-semibold text-transparent"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground lg:mx-0"
          >
            Building modern web applications and scalable backend systems with
            clean, maintainable code.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button size="lg" asChild>
              <Link href="#projects">View My Projects</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/cv.pdf" download>Download CV</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <InteractiveIdCard />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
