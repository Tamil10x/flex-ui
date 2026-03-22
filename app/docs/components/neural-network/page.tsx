import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { NeuralNetworkPlayground } from "./playground";
import { NeuralNetworkExamples } from "./examples";

export const metadata: Metadata = {
  title: "Neural Network — FlexUI",
  description:
    "An animated network graph where nodes pulse and connections fire like synapses. Canvas-based for performance.",
};

export default function NeuralNetworkDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Tier 2
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Canvas
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Neural Network
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated network graph where nodes pulse and connections fire like
          synapses. Canvas-based rendering for smooth performance with many
          nodes.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">
          Nodes drift slowly, connected by lines. Signals fire along
          connections and nodes pulse on arrival.
        </p>
        <NeuralNetworkPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <p className="mb-4 text-sm text-zinc-500">
          Default, dense cyan, and fast synapse configurations.
        </p>
        <NeuralNetworkExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/neural-network"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                No additional dependencies required — uses HTML Canvas API.
              </p>
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
                    components/flexui/neural-network.tsx
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
        <DocSubSection id="neural-network-props" title="NeuralNetwork">
          <ApiTable
            rows={[
              {
                name: "children",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Content rendered on top of the network.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional CSS classes for the container.",
              },
              {
                name: "nodeCount",
                type: "number",
                default: "30",
                description: "Number of nodes in the network.",
              },
              {
                name: "color",
                type: "string",
                default: '"#8B5CF6"',
                description: "CSS color for nodes and signal dots.",
              },
              {
                name: "connectionColor",
                type: "string",
                default: '"rgba(56,189,248,0.15)"',
                description: "CSS color for connection lines.",
              },
              {
                name: "speed",
                type: "number",
                default: "1",
                description:
                  "Animation speed multiplier. Controls drift speed and signal frequency.",
              },
              {
                name: "connectionDistance",
                type: "number",
                default: "150",
                description:
                  "Maximum pixel distance for nodes to be connected.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization">
        <DocSubSection id="configurations" title="Configurations">
          <CodeBlock
            code={`{/* Default — 30 violet nodes */}
<NeuralNetwork className="min-h-[400px] bg-black" />

{/* Dense cyan network */}
<NeuralNetwork
  nodeCount={50}
  color="#38BDF8"
  connectionColor="rgba(56,189,248,0.2)"
  connectionDistance={180}
/>

{/* Fast firing, fewer nodes */}
<NeuralNetwork nodeCount={20} speed={2.5} color="#F472B6" />`}
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
              q: "Canvas is blank",
              a: "Ensure the container has a defined height (e.g., min-h-[400px]). The canvas sizes itself to the container.",
            },
            {
              q: "Performance is poor with many nodes",
              a: "Canvas rendering is efficient, but keep nodeCount under 100 for best results. Connection checks are O(n^2).",
            },
            {
              q: "Signals are not visible",
              a: "Signals only travel along connections. Increase connectionDistance or nodeCount so more pairs are connected.",
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
            { icon: "~", label: "Canvas Rendering", desc: "All nodes, connections, and signals are drawn on HTML Canvas for smooth performance with many elements." },
            { icon: "o", label: "Signal Propagation", desc: "Glowing dots travel along connections between nodes, pulsing the destination node on arrival." },
            { icon: "#", label: "Distance-Based Connections", desc: "Lines appear between nodes within configurable connectionDistance and fade with distance." },
            { icon: "+", label: "Deterministic Layout", desc: "Seeded PRNG generates identical initial node positions on server and client for hydration safety." },
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
        <DocSubSection id="dense-cyan" title="Dense Cyan Network">
          <CodeBlock code={`<NeuralNetwork
  nodeCount={50}
  color="#38BDF8"
  connectionColor="rgba(56,189,248,0.2)"
  connectionDistance={180}
  className="min-h-[400px] bg-black rounded-xl"
/>`} filename="dense.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="fast-pink" title="Fast Pink Synapses">
          <CodeBlock code={`<NeuralNetwork
  nodeCount={20}
  speed={2.5}
  color="#F472B6"
  className="min-h-[300px] bg-zinc-950 rounded-xl"
/>`} filename="fast.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The canvas is pointer-events-none, so any child content rendered via children remains fully interactive.", "The animation is decorative and does not convey information; content should be provided via the children prop.", "Canvas handles DPI scaling via devicePixelRatio for crisp rendering on retina displays.", "Consider adding role=\"img\" and an aria-label to the container for screen reader context."].map((note, i) => (
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
