import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { HeroBlockPlayground } from "./playground";
import { HeroBlockExamples } from "./examples";

export const metadata: Metadata = {
  title: "Hero Block — FlexUI",
  description:
    "A complete hero section with animated text, CTA buttons, and background effects. Full-section layout component.",
};

export default function HeroBlockDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Page Block
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Hero Block
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A complete hero section with staggered fade-in animations, gradient
          badge, dual CTA buttons, radial gradient glow, and an optional
          dot-grid background pattern. Drop it in as a full-page section.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <HeroBlockPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <HeroBlockExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/hero-block"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . No external CSS needed.
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
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/hero-block.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="HeroBlock Props">
          <ApiTable
            rows={[
              {
                name: "headline",
                type: "ReactNode",
                default: "—",
                description:
                  "Main headline text. Supports JSX for gradient text or inline elements.",
              },
              {
                name: "subtitle",
                type: "string",
                default: "—",
                description: "Subtitle text rendered below the headline.",
              },
              {
                name: "badge",
                type: "string",
                default: "—",
                description:
                  "Badge text shown above the headline with a gradient dot indicator.",
              },
              {
                name: "primaryCta",
                type: "{ label: string; href: string }",
                default: "—",
                description:
                  "Primary call-to-action button with white background.",
              },
              {
                name: "secondaryCta",
                type: "{ label: string; href: string }",
                default: "—",
                description:
                  "Secondary call-to-action button with border outline.",
              },
              {
                name: "showGrid",
                type: "boolean",
                default: "true",
                description:
                  "Show dot-grid background pattern behind the content.",
              },
              {
                name: "children",
                type: "ReactNode",
                default: "—",
                description: "Additional content rendered below the CTA buttons.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional classes on the outer section element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "The section uses min-h-[80vh] and flex centering to fill the viewport.",
              "A radial gradient glow is positioned behind the headline using absolute positioning and blur-[120px] for a soft ambient light effect.",
              "An optional dot-grid pattern is rendered using a CSS radial-gradient background-image at 24px intervals.",
              "Content animates in with staggered variants: badge, headline, subtitle, and CTAs each fade up in sequence.",
              "The badge includes a gradient dot indicator using a from-blue-400 to-cyan-400 gradient.",
              "Primary CTA uses a solid white background with hover dimming; secondary CTA uses a border-only glassmorphic style.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
