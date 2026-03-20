import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ParallaxScrollPlayground } from "./playground";
import { ParallaxScrollExamples } from "./examples";

export const metadata: Metadata = {
  title: "Parallax Scroll — FlexUI",
  description:
    "A composable parallax wrapper that translates child content along the Y axis based on scroll progress.",
};

export default function ParallaxScrollDoc() {
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
          Parallax Scroll
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A composable parallax wrapper that translates child content along the
          Y axis based on scroll progress. Wrap any content to make it parallax.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll the page to see the parallax translation effect.
        </p>
        <ParallaxScrollPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Hero sections, image parallax, and reverse direction.
        </p>
        <ParallaxScrollExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/parallax-scroll"
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
                    components/flexui/parallax-scroll.tsx
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
        <DocSubSection id="parallax-scroll-props" title="ParallaxScroll">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "The content to apply the parallax effect to.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the outer wrapper.",
              },
              {
                name: "speed",
                type: "number",
                default: "0.5",
                description:
                  "Parallax multiplier. Higher values create a stronger parallax effect.",
              },
              {
                name: "direction",
                type: '"up" | "down"',
                default: '"up"',
                description:
                  "Direction the content moves relative to scroll. \"up\" moves content upward as you scroll down.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="speed-examples" title="Speed & Direction">
          <CodeBlock
            code={`{/* Subtle parallax */}
<ParallaxScroll speed={0.2} direction="up">
  <h1>Gentle drift</h1>
</ParallaxScroll>

{/* Strong parallax */}
<ParallaxScroll speed={0.8} direction="up">
  <img src="/hero.jpg" alt="Hero" />
</ParallaxScroll>

{/* Reverse direction */}
<ParallaxScroll speed={0.4} direction="down">
  <p>Moves down as you scroll</p>
</ParallaxScroll>`}
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
              q: "Content clips during parallax",
              a: "The wrapper uses overflow-hidden by default. Add extra height to the child content so there is room for the translation.",
            },
            {
              q: "Effect is too subtle",
              a: "Increase the speed prop (e.g., 0.8 or 1.0) for a more dramatic shift.",
            },
            {
              q: "Parallax causes layout shift",
              a: "Make sure the parent container has a fixed height or use overflow-hidden to contain the moving content.",
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
