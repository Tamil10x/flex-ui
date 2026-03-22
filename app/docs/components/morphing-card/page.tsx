import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { MorphingCardPlayground } from "./playground";
import { MorphingCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Morphing Card — FlexUI",
  description:
    "A card that smoothly morphs between collapsed and expanded states using layout animation with spring physics.",
};

export default function MorphingCardDoc() {
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
          Morphing Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that smoothly morphs between collapsed and expanded states
          using layout animation. The container resizes with spring physics
          while content crossfades using AnimatePresence.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the card to toggle between collapsed and expanded states.
        </p>
        <MorphingCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Three patterns: music player, task list, and pricing card. Click
          each card to expand.
        </p>
        <MorphingCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/morphing-card"
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
                    components/flexui/morphing-card.tsx
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
        <DocSubSection id="morphing-card" title="MorphingCard">
          <ApiTable
            rows={[
              {
                name: "collapsed",
                type: "ReactNode",
                default: "\u2014",
                description: "Content shown in the collapsed state.",
                required: true,
              },
              {
                name: "expanded",
                type: "ReactNode",
                default: "\u2014",
                description: "Content shown in the expanded state.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes applied in both states.",
              },
              {
                name: "collapsedClassName",
                type: "string",
                default: "\u2014",
                description: "Classes applied only when collapsed.",
              },
              {
                name: "expandedClassName",
                type: "string",
                default: "\u2014",
                description: "Classes applied only when expanded.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="sizing" title="Controlling Size">
          <CodeBlock
            code={`{/* Use className for sizing */}
<MorphingCard
  collapsedClassName="w-64"
  expandedClassName="w-96"
  collapsed={<p>Compact view</p>}
  expanded={<p>Full content here...</p>}
/>

{/* Or use fixed widths */}
<MorphingCard
  className="max-w-sm"
  collapsed={<p>Compact view</p>}
  expanded={<p>Full content here...</p>}
/>`}
            filename="Sizing"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-styling" title="Custom Styling">
          <CodeBlock
            code={`{/* Override the glassmorphic style */}
<MorphingCard
  className="bg-blue-950/50 border border-blue-500/20"
  collapsed={<p>Blue theme collapsed</p>}
  expanded={<p>Blue theme expanded</p>}
/>`}
            filename="Custom styling"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Card jumps instead of morphing smoothly",
              a: "Ensure framer-motion v11+ is installed. The layout animation requires the layout prop to work correctly on the motion.div container.",
            },
            {
              q: "Content flickers during transition",
              a: "The component uses AnimatePresence with mode=\"wait\" for content crossfade. If content is very different in size, consider using similar padding in both states.",
            },
            {
              q: "Click events on buttons inside the card toggle it",
              a: "Use e.stopPropagation() on any interactive elements inside the collapsed or expanded content to prevent the card toggle from firing.",
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
            { icon: "~", label: "Layout Animation", desc: "Container resizes with spring physics using Framer Motion layout prop for smooth morphing." },
            { icon: "o", label: "Content Crossfade", desc: "Collapsed and expanded content crossfade with blur transitions via AnimatePresence." },
            { icon: "#", label: "Glass Highlight", desc: "Subtle gradient highlight on the top edge creates a glassmorphic depth effect." },
            { icon: "+", label: "Keyboard Support", desc: "Toggle via click, Enter, or Space key with proper role=\"button\" and tabIndex." },
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
        <DocSubSection id="width-control" title="Width-Controlled Morph">
          <CodeBlock code={`<MorphingCard
  collapsedClassName="w-64"
  expandedClassName="w-96"
  collapsed={<p className="text-white">Click to expand</p>}
  expanded={
    <div>
      <h3 className="text-white font-bold">Expanded View</h3>
      <p className="text-zinc-400 mt-2">Full content here...</p>
    </div>
  }
/>`} filename="width-control.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-theme" title="Custom Theme">
          <CodeBlock code={`<MorphingCard
  className="bg-blue-950/50 border border-blue-500/20"
  collapsed={<p className="text-blue-300">Blue themed collapsed</p>}
  expanded={<p className="text-blue-300">Blue themed expanded</p>}
/>`} filename="theme.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The card has role=\"button\" and tabIndex={0} for keyboard focus and activation.", "Enter and Space keys toggle the expanded state, matching native button behavior.", "Content crossfade uses blur transitions that complete quickly (200ms) to avoid disorienting motion.", "Use e.stopPropagation() on interactive elements inside to prevent accidental toggle."].map((note, i) => (
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
