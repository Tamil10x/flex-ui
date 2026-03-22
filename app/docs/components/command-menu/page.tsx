import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { CommandMenuExamples } from "./examples";
import { Keyboard, Filter, Zap, Tag } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <CommandMenuExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Keyboard className="h-4 w-4" />, label: "Keyboard First", desc: "Opens with Ctrl+K / Cmd+K and supports arrow keys, Enter to select, and Escape to close." },
            { icon: <Filter className="h-4 w-4" />, label: "Fuzzy Filtering", desc: "Type to instantly filter commands by label with case-insensitive matching." },
            { icon: <Zap className="h-4 w-4" />, label: "Spring Animation", desc: "Modal scales in and out with Framer Motion spring physics for a polished feel." },
            { icon: <Tag className="h-4 w-4" />, label: "Shortcut Badges", desc: "Optional keyboard shortcut hints displayed as styled kbd elements next to each command." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="with-icons" title="Commands with Icons">
          <CodeBlock code={`<CommandMenu
  items={[
    { label: "Search", icon: <SearchIcon />, shortcut: "Ctrl+F", onSelect: handleSearch },
    { label: "Settings", icon: <GearIcon />, shortcut: "Ctrl+,", onSelect: handleSettings },
  ]}
  placeholder="What do you need?"
/>`} filename="icons.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="wide-menu" title="Wide Command Menu">
          <CodeBlock code={`<CommandMenu
  items={commands}
  className="max-w-2xl"
  placeholder="Search actions, pages, settings..."
/>`} filename="wide.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The dialog uses role=\"dialog\" with aria-modal=\"true\" and aria-label=\"Command menu\" for screen readers.", "Command items use role=\"option\" with aria-selected to indicate the active item.", "The listbox pattern supports arrow key navigation and Enter to select, matching WAI-ARIA combobox conventions.", "Focus is trapped in the modal when open and returns to the trigger element on close."].map((note, i) => (
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
