import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { BlobCursorPlayground } from "./playground";
import { BlobCursorExamples } from "./examples";

export const metadata: Metadata = {
  title: "Blob Cursor — FlexUI",
  description:
    "A morphing blob shape that follows the cursor with a liquid, organic feel using heavy spring physics and CSS blur.",
};

export default function BlobCursorDoc() {
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
          Blob Cursor
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A large blurred blob that follows the cursor with heavy spring
          inertia for an organic, liquid feel. Uses mix-blend-mode for
          beautiful color blending on dark backgrounds. Zero re-renders.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <BlobCursorPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <BlobCursorExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/blob-cursor"
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
                    components/flexui/blob-cursor.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="BlobCursor Props">
          <ApiTable
            rows={[
              {
                name: "className",
                type: "string",
                default: "—",
                description: "Additional classes on the blob element.",
              },
              {
                name: "color",
                type: "string",
                default: '"rgba(56,189,248,0.3)"',
                description: "Blob color as a CSS rgba string.",
              },
              {
                name: "size",
                type: "number",
                default: "120",
                description: "Blob diameter in px.",
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
              "A document-level mousemove listener feeds raw cursor coordinates into Framer Motion useMotionValue — zero React re-renders.",
              "useSpring with low stiffness (50) and moderate damping (15) creates a sluggish, organic following motion.",
              "filter: blur(40px) turns the solid circle into a soft, morphing blob shape.",
              "mix-blend-mode: screen blends the blob color with whatever is beneath, creating vibrant overlaps on dark backgrounds.",
              "On mouseleave, a spring-animated opacity fades the blob out smoothly.",
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Spring Physics", desc: "Heavy spring inertia creates a liquid, organic motion that trails behind the cursor." },
            { icon: "o", label: "Zero Re-renders", desc: "Uses Framer Motion values and document-level listeners — no React state updates on mouse move." },
            { icon: "#", label: "Screen Blend Mode", desc: "mix-blend-mode: screen creates vibrant color blending on dark backgrounds." },
            { icon: "+", label: "Smooth Fade", desc: "Blob fades out with spring-animated opacity when the cursor leaves the viewport." },
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
        <DocSubSection id="warm-blob" title="Warm Glow Blob">
          <CodeBlock code={`<BlobCursor
  color="rgba(249, 115, 22, 0.35)"
  size={160}
/>`} filename="warm.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="small-blob" title="Small Subtle Blob">
          <CodeBlock code={`<BlobCursor
  color="rgba(139, 92, 246, 0.2)"
  size={80}
  className="z-0"
/>`} filename="subtle.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The blob is pointer-events-none and fixed-positioned, so it never blocks clicks or keyboard navigation.", "It is purely decorative — consider hiding it for users who prefer reduced motion via a prefers-reduced-motion check.", "The blob does not flash or strobe, making it safe for photosensitive users.", "Screen readers ignore the blob entirely as it contains no text or interactive elements."].map((note, i) => (
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
