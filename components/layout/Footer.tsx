import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/normsoklim",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sok-lim-476230343/",
    icon: FiLinkedin,
  },
  {
    name: "Telegram",
    url: "https://t.me/@isme_normsoklim",
    icon: RiTelegramLine,
  },
  {
    name: "Email",
    url: "mailto:soklim106@gmail.com",
    icon: FiMail,
  },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/60 backdrop-blur-sm">
      {/* Gradient hairline */}
      <div className="edge-top absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="px-6 lg:px-12 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <Link href="#home" className="flex items-center gap-2 text-xl font-bold text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm text-white">
                NS
              </span>
              <span>Norm Soklim</span>
            </Link>
            <p className="max-w-xs text-center text-sm leading-relaxed text-muted-foreground lg:text-left">
              Full-Stack Developer crafting clean, modern web experiences.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8" aria-label="Footer">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-primary"
                aria-label={link.name}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Norm Soklim. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <span className="text-primary">Next.js</span>
            &
            <span className="text-primary">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
