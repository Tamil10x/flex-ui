import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { GradientTextPlayground } from "./playground";
import { GradientTextExamples } from "./examples";

export const metadata: Metadata = {
  title: "Gradient Text — FlexUI",
  description:
    "Animated gradient text with flowing color stops that shift across the text using a CSS keyframe animation.",
};

export default function GradientTextDoc() {
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
          Gradient Text
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Animated gradient text with flowing color stops. Uses{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">
            background-clip: text
          </code>{" "}
          and a CSS keyframe animation to shift the gradient across the text.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Gradient colors flow smoothly across the text.
        </p>
        <GradientTextPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default palette, custom colors, static mode, and inline usage.
        </p>
        <GradientTextExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/gradient-text"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required.
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
                    components/flexui/gradient-text.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add the gradient-shift keyframe to your global CSS
                </p>
                <CodeBlock
                  code={`@keyframes gradient-shift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

@utility animate-gradient-shift {
  animation: gradient-shift 3s linear infinite;
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
        <DocSubSection id="gradient-text-props" title="GradientText">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "The text content to render with the gradient.",
                required: true,
              },
              {
                name: "colors",
                type: "string[]",
                default: '["#8b5cf6", "#06b6d4", "#ec4899", "#8b5cf6"]',
                description:
                  "Array of CSS color values for the gradient stops.",
              },
              {
                name: "speed",
                type: "number",
                default: "3",
                description: "Animation speed in seconds for one full cycle.",
              },
              {
                name: "animate",
                type: "boolean",
                default: "true",
                description: "Whether to animate the gradient movement.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the wrapper span.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="color-palettes" title="Color Palettes">
          <CodeBlock
            code={`{/* Default: violet → cyan → pink */}
<GradientText>Hello</GradientText>

{/* Sunset: orange → red → pink */}
<GradientText colors={["#f97316", "#ef4444", "#ec4899", "#f97316"]}>
  Sunset
</GradientText>

{/* Ocean: cyan → blue → violet */}
<GradientText colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#06b6d4"]}>
  Ocean
</GradientText>

{/* Static (no animation) */}
<GradientText animate={false} colors={["#3b82f6", "#8b5cf6"]}>
  Static
</GradientText>

{/* Fast animation */}
<GradientText speed={1.5}>Fast</GradientText>`}
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
              q: "Gradient is not visible",
              a: "Ensure the text has a font-size set. The background-clip: text technique requires the element to have visible text content.",
            },
            {
              q: "Animation is not working",
              a: "Make sure the gradient-shift keyframe and the animate-gradient-shift utility are defined in your globals.css.",
            },
            {
              q: "Colors look wrong",
              a: "For a seamless loop, repeat the first color at the end of the colors array (e.g., [\"#8b5cf6\", \"#06b6d4\", \"#8b5cf6\"]).",
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
