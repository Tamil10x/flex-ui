"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Project {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface PortfolioProps {
  /** Your name */
  name?: string;
  /** Your role */
  role?: string;
  /** Hero subtitle */
  bio?: string;
  /** Navigation items */
  navItems?: { label: string; href: string }[];
  /** Projects */
  projects?: Project[];
  /** Timeline / experience */
  timeline?: TimelineItem[];
  /** Contact CTA */
  contactCta?: { label: string; href: string };
  /** Social links */
  social?: { label: string; href: string }[];
  /** Skills / tech stack */
  skills?: string[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 16,
      delay: i * 0.04,
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Gradient colour sets for project cards                             */
/* ------------------------------------------------------------------ */

const projectGradients = [
  "from-violet-600/40 via-fuchsia-500/30 to-pink-500/40",
  "from-cyan-500/40 via-blue-500/30 to-indigo-500/40",
  "from-emerald-500/40 via-teal-400/30 to-cyan-500/40",
  "from-orange-500/40 via-amber-400/30 to-yellow-500/40",
  "from-rose-500/40 via-pink-500/30 to-fuchsia-500/40",
  "from-sky-500/40 via-indigo-500/30 to-purple-500/40",
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Portfolio({
  name = "Jane Smith",
  role = "Full-Stack Developer & Designer",
  bio = "I build beautiful, performant web applications that users love. Specializing in React, TypeScript, and design systems.",
  navItems = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  projects = [
    {
      title: "E-commerce Platform",
      description:
        "A modern shopping experience with real-time inventory and AI recommendations.",
      tags: ["Next.js", "Stripe", "AI"],
    },
    {
      title: "Design System",
      description:
        "A comprehensive component library with 100+ animated components.",
      tags: ["React", "TypeScript", "Framer Motion"],
    },
    {
      title: "Analytics Dashboard",
      description:
        "Real-time data visualization with interactive charts and filters.",
      tags: ["D3.js", "WebSocket", "PostgreSQL"],
    },
    {
      title: "Mobile Banking App",
      description:
        "Secure mobile banking with biometric auth and instant transfers.",
      tags: ["React Native", "Node.js", "AWS"],
    },
  ],
  timeline = [
    {
      year: "2024",
      title: "Lead Engineer at Acme",
      description:
        "Leading a team of 8 engineers building the next-gen platform.",
    },
    {
      year: "2022",
      title: "Senior Developer at Startup",
      description:
        "Built the core product from 0 to 50k users in 12 months.",
    },
    {
      year: "2020",
      title: "Frontend Developer at Agency",
      description:
        "Delivered 20+ client projects across e-commerce, SaaS, and fintech.",
    },
  ],
  contactCta = { label: "Get in Touch", href: "mailto:hello@example.com" },
  social = [
    { label: "GitHub", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Figma",
    "Framer Motion",
    "Tailwind CSS",
  ],
  className,
}: PortfolioProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const firstName = name.split(" ")[0];

  /* Split name into individual letters for stagger animation */
  const nameLetters = name.split("");

  return (
    <div
      className={cn(
        "relative min-h-screen bg-[#050505] text-white antialiased selection:bg-violet-500/30 selection:text-white",
        className
      )}
    >
      {/* ------------------------------------------------------------ */}
      {/*  Floating Nav                                                 */}
      {/* ------------------------------------------------------------ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.6 }}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white/90 transition-colors hover:text-white"
          >
            {firstName}
            <span className="text-violet-400">.</span>
          </a>

          {/* Nav links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 backdrop-blur-xl sm:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm text-zinc-400 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href={contactCta.href}
            className="group relative rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            {contactCta.label}
          </a>
        </nav>
      </motion.header>

      {/* ------------------------------------------------------------ */}
      {/*  Hero                                                         */}
      {/* ------------------------------------------------------------ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -60, 40, 0],
              y: [0, 40, -80, 0],
              scale: [1, 0.85, 1.15, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-fuchsia-500/[0.06] blur-[140px]"
          />
          <motion.div
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 60, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]"
          />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-sm font-medium text-transparent">
              {role}
            </span>
          </motion.div>

          {/* Name - staggered letter animation */}
          <h1 className="mb-6 text-7xl font-bold tracking-tighter sm:text-8xl lg:text-9xl">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                className="inline-block"
                style={{ whiteSpace: letter === " " ? "pre" : undefined }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.5,
            }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            {bio}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto h-10 w-6 rounded-full border border-white/[0.12] p-1"
            >
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-2 rounded-full bg-white/40"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Projects Grid                                                */}
      {/* ------------------------------------------------------------ */}
      <section id="work" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400"
            >
              Selected Work
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-16 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Projects I&apos;ve built
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {projects.map((project, i) => {
              const gradient =
                projectGradients[i % projectGradients.length];
              const isFirst = i === 0;

              return (
                <motion.a
                  key={i}
                  href={project.href || "#"}
                  variants={scaleIn}
                  onHoverStart={() => setHoveredProject(i)}
                  onHoverEnd={() => setHoveredProject(null)}
                  whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm",
                    isFirst && "sm:col-span-2"
                  )}
                >
                  {/* Gradient border glow on hover */}
                  <AnimatePresence>
                    {hoveredProject === i && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none absolute -inset-px z-0 rounded-2xl"
                        style={{
                          background:
                            "conic-gradient(from 180deg at 50% 50%, #8b5cf6, #d946ef, #ec4899, #8b5cf6)",
                          opacity: 0.15,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Image area - gradient background with project number */}
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      isFirst ? "aspect-[2.2/1]" : "aspect-video"
                    )}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex h-full w-full items-center justify-center bg-gradient-to-br",
                          gradient
                        )}
                      >
                        <span className="text-8xl font-black text-white/[0.07]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {project.description}
                    </p>
                    {project.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-400 transition-colors group-hover:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Timeline / Experience                                        */}
      {/* ------------------------------------------------------------ */}
      <section id="experience" className="relative px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400"
            >
              Experience
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-16 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Where I&apos;ve worked
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Animated vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="absolute left-[27px] top-4 h-[calc(100%-32px)] w-px origin-top bg-gradient-to-b from-violet-500/50 via-fuchsia-500/30 to-transparent"
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-16"
            >
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative flex gap-8 pl-16"
                >
                  {/* Glowing dot */}
                  <div className="absolute left-[21px] top-2">
                    <div className="relative h-3 w-3">
                      <div className="absolute inset-0 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                      <div className="absolute -inset-1.5 animate-ping rounded-full bg-violet-400/20" />
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Year as large gradient number */}
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-4xl font-black tracking-tighter text-transparent sm:text-5xl">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Skills / Tech Stack                                          */}
      {/* ------------------------------------------------------------ */}
      <section id="skills" className="relative overflow-hidden px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400"
            >
              Tech Stack
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mb-16 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Tools I work with
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill}
                variants={scaleIn}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 24px rgba(139,92,246,0.25)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="cursor-default rounded-full border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-violet-500/30 hover:text-white"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Contact CTA                                                  */}
      {/* ------------------------------------------------------------ */}
      <section id="contact" className="relative px-6 py-32">
        {/* Animated gradient background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #8b5cf6, #d946ef, #ec4899, #06b6d4, #8b5cf6)",
              backgroundSize: "300% 300%",
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-violet-400"
          >
            Contact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Let&apos;s work
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              together
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mb-10 text-lg text-zinc-400"
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            create something extraordinary.
          </motion.p>

          <motion.a
            variants={scaleIn}
            href={contactCta.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-black shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-shadow hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]"
          >
            {contactCta.label}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </motion.a>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Footer                                                       */}
      {/* ------------------------------------------------------------ */}
      <footer className="relative border-t border-white/[0.06] px-6 py-12">
        {/* Gradient top border accent */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Name */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-white/80">
              {firstName}
              <span className="text-violet-400">.</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-1">
            {social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-zinc-500 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} {name}
          </p>
        </div>
      </footer>
    </div>
  );
}
