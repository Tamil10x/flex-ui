import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { RatingExamples } from "./examples";
import { Eye, Sparkles, EyeOff, Maximize2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Rating — FlexUI",
  description: "An interactive star rating component with hover effects and animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Rating</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">An interactive star rating component with hover previews and spring animations. Supports both read-only display and interactive selection.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <RatingExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add rating`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Rating } from "@/components/flexui/rating";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`const [value, setValue] = useState(3);

// Interactive
<Rating value={value} onChange={setValue} />

// Read-only
<Rating value={4} />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "value", type: "number", default: "—", description: "Current rating value.", required: true },
          { name: "onChange", type: "(value: number) => void", default: "—", description: "Callback when a star is clicked. Omit for read-only mode." },
          { name: "max", type: "number", default: "5", description: "Maximum number of stars." },
          { name: "size", type: "number", default: "24", description: "Size of each star in pixels." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the wrapper." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Eye className="h-4 w-4" />, label: "Hover Preview", desc: "Stars highlight on hover to preview the rating before clicking to confirm." },
            { icon: <Sparkles className="h-4 w-4" />, label: "Spring Animation", desc: "Framer Motion whileHover and whileTap for satisfying scale feedback on each star." },
            { icon: <EyeOff className="h-4 w-4" />, label: "Read-Only Mode", desc: "Omit the onChange prop to display a static rating without interaction." },
            { icon: <Maximize2 className="h-4 w-4" />, label: "Custom Star Count", desc: "Adjust the max prop to support any rating scale, not just the default 5 stars." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="large-rating" title="Large Stars">
          <CodeBlock code={`<Rating value={4} onChange={setValue} size={36} max={5} />`} filename="large.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="ten-star" title="10-Star Scale">
          <CodeBlock code={`<Rating value={7} onChange={setValue} max={10} size={20} />`} filename="ten-star.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="readonly" title="Read-Only Display">
          <CodeBlock code={`<Rating value={4.5} />`} filename="readonly.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Uses role=\"radiogroup\" with individual role=\"radio\" buttons for each star.", "Each star has aria-checked and aria-label attributes describing the star count.", "Non-interactive stars are disabled to prevent accidental activation in read-only mode."].map((note, i) => (
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
