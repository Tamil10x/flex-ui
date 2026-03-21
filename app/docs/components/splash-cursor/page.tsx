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
