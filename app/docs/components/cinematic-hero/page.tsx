import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { CinematicHeroPlayground } from "./playground";
import { CinematicHeroExamples } from "./examples";

export const metadata: Metadata = {
  title: "Cinematic Hero — FlexUI",
  description:
    "A full-screen hero section with cinematic background effects, staggered word blur-reveal headline, and animated CTAs.",
};

export default function CinematicHeroDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Cinematic Hero
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A full-screen hero section that combines cinematic background effects
          with a staggered word blur-reveal headline, animated CTAs, and a badge
          with a pinging indicator. Choose from five background variants.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Full cinematic hero with particle background, headline reveal, and
          CTAs.
        </p>
        <CinematicHeroPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Different background variants: particles, stars, and aurora.
        </p>
        <CinematicHeroExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/cinematic-hero"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">framer-motion</code> and
                at least one FlexUI background component.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/cinematic-hero.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Install background components you want to use
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    particle-field, grid-pattern, stars-background,
                    aurora-background
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  4. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="cinematic-hero-props" title="CinematicHero">
          <ApiTable
            rows={[
              {
                name: "headline",
                type: "string",
                default: "\u2014",
                description: "Main headline text. Words animate in with blur-reveal.",
              },
              {
                name: "subtitle",
                type: "string",
                default: "\u2014",
                description: "Subtitle text displayed below the headline.",
              },
              {
                name: "background",
                type: '"particles" | "grid" | "stars" | "aurora" | "none"',
                default: '"particles"',
                description: "Background animation variant.",
              },
              {
                name: "primaryCta",
                type: "{ label: string; href: string }",
                default: "\u2014",
                description: "Primary call-to-action button.",
              },
              {
                name: "secondaryCta",
                type: "{ label: string; href: string }",
                default: "\u2014",
                description: "Secondary call-to-action button.",
              },
              {
                name: "badge",
                type: "string",
                default: "\u2014",
                description: "Badge text shown above the headline with a pinging dot.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the section.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Additional content rendered below the CTAs.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="background-variants" title="Background Variants">
          <CodeBlock
            code={`{/* Particles (default) */}
<CinematicHero headline="Your Headline" background="particles" />

{/* Stars */}
<CinematicHero headline="Your Headline" background="stars" />

{/* Aurora */}
<CinematicHero headline="Your Headline" background="aurora" />

{/* Grid */}
<CinematicHero headline="Your Headline" background="grid" />

{/* No background */}
<CinematicHero headline="Your Headline" background="none" />`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Background not showing",
              a: "Ensure the corresponding background component is installed (e.g., particle-field for 'particles' variant).",
            },
            {
              q: "Headline animation not playing",
              a: "Framer Motion must be installed. The blur-reveal triggers on mount, so it plays once on load.",
            },
            {
              q: "Section is not full-screen",
              a: 'The component uses min-h-screen. Ensure no parent container constrains the height.',
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Five Background Variants", desc: "Choose from particles, grid, stars, aurora, or none for the perfect atmosphere." },
            { icon: "o", label: "Blur-Reveal Headline", desc: "Each word fades in from blur with staggered timing for a cinematic entrance." },
            { icon: "#", label: "Animated CTAs", desc: "Primary and secondary call-to-action buttons slide in with coordinated delays." },
            { icon: "+", label: "Badge with Ping", desc: "Optional badge above the headline with an animated pinging dot indicator." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization-patterns" title="Customization Patterns">
        <DocSubSection id="full-hero" title="Full Hero with Badge and CTAs">
          <CodeBlock code={`<CinematicHero
  headline="Ship faster with FlexUI"
  subtitle="Beautiful components for modern React apps."
  background="stars"
  badge="Now in Beta"
  primaryCta={{ label: "Get Started", href: "/docs" }}
  secondaryCta={{ label: "View on GitHub", href: "/github" }}
/>`} filename="full.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="minimal-hero" title="Minimal Hero">
          <CodeBlock code={`<CinematicHero
  headline="Hello World"
  background="none"
  className="min-h-[60vh]"
/>`} filename="minimal.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The headline renders as an h1 element for proper document structure and screen reader hierarchy.", "CTA links use semantic anchor elements that are keyboard-focusable and announce their text labels.", "Background effects use pointer-events-none and are purely decorative — they do not interfere with interaction.", "The radial vignette and gradient overlays are visual-only and have no impact on content accessibility."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
