import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { PortalTransitionPlayground } from "./playground";
import { PortalTransitionExamples } from "./examples";

export const metadata: Metadata = {
  title: "Portal Transition — FlexUI",
  description:
    "A circular portal/wormhole transition effect for revealing content with expanding clip-path, glow ring, and particles.",
};

export default function PortalTransitionDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Portal Transition
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A circular portal/wormhole transition that reveals content with an
          expanding clip-path, glowing ring, and particle effects. Toggle
          open/close for cinematic content reveals.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the button to open and close the portal transition.
        </p>
        <PortalTransitionPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default, colored, and fast portal configurations.
        </p>
        <PortalTransitionExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/portal-transition"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires <code className="text-zinc-300">framer-motion</code> as
                a peer dependency.
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
                    components/flexui/portal-transition.tsx
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
        <DocSubSection id="portal-transition-props" title="PortalTransition">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description:
                  "Content revealed when the portal opens.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description: "Portal glow and particle color (hex).",
              },
              {
                name: "isOpen",
                type: "boolean",
                default: "false",
                description:
                  "Whether the portal is open. Animates on change.",
              },
              {
                name: "duration",
                type: "number",
                default: "0.8",
                description:
                  "Transition duration in seconds.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="configurations" title="Configurations">
          <CodeBlock
            code={`{/* Default violet portal */}
<PortalTransition isOpen={open}>
  <div>Your content here</div>
</PortalTransition>

{/* Cyan portal with slow reveal */}
<PortalTransition isOpen={open} color="#06B6D4" duration={1.2}>
  <div>Slow reveal content</div>
</PortalTransition>

{/* Fast snappy portal */}
<PortalTransition isOpen={open} color="#F43F5E" duration={0.4}>
  <div>Quick content</div>
</PortalTransition>`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Clip-Path Reveal", desc: "Content expands from a circular clip-path for a cinematic portal opening effect." },
            { icon: "o", label: "Glow Ring", desc: "An animated glowing ring radiates outward during the transition." },
            { icon: "#", label: "Particle Burst", desc: "24 randomized particles explode from the center on each open/close toggle." },
            { icon: "+", label: "Customizable Color", desc: "Pass any hex color to theme the glow, particles, and background gradient." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["All particle and glow effects are pointer-events-none and purely decorative.", "Content is rendered with proper z-index stacking so interactive elements remain accessible.", "The closed-state pulsing dot is decorative and does not interfere with content below."].map((note, i) => (
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
              q: "Content flashes on initial render",
              a: "Make sure isOpen starts as false. The component uses AnimatePresence for clean mount/unmount transitions.",
            },
            {
              q: "Particles not visible",
              a: "Particles are small and fast. Try increasing duration for a slower transition where particles are more visible.",
            },
            {
              q: "Clip-path not working in some browsers",
              a: "clip-path: circle() is supported in all modern browsers. For IE11 support, consider a fallback opacity transition.",
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
