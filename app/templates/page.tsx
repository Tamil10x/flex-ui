"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/marketing/navbar";
import {
  ArrowRight,
  Layout,
  ShoppingBag,
  Briefcase,
  BarChart3,
  BookOpen,
  CreditCard,
  Lock,
} from "lucide-react";

const templates = [
  {
    name: "SaaS Landing",
    slug: "saas-landing",
    description:
      "Complete SaaS landing page with animated hero, features grid, stats counter, testimonials, FAQ accordion, and newsletter.",
    icon: Layout,
    gradient: "from-blue-500 to-cyan-500",
    glow: "rgba(59, 130, 246, 0.15)",
    tags: ["Hero", "Features", "Stats", "FAQ"],
  },
  {
    name: "Portfolio",
    slug: "portfolio",
    description:
      "Creative developer portfolio with letter-by-letter hero, bento project grid, animated timeline, and skills showcase.",
    icon: Briefcase,
    gradient: "from-violet-500 to-fuchsia-500",
    glow: "rgba(139, 92, 246, 0.15)",
    tags: ["Hero", "Projects", "Timeline", "Skills"],
  },
  {
    name: "Dashboard",
    slug: "dashboard",
    description:
      "Premium admin dashboard with animated KPI cards, revenue chart, circular progress rings, and activity feed.",
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.15)",
    tags: ["Sidebar", "Charts", "KPIs", "Activity"],
  },
  {
    name: "E-Commerce",
    slug: "ecommerce",
    description:
      "Luxury shopping experience with floating product showcase, brand marquee, gradient product cards, and category filters.",
    icon: ShoppingBag,
    gradient: "from-orange-500 to-amber-500",
    glow: "rgba(249, 115, 22, 0.15)",
    tags: ["Products", "Cart", "Filters", "Marquee"],
  },
  {
    name: "Blog",
    slug: "blog",
    description:
      "Modern blog layout with featured post hero, category-colored cards, sticky sidebar, and tag cloud.",
    icon: BookOpen,
    gradient: "from-rose-500 to-pink-500",
    glow: "rgba(244, 63, 94, 0.15)",
    tags: ["Featured", "Grid", "Categories", "Tags"],
  },
  {
    name: "Pricing",
    slug: "pricing",
    description:
      "Three-tier pricing with animated toggle, rotating gradient borders, comparison table, and FAQ accordion.",
    icon: CreditCard,
    gradient: "from-indigo-500 to-violet-500",
    glow: "rgba(99, 102, 241, 0.15)",
    tags: ["Toggle", "Cards", "Compare", "FAQ"],
  },
  {
    name: "Auth Login",
    slug: "auth-login",
    description:
      "Split-layout auth page with animated gradient orbs, social login, password toggle, and testimonial panel.",
    icon: Lock,
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14, 165, 233, 0.15)",
    tags: ["Social Auth", "Form", "Split Layout"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[150px]" />
        <div className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-500/[0.05] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            7 Templates
          </span>
          <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Production-Ready{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Page Templates
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
            Cinematic full-page layouts with Framer Motion animations,
            glassmorphic UI, and premium design. Each template is self-contained
            and ready to ship.
          </p>
        </motion.div>

        {/* Template Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {templates.map((t, i) => (
            <motion.div key={t.slug} variants={fadeUp}>
              <Link
                href={`/templates/${t.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15]"
              >
                {/* Gradient header bar */}
                <div
                  className={`relative h-44 overflow-hidden bg-gradient-to-br ${t.gradient} opacity-[0.15] transition-opacity duration-500 group-hover:opacity-[0.25]`}
                >
                  {/* Decorative shapes */}
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <t.icon className="h-16 w-16 text-white/20" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Icon badge */}
                  <div
                    className={`-mt-12 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} shadow-lg ring-4 ring-zinc-950`}
                  >
                    <t.icon className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {t.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {t.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors group-hover:text-cyan-400">
                    View template
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(600px circle at 50% 0%, ${t.glow}, transparent 60%)`,
                  }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-zinc-500">
            All templates are fully responsive, animated, and built with
            Framer Motion + Tailwind CSS.
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            View the source code at{" "}
            <code className="rounded bg-white/[0.05] px-1.5 py-0.5 text-xs text-zinc-400">
              components/flexui/pages/
            </code>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
