import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SpotlightCursorPlayground } from "./playground";
import { SpotlightCursorExamples } from "./examples";

export const metadata: Metadata = {
  title: "Spotlight Cursor — FlexUI",
  description:
    "A radial light spotlight that follows the cursor, illuminating content beneath with a subtle glow.",
};

export default function SpotlightCursorDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS + Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Spotlight Cursor
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A full-viewport radial gradient that follows the cursor, illuminating
          content beneath with a subtle glow. Built with useMotionTemplate for
          reactive CSS gradients — zero re-renders on mouse move.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SpotlightCursorPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SpotlightCursorExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/spotlight-cursor"
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
                    components/flexui/spotlight-cursor.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="SpotlightCursor Props">
          <ApiTable
            rows={[
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the spotlight overlay.",
              },
              {
                name: "size",
                type: "number",
                default: "400",
                description: "Spotlight radial gradient diameter in px.",
              },
              {
                name: "color",
                type: "string",
                default: '"255,255,255"',
                description:
                  'Spotlight color as CSS RGB values, e.g. "56,189,248" for cyan.',
              },
              {
                name: "opacity",
                type: "number",
                default: "0.06",
                description: "Peak opacity of the spotlight gradient.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Full-Viewport Glow", desc: "A fixed-position radial gradient covers the entire page, illuminating content beneath the cursor." },
            { icon: "o", label: "Zero Re-Renders", desc: "Uses useMotionTemplate for reactive CSS gradients that update every frame without touching React state." },
            { icon: "#", label: "Configurable Appearance", desc: "Control size, color, and peak opacity to match subtle or bold design requirements." },
            { icon: "+", label: "Non-Intrusive", desc: "The overlay is pointer-events-none and fades out when the mouse leaves the document." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="cyan-spotlight" title="Cyan Spotlight">
          <CodeBlock code={`<SpotlightCursor color="56,189,248" size={500} opacity={0.08} />`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-warm" title="Subtle Warm Glow">
          <CodeBlock code={`<SpotlightCursor color="251,146,60" size={300} opacity={0.04} />`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The spotlight is purely decorative and hidden from assistive technology via pointer-events-none.", "Low default opacity ensures text contrast ratios remain unaffected by the overlay.", "The component automatically fades out when the mouse leaves the viewport, preventing visual artifacts."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "A document-level mousemove listener captures cursor position into Framer Motion useMotionValue — zero React re-renders.",
              "useSpring smooths the coordinates with stiffness 200 and damping 30 for fluid tracking.",
              "useMotionTemplate composes a reactive radial-gradient CSS string from the spring values. The gradient updates every animation frame without touching React state.",
              "The overlay covers the full viewport (fixed inset-0) with a very low opacity (0.06 default) so it illuminates content without washing it out.",
              "On mouseleave the spotlight fades out via spring-animated opacity. pointer-events-none ensures no interaction interference.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400">
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
