import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "CommandMenu — FlexUI",
  description: "A keyboard-driven command palette for quick actions and navigation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">CommandMenu</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A keyboard-driven command palette for quick actions and navigation. Activated with Ctrl+K / Cmd+K.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add command-menu`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { CommandMenu } from "@/components/flexui/command-menu";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const items = [
  { label: "Search files...", shortcut: "Ctrl+P", onSelect: () => console.log("search") },
  { label: "Toggle theme", shortcut: "Ctrl+T", onSelect: () => console.log("theme") },
  { label: "Open settings", shortcut: "Ctrl+,", onSelect: () => console.log("settings") },
];

<CommandMenu items={items} placeholder="Type a command..." />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "items", type: "CommandItem[]", default: "-", description: "Array of command items with label, optional shortcut, icon, and onSelect handler.", required: true },
          { name: "placeholder", type: "string", default: '"Type a command..."', description: "Placeholder text for the search input." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the dialog container." },
        ]} />
      </DocSection>
    </div>
  );
}
