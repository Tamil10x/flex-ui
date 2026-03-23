"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category?: string;
  image?: string;
  href?: string;
}

interface BlogProps {
  /** Brand name */
  brand?: string;
  /** Navigation items */
  navItems?: { label: string; href: string }[];
  /** Hero headline */
  headline?: string;
  /** Hero subtitle */
  subtitle?: string;
  /** Blog posts */
  posts?: BlogPost[];
  /** Sidebar categories */
  categories?: { name: string; count: number }[];
  /** Footer columns */
  footerColumns?: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  /** Popular tags */
  tags?: string[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const blurReveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const navSlide = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Category → gradient mapping                                        */
/* ------------------------------------------------------------------ */

const categoryGradients: Record<string, string> = {
  Design: "from-fuchsia-500/80 to-pink-600/80",
  Engineering: "from-blue-500/80 to-cyan-500/80",
  Accessibility: "from-emerald-500/80 to-teal-500/80",
  Updates: "from-amber-500/80 to-orange-500/80",
};

const categoryAccents: Record<string, string> = {
  Design: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  Engineering: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Accessibility: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Updates: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

function getGradient(category?: string) {
  return categoryGradients[category ?? ""] ?? "from-zinc-600/80 to-zinc-700/80";
}

function getAccent(category?: string) {
  return (
    categoryAccents[category ?? ""] ??
    "bg-zinc-500/20 text-zinc-300 border-zinc-500/30"
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Blog({
  brand = "FlexBlog",
  navItems = [
    { label: "Articles", href: "#" },
    { label: "Categories", href: "#" },
    { label: "About", href: "#" },
  ],
  headline = "Blog",
  subtitle = "Insights, tutorials, and updates from the team.",
  posts = [
    {
      title: "Building a Design System from Scratch",
      excerpt:
        "Learn how to create a comprehensive design system that scales across your organization.",
      date: "Mar 15, 2026",
      author: "Sarah Chen",
      category: "Design",
    },
    {
      title: "The Future of Web Animations",
      excerpt:
        "Exploring spring physics, GPU-accelerated transitions, and the new View Transitions API.",
      date: "Mar 10, 2026",
      author: "Marcus Rivera",
      category: "Engineering",
    },
    {
      title: "Accessible Components Done Right",
      excerpt:
        "A deep dive into building WCAG 2.1 AA compliant components with proper ARIA patterns.",
      date: "Mar 5, 2026",
      author: "Emma Watson",
      category: "Accessibility",
    },
    {
      title: "React Server Components in Production",
      excerpt:
        "Lessons learned from migrating 50+ components to RSC architecture.",
      date: "Feb 28, 2026",
      author: "James Park",
      category: "Engineering",
    },
    {
      title: "Color Theory for Developers",
      excerpt:
        "Understanding color spaces, contrast ratios, and how to build beautiful palettes programmatically.",
      date: "Feb 20, 2026",
      author: "Sarah Chen",
      category: "Design",
    },
  ],
  categories = [
    { name: "Engineering", count: 12 },
    { name: "Design", count: 8 },
    { name: "Accessibility", count: 5 },
    { name: "Updates", count: 3 },
  ],
  footerColumns = [
    {
      title: "Content",
      links: [
        { label: "Articles", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Discord", href: "#" },
        { label: "GitHub", href: "#" },
        { label: "Twitter", href: "#" },
      ],
    },
  ],
  tags = [
    "React",
    "TypeScript",
    "Design",
    "Performance",
    "Accessibility",
    "CSS",
    "Animation",
  ],
  className,
}: BlogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [email, setEmail] = useState("");

  const allCategories = ["All", ...categories.map((c) => c.name)];

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <div className={cn("min-h-screen bg-black text-white antialiased", className)}>
      {/* ============================================================ */}
      {/*  NAVBAR                                                       */}
      {/* ============================================================ */}
      <motion.header
        variants={navSlide}
        initial="hidden"
        animate="visible"
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/60 px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {/* Logo */}
            <a href="#" className="text-lg font-bold tracking-tight text-white">
              {brand}
            </a>

            {/* Links */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Search icon */}
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="Search"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              {/* Dark mode toggle placeholder */}
              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                aria-label="Toggle dark mode"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32">
        {/* Decorative gradient orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2"
        >
          <div className="h-[420px] w-[420px] rounded-full bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-transparent blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="text-center"
          >
            <h1 className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
            {subtitle && (
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "border-white/20 bg-white text-black shadow-lg shadow-white/10"
                    : "border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MAIN CONTENT: Featured + Grid + Sidebar                      */}
      {/* ============================================================ */}
      <section className="px-6 pb-24">
        <div className="mx-auto flex max-w-6xl gap-12">
          {/* Left column: Featured + Grid */}
          <div className="min-w-0 flex-1">
            {/* FEATURED POST */}
            {featuredPost && (
              <motion.article
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ scale: 1.005 }}
                className="group mb-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/60 shadow-2xl shadow-black/30 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.16] hover:shadow-white/[0.04]"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left: gradient area */}
                  <div
                    className={cn(
                      "relative flex min-h-[240px] items-center justify-center bg-gradient-to-br md:w-2/5",
                      getGradient(featuredPost.category)
                    )}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <svg
                      className="relative h-16 w-16 text-white/30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    >
                      <path d="M4 6h16M4 12h16M4 18h10" />
                    </svg>
                  </div>

                  {/* Right: content */}
                  <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                    {featuredPost.category && (
                      <span
                        className={cn(
                          "mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium",
                          getAccent(featuredPost.category)
                        )}
                      >
                        {featuredPost.category}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-zinc-100">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white",
                          getGradient(featuredPost.category)
                        )}
                      >
                        {getInitials(featuredPost.author)}
                      </div>
                      <div className="text-sm">
                        <span className="text-zinc-300">
                          {featuredPost.author}
                        </span>
                        <span className="mx-2 text-zinc-600">&middot;</span>
                        <span className="text-zinc-500">
                          {featuredPost.date}
                        </span>
                      </div>
                    </div>
                    <a
                      href={featuredPost.href ?? "#"}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-zinc-300"
                    >
                      Read More
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            )}

            {/* POST GRID */}
            {gridPosts.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {gridPosts.map((post, i) => (
                  <motion.article
                    key={i}
                    variants={cardReveal}
                    whileHover={{ scale: 1.01 }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/50 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.15] hover:shadow-white/[0.03]"
                  >
                    {/* Card gradient header */}
                    <div
                      className={cn(
                        "relative flex h-36 items-center justify-center bg-gradient-to-br",
                        getGradient(post.category)
                      )}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <svg
                        className="relative h-10 w-10 text-white/25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      >
                        <path d="M4 6h16M4 12h16M4 18h10" />
                      </svg>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col p-6">
                      {post.category && (
                        <span
                          className={cn(
                            "mb-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                            getAccent(post.category)
                          )}
                        >
                          {post.category}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-zinc-200">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                        {post.excerpt}
                      </p>

                      {/* Author row */}
                      <div className="mt-auto flex items-center gap-2.5 pt-5">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br text-[9px] font-bold text-white",
                            getGradient(post.category)
                          )}
                        >
                          {getInitials(post.author)}
                        </div>
                        <div className="text-xs">
                          <span className="text-zinc-300">{post.author}</span>
                          <span className="mx-1.5 text-zinc-600">
                            &middot;
                          </span>
                          <span className="text-zinc-500">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
              >
                <p className="text-zinc-500">No posts in this category yet.</p>
              </motion.div>
            )}
          </div>

          {/* ======================================================== */}
          {/*  SIDEBAR (desktop only)                                    */}
          {/* ======================================================== */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-28 space-y-10">
              {/* Categories */}
              <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Categories
                </h3>
                <ul className="mt-4 space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <button
                        onClick={() => setActiveCategory(cat.name)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                          activeCategory === cat.name
                            ? "bg-white/[0.08] text-white"
                            : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                        )}
                      >
                        <span>{cat.name}</span>
                        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-500">
                          {cat.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                  Popular Tags
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-pointer rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 transition-all duration-200 hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter mini signup */}
              <motion.div
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-6 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold text-white">
                  Newsletter
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                  Get the latest articles delivered straight to your inbox.
                </p>
                <div className="mt-4 space-y-2.5">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors duration-200 focus:border-white/[0.2] focus:bg-white/[0.06]"
                  />
                  <button className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98]">
                    Subscribe
                  </button>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="border-t border-white/[0.06] bg-zinc-950/80">
        {/* Gradient top border accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between">
            {/* Brand */}
            <div className="max-w-xs">
              <span className="text-lg font-bold tracking-tight text-white">
                {brand}
              </span>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                Insights, tutorials, and updates from the team.
              </p>
            </div>

            {/* Columns */}
            <div className="flex gap-16">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                    {col.title}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 border-t border-white/[0.06] pt-8">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} {brand}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
