import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ParallaxDepthCardPlayground } from "./playground";
import { ParallaxDepthCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Parallax Depth Card — FlexUI",
  description:
    "A multi-layer parallax card where content layers move at different speeds based on cursor position, creating real depth perception with 3D tilt.",
};

export default function ParallaxDepthCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            New
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Parallax Depth Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A multi-layer parallax card where content layers shift at different
          speeds based on cursor position, creating real depth perception. Combines
          3D perspective tilt with per-layer parallax motion and a hover-scale
          spring for a holographic, floating effect.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ParallaxDepthCardPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <ParallaxDepthCardExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/parallax-depth-card"
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
                    components/flexui/parallax-depth-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="card-props" title="ParallaxDepthCard Props">
          <ApiTable
            rows={[
              { name: "children", type: "ReactNode", default: "—", description: "Use ParallaxDepthCard.Layer for each depth plane." },
              { name: "className", type: "string", default: "—", description: "Additional classes on the outer container." },
              { name: "maxTilt", type: "number", default: "12", description: "Maximum tilt angle in degrees." },
              { name: "maxShift", type: "number", default: "20", description: "Maximum parallax shift in pixels per depth unit." },
              { name: "perspective", type: "number", default: "1000", description: "Perspective depth in pixels — lower = more dramatic." },
              { name: "hoverScale", type: "number", default: "1.02", description: "Scale multiplier on hover." },
            ]}
          />
        </DocSubSection>
        <DocSubSection id="layer-props" title="ParallaxDepthCard.Layer Props">
          <ApiTable
            rows={[
              { name: "children", type: "ReactNode", default: "—", description: "Layer content." },
              { name: "depth", type: "number", default: "1", description: "Depth multiplier — higher values = more movement. 0 = static, 2 = double speed." },
              { name: "className", type: "string", default: "—", description: "Additional classes on the layer wrapper." },
            ]}
          />
        </DocSubSection>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Multi-Layer Parallax", desc: "Each Layer component moves at a different speed based on its depth prop — creating real spatial separation." },
            { icon: "o", label: "3D Perspective Tilt", desc: "The card tilts toward the cursor with configurable maxTilt and perspective for holographic depth." },
            { icon: "#", label: "Per-Layer Spring Physics", desc: "Each layer has its own spring config — deeper layers are slower and heavier, creating natural motion." },
            { icon: "+", label: "Specular Shine", desc: "A cursor-tracked radial shine overlay and top-edge highlight create the illusion of a reflective surface." },
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
        <DocSubSection id="dramatic-tilt" title="Dramatic Tilt">
          <CodeBlock code={`<ParallaxDepthCard maxTilt={20} perspective={600} maxShift={35}>
  <ParallaxDepthCard.Layer depth={0.3}>
    <div className="p-6">Background layer</div>
  </ParallaxDepthCard.Layer>
  <ParallaxDepthCard.Layer depth={1.5}>
    <div className="p-6">Foreground layer</div>
  </ParallaxDepthCard.Layer>
</ParallaxDepthCard>`} filename="dramatic.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "All parallax and tilt effects are purely decorative — content remains readable at any cursor position.",
              "The shine overlay uses pointer-events-none, keeping all content interactive.",
              "For users with prefers-reduced-motion, set maxTilt={0} and maxShift={0} to disable motion.",
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
              "Mouse position is normalized to -0.5 to 0.5 range (center = 0) and stored in motion values.",
              "useTransform maps the -0.5 to 0.5 range to rotateX/rotateY angles for 3D perspective tilt.",
              "Each child Layer reads its depth prop. Higher depth values produce larger translation offsets.",
              "Per-layer springs have different stiffness — deeper layers have lower stiffness (slower response), creating natural parallax lag.",
              "A specular shine radial gradient tracks the cursor to simulate surface reflection.",
              "hover scale uses a spring that animates from 1 to hoverScale when the cursor enters the card.",
              "transformStyle: preserve-3d on the container ensures child translations create real 3D depth.",
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
