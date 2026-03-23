import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { CursorGlowPlayground } from "./playground";
import { CursorGlowExamples } from "./examples";

export const metadata: Metadata = {
  title: "Cursor Glow — FlexUI",
  description:
    "A cursor-following glow wrapper with dual-layer trail effect. Wrap any content to add a smooth, spring-based glow that tracks the mouse with an optional ghost trail.",
};

export default function CursorGlowDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            New
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Cursor Glow
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A composable wrapper that adds a cursor-following glow to any content.
          Dual-layer system with a fast primary glow and a slower trailing ghost
          for cinematic depth. Spring physics, customizable colors, and optional
          border illumination.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <CursorGlowPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <CursorGlowExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/cursor-glow"
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
                    components/flexui/cursor-glow.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="CursorGlow Props">
          <ApiTable
            rows={[
              { name: "children", type: "ReactNode", default: "—", description: "Content to wrap with the glow effect." },
              { name: "className", type: "string", default: "—", description: "Additional classes on the container." },
              { name: "glowColor", type: "string", default: '"139,92,246"', description: 'Primary glow color as CSS RGB values.' },
              { name: "secondaryColor", type: "string", default: '"59,130,246"', description: 'Trail glow color as CSS RGB values.' },
              { name: "glowSize", type: "number", default: "300", description: "Glow radius in pixels." },
              { name: "glowOpacity", type: "number", default: "0.15", description: "Glow opacity from 0 to 1." },
              { name: "trail", type: "boolean", default: "true", description: "Enable the trailing ghost glow layer." },
              { name: "borderGlow", type: "boolean", default: "true", description: "Enable cursor-proximity border illumination." },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Dual-Layer Trail", desc: "A fast primary glow + a slower trailing ghost create cinematic depth. The trail uses mix-blend-screen for additive blending." },
            { icon: "o", label: "Composable Wrapper", desc: "Wrap any content — cards, sections, grids — to add a cursor glow. No restructuring needed." },
            { icon: "#", label: "Border Illumination", desc: "Optional border glow brightens edges near the cursor — like light hitting a glass edge." },
            { icon: "+", label: "Zero Re-Renders", desc: "All tracking runs via Framer Motion values. No React state changes on mouse move." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-sm font-bold text-purple-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="emerald-glow" title="Emerald Glow">
          <CodeBlock code={`<CursorGlow glowColor="16,185,129" secondaryColor="52,211,153" glowSize={400}>
  <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
    <h3 className="text-white">Emerald glow content</h3>
  </div>
</CursorGlow>`} filename="emerald.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="no-trail" title="Without Trail">
          <CodeBlock code={`<CursorGlow trail={false} borderGlow={false}>
  <div className="p-6">Clean single-layer glow</div>
</CursorGlow>`} filename="no-trail.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "All glow layers use pointer-events-none — wrapped content remains fully interactive.",
              "The glow is purely decorative and doesn't convey information.",
              "Content renders at z-10, well above all glow layers.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Mouse position is captured relative to the container and stored in Framer Motion useMotionValue.",
              "Two spring configurations: a fast spring (stiffness 300) for the primary glow and a slow spring (stiffness 80) for the trail.",
              "Primary glow: a tight radial gradient at glowSize radius follows the cursor closely.",
              "Trail glow: a wider gradient (1.5x size) with the secondary color lags behind, using mix-blend-screen for additive blending.",
              "Border glow: a third gradient using useMotionTemplate tracks the cursor to illuminate nearby borders.",
              "On mouse enter/leave, a spring-animated visibility value fades all layers in and out smoothly.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-[10px] font-bold text-purple-400">
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
