import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { DropdownMenuExamples } from "./examples";
import { Keyboard, Zap, MousePointerClick, Image as ImageIcon } from "lucide-react";

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
      <DocSection id="examples" title="Examples">
        <DropdownMenuExamples />
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

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Keyboard className="h-4 w-4" />, label: "Keyboard Navigation", desc: "Full arrow key, Enter, and Escape support for navigating and selecting menu items." },
            { icon: <Zap className="h-4 w-4" />, label: "Spring Animation", desc: "Menu opens with a Framer Motion spring scale transition for a snappy, polished feel." },
            { icon: <MousePointerClick className="h-4 w-4" />, label: "Click Outside", desc: "Automatically dismisses when clicking outside the menu using a document mousedown listener." },
            { icon: <ImageIcon className="h-4 w-4" />, label: "Icon Support", desc: "Each menu item can include an optional icon rendered alongside the label." },
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
        <DocSubSection id="with-icons" title="Menu Items with Icons">
          <CodeBlock code={`<DropdownMenu
  trigger={<button className="rounded-lg bg-zinc-800 px-4 py-2 text-white">Menu</button>}
  items={[
    { label: "Profile", icon: <UserIcon className="h-4 w-4" />, onClick: () => {} },
    { label: "Settings", icon: <GearIcon className="h-4 w-4" />, onClick: () => {} },
    { label: "Logout", icon: <LogoutIcon className="h-4 w-4" />, onClick: () => {} },
  ]}
/>`} filename="icons.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-trigger" title="Custom Styled Trigger">
          <CodeBlock code={`<DropdownMenu
  trigger={
    <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-white">
      <img src="/avatar.png" className="h-6 w-6 rounded-full" />
      <span>John</span>
    </div>
  }
  items={[
    { label: "My Account", onClick: () => {} },
    { label: "Sign Out", onClick: () => {} },
  ]}
  className="min-w-[200px]"
/>`} filename="trigger.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The trigger uses role=\"button\" with aria-haspopup=\"menu\" and aria-expanded to communicate state to screen readers.", "The dropdown panel uses role=\"menu\" and each item uses role=\"menuitem\" per WAI-ARIA menu pattern.", "Arrow keys navigate items, Enter selects, and Escape closes the menu for full keyboard accessibility."].map((note, i) => (
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
