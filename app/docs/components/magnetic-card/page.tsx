import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { MagneticCardExamples } from "./examples";
import { Activity, Magnet, RotateCcw, Sliders } from "lucide-react";

export const metadata: Metadata = {
  title: "MagneticCard — FlexUI",
  description:
    "A card that follows the cursor with a magnetic spring animation for an interactive hover experience.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
          Component
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          MagneticCard
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A card that follows the cursor with a magnetic spring animation. The
          card subtly shifts toward the mouse position and springs back when the
          cursor leaves. Configurable attraction strength for different
          interaction intensities.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <MagneticCardExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock
          code={`npx flexui add magnetic-card`}
          filename="Terminal"
        />
        <div className="mt-4">
          <CodeBlock
            code={`import { MagneticCard } from "@/components/flexui/magnetic-card";`}
            filename="Import"
            language="tsx"
          />
        </div>
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock
          code={`<MagneticCard strength={30}>
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Hover to see the magnetic effect.
  </p>
</MagneticCard>`}
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
              description: "Content rendered inside the card.",
              required: true,
            },
            {
              name: "className",
              type: "string",
              default: "\u2014",
              description: "Additional CSS classes for the card container.",
            },
            {
              name: "strength",
              type: "number",
              default: "30",
              description:
                "Magnetic attraction strength in pixels. Higher values increase how far the card moves toward the cursor.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Activity className="h-4 w-4 text-blue-400" />, label: "Spring Physics", desc: "Card position is driven by useSpring with configurable stiffness and damping for natural motion." },
            { icon: <Magnet className="h-4 w-4 text-blue-400" />, label: "Cursor Attraction", desc: "Card shifts toward the mouse position proportionally within the container bounds." },
            { icon: <RotateCcw className="h-4 w-4 text-blue-400" />, label: "Snap-Back on Leave", desc: "Card smoothly springs back to its original position when the cursor exits." },
            { icon: <Sliders className="h-4 w-4 text-blue-400" />, label: "Configurable Strength", desc: "The strength prop controls maximum displacement in pixels for different interaction intensities." },
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
        <DocSubSection id="subtle-magnetic" title="Subtle Attraction">
          <CodeBlock code={`<MagneticCard strength={15}>
  <p className="text-white">Gentle magnetic pull.</p>
</MagneticCard>`} filename="subtle.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="strong-magnetic" title="Strong Attraction">
          <CodeBlock code={`<MagneticCard strength={60} className="bg-blue-950/50 border-blue-500/20">
  <p className="text-white">Strong pull toward cursor.</p>
</MagneticCard>`} filename="strong.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The magnetic displacement is purely visual via CSS transform and does not affect the document layout.", "All child content remains fully interactive and clickable at any displacement position.", "Motion uses useMotionValue which updates outside the React render cycle for smooth 60fps performance."].map((note, i) => (
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
