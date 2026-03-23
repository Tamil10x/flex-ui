"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthLoginProps {
  /** Brand name */
  brand?: string;
  /** Brand tagline for the decorative panel */
  tagline?: string;
  /** Brand description for the decorative panel */
  description?: string;
  /** Login heading */
  heading?: string;
  /** Login subtitle */
  subtitle?: string;
  /** Show social login */
  showSocial?: boolean;
  /** Social providers */
  socialProviders?: { label: string; icon?: React.ReactNode }[];
  /** Forgot password link */
  forgotPasswordHref?: string;
  /** Sign up link */
  signUpHref?: string;
  /** Callback on submit */
  onSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  /** Testimonial on the side panel */
  testimonial?: { quote: string; author: string; role: string };
  /** Highlight features on the side panel */
  features?: string[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Stagger helpers                                                    */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeUpSlow = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Default social‑provider SVG icons                                  */
/* ------------------------------------------------------------------ */

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function defaultIconFor(label: string) {
  const l = label.toLowerCase();
  if (l.includes("google")) return <GoogleIcon />;
  if (l.includes("github")) return <GitHubIcon />;
  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function AuthLogin({
  brand = "FlexUI",
  tagline = "Build beautiful interfaces",
  description = "140+ animated React components with 6 theme presets, page templates, and an AI-powered studio.",
  heading = "Welcome back",
  subtitle = "Sign in to your account to continue.",
  showSocial = true,
  socialProviders = [{ label: "Google" }, { label: "GitHub" }],
  forgotPasswordHref = "#",
  signUpHref = "#",
  onSubmit,
  testimonial = {
    quote:
      "FlexUI transformed how we build products. The component quality is outstanding.",
    author: "Sarah Chen",
    role: "CTO at Acme",
  },
  features = [
    "140+ animated components",
    "6 theme presets",
    "Page templates",
    "AI Studio",
  ],
  className,
}: AuthLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  const initials = testimonial
    ? testimonial.author
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "";

  return (
    <div className={cn("flex min-h-screen bg-black text-white", className)}>
      {/* ============================================================= */}
      {/*  LEFT PANEL — decorative (hidden on mobile)                   */}
      {/* ============================================================= */}
      <div className="relative hidden flex-1 overflow-hidden lg:flex">
        {/* ---- Background layers ---- */}
        {/* Animated gradient orb */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/20 via-violet-500/15 to-cyan-400/20 blur-[140px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dot grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Noise texture grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Decorative floating ring — top right */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/[0.06]" />

        {/* Decorative floating ring — bottom left */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-52 w-52 rounded-full border border-cyan-500/[0.06]" />

        {/* ---- Content ---- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-1 flex-col justify-between px-12 py-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <span className="text-sm font-bold text-white">
                {brand.charAt(0)}
              </span>
            </div>
            <span className="text-lg font-semibold tracking-tight">{brand}</span>
          </motion.div>

          {/* Middle: tagline + description + features */}
          <div className="flex flex-col gap-6">
            <motion.h2
              variants={fadeUpSlow}
              className="max-w-sm text-4xl font-bold leading-[1.1] tracking-tight"
            >
              {tagline}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed text-zinc-400"
            >
              {description}
            </motion.p>

            {/* Feature list */}
            {features.length > 0 && (
              <motion.ul variants={staggerContainer} className="mt-2 space-y-3">
                {features.map((f, i) => (
                  <motion.li
                    key={f}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.05 * i,
                          ease: "easeOut",
                        },
                      },
                    }}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                      <svg
                        className="h-3 w-3 text-emerald-400"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.5 8l3 3 6-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Testimonial card */}
          {testimonial && (
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              {/* Gradient border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/[0.05] via-transparent to-cyan-500/[0.05]" />

              <p className="relative text-sm italic leading-relaxed text-zinc-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="relative mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar with gradient circle + initials */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-zinc-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* 5‑star rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 0 0-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* ============================================================= */}
      {/*  RIGHT PANEL — login form                                     */}
      {/* ============================================================= */}
      <div className="relative flex flex-1 items-center justify-center px-6 py-12">
        {/* Subtle radial wash behind form */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-900/40 via-transparent to-zinc-900/40 lg:hidden" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-sm"
        >
          {/* Brand mark (small) */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex items-center gap-2"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <span className="text-xs font-bold text-white">
                {brand.charAt(0)}
              </span>
            </div>
            <span className="text-base font-semibold tracking-tight lg:hidden">
              {brand}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeUp} className="text-2xl font-bold">
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm text-zinc-400"
          >
            {subtitle}
          </motion.p>

          {/* Social buttons */}
          {showSocial && socialProviders.length > 0 && (
            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-3">
              {socialProviders.map((provider) => (
                <button
                  key={provider.label}
                  type="button"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] active:scale-[0.98]"
                >
                  {provider.icon ?? defaultIconFor(provider.label)}
                  <span>Continue with {provider.label}</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Divider */}
          {showSocial && socialProviders.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="my-6 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-xs text-zinc-500">or continue with email</span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-email"
                className="text-xs font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
              <label
                htmlFor="auth-password"
                className="text-xs font-medium text-zinc-400"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 pr-11 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    /* Eye‑off icon */
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Forgot password */}
            <motion.div variants={fadeUp} className="flex justify-end">
              <a
                href={forgotPasswordHref}
                className="text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Forgot password?
              </a>
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="mt-1 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all duration-200 hover:brightness-110"
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign up link */}
          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-sm text-zinc-500"
          >
            Don&apos;t have an account?{" "}
            <a
              href={signUpHref}
              className="font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
