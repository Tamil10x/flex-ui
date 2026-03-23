import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { KbdExamples } from "./examples";
import { Square, Type, MousePointerClick, Puzzle } from "lucide-react";

export const metadata: Metadata = {
  title: "Kbd — FlexUI",
  description:
    "A keyboard key indicator component styled to resemble physical keys, with a subtle entrance animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Kbd
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A keyboard key indicator component styled to resemble physical
          keycaps. Features a subtle entrance animation and monospace font for
          documenting keyboard shortcuts and hotkeys.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <KbdExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add kbd`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock
            code={`import { Kbd } from "@/components/flexui/kbd";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<div className="flex items-center gap-2">
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>S</Kbd>
  <span className="ml-2 text-sm text-zinc-500">Save</span>
</div>`}
          filename="example.tsx"
          language="tsx"
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <ApiTable
          rows={[
            {
              name: "children",
              type: "ReactNode",
              default: "\u2014",
              description:
                "The key label text to display inside the keycap.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the kbd element.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Square className="h-4 w-4 text-blue-400" />, label: "Physical Keycap Style", desc: "Inset shadow and border simulate the look of a real keyboard key with depth." },
            { icon: <Type className="h-4 w-4 text-blue-400" />, label: "Monospace Font", desc: "Uses font-mono for consistent character width across key labels." },
            { icon: <MousePointerClick className="h-4 w-4 text-blue-400" />, label: "Entrance Animation", desc: "Fades in and slides up on viewport entry using Framer Motion whileInView." },
            { icon: <Puzzle className="h-4 w-4 text-blue-400" />, label: "Inline Composable", desc: "Renders as an inline-flex kbd element that fits naturally within text and shortcut displays." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="shortcut-combo" title="Keyboard Shortcut Combo">
          <CodeBlock code={`<div className="flex items-center gap-1.5">
  <Kbd>Cmd</Kbd>
  <span className="text-zinc-600">+</span>
  <Kbd>Shift</Kbd>
  <span className="text-zinc-600">+</span>
  <Kbd>P</Kbd>
</div>`} filename="combo.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-size" title="Custom Size">
          <CodeBlock code={`<Kbd className="h-8 min-w-[32px] px-2.5 text-xs">Enter</Kbd>`} filename="size.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Renders as a semantic <kbd> HTML element, which screen readers recognize as keyboard input.", "The viewport-triggered animation fires only once per element to avoid repeated distracting motion.", "Text content inside the keycap is fully readable by assistive technology."].map((note, i) => (
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
