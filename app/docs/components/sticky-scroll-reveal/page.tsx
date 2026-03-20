import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { StickyScrollRevealPlayground } from "./playground";
import { StickyScrollRevealExamples } from "./examples";

export const metadata: Metadata = {
  title: "Sticky Scroll Reveal — FlexUI",
  description:
    "A two-column scroll-linked layout with sticky content panel and text sections that fade in based on scroll progress.",
};

export default function StickyScrollRevealDoc() {
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
          Sticky Scroll Reveal
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A two-column scroll-linked layout. Text sections scroll naturally on the
          left while a glassmorphic sticky panel on the right updates its content
          based on which section is active.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Scroll through the sections to see the sticky panel update.
        </p>
        <StickyScrollRevealPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Feature showcases, timelines, and pricing tiers.
        </p>
        <StickyScrollRevealExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/sticky-scroll-reveal"
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
                    components/flexui/sticky-scroll-reveal.tsx
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
        <DocSubSection id="sticky-scroll-reveal-props" title="StickyScrollReveal">
          <ApiTable
            rows={[
              {
                name: "sections",
                type: "StickySection[]",
                default: "\u2014",
                description:
                  "Array of sections. Each has a title, description, and optional content ReactNode for the sticky panel.",
                required: true,
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the outer container.",
              },
            ]}
          />
        </DocSubSection>
        <DocSubSection id="sticky-section-type" title="StickySection">
          <ApiTable
            rows={[
              {
                name: "title",
                type: "string",
                default: "\u2014",
                description: "Section heading text.",
                required: true,
              },
              {
                name: "description",
                type: "string",
                default: "\u2014",
                description: "Section body text.",
                required: true,
              },
              {
                name: "content",
                type: "React.ReactNode",
                default: "\u2014",
                description:
                  "Custom content to display in the sticky panel when this section is active.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="custom-content" title="Custom Panel Content">
          <CodeBlock
            code={`const sections = [
  {
    title: "Feature One",
    description: "Description of the feature.",
    content: (
      <div className="flex items-center justify-center h-full">
        <img src="/feature-1.png" alt="Feature" className="rounded-xl" />
      </div>
    ),
  },
  {
    title: "Feature Two",
    description: "Another feature description.",
    // No content — uses default placeholder
  },
];

<StickyScrollReveal sections={sections} />`}
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
              q: "Sticky panel not visible",
              a: "The sticky panel only appears on large screens (lg breakpoint). On smaller screens, only the text column is shown.",
            },
            {
              q: "Sections don't transition smoothly",
              a: "Ensure the container has enough scroll height. The component sets minHeight based on the number of sections (100vh per section).",
            },
            {
              q: "Custom content overflows the panel",
              a: "Keep content within reasonable dimensions or add overflow-hidden / overflow-auto to your custom content wrapper.",
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
