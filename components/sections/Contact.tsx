"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { RiTelegramLine } from "react-icons/ri";
import { VIEWPORT, fadeUpStagger } from "@/lib/animations";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "soklim106@gmail.com",
    href: "mailto:soklim106@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+855 71 629 9627",
    href: "tel:+855716299627",
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
];

const inputClasses =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/50 transition-all duration-300 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-black/60";

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
    <section id="contact" className="relative overflow-hidden py-28 px-6 lg:px-12">
      <div
        className="bg-dots absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Contact"
          title="Get In Touch"
          description="Have a project in mind? Let's talk."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            variants={fadeUpStagger(0)}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT}
            className="space-y-8 lg:col-span-2"
          >
            <div className="space-y-3">
              {contactInfo.map((info) => {
                const content = (
                  <>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        {info.title}
                      </h4>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </>
                );
                const classes =
                  "group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.05]";
                return info.href ? (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={classes}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <div key={info.title} className={classes}>
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect with me</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-primary"
                    aria-label={link.name}
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            variants={fadeUpStagger(0.15)}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-emerald-400" />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-semibold text-emerald-400">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="glass-card space-y-5 rounded-2xl p-8"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className={inputClasses}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className={inputClasses}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      className={inputClasses}
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
