"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = navLinks.map((link) => link.href.slice(1));

const socialLinks = [
  { name: "GitHub", url: "https://github.com/username", icon: FiGithub },
  { name: "LinkedIn", url: "https://linkedin.com/in/username", icon: FiLinkedin },
  { name: "Telegram", url: "https://t.me/username", icon: RiTelegramLine },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-black/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
        style={{ scaleX: progress }}
      />

      <div className="flex h-20 items-center justify-between px-6 lg:px-12">
        <Link href="#home" className="group flex items-center gap-2 text-xl font-bold text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm text-white shadow-[0_4px_16px_-4px_rgba(99,102,241,0.6)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            NS
          </span>
          <span className="hidden transition-colors sm:block group-hover:text-primary">
            Norm Soklim
          </span>
        </Link>

        {/* Desktop links with sliding active pill */}
        <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-1.5 backdrop-blur-md lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${
                active === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
              aria-label={s.name}
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
          <Button asChild className="ml-2">
            <Link href="#contact">Let&apos;s Talk</Link>
          </Button>
        </div>

        <button
          className="rounded-full p-2 text-muted-foreground transition-colors hover:text-primary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-20 border-t border-white/5 bg-black/90 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      active === link.href
                        ? "bg-white/10 text-primary"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
                  aria-label={s.name}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="mailto:norm.soklim@example.com"
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary"
                aria-label="Email"
              >
                <FiMail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
