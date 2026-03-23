import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { BentoGrid } from "@/components/marketing/bento-grid";
import { BentoCard } from "@/components/marketing/bento-card";
import { StatsSection } from "@/components/marketing/stats-section";
import { ComponentMarquee } from "@/components/marketing/component-marquee";
import {
  LazyThreeHoverCard as ThreeHoverCard,
  LazyInteractiveGlobe as InteractiveGlobe,
} from "@/components/marketing/lazy-components";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { ParticleField } from "@/components/flexui/particle-field";
import { CodeBlock } from "@/components/ui/code-block";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function Home() {
  return (
    <ParticleField
      count={100}
      color="rgba(139,92,246,0.6)"
      maxSize={5}
      speed={0.4}
      className="min-h-screen bg-background text-foreground"
    >
      <Navbar />

      {/* ══ 1. HERO ═══════════════════════════════════════════════ */}
      <Hero />

      {/* Divider glow */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/20 to-transparent" />
      </div>

      {/* ══ 2. COMPONENT SHOWCASE ═════════════════════════════════ */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Component{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#389CFD] bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="mt-3 text-zinc-500">
            134+ premium, animated, copy-paste components.
          </p>
        </div>

        <BentoGrid>
          <div className="lg:col-span-2 lg:row-span-2 overflow-hidden rounded-2xl">
            <ErrorBoundary>
              <ThreeHoverCard
                title="3D Hover Card"
                description="Glass border, 3D tilt, and cinematic light sweep."
                className="h-full min-h-[380px]"
              />
            </ErrorBoundary>
          </div>

          <BentoCard title="Spring Physics" subtitle="Buttery-smooth motion">
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6">
              <p className="text-center text-sm text-zinc-400">
                Spring physics — natural, organic motion.
              </p>
              <div className="mt-2 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-1.5 animate-pulse rounded-full bg-gradient-to-t from-[#8B5CF6] to-[#389CFD]"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard title="Magnetic Button" subtitle="Follows your cursor">
            <div className="flex flex-1 items-center justify-center py-6">
              <MagneticButton>Hover Me</MagneticButton>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-2 overflow-hidden" title="Interactive Globe" subtitle="WebGL world map with animated arcs">
            <div className="flex flex-1 w-full items-center justify-center overflow-hidden" style={{ minHeight: 340 }}>
              <ErrorBoundary>
                <InteractiveGlobe theme="ocean" showLabel={false} className="w-full" />
              </ErrorBoundary>
            </div>
          </BentoCard>

          <BentoCard title="One Command" subtitle="Zero config. Zero bloat.">
            <div className="flex flex-1 items-center justify-center py-4">
              <CodeBlock code="npx flexui add cosmic-eye" filename="Terminal" />
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* Divider */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#389CFD]/15 to-transparent" />
      </div>

      {/* ══ 3. STATS ══════════════════════════════════════════════ */}
      <div className="relative z-10">
        <StatsSection />
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#EC4899]/15 to-transparent" />
      </div>

      {/* ══ 4. MARQUEE ════════════════════════════════════════════ */}
      <div className="relative z-10">
        <ComponentMarquee />
      </div>

      {/* ══ 5. CTA ════════════════════════════════════════════════ */}
      <section className="relative z-10 py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Image
            src="/logo.png"
            alt="FlexUI"
            width={48}
            height={48}
            className="mx-auto mb-6 rounded-2xl"
          />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start building with{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#389CFD] bg-clip-text text-transparent">
              FlexUI
            </span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Browse the docs, pick a component, and ship cinematic interfaces in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/docs/components"
              className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
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

      {/* ══ 6. FOOTER ═════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/[0.04] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="FlexUI" width={20} height={20} className="rounded" />
                <span className="text-sm font-bold text-zinc-400">
                  FLEX<span className="bg-gradient-to-r from-[#8B5CF6] to-[#389CFD] bg-clip-text text-transparent">UI</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-600">Premium cinematic components.</p>
            </div>

            {/* Links */}
            {[
              { heading: "Product", links: [{ label: "Components", href: "/docs/components" }, { label: "Docs", href: "/docs/introduction" }, { label: "Changelog", href: "/docs/changelog" }, { label: "AI Studio", href: "/studio" }] },
              { heading: "Resources", links: [{ label: "Installation", href: "/docs/installation" }, { label: "MCP Server", href: "/docs/mcp-server" }, { label: "GitHub", href: "https://github.com/flexui/flexui" }] },
              { heading: "Community", links: [{ label: "Twitter / X", href: "https://x.com/flexui" }, { label: "Discord", href: "https://discord.gg/flexui" }] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">{col.heading}</h4>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        target={l.href.startsWith("http") ? "_blank" : undefined}
                        className="text-[13px] text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/[0.04] pt-6">
            <p className="text-[11px] text-zinc-700">&copy; {new Date().getFullYear()} FlexUI</p>
            <div className="flex gap-3">
              <Link href="https://github.com/flexui/flexui" target="_blank" className="text-zinc-700 hover:text-zinc-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </Link>
              <Link href="https://x.com/flexui" target="_blank" className="text-zinc-700 hover:text-zinc-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </ParticleField>
  );
}
