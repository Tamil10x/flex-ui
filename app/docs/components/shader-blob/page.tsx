import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ShaderBlobPlayground } from "./playground";
import { ShaderBlobExamples } from "./examples";

export const metadata: Metadata = {
  title: "Shader Blob — FlexUI",
  description:
    "A real-time GLSL metaball/blob that morphs organically, reacts to cursor, and glows with two-tone color gradients.",
};

export default function ShaderBlobDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Tier 3
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            WebGL Shader
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            OGL
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Shader Blob
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A real-time GLSL metaball that morphs organically using fractal
          Brownian motion noise. Reacts to cursor position, features a two-tone
          color gradient, and emits a soft emissive glow -- all rendered in a
          single fragment shader via OGL.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Move your cursor over the blob to see it stretch toward the pointer.
          The surface morphs continuously with animated FBM noise.
        </p>
        <ShaderBlobPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples — Color Variants">
        <p className="mb-4 text-sm text-zinc-500">
          Three presets: Violet (default), Fire, and Ocean.
        </p>
        <ShaderBlobExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/shader-blob"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Auto-installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  ogl
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
                  code="npm install ogl"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/shader-blob.tsx
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

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "~",
              label: "Organic Morphing",
              desc: "FBM noise distorts the blob edge for an organic, lava-lamp-like surface that never repeats.",
            },
            {
              icon: "o",
              label: "Cursor Reactive",
              desc: "The blob stretches toward the cursor with smooth lerp interpolation for fluid interaction.",
            },
            {
              icon: "*",
              label: "Emissive Glow",
              desc: "Additive color outside the blob edge creates a soft, pulsing glow halo.",
            },
            {
              icon: "#",
              label: "Two-Tone Gradient",
              desc: "Primary and accent colors blend based on noise patterns for rich, dynamic coloring.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/10 to-blue-500/10 text-sm font-bold text-violet-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { ShaderBlob } from "@/components/flexui/shader-blob";
import type { ShaderBlobProps } from "@/components/flexui/shader-blob";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="ShaderBlob Props">
          <ApiTable
            rows={[
              {
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description:
                  "Primary blob color (hex). Determines the dominant hue of the metaball.",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#389CFD"',
                description:
                  "Secondary accent color (hex). Blends with primary based on noise patterns.",
              },
              {
                name: "speed",
                type: "number",
                default: "1.0",
                description:
                  "Animation speed multiplier. Lower = slower, more meditative motion.",
              },
              {
                name: "complexity",
                type: "number",
                default: "1.0",
                description:
                  "Noise complexity. Higher values create more chaotic, detailed surface distortion.",
              },
              {
                name: "interactive",
                type: "boolean",
                default: "true",
                description:
                  "Whether the blob reacts to cursor position. Set false for ambient decoration.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional Tailwind classes on the container div.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="color-variants" title="Color Variants">
          <CodeBlock
            code={`{/* Default violet blob */}
<ShaderBlob />

{/* Fire blob */}
<ShaderBlob color="#ef4444" accentColor="#f97316" complexity={1.5} />

{/* Ocean blob */}
<ShaderBlob color="#06b6d4" accentColor="#22d3ee" speed={0.5} />

{/* Emerald blob */}
<ShaderBlob color="#10b981" accentColor="#a7f3d0" />`}
            filename="Color variants"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="sizing" title="Sizing & Layout">
          <CodeBlock
            code={`{/* Full-width hero background */}
<div className="h-[600px] w-full rounded-2xl overflow-hidden">
  <ShaderBlob />
</div>

{/* Circular blob */}
<div className="h-64 w-64 rounded-full overflow-hidden">
  <ShaderBlob complexity={0.8} />
</div>`}
            filename="Sizing"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "OGL is dynamically imported on mount -- no server-side WebGL execution.",
              "Uses a single fullscreen triangle (3 vertices) -- minimal geometry overhead.",
              "FBM noise is computed entirely in the fragment shader -- no texture uploads per frame.",
              "DPR is capped at 2 to prevent excessive fragment shader load on high-DPI screens.",
              "WebGL context is explicitly lost on unmount to free GPU memory.",
              "Mouse lerp runs at 0.05 factor for smooth, low-jitter tracking.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "<canvas> is purely decorative -- no meaningful content for screen readers.",
              "The component renders a static placeholder until mounted to avoid hydration mismatch.",
              "Set interactive={false} to use as a non-interactive ambient background.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Blob renders as a black rectangle",
              a: "Make sure the container has a non-zero height. ShaderBlob fills its parent -- use h-[500px] or similar on the wrapper.",
            },
            {
              q: "Module not found: ogl",
              a: 'Run npm install ogl. The component dynamically imports ogl at runtime.',
            },
            {
              q: "Blob doesn't react to cursor",
              a: "Check that interactive is not set to false. Also ensure the container receives mouse events.",
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
