import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { DirectionHoverExamples } from "./examples";
import { Compass, Zap, Layers, Box } from "lucide-react";

export const metadata: Metadata = {
  title: "DirectionHover — FlexUI",
  description: "A direction-aware hover card that reveals an overlay based on cursor entry direction.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">DirectionHover</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A direction-aware hover card that reveals an overlay sliding in from the direction the cursor enters.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <DirectionHoverExamples />
      </DocSection>
      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add direction-hover`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { DirectionHover } from "@/components/flexui/direction-hover";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<DirectionHover
  className="h-64 w-48"
  overlay={
    <div className="text-center text-white">
      <p className="text-lg font-semibold">Title</p>
      <p className="text-sm text-zinc-300">Description</p>
    </div>
  }
>
  <img src="/image.jpg" alt="Card" className="h-full w-full object-cover" />
</DirectionHover>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "children", type: "React.ReactNode", default: "-", description: "The base content displayed inside the card.", required: true },
          { name: "overlay", type: "React.ReactNode", default: "-", description: "Content displayed in the direction-aware hover overlay." },
          { name: "className", type: "string", default: "-", description: "Additional CSS classes for the container." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Compass className="h-4 w-4" />, label: "Direction Detection", desc: "Calculates cursor entry and exit direction from the card edges using pointer coordinates." },
            { icon: <Zap className="h-4 w-4" />, label: "Spring Animations", desc: "Overlay slides in and out with Framer Motion spring physics for a bouncy, natural feel." },
            { icon: <Layers className="h-4 w-4" />, label: "Custom Overlay", desc: "Render any React node as the overlay content — text, buttons, icons, or complex layouts." },
            { icon: <Box className="h-4 w-4" />, label: "Composable Children", desc: "Pass any content as children — images, cards, or nested components displayed as the base layer." },
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
        <DocSubSection id="image-card" title="Image Gallery Card">
          <CodeBlock code={`<DirectionHover
  className="h-80 w-60"
  overlay={
    <div className="text-center">
      <p className="text-lg font-bold text-white">View Project</p>
      <p className="text-sm text-zinc-300">Click to open</p>
    </div>
  }
>
  <img src="/project.jpg" alt="Project" className="h-full w-full object-cover" />
</DirectionHover>`} filename="gallery.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="styled-overlay" title="Styled Overlay with Actions">
          <CodeBlock code={`<DirectionHover
  className="h-64 w-full rounded-xl"
  overlay={
    <div className="flex flex-col items-center gap-3">
      <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
        Add to Cart
      </button>
    </div>
  }
>
  <div className="flex h-full items-center justify-center bg-zinc-900">
    <span className="text-zinc-500">Product Image</span>
  </div>
</DirectionHover>`} filename="actions.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The overlay is triggered only on hover, so ensure important content is not hidden exclusively in the overlay.", "Consider providing alternative access to overlay actions for keyboard and touch users.", "The backdrop-blur overlay maintains readable contrast for text overlaid on images."].map((note, i) => (
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
