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

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 backdrop-blur-sm">
      <div className="px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold text-foreground">
            <span className="text-primary">NS</span>
            <span>Norm Soklim</span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            &copy; 2026 Norm Soklim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}