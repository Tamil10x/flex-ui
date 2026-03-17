import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { BentoGrid } from "@/components/marketing/bento-grid";
import { BentoCard } from "@/components/marketing/bento-card";
import { ThreeHoverCard } from "@/components/flexui/three-hover-card";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { CodeBlock } from "@/components/ui/code-block";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Component Showcase */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Components
          </h2>
          <p className="mt-3 text-zinc-500">
            Premium, animated, copy-paste ready.
          </p>
        </div>

        <BentoGrid>
          {/* Card 1 — Large: ThreeHoverCard showcase */}
          <BentoCard
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            title="3D Hover Card"
            subtitle="WebGL-powered. Lazy-loaded on hover."
          >
            <ThreeHoverCard
              title="Icosahedron"
              description="Hover me to reveal a live 3D scene."
              className="h-full min-h-[280px]"
            />
          </BentoCard>

          {/* Card 2 — Typography / animation showcase */}
          <BentoCard
            className="md:col-span-1 min-h-[200px]"
            title="Spring Physics"
            subtitle="Buttery-smooth Framer Motion springs"
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6">
              <p className="text-center text-sm text-zinc-400">
                Every animation uses spring physics — no easing curves, no
                stiffness hacks. Just natural motion.
              </p>
              <div className="mt-2 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-1.5 animate-pulse rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 3 — MagneticButton showcase */}
          <BentoCard
            className="md:col-span-1 min-h-[200px]"
            title="Magnetic Button"
            subtitle="Follows your cursor with spring physics"
          >
            <div className="flex flex-1 items-center justify-center py-6">
              <MagneticButton>Hover Me</MagneticButton>
            </div>
          </BentoCard>

          {/* Card 4 — Code snippet with copy button */}
          <BentoCard
            className="md:col-span-2 min-h-[200px]"
            title="One Command. Done."
            subtitle="No npm packages. No bundle bloat."
          >
            <div className="flex flex-1 items-center justify-center py-4">
              <CodeBlock
                code="npx shadcn@latest add @flexui/three-hover-card"
                filename="Terminal"
              />
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* Getting Started CTA */}
      <section className="border-t border-white/[0.06] py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Image
            src="/logo.png"
            alt="FlexUI"
            width={56}
            height={56}
            className="mx-auto mb-6 rounded-2xl"
          />
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Start building with FLEX
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              UI
            </span>
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Flexible. Intuitive. Responsive.
          </p>
          <p className="mt-4 text-zinc-400">
            Browse the docs, pick a component, and ship cinematic interfaces in
            minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/components"
              className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Browse Components
            </Link>
            <Link
              href="/docs/installation"
              className="rounded-xl border border-white/10 px-8 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Quick Install
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="FlexUI"
              width={24}
              height={24}
              className="rounded-md"
            />
            <span className="text-sm font-bold text-zinc-400">
              FLEX
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                UI
              </span>
            </span>
          </div>
          <p className="text-sm text-zinc-600">
            Flexible. Intuitive. Responsive.
          </p>
          <div className="flex gap-6">
            <Link
              href="/docs/introduction"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Components
            </Link>
            <Link
              href="/docs/changelog"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Changelog
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
