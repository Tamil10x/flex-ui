import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { AuroraBackgroundPlayground } from "./playground";
import { AuroraBackgroundExamples } from "./examples";

export const metadata: Metadata = {
  title: "Aurora Background — FlexUI",
  description:
    "A CSS-only animated aurora borealis background effect with configurable colors, speed, and blur.",
};

export default function AuroraBackgroundDoc() {
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
          Aurora Background
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A CSS-only animated aurora borealis background effect. Soft,
          blurred gradient bands drift and rotate to create an organic
          northern-lights atmosphere behind your content.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          The aurora bands animate continuously with CSS keyframes.
        </p>
        <AuroraBackgroundPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default colors, warm palette, and subtle slow-motion variants.
        </p>
        <AuroraBackgroundExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/aurora-background"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required — pure CSS animation.
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
                    components/flexui/aurora-background.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Add keyframes to your globals.css
                </p>
                <CodeBlock
                  code={`@keyframes aurora-shift {
  0%   { transform: translate(0%, 0%) rotate(0deg) scale(1); }
  25%  { transform: translate(10%, -15%) rotate(5deg) scale(1.05); }
  50%  { transform: translate(-5%, 10%) rotate(-3deg) scale(0.95); }
  75%  { transform: translate(-10%, -5%) rotate(4deg) scale(1.02); }
  100% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
}

@utility animate-aurora-shift {
  animation: aurora-shift 8s ease-in-out infinite;
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
        <DocSubSection id="aurora-background-props" title="AuroraBackground">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the aurora effect.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "colors",
                type: "string[]",
                default: "[violet, cyan, emerald, pink]",
                description:
                  "Array of CSS color values for the aurora bands.",
              },
              {
                name: "speed",
                type: "number",
                default: "8",
                description: "Base animation duration in seconds.",
              },
              {
                name: "blur",
                type: "number",
                default: "100",
                description: "Blur amount in pixels applied to the aurora bands.",
              },
              {
                name: "showAurora",
                type: "boolean",
                default: "true",
                description: "Toggle the aurora effect on/off.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="color-themes" title="Color Themes">
          <CodeBlock
            code={`{/* Default — violet, cyan, emerald, pink */}
<AuroraBackground />

{/* Warm palette */}
<AuroraBackground
  colors={[
    "rgba(239, 68, 68, 0.3)",
    "rgba(249, 115, 22, 0.3)",
    "rgba(234, 179, 8, 0.3)",
    "rgba(236, 72, 153, 0.3)",
  ]}
/>

{/* Subtle & slow */}
<AuroraBackground blur={140} speed={12} />`}
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
              q: "Aurora bands are not visible",
              a: "Make sure you have added the aurora-shift keyframe and animate-aurora-shift utility to your globals.css.",
            },
            {
              q: "Effect looks too harsh",
              a: "Increase the blur prop (e.g., 140-160) or lower the alpha channel in your color values.",
            },
            {
              q: "Performance concerns",
              a: "The effect is pure CSS with no JS runtime cost. Use showAurora={false} to disable it conditionally.",
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
            { icon: "~", label: "Pure CSS Animation", desc: "No JavaScript animation loop — the aurora bands drift using CSS keyframes for zero runtime cost." },
            { icon: "o", label: "Customizable Colors", desc: "Pass an array of up to four RGBA color values to create any aurora palette you need." },
            { icon: "#", label: "Configurable Speed & Blur", desc: "Control animation speed and blur intensity with simple numeric props." },
            { icon: "+", label: "Content Overlay", desc: "Children render on top via z-10, so text and interactive elements remain fully visible." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization-patterns" title="Customization Patterns">
        <DocSubSection id="warm-palette" title="Warm Palette">
          <CodeBlock code={`<AuroraBackground
  colors={[
    "rgba(239, 68, 68, 0.3)",
    "rgba(249, 115, 22, 0.3)",
    "rgba(234, 179, 8, 0.3)",
    "rgba(236, 72, 153, 0.3)",
  ]}
  speed={10}
>
  <h1>Warm Aurora</h1>
</AuroraBackground>`} filename="warm.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="subtle-slow" title="Subtle Slow Motion">
          <CodeBlock code={`<AuroraBackground blur={160} speed={14} showAurora>
  <div className="py-32 text-center">Slow and dreamy</div>
</AuroraBackground>`} filename="slow.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The aurora bands are decorative and use pointer-events-none, so they never interfere with user interaction.", "Content renders in a z-10 layer above the effect, keeping all text and interactive elements accessible.", "Use the showAurora prop to disable the effect for users who prefer reduced motion.", "The component does not produce flashing content — the gentle drift animation is safe for photosensitive users."].map((note, i) => (
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
