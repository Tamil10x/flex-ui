import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";

export const metadata: Metadata = {
  title: "DropdownMenu — FlexUI",
  description: "An animated dropdown menu with keyboard navigation and customizable trigger.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">DropdownMenu</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An animated dropdown menu with keyboard navigation, click-outside dismissal, and a customizable trigger element.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add dropdown-menu`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { DropdownMenu } from "@/components/flexui/dropdown-menu";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<DropdownMenu
  trigger={<button className="btn">Options</button>}
  items={[
    { label: "Edit profile", onClick: () => console.log("edit") },
    { label: "Account settings", onClick: () => console.log("settings") },
    { label: "Sign out", onClick: () => console.log("signout") },
  ]}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "trigger", type: "React.ReactNode", default: "-", description: "The element that triggers the dropdown when clicked.", required: true },
          { name: "items", type: "DropdownItem[]", default: "-", description: "Array of menu items with label, optional onClick handler, and optional icon.", required: true },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the dropdown panel." },
        ]} />
      </DocSection>
    </div>
  );
}
