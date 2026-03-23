"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NewsletterBlockProps {
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Button text */
  buttonText?: string;
  /** Success message */
  successMessage?: string;
  /** Callback when submitted */
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

export function NewsletterBlock({
  heading = "Stay Updated",
  subtitle = "Get the latest updates on new components and features.",
  placeholder = "you@example.com",
  buttonText = "Subscribe",
  successMessage = "Thanks for subscribing!",
  onSubmit,
  className,
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || loading) return;
      setLoading(true);
      try {
        await onSubmit?.(email);
        setSubmitted(true);
        setEmail("");
      } finally {
        setLoading(false);
      }
    },
    [email, loading, onSubmit]
  );

  return (
    <section className={cn("px-6 py-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white">{heading}</h2>
        {subtitle && (
          <p className="mt-3 text-lg text-zinc-400">{subtitle}</p>
        )}

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4"
          >
            <p className="text-sm font-medium text-emerald-400">{successMessage}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="h-11 flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1]"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "..." : buttonText}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
