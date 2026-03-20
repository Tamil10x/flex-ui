import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FadeOnScrollPlayground } from "./playground";
import { FadeOnScrollExamples } from "./examples";

export const metadata: Metadata = {
  title: "Fade on Scroll — FlexUI",
  description:
    "A wrapper component that fades and slides children into view when scrolled into the viewport.",
};

export default function FadeOnScrollDoc() {
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
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Fade on Scroll
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A wrapper component that fades and slides its children into view when
          they enter the viewport. Configurable direction, distance, delay, and
          spring physics.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Elements fade and slide into view from configurable directions.
        </p>
        <FadeOnScrollPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Different directions, stagger patterns, and fade-only mode.
        </p>
        <FadeOnScrollExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/fade-on-scroll"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                .
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
                    components/flexui/fade-on-scroll.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
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
        <DocSubSection id="fade-on-scroll-props" title="FadeOnScroll">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content to reveal on scroll.",
                required: true,
              },
              {
                name: "direction",
                type: '"up" | "down" | "left" | "right" | "none"',
                default: '"up"',
                description:
                  "Direction the element slides in from.",
              },
              {
                name: "distance",
                type: "number",
                default: "40",
                description: "Slide distance in pixels.",
              },
              {
                name: "delay",
                type: "number",
                default: "0",
                description: "Delay before animation starts, in seconds.",
              },
              {
                name: "duration",
                type: "number",
                default: "0.6",
                description: "Animation duration in seconds.",
              },
              {
                name: "once",
                type: "boolean",
                default: "true",
                description:
                  "If true, the animation only triggers once.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the wrapper.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="direction-variants" title="Directions & Stagger">
          <CodeBlock
            code={`{/* Fade up (default) */}
<FadeOnScroll>
  <Card />
</FadeOnScroll>

{/* Fade from the left */}
<FadeOnScroll direction="left" distance={60}>
  <Card />
</FadeOnScroll>

{/* Stagger a list */}
{items.map((item, i) => (
  <FadeOnScroll key={item.id} direction="up" delay={i * 0.1}>
    <Card {...item} />
  </FadeOnScroll>
))}

{/* Fade only, no slide */}
<FadeOnScroll direction="none" duration={1}>
  <Card />
</FadeOnScroll>

{/* Re-trigger on every scroll */}
<FadeOnScroll once={false}>
  <Card />
</FadeOnScroll>`}
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
              q: "Elements don't animate on scroll",
              a: "Make sure framer-motion is installed. The component uses useInView which requires IntersectionObserver — check browser support if targeting older browsers.",
            },
            {
              q: "Animation triggers too early or too late",
              a: 'The default viewport margin is "-10% 0px". You can adjust this by wrapping FadeOnScroll in a container with overflow-hidden or adjusting the distance prop.',
            },
            {
              q: "Elements flash before animating",
              a: "This can happen with SSR. The component sets initial opacity to 0, so elements will be invisible until they enter the viewport. Make sure you're using the 'use client' directive.",
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
    </div>
  );
}
