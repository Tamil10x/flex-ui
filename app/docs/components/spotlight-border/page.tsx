import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { ComponentDemo } from "./demo";
import { SpotlightBorderExamples } from "./examples";
import { Magnet, Gauge, Palette, SunDim } from "lucide-react";

export const metadata: Metadata = {
  title: "Spotlight Border — FlexUI",
  description: "A container with a glowing border spotlight that follows the mouse cursor.",
};

export default function Page() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">Component</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Spotlight Border</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">A container with a radial-gradient border glow that smoothly follows the mouse cursor using spring physics. Perfect for feature cards and highlighted sections.</p>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <DocSection id="preview" title="Preview">
        <ComponentDemo />
      </DocSection>
      <DocSection id="examples" title="Examples">
        <SpotlightBorderExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <CodeBlock code={`npx flexui add spotlight-border`} filename="Terminal" />
        <div className="mt-4">
          <CodeBlock code={`import { SpotlightBorder } from "@/components/flexui/spotlight-border";`} filename="Import" language="tsx" />
        </div>
      </DocSection>
      <DocSection id="usage" title="Usage">
        <CodeBlock code={`<SpotlightBorder color="139,92,246">
  <h3 className="text-lg font-semibold text-white">Card Title</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Card description content goes here.
  </p>
</SpotlightBorder>`} filename="example.tsx" language="tsx" />
      </DocSection>
      <DocSection id="api-reference" title="API Reference">
        <ApiTable rows={[
          { name: "children", type: "React.ReactNode", default: "—", description: "Content inside the bordered container.", required: true },
          { name: "className", type: "string", default: "—", description: "Additional CSS classes for the outer wrapper." },
          { name: "color", type: "string", default: '"56,189,248"', description: "RGB values for the spotlight color (comma-separated, no spaces)." },
        ]} />
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: <Magnet className="h-4 w-4" />, label: "Spring-Based Tracking", desc: "Mouse position is smoothed with Framer Motion springs for fluid, non-jittery border glow." },
            { icon: <Gauge className="h-4 w-4" />, label: "Zero Re-Renders", desc: "Uses useMotionValue and useTransform to keep the gradient updated without triggering React re-renders." },
            { icon: <Palette className="h-4 w-4" />, label: "Customizable Color", desc: "Pass any RGB value string to change the spotlight border color to match your brand." },
            { icon: <SunDim className="h-4 w-4" />, label: "Fade In/Out", desc: "The border glow smoothly fades in on mouse enter and out on mouse leave via spring-animated opacity." },
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
        <DocSubSection id="custom-color" title="Custom Border Color">
          <CodeBlock code={`<SpotlightBorder color="139,92,246">
  <p className="text-white">Purple spotlight border</p>
</SpotlightBorder>`} filename="variant.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-content" title="Feature Card Layout">
          <CodeBlock code={`<SpotlightBorder color="16,185,129" className="max-w-sm">
  <h3 className="text-lg font-bold text-white">Feature</h3>
  <p className="mt-2 text-sm text-zinc-400">Description of the feature goes here.</p>
</SpotlightBorder>`} filename="styles.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The spotlight effect is purely decorative and does not affect content readability.", "All child content remains fully accessible to screen readers and keyboard navigation.", "The component uses pointer-events-none on the gradient overlay so interactive children remain clickable."].map((note, i) => (
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
