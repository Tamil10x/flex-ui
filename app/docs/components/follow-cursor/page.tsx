import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FollowCursorPlayground } from "./playground";
import { FollowCursorExamples } from "./examples";

export const metadata: Metadata = {
  title: "Follow Cursor — FlexUI",
  description:
    "A decorative glowing dot that smoothly follows the cursor using Framer Motion spring physics.",
};

export default function FollowCursorDoc() {
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
          Follow Cursor
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A decorative glowing dot that smoothly follows the cursor around the
          page. Uses Framer Motion spring physics for fluid tracking with
          configurable stiffness and damping. Zero re-renders — all animation
          runs in the motion-value pipeline.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <FollowCursorPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <FollowCursorExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/follow-cursor"
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
                    components/flexui/follow-cursor.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="FollowCursor Props">
          <ApiTable
            rows={[
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the cursor element.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(139,92,246,0.5)"',
                description: "Cursor dot color as a CSS rgba string.",
              },
              {
                name: "size",
                type: "number",
                default: "24",
                description: "Dot diameter in px.",
              },
              {
                name: "stiffness",
                type: "number",
                default: "300",
                description: "Spring stiffness — higher means snappier.",
              },
              {
                name: "damping",
                type: "number",
                default: "25",
                description: "Spring damping — higher means less oscillation.",
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
              "A document-level mousemove listener captures the raw cursor position and stores it in Framer Motion useMotionValue — no React state, no re-renders.",
              "useSpring smooths the raw coordinates with configurable stiffness and damping for fluid, non-jittery following.",
              "The cursor element is a fixed-position, rounded div with a matching box-shadow glow effect.",
              "On mouseleave, a spring-animated opacity fades the dot out gracefully.",
              "pointer-events-none ensures the cursor dot never interferes with page interactions.",
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
