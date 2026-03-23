import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { DotPatternPlayground } from "./playground";
import { DotPatternExamples } from "./examples";

export const metadata: Metadata = {
  title: "Dot Pattern — FlexUI",
  description:
    "A dot matrix background pattern with optional radial fade mask.",
};

export default function DotPatternDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Pure CSS
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Dot Pattern
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A dot matrix background pattern with configurable spacing, size,
          color, and an optional radial fade mask. Pure CSS, no JavaScript
          animation needed.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          A dot background with a faded radial mask and content overlay.
        </p>
        <DotPatternPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default dots, faded dots, and custom color dots.
        </p>
        <DotPatternExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/dot-pattern"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">No external dependencies.</p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/dot-pattern.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Requires{" "}
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
        <DocSubSection id="dot-pattern-props" title="DotPattern">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the dot pattern.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "spacing",
                type: "number",
                default: "24",
                description: "Dot spacing in pixels.",
              },
              {
                name: "dotSize",
                type: "number",
                default: "1.2",
                description: "Dot size (radius) in pixels.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgb(255 255 255 / 0.3)"',
                description: "CSS color value for the dots.",
              },
              {
                name: "fade",
                type: "boolean",
                default: "false",
                description:
                  "Adds a radial gradient mask that fades the dots at the edges.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="dot-variants" title="Dot Variants">
          <CodeBlock
            code={`{/* Default dots */}
<DotPattern spacing={24} className="h-64 bg-zinc-950" />

{/* Faded edges */}
<DotPattern spacing={28} dotSize={1.5} fade className="h-64 bg-zinc-950" />

{/* Colored dots */}
<DotPattern color="rgb(168 85 247 / 0.5)" fade />

{/* Dense dots */}
<DotPattern spacing={12} dotSize={0.8} />`}
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
              q: "Dots not visible",
              a: "Ensure the container has a dark background (e.g., bg-zinc-950). The default dot color includes transparency so it may not show on light backgrounds.",
            },
            {
              q: "Dots appear as squares",
              a: "The dots use radial-gradient circles. If they look square, increase the spacing relative to the dotSize to give each dot more room.",
            },
            {
              q: "Fade mask not working",
              a: "The fade prop uses CSS mask-image with radial-gradient. All modern browsers support this. Check for conflicting overflow or mask properties on parent elements.",
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
            { icon: "~", label: "Pure CSS", desc: "No JavaScript animation — uses CSS radial-gradient for zero runtime cost and instant rendering." },
            { icon: "o", label: "Configurable Spacing", desc: "Adjust dot spacing, size, and color to match any design system or background." },
            { icon: "#", label: "Radial Fade Mask", desc: "Optional fade prop adds a CSS mask that softly fades dots at the edges for a polished look." },
            { icon: "+", label: "Content Overlay", desc: "Children render on top of the pattern with proper z-indexing for layered compositions." },
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
        <DocSubSection id="hero-background" title="Hero Section Background">
          <CodeBlock code={`<DotPattern fade spacing={20} dotSize={1} className="h-[400px] bg-zinc-950">
  <div className="flex h-full items-center justify-center">
    <h1 className="text-4xl font-bold text-white">Welcome</h1>
  </div>
</DotPattern>`} filename="hero.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="colored-dots" title="Colored Accent Dots">
          <CodeBlock code={`<DotPattern
  color="rgb(168 85 247 / 0.5)"
  spacing={16}
  dotSize={1.5}
  fade
  className="h-64 bg-zinc-950"
/>`} filename="colored.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The dot pattern is a purely decorative background using pointer-events-none, so it never interferes with user interactions.", "Children content maintains proper z-index stacking for full accessibility.", "No motion or animation is involved, making it safe for users with vestibular disorders."].map((note, i) => (
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
