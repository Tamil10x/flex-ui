import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ExpandableCardPlayground } from "./playground";
import { ExpandableCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Expandable Card — FlexUI",
  description:
    "A click-to-expand card with spring animations, blur/fade content presets, and staggered reveals.",
};

export default function ExpandableCardDoc() {
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
          Expandable Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A composable, click-to-expand card that smoothly resizes with spring
          physics. Hidden content animates in with blur, fade, or slide presets
          and optional staggered reveals.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Click the card to expand/collapse it.
        </p>
        <ExpandableCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Three real-world patterns: meeting scheduler, product showcase, and
          weather forecast. Click each card to expand.
        </p>
        <ExpandableCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/expandable-card"
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
                    components/flexui/expandable-card.tsx
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
        <DocSubSection id="expandable" title="Expandable (Root)">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "ReactNode | (({ isExpanded }) => ReactNode)",
                default: "—",
                description:
                  "Card content. Render prop gives access to isExpanded state.",
                required: true,
              },
              {
                name: "expandDirection",
                type: '"vertical" | "horizontal" | "both"',
                default: '"both"',
                description: "Which axis the card expands along.",
              },
              {
                name: "expandBehavior",
                type: '"replace" | "push"',
                default: '"replace"',
                description:
                  "Whether the card replaces its size or pushes siblings.",
              },
              {
                name: "onExpandStart",
                type: "() => void",
                default: "—",
                description: "Called when expansion begins.",
              },
              {
                name: "onExpandEnd",
                type: "() => void",
                default: "—",
                description: "Called when expansion animation completes.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="expandable-card" title="ExpandableCard">
          <ApiTable
            rows={[
              {
                name: "collapsedSize",
                type: "{ width: number; height: number }",
                default: "{ width: 320, height: 240 }",
                description: "Card dimensions when collapsed.",
              },
              {
                name: "expandedSize",
                type: "{ width: number; height: number }",
                default: "{ width: 420, height: 480 }",
                description: "Card dimensions when expanded.",
              },
              {
                name: "hoverToExpand",
                type: "boolean",
                default: "false",
                description: "Expand on hover instead of click.",
              },
              {
                name: "expandDelay",
                type: "number",
                default: "200",
                description: "Delay before hover-expand triggers (ms).",
              },
              {
                name: "collapseDelay",
                type: "number",
                default: "500",
                description: "Delay before hover-collapse triggers (ms).",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="expandable-content" title="ExpandableContent">
          <ApiTable
            rows={[
              {
                name: "preset",
                type: '"fade" | "blur-sm" | "blur-md" | "slide-up" | "slide-down"',
                default: '"fade"',
                description: "Animation preset for content reveal.",
              },
              {
                name: "stagger",
                type: "boolean",
                default: "false",
                description: "Enable staggered child animations.",
              },
              {
                name: "staggerChildren",
                type: "number",
                default: "0.1",
                description: "Delay between staggered children (seconds).",
              },
              {
                name: "keepMounted",
                type: "boolean",
                default: "false",
                description:
                  "Keep in DOM when collapsed (animates opacity/blur instead of unmounting).",
              },
              {
                name: "animateIn",
                type: "{ initial?: object; animate?: object; transition?: object }",
                default: "—",
                description: "Override the preset with custom animation values.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="presets" title="Content Presets">
          <CodeBlock
            code={`{/* Blur reveal */}
<ExpandableContent preset="blur-md">
  <p>This content blurs in when expanded.</p>
</ExpandableContent>

{/* Slide up with stagger */}
<ExpandableContent preset="slide-up" stagger staggerChildren={0.15}>
  <p>First item</p>
  <p>Second item (delayed)</p>
</ExpandableContent>

{/* Keep mounted — animates but stays in DOM */}
<ExpandableContent preset="blur-sm" keepMounted>
  <span>Always in DOM, blurs when collapsed</span>
</ExpandableContent>

{/* Custom spring animation */}
<ExpandableContent
  preset="fade"
  animateIn={{
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }}
>
  <p>Custom spring reveal</p>
</ExpandableContent>`}
            filename="Presets"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="hover-expand" title="Hover to Expand">
          <CodeBlock
            code={`<ExpandableCard
  hoverToExpand
  expandDelay={300}
  collapseDelay={600}
  collapsedSize={{ width: 280, height: 180 }}
  expandedSize={{ width: 400, height: 350 }}
>
  {/* Card content */}
</ExpandableCard>`}
            filename="Hover mode"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Card jumps instead of animating smoothly",
              a: 'Ensure framer-motion v11+. The spring animation needs layout animations to work. Check that the ExpandableCard has overflow-hidden.',
            },
            {
              q: "Content flickers on collapse",
              a: 'Use keepMounted={true} on ExpandableContent if the content should stay in the DOM. The default behavior unmounts content on collapse.',
            },
            {
              q: "Stagger doesn't work",
              a: 'The stagger prop only affects direct children timing. Wrap each staggered item in its own element inside ExpandableContent.',
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
