"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SaasLandingProps {
  /** Brand name */
  brand?: string;
  /** Navigation items */
  navItems?: { label: string; href: string }[];
  /** Hero headline */
  headline?: React.ReactNode;
  /** Hero subtitle */
  heroSubtitle?: string;
  /** Hero badge */
  heroBadge?: string;
  /** Primary CTA */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA */
  secondaryCta?: { label: string; href: string };
  /** Features */
  features?: { icon: React.ReactNode; title: string; description: string }[];
  /** Stats */
  stats?: { value: string; label: string; suffix?: string }[];
  /** Testimonials */
  testimonials?: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }[];
  /** FAQ items */
  faqItems?: { question: string; answer: string }[];
  /** Footer columns */
  footerColumns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  /** Footer copyright */
  copyright?: string;
  className?: string;
}

const defaultFeatureIcon = (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9L7.5 7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SaasLanding({
  brand = "FlexUI",
  navItems = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ],
  headline = "Ship beautiful products faster",
  heroSubtitle = "The modern component library for teams that want to move fast without sacrificing design quality.",
  heroBadge = "Now in v2.0",
  primaryCta = { label: "Get Started", href: "#" },
  secondaryCta = { label: "View Docs", href: "#" },
  features = [
    {
      icon: defaultFeatureIcon,
      title: "Lightning Fast",
      description:
        "Optimized for performance with lazy loading and tree-shaking built in.",
    },
    {
      icon: defaultFeatureIcon,
      title: "Fully Accessible",
      description:
        "WCAG 2.1 AA compliant with keyboard navigation and screen reader support.",
    },
    {
      icon: defaultFeatureIcon,
      title: "Dark Mode Ready",
      description:
        "Beautiful dark and light themes with seamless switching and custom tokens.",
    },
    {
      icon: defaultFeatureIcon,
      title: "Type Safe",
      description:
        "Full TypeScript support with strict types and autocompletion.",
    },
    {
      icon: defaultFeatureIcon,
      title: "Animated",
      description:
        "Smooth Framer Motion animations with spring physics and staggered reveals.",
    },
    {
      icon: defaultFeatureIcon,
      title: "Customizable",
      description:
        "Override any token, color, or spacing value to match your brand.",
    },
  ],
  stats = [
    { value: "140", label: "Components", suffix: "+" },
    { value: "6", label: "Theme Presets" },
    { value: "99", label: "Lighthouse Score" },
    { value: "10k", label: "Downloads", suffix: "+" },
  ],
  testimonials = [
    {
      quote:
        "FlexUI cut our development time in half. The components are beautiful out of the box.",
      author: "Sarah Chen",
      role: "CTO at Acme",
    },
    {
      quote:
        "Best component library I've used. The animations are buttery smooth.",
      author: "Marcus Rivera",
      role: "Lead Engineer at Stripe",
    },
    {
      quote:
        "The theming system is incredibly powerful. We customized everything in an afternoon.",
      author: "Emma Watson",
      role: "Design Lead at Vercel",
    },
  ],
  faqItems = [
    {
      question: "Is FlexUI free to use?",
      answer:
        "Yes, FlexUI is completely free and open source under the MIT license.",
    },
    {
      question: "Does it work with Next.js?",
      answer:
        "Absolutely. FlexUI is built for Next.js App Router with full RSC compatibility.",
    },
    {
      question: "Can I customize the themes?",
      answer:
        "Yes, every component respects semantic design tokens that you can override globally or per-component.",
    },
    {
      question: "How do I install components?",
      answer:
        "Use our CLI: npx flexui add <component-name>. It handles dependencies automatically.",
    },
  ],
  footerColumns = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Pricing", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
  copyright = `\u00a9 ${new Date().getFullYear()} FlexUI. All rights reserved.`,
  className,
}: SaasLandingProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={cn("min-h-screen bg-black text-white antialiased", className)}>
      {/* ============================================================= */}
      {/*  NAVBAR                                                        */}
      {/* ============================================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2"
      >
        <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight text-white">
            {brand}
          </a>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href={primaryCta.href}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
          >
            {primaryCta.label}
          </a>
        </nav>
      </motion.header>

      {/* ============================================================= */}
      {/*  HERO                                                          */}
      {/* ============================================================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute left-1/3 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[100px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[100px]" />
        </div>

        {/* Dot grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          {heroBadge && (
            <motion.div variants={fadeUp} className="mb-6 inline-block">
              <span
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-neutral-300 backdrop-blur"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.12) 55%, transparent 60%)",
                  backgroundSize: "300% 100%",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {heroBadge}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-5xl font-extrabold leading-[1.08] tracking-tight text-transparent sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 md:text-xl"
          >
            {heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary CTA with glow */}
            <a
              href={primaryCta.href}
              className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-xl bg-white/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              <span className="relative">{primaryCta.label}</span>
              <svg
                className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Secondary CTA */}
            <a
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-7 py-3.5 text-sm font-semibold text-neutral-300 transition-all hover:border-white/30 hover:text-white"
            >
              {secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>

        {/* Shimmer keyframes injected via style tag */}
        <style>{`@keyframes shimmer{0%,100%{background-position:200% 50%}50%{background-position:-100% 50%}}`}</style>
      </section>

      {/* ============================================================= */}
      {/*  FEATURES                                                      */}
      {/* ============================================================= */}
      <section id="features" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-neutral-400">
              A complete toolkit for building modern web applications.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                {/* Hover gradient border glow */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15), transparent 60%)",
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-blue-400">
                    {f.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  STATS                                                         */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by developers
            </h2>
            <p className="mt-4 text-neutral-400">
              Join thousands of teams building with {brand}.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={cn(
                  "relative text-center",
                  i < stats.length - 1 &&
                    "md:after:absolute md:after:right-0 md:after:top-1/2 md:after:h-12 md:after:-translate-y-1/2 md:after:w-px md:after:bg-gradient-to-b md:after:from-transparent md:after:via-white/15 md:after:to-transparent md:after:content-['']"
                )}
              >
                <motion.span
                  className="block bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] as const }}
                >
                  {s.value}
                  {s.suffix}
                </motion.span>
                <span className="mt-2 block text-sm text-neutral-400">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  TESTIMONIALS                                                  */}
      {/* ============================================================= */}
      <section id="testimonials" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by developers
            </h2>
            <p className="mt-4 text-neutral-400">
              See what our community has to say.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-sm leading-relaxed text-neutral-300">
                  <span className="mr-1 text-lg text-neutral-500">&ldquo;</span>
                  {t.quote}
                  <span className="ml-1 text-lg text-neutral-500">&rdquo;</span>
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-bold text-white ring-2 ring-blue-500/30">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FAQ                                                           */}
      {/* ============================================================= */}
      <section id="faq" className="px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-neutral-400">
              Everything you need to know about {brand}.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="text-sm font-semibold text-white">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-neutral-400"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
                      >
                        <div className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  NEWSLETTER / CTA                                              */}
      {/* ============================================================= */}
      <section className="relative overflow-hidden px-6 py-32">
        {/* Glow background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-cyan-600/20 blur-[120px]" />
        </div>

        {/* Decorative floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[
            { x: "15%", y: "20%", size: 3, delay: 0 },
            { x: "80%", y: "30%", size: 2, delay: 1.5 },
            { x: "40%", y: "75%", size: 4, delay: 0.8 },
            { x: "70%", y: "65%", size: 2, delay: 2.2 },
            { x: "25%", y: "55%", size: 3, delay: 1.0 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 4,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-4 text-neutral-400">
            Get notified about new components and features.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
            />
            <button
              type="submit"
              className="group relative overflow-hidden rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
            >
              <span className="pointer-events-none absolute -inset-1 rounded-xl bg-white/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
              <span className="relative">Subscribe</span>
            </button>
          </form>

          <p className="mt-4 text-xs text-neutral-600">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </section>

      {/* ============================================================= */}
      {/*  FOOTER                                                        */}
      {/* ============================================================= */}
      <footer className="relative border-t border-white/[0.08] px-6 pb-12 pt-16">
        {/* Gradient border highlight */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand column */}
            <div>
              <a href="#" className="text-lg font-bold tracking-tight text-white">
                {brand}
              </a>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
                The modern component library for building beautiful interfaces.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex gap-4">
                {/* Twitter / X */}
                <a href="#" className="text-neutral-500 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* GitHub */}
                <a href="#" className="text-neutral-500 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                {/* Discord */}
                <a href="#" className="text-neutral-500 transition-colors hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-semibold text-white">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-neutral-500 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-16 border-t border-white/[0.06] pt-8 text-center text-sm text-neutral-600">
            {copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
