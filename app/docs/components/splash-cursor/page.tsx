import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SplashCursorPlayground } from "./playground";
import { SplashCursorExamples } from "./examples";

export const metadata: Metadata = {
  title: "Splash Cursor — FlexUI",
  description:
    "A fluid ink splash effect that follows the cursor with colorful blobs and trails using Canvas 2D.",
};

export default function SplashCursorDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Canvas 2D
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Splash Cursor
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A fluid ink splash effect that follows your cursor, creating colorful
          blobs with blur and velocity-based trails. Built with Canvas 2D for
          maximum performance. No WebGL required.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <SplashCursorPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <SplashCursorExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/splash-cursor"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies required. Uses native Canvas 2D API.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/splash-cursor.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="SplashCursor Props">
          <ApiTable
            rows={[
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes on the container element.",
              },
              {
                name: "colors",
                type: "string[]",
                default: '["#8B5CF6", "#389CFD", "#EC4899"]',
                description: "Array of CSS color strings for the splash blobs.",
              },
              {
                name: "size",
                type: "number",
                default: "40",
                description: "Base size of splash blobs in px.",
              },
              {
                name: "trail",
                type: "number",
                default: "20",
                description:
                  "Controls maximum blob density. Higher values allow more blobs.",
              },
              {
                name: "children",
                type: "ReactNode",
                default: "\u2014",
                description:
                  "Content rendered on top of the splash canvas (z-10).",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Fluid Ink Blobs", desc: "Canvas-drawn circles with CSS blur filter for a soft, watercolor-like effect." },
            { icon: "o", label: "Velocity Trails", desc: "Blob velocity inherits from mouse movement speed for natural trailing behavior." },
            { icon: "#", label: "Color Palette", desc: "Pass an array of hex colors for randomized multi-color splash effects." },
            { icon: "+", label: "Content Overlay", desc: "Children render above the canvas with z-10 stacking for interactive content." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="color-theme" title="Custom Color Theme">
          <CodeBlock code={`<SplashCursor colors={["#f59e0b", "#ef4444", "#ec4899"]} size={50}>
  <div className="p-12 text-center text-white">Warm palette</div>
</SplashCursor>`} filename="colors.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-splash" title="Subtle Small Splash">
          <CodeBlock code={`<SplashCursor size={20} trail={10} colors={["#3b82f6"]}>
  <div className="p-12 text-center text-white">Subtle effect</div>
</SplashCursor>`} filename="subtle.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Canvas element is pointer-events-none and purely decorative -- it does not intercept clicks.", "The splash effect is mouse-only and degrades gracefully on touch devices and keyboards.", "Content rendered via children remains fully interactive and accessible above the canvas layer."].map((note, i) => (
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
              "A Canvas 2D element covers the full container. On mousemove, splash blobs are created at the cursor position.",
              "Each blob is a circle drawn with a large CSS blur filter, giving the fluid ink-splash appearance.",
              "Blobs receive velocity from mouse movement direction and speed, creating a natural trailing effect.",
              "Colors are randomly picked from the provided palette. Blobs fade out over their lifetime using decreasing opacity.",
              "requestAnimationFrame drives the render loop. Expired blobs are removed to keep memory usage low.",
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
