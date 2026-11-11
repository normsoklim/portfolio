"use client";

import { motion } from "framer-motion";
import { VIEWPORT } from "@/lib/animations";

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  /** Small uppercase label above the title. Defaults to the title. */
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14"
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow ?? title}
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
