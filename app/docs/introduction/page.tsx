import { CodeBlock } from "@/components/ui/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction — FlexUI",
  description: "Learn about FlexUI, a premium animated component registry built on shadcn/ui.",
};

export default function IntroductionPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-purple-400">Getting Started</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Introduction
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          FlexUI is a premium, open-source component registry that extends{" "}
          <span className="text-white">shadcn/ui</span> with cinematic Framer
          Motion animations and interactive Three.js WebGL experiences.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* What is FlexUI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">What is FlexUI?</h2>
        <p className="leading-relaxed text-zinc-400">
          FlexUI is <strong className="text-white">not an npm package</strong>.
          It&apos;s a component registry — a collection of beautifully crafted,
          animated UI components that you copy directly into your project using
          the official shadcn CLI.
        </p>
        <p className="leading-relaxed text-zinc-400">
          Each component is yours. No black-box dependencies. No vendor lock-in.
          Just clean, typed React code that lives in your codebase.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">How It Works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: "01",
              title: "Run the CLI",
              desc: "Use the official shadcn CLI to add any FlexUI component.",
            },
            {
              step: "02",
              title: "Auto-install deps",
              desc: "The CLI installs framer-motion, three.js, or whatever the component needs.",
            },
            {
              step: "03",
              title: "Own the code",
              desc: "The .tsx file is written directly into your project. Customize freely.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5"
            >
              <span className="text-xs font-bold text-purple-400">
                STEP {item.step}
              </span>
              <h3 className="mt-2 text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Quick Example</h2>
        <p className="leading-relaxed text-zinc-400">
          Add the Magnetic Button to your project with a single command:
        </p>
        <CodeBlock
          code="npx shadcn@latest add @flexui/magnetic-button"
          filename="Terminal"
        />
        <p className="leading-relaxed text-zinc-400">
          Then use it in your code:
        </p>
        <CodeBlock
          code={`import { MagneticButton } from "@/components/flexui/magnetic-button";

export default function Page() {
  return (
    <MagneticButton>
      Get Started
    </MagneticButton>
  );
}`}
          filename="app/page.tsx"
          language="tsx"
        />
      </section>

      {/* Component tiers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Component Tiers</h2>
        <p className="leading-relaxed text-zinc-400">
          FlexUI components are organized into three tiers based on complexity:
        </p>
        <div className="space-y-3">
          {[
            {
              tier: "Tier 1 — Enhanced Primitives",
              desc: "Magnetic Buttons, Spotlight Borders, Shiny Text, Number Tickers.",
              deps: "framer-motion",
            },
            {
              tier: "Tier 2 — Cinematic Blocks",
              desc: "Parallax Heroes, Scroll-jacking sections, Bento Grids with stagger animations.",
              deps: "framer-motion, lucide-react",
            },
            {
              tier: "Tier 3 — WebGL Experiences",
              desc: "Interactive 3D cards, floating geometry, WebGL displacement effects.",
              deps: "three, @react-three/fiber, @react-three/drei",
            },
          ].map((item) => (
            <div
              key={item.tier}
              className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5"
            >
              <h3 className="text-base font-semibold text-white">
                {item.tier}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
              <p className="mt-2 text-xs text-zinc-600">
                Dependencies:{" "}
                <code className="text-purple-400/80">{item.deps}</code>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-zinc-950">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">
                  Technology
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {[
                ["Next.js 15", "App Router, SSR, static registry hosting"],
                ["Tailwind CSS", "Utility-first styling"],
                ["Framer Motion", "Spring physics, scroll reveals, gestures"],
                ["Three.js + R3F", "WebGL 3D experiences"],
                ["shadcn/ui", "Base component system + registry protocol"],
                ["TypeScript", "End-to-end type safety"],
              ].map(([tech, purpose]) => (
                <tr key={tech}>
                  <td className="px-4 py-3 font-medium text-white">{tech}</td>
                  <td className="px-4 py-3 text-zinc-500">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next step */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.04] p-6">
        <p className="text-sm text-zinc-400">
          Ready to get started?{" "}
          <a
            href="/docs/installation"
            className="font-medium text-purple-400 underline underline-offset-4 hover:text-purple-300"
          >
            Follow the installation guide →
          </a>
        </p>
      </div>
    </div>
  );
}
