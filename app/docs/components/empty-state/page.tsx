import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { EmptyStateExamples } from "./examples";
import { Eye, ImageIcon, MousePointerClick, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "EmptyState — FlexUI",
  description: "A placeholder component for empty views with icon, message, and optional action button.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">EmptyState</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A polished empty-state placeholder with an optional icon, descriptive text, and call-to-action button.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <EmptyStateExamples />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add empty-state`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { EmptyState } from "@/components/flexui/empty-state";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<EmptyState
  icon={<InboxIcon className="h-12 w-12" />}
  title="No messages yet"
  description="When you receive messages, they will appear here."
  action={{
    label: "Compose Message",
    onClick: () => console.log("compose"),
  }}
/>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "title", type: "string", default: "-", description: "The heading text for the empty state.", required: true },
          { name: "description", type: "string", default: "-", description: "A supporting description displayed below the title.", required: true },
          { name: "icon", type: "React.ReactNode", default: "-", description: "An optional icon rendered above the title." },
          { name: "action", type: "{ label: string; onClick: () => void }", default: "-", description: "Optional call-to-action button with label and click handler." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Eye className="h-4 w-4" />, label: "Scroll-Triggered Entrance", desc: "Fades and slides in with spring physics when the element enters the viewport." },
            { icon: <ImageIcon className="h-4 w-4" />, label: "Optional Icon Slot", desc: "Display any React node as an icon above the title to visually represent the empty state." },
            { icon: <MousePointerClick className="h-4 w-4" />, label: "Action Button", desc: "Built-in call-to-action button with hover scale animation to guide users to the next step." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Glassmorphic Container", desc: "Dashed border, blurred backdrop, and dark translucent background for a premium feel." },
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
        <DocSubSection id="no-action" title="Without Action Button">
          <CodeBlock code={`<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
/>`} filename="simple.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-icon" title="Custom Icon and Styling">
          <CodeBlock code={`<EmptyState
  icon={<FolderIcon className="h-16 w-16" />}
  title="No projects yet"
  description="Create your first project to get started."
  action={{ label: "New Project", onClick: () => console.log("create") }}
  className="min-h-[300px]"
/>`} filename="custom.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses semantic heading (h3) and paragraph elements so screen readers understand the content hierarchy.", "The action button is a native <button> element with visible text for full keyboard and assistive technology support.", "The entrance animation fires once and does not loop, avoiding repeated distractions for screen reader users."].map((note, i) => (
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
