import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { SkeletonExamples } from "./examples";
import { Loader, Scaling, Circle, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Skeleton — FlexUI",
  description: "A lightweight skeleton placeholder for loading states with pulse animation.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Skeleton</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A lightweight placeholder with a pulse animation, used to represent loading content. Supports rectangular and circular shapes.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <SkeletonExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add skeleton`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { Skeleton } from "@/components/flexui/skeleton";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`{/* Avatar placeholder */}
<Skeleton width={48} height={48} rounded />

{/* Text line placeholders */}
<Skeleton width={180} height={14} />
<Skeleton width={240} height={14} />
<Skeleton width={120} height={14} />`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "width", type: "string | number", default: "—", description: "Width of the skeleton. Numbers are treated as pixels." },
          { name: "height", type: "string | number", default: "—", description: "Height of the skeleton. Numbers are treated as pixels." },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes." },
          { name: "rounded", type: "boolean", default: "false", description: "Uses rounded-full instead of rounded-md for circular shapes." },
        ]} />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Loader className="h-4 w-4" />, label: "Pulse Animation", desc: "Built-in Tailwind animate-pulse for a subtle shimmer loading indicator." },
            { icon: <Scaling className="h-4 w-4" />, label: "Flexible Sizing", desc: "Set width and height as numbers (pixels) or CSS strings for any dimension." },
            { icon: <Circle className="h-4 w-4" />, label: "Shape Variants", desc: "Toggle between rounded-md rectangles and rounded-full circles for avatars." },
            { icon: <Package className="h-4 w-4" />, label: "Zero Dependencies", desc: "Pure Tailwind CSS with no animation library or external dependencies required." },
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
        <DocSubSection id="card-skeleton" title="Card Skeleton Layout">
          <CodeBlock code={`<div className="flex items-center gap-3">
  <Skeleton width={40} height={40} rounded />
  <div className="space-y-2">
    <Skeleton width={160} height={12} />
    <Skeleton width={100} height={12} />
  </div>
</div>`} filename="card.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="full-width" title="Full-Width Skeleton">
          <CodeBlock code={`<Skeleton width="100%" height={200} className="rounded-xl" />`} filename="full-width.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Skeleton elements are purely visual placeholders with no semantic meaning.", "Consider adding aria-busy=\"true\" on the parent container while content is loading.", "Replace skeletons with actual content and set aria-busy=\"false\" once data loads."].map((note, i) => (
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
