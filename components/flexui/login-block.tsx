"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoginBlockProps {
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Show social login buttons */
  showSocial?: boolean;
  /** Social providers */
  socialProviders?: { label: string; icon?: React.ReactNode }[];
  /** Callback on form submit */
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  /** Link for forgot password */
  forgotPasswordHref?: string;
  /** Link for sign up */
  signUpHref?: string;
  /** Layout variant */
  variant?: "centered" | "split";
  className?: string;
}

export function LoginBlock({
  heading = "Welcome back",
  subtitle = "Sign in to your account to continue.",
  showSocial = true,
  socialProviders = [{ label: "Google" }, { label: "GitHub" }],
  onSubmit,
  forgotPasswordHref = "#",
  signUpHref = "#",
  variant = "centered",
  className,
}: LoginBlockProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !password || loading) return;
      setLoading(true);
      try {
        await onSubmit?.({ email, password });
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, onSubmit]
  );

  const inputClass =
    "h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1]";

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold text-white">{heading}</h2>
      {subtitle && <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>}

      {/* Social buttons */}
      {showSocial && socialProviders.length > 0 && (
        <div className="mt-6 flex gap-3">
          {socialProviders.map((p) => (
            <button
              key={p.label}
              type="button"
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-sm text-zinc-300 transition-all hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              {p.icon ?? <span className="text-xs font-bold">{p.label[0]}</span>}
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      )}

      {showSocial && (
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-xs text-zinc-600">or</span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-medium text-zinc-400">
              Password
            </label>
            <a href={forgotPasswordHref} className="text-xs text-zinc-500 transition-colors hover:text-white">
              Forgot?
            </a>
          </div>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-white text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <a href={signUpHref} className="text-white transition-colors hover:text-zinc-300">
          Sign up
        </a>
      </p>
    </motion.div>
  );

  if (variant === "split") {
    return (
      <section className={cn("flex min-h-screen", className)}>
        {/* Decorative left panel */}
        <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 lg:flex">
          <div className="max-w-md px-12">
            <div className="text-3xl font-bold text-white">FlexUI</div>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Build beautiful interfaces with 140+ animated components.
            </p>
          </div>
        </div>
        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          {formContent}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("flex min-h-screen items-center justify-center px-6 py-24", className)}>
      {formContent}
    </section>
  );
}
