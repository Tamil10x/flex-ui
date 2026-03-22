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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Scroll-Linked Motion", desc: "Uses Framer Motion useScroll to track scroll progress relative to the element viewport position." },
            { icon: "o", label: "Bidirectional", desc: "Choose \"up\" or \"down\" direction for the parallax translation relative to scroll direction." },
            { icon: "#", label: "Adjustable Speed", desc: "Speed multiplier controls how far content shifts, from subtle (0.2) to dramatic (1.0)." },
            { icon: "+", label: "Composable Wrapper", desc: "Wrap any content to instantly add parallax behavior without modifying the child components." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get-customization" title="Customization Patterns">
        <DocSubSection id="hero-parallax" title="Hero Image Parallax">
          <CodeBlock code={`<ParallaxScroll speed={0.6} direction="up" className="h-[500px]">
  <img src="/hero.jpg" alt="Hero" className="w-full h-[600px] object-cover" />
</ParallaxScroll>`} filename="hero.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="reverse-text" title="Reverse Direction Text">
          <CodeBlock code={`<ParallaxScroll speed={0.3} direction="down">
  <h2 className="text-4xl font-bold text-white">Scrolls downward</h2>
</ParallaxScroll>`} filename="reverse.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The parallax effect uses CSS transform (translateY) which does not affect document flow or reading order.", "Content remains fully readable and interactive regardless of the parallax offset.", "The wrapper uses overflow-hidden to prevent content from leaking outside the container bounds.", "Consider providing extra padding on child content so text is not clipped at extreme scroll positions."].map((note, i) => (
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
