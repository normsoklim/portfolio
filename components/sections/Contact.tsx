"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "norm.soklim@example.com",
    href: "mailto:norm.soklim@example.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+855 12 345 678",
    href: "tel:+85512345678",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Phnom Penh, Cambodia",
    href: undefined,
  },
];

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
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          description="Have a project in mind? Let's talk."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-primary shrink-0">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{info.title}</h4>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect with me</h4>
              <div className="flex gap-4">
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
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            {submitStatus === "success" ? (
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                <h3 className="text-lg font-semibold text-green-400">
                  Message sent!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}