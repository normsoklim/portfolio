"use client";

import { FormEvent, useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import "./Contact.css";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "error" | ""
  >("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus("");
    setStatusType("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      setStatus(result.message);
      setStatusType("success");
      setForm(initialForm);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        <div className="contact-heading">
          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h2>
            Let's work <span>together.</span>
          </h2>

          <p>
            Have a project, internship opportunity, or just
            want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">

          {/* Contact information */}
          <div className="contact-info">

            <h3>Let's talk about your ideas.</h3>

            <p>
              I'm always open to discussing new projects,
              creative ideas, and opportunities.
            </p>

            <a
              href="mailto:soklim106@gmail.com"
              className="contact-email"
            >
              <Mail size={20} />
              soklim106@gmail.com
            </a>

            <div className="contact-socials">
              <a
                href="https://github.com/normsoklim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/sok-lim-476230343/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">Your Name</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength={80}
                  minLength={2}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={254}
                  required
                  disabled={loading}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>

              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is this regarding?"
                value={form.subject}
                onChange={handleChange}
                maxLength={120}
                minLength={3}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>

              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                rows={6}
                minLength={10}
                maxLength={5000}
                required
                disabled={loading}
              />
            </div>

            {/* Honeypot: hidden from real visitors */}
            <div
              className="contact-honeypot"
              aria-hidden="true"
            >
              <label htmlFor="website">
                Leave this field empty
              </label>

              <input
                id="website"
                name="website"
                type="text"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Response message */}
            {status && (
              <div
                className={`contact-status ${statusType}`}
                role="status"
                aria-live="polite"
              >
                {status}
              </div>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="spin-icon" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
