import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MeshGradientPlayground } from "./playground";
import { MeshGradientExamples } from "./examples";

export const metadata: Metadata = {
  title: "Mesh Gradient — FlexUI",
  description:
    "An animated mesh gradient background with multiple color blobs that blend together.",
};

export default function MeshGradientDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            CSS Only
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Mesh Gradient
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated mesh gradient background with multiple color blobs that
          blend together using heavy CSS blur. Perfect for hero sections,
          landing pages, and dark UI backgrounds.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Animated color blobs drift slowly across the container.
        </p>
        <MeshGradientPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Custom colors, different blur strengths, and content overlay.
        </p>
        <MeshGradientExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/mesh-gradient"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No external dependencies required.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/mesh-gradient.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to globals.css
                </p>
                <CodeBlock
                  code={`@keyframes mesh-blob-1 {
  0% { transform: translate(-50%, -50%) translate(0, 0); }
  100% { transform: translate(-50%, -50%) translate(80px, 60px); }
}
@keyframes mesh-blob-2 {
  0% { transform: translate(-50%, -50%) translate(0, 0); }
  100% { transform: translate(-50%, -50%) translate(-60px, 80px); }
}
@keyframes mesh-blob-3 {
  0% { transform: translate(-50%, -50%) translate(0, 0); }
  100% { transform: translate(-50%, -50%) translate(70px, -50px); }
}
@keyframes mesh-blob-4 {
  0% { transform: translate(-50%, -50%) translate(0, 0); }
  100% { transform: translate(-50%, -50%) translate(-50px, -70px); }
}`}
                  filename="globals.css"
                  language="css"
                />
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
        <DocSubSection id="mesh-gradient-props" title="MeshGradient">
          <ApiTable
            rows={[
              {
                name: "colors",
                type: "string[]",
                default: '["violet", "cyan", "pink", "emerald"]',
                description:
                  "Array of CSS color values for the gradient blobs.",
              },
              {
                name: "speed",
                type: "number",
                default: "20",
                description:
                  "Base animation duration in seconds for blob movement.",
              },
              {
                name: "blur",
                type: "number",
                default: "100",
                description: "CSS blur filter strength in pixels.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description:
                  "Content to render above the gradient background.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional CSS classes for the container element.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="color-themes" title="Color Themes">
          <CodeBlock
            code={`{/* Default violet/cyan/pink/emerald */}
<MeshGradient className="h-[400px] rounded-2xl" />

{/* Warm sunset */}
<MeshGradient
  colors={[
    "rgba(249, 115, 22, 0.3)",
    "rgba(244, 63, 94, 0.3)",
    "rgba(245, 158, 11, 0.3)",
    "rgba(236, 72, 153, 0.3)",
  ]}
  className="h-[400px] rounded-2xl"
/>

{/* Slow, heavy blur */}
<MeshGradient speed={40} blur={140} className="h-[400px] rounded-2xl" />`}
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
              q: "Blobs are not visible",
              a: "Make sure the container has a defined height (e.g., h-[400px] or min-h-screen). The blobs use absolute positioning and need a sized parent.",
            },
            {
              q: "Animation looks choppy",
              a: "Heavy CSS blur is GPU-intensive. Try reducing the blur value (e.g., blur={60}) for better performance on lower-end devices.",
            },
            {
              q: "Colors look washed out",
              a: "Increase the alpha value in your color strings (e.g., change 0.3 to 0.5) for more vivid blobs.",
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
            { icon: "~", label: "Animated Color Blobs", desc: "Four blobs drift with alternating CSS keyframe animations at staggered speeds." },
            { icon: "o", label: "Heavy Blur Blending", desc: "Configurable CSS filter blur (default 100px) blends blobs into a smooth gradient mesh." },
            { icon: "#", label: "Custom Color Palette", desc: "Pass any array of CSS color values to create branded gradient themes." },
            { icon: "+", label: "Content Overlay", desc: "Render children on a z-10 layer above the gradient for text or card overlays." },
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
        <DocSubSection id="warm-palette" title="Warm Sunset Palette">
          <CodeBlock code={`<MeshGradient
  colors={[
    "rgba(249, 115, 22, 0.3)",
    "rgba(244, 63, 94, 0.3)",
    "rgba(245, 158, 11, 0.3)",
    "rgba(236, 72, 153, 0.3)",
  ]}
  className="h-[400px] rounded-2xl"
/>`} filename="warm.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="slow-blur" title="Slow Heavy Blur">
          <CodeBlock code={`<MeshGradient speed={40} blur={140} className="h-[400px] rounded-2xl">
  <h1 className="text-4xl font-bold text-white">Hero Text</h1>
</MeshGradient>`} filename="slow-blur.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The blob layer uses aria-hidden to exclude decorative gradient elements from the accessibility tree.", "Blob elements are pointer-events-none so they never interfere with interactive content above.", "Content rendered via children sits on z-10, ensuring proper contrast and readability over the gradient."].map((note, i) => (
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
