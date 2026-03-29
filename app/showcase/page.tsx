import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";

export const metadata: Metadata = {
  title: "Showcase — FlexUI",
  description: "Explore projects and websites built with FlexUI cinematic React components.",
};

const projects = [
  {
    name: "Acme SaaS Dashboard",
    description: "Real-time analytics with spotlight cards, sparklines, and aurora backgrounds for a visually stunning data experience.",
    tags: ["Dashboard", "Analytics", "SaaS"],
    gradient: "from-violet-600/30 via-fuchsia-600/15 to-transparent",
    icon: "📊",
    components: ["SpotlightCard", "SparklineChart", "AuroraBackground"],
  },
  {
    name: "Nebula AI Landing",
    description: "AI startup landing page with magnetic buttons, interactive globe, and cinematic hero for worldwide inference visualization.",
    tags: ["Landing Page", "AI", "WebGL"],
    gradient: "from-cyan-600/30 via-blue-600/15 to-transparent",
    icon: "🤖",
    components: ["MagneticButton", "InteractiveGlobe", "CinematicHero"],
  },
  {
    name: "Stellar Portfolio",
    description: "Designer portfolio with parallax scroll, text reveal animations, and glassmorphic panels for immersive browsing.",
    tags: ["Portfolio", "Design", "Animation"],
    gradient: "from-amber-600/30 via-orange-600/15 to-transparent",
    icon: "✨",
    components: ["ParallaxScroll", "TextReveal", "FloatingPanel"],
  },
  {
    name: "Orbit Finance",
    description: "Fintech app with animated inputs, KPI cards, progress rings, and neon glow cards for engaging financial data.",
    tags: ["Fintech", "App", "Data Viz"],
    gradient: "from-emerald-600/30 via-teal-600/15 to-transparent",
    icon: "💰",
    components: ["AnimatedInput", "KPICard", "ProgressRing"],
  },
  {
    name: "Pulsar Dev Tools",
    description: "Developer tools marketing with typewriter terminal, shimmer buttons, and code animations for a technical polish.",
    tags: ["DevTools", "Marketing", "Developer"],
    gradient: "from-rose-600/30 via-pink-600/15 to-transparent",
    icon: "⚡",
    components: ["TypewriterTerminal", "ShimmerButton", "GradientText"],
  },
  {
    name: "Cosmos Commerce",
    description: "E-commerce storefront with morphing cards, animated tabs, confetti checkout, and holographic product previews.",
    tags: ["E-Commerce", "Retail", "Interactive"],
    gradient: "from-indigo-600/30 via-violet-600/15 to-transparent",
    icon: "🛒",
    components: ["MorphingCard", "AnimatedTabs", "ConfettiButton"],
  },
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Community Projects
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Built with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              FlexUI
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-500">
            Real projects crafted with cinematic components.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_40px_-15px_rgba(56,189,248,0.1)]"
            >
              {/* Gradient header with icon */}
              <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${project.gradient}`}>
                <span className="text-5xl transition-transform duration-500 group-hover:scale-110">
                  {project.icon}
                </span>
                {/* Floating component labels */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                  {project.components.map((comp) => (
                    <span
                      key={comp}
                      className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-medium text-white/60 backdrop-blur-sm"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                  {project.name}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-8 text-center sm:p-12">
          <span className="mb-4 inline-block text-4xl">🚀</span>
          <h3 className="text-xl font-bold text-white">Built something with FlexUI?</h3>
          <p className="mt-2 text-sm text-zinc-500">
            We&apos;d love to feature your project. Submit it and get showcased to thousands of developers.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/flexui/flexui/issues/new?title=Showcase+Submission&template=showcase.md"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]"
            >
              Submit Your Project
            </a>
            <Link
              href="/docs/components"
              className="rounded-xl border border-white/[0.1] px-8 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/[0.2] hover:text-white"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
