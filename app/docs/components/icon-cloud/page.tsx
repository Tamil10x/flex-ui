import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { IconCloudPlayground } from "./playground";
import { IconCloudExamples } from "./examples";

export const metadata: Metadata = {
  title: "Icon Cloud — FlexUI",
  description:
    "A 3D tag cloud of floating icons that rotate as a sphere with mouse interaction.",
};

export default function IconCloudDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            JS Animation
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Icon Cloud
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A 3D tag cloud of floating icons/images that rotate as a sphere.
          Drag to interact, icons scale and fade based on depth. Pure math
          + CSS transforms, no external libraries.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          A rotating sphere of Lucide icons. Drag to spin it around.
        </p>
        <IconCloudPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default cloud, small &amp; fast variant, and a large cloud with many icons.
        </p>
        <IconCloudExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/icon-cloud"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">No external dependencies.</p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Copy component file
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/icon-cloud.tsx
                  </code>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="icon-cloud-props" title="IconCloud">
          <ApiTable
            rows={[
              {
                name: "icons",
                type: "React.ReactNode[]",
                default: "\u2014",
                description: "Array of icon React nodes to distribute on the sphere.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "speed",
                type: "number",
                default: "0.5",
                description: "Auto-rotation speed multiplier.",
              },
              {
                name: "radius",
                type: "number",
                default: "200",
                description: "Radius of the sphere in pixels.",
              },
              {
                name: "iconSize",
                type: "number",
                default: "40",
                description: "Size of each icon container in pixels.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="icon-cloud-variants" title="Variants">
          <CodeBlock
            code={`{/* Default rotating cloud */}
<IconCloud icons={myIcons} />

{/* Smaller & faster */}
<IconCloud icons={myIcons} radius={120} speed={1.5} iconSize={30} />

{/* Large with bigger icons */}
<IconCloud icons={myIcons} radius={250} speed={0.3} iconSize={48} />

{/* Use images instead of icons */}
<IconCloud
  icons={[
    <img key="react" src="/logos/react.svg" className="h-8 w-8" />,
    <img key="next" src="/logos/next.svg" className="h-8 w-8" />,
  ]}
/>`}
            filename="Examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Icons not visible",
              a: "Make sure the icons array is non-empty and each icon has explicit sizing (e.g., h-8 w-8). The container auto-sizes based on radius and iconSize.",
            },
            {
              q: "Hydration mismatch",
              a: "The component uses a mounted guard to prevent hydration issues. If you still see errors, ensure icons are defined outside the render function or memoized.",
            },
            {
              q: "Drag feels sluggish",
              a: "Increase the speed prop or reduce the number of icons. Performance is best with 10-30 icons. For very large icon counts, consider reducing iconSize.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 transition-all duration-200 hover:border-white/[0.1]"
            >
              <div className="p-5 text-sm font-semibold text-white">
                {item.q}
              </div>
              <div className="border-t border-white/[0.04] px-5 py-4 text-sm text-zinc-500">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Fibonacci Sphere Layout", desc: "Icons are evenly distributed on a sphere using the golden ratio for optimal spacing." },
            { icon: "o", label: "Drag Interaction", desc: "Click and drag to spin the cloud with inertia-based momentum that decays smoothly." },
            { icon: "#", label: "Depth Perception", desc: "Icons scale from 40% to 100% and fade based on Z-depth for realistic 3D perspective." },
            { icon: "+", label: "Zero Dependencies", desc: "Pure math and CSS transforms with no WebGL or Three.js required." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection id="what-you-get-customization" title="Customization Patterns">
        <DocSubSection id="compact-cloud" title="Compact Fast Cloud">
          <CodeBlock code={`<IconCloud
  icons={myIcons}
  radius={120}
  speed={1.5}
  iconSize={30}
/>`} filename="compact.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="image-cloud" title="Image-Based Cloud">
          <CodeBlock code={`<IconCloud
  icons={[
    <img key="react" src="/logos/react.svg" className="h-8 w-8" />,
    <img key="next" src="/logos/next.svg" className="h-8 w-8" />,
    <img key="ts" src="/logos/typescript.svg" className="h-8 w-8" />,
  ]}
  radius={180}
  iconSize={40}
/>`} filename="images.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Icons are rendered as pointer-events-none spans, keeping the drag interaction on the container only.", "The component uses select-none and cursor-grab/grabbing to communicate interactivity visually.", "A mounted guard prevents hydration mismatches by deferring icon positioning to the client.", "Consider adding an aria-label to the container describing the icon cloud for screen readers."].map((note, i) => (
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
