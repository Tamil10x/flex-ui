import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ReflectiveCardPlayground } from "./playground";
import { ReflectiveCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "Reflective Card — FlexUI",
  description:
    "A webcam-powered metallic card with SVG displacement, specular lighting, 3D tilt, and holographic glass border.",
};

export default function ReflectiveCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">
            Tier 3
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Webcam + SVG Filters
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Reflective Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A metallic ID-card with a live webcam backdrop processed through SVG
          displacement filters, specular lighting, and frosted glass effects.
          Features 3D perspective tilt, holographic border, and a cinematic
          specular light sweep on hover.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ReflectiveCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <ReflectiveCardExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/reflective-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Requires{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                . No external CSS needed.
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component
                </p>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                  <code className="text-xs text-zinc-400">
                    components/flexui/reflective-card.tsx
                  </code>
                </div>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* API */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="ReflectiveCard Props">
          <ApiTable
            rows={[
              { name: "blurStrength", type: "number", default: "12", description: "Webcam backdrop blur in px." },
              { name: "displacementStrength", type: "number", default: "20", description: "SVG displacement map intensity." },
              { name: "noiseScale", type: "number", default: "1", description: "Turbulence noise frequency scale." },
              { name: "specularConstant", type: "number", default: "1.2", description: "SVG specular lighting intensity." },
              { name: "grayscale", type: "number", default: "1", description: "Desaturation: 0 = color, 1 = grayscale." },
              { name: "metalness", type: "number", default: "1", description: "Metallic sheen overlay opacity." },
              { name: "roughness", type: "number", default: "0.4", description: "Noise texture grain opacity." },
              { name: "overlayColor", type: "string", default: '"rgba(255,255,255,0.05)"', description: "Content area background tint." },
              { name: "color", type: "string", default: '"white"', description: "Text color." },
              { name: "children", type: "ReactNode", default: "ID card layout", description: "Custom content replaces the default layout." },
              { name: "className", type: "string", default: "—", description: "Additional classes on the container." },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* How it works */}
      <DocSection id="how-it-works" title="How It Works">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Webcam stream is captured via getUserMedia and rendered as a <video> element behind the content.",
              "CSS filter chain applies: saturate → contrast → brightness → blur → SVG displacement.",
              "SVG filter uses feTurbulence for noise, feDisplacementMap for ripple, and feSpecularLighting for metallic highlights.",
              "Fractal noise texture is overlaid with mix-blend-mode: overlay for grain.",
              "Diagonal metallic sheen gradient is also blend-mode: overlay for chrome-like highlights.",
              "On hover: cursor-tracking shine spotlight, specular light sweep, holographic glass border with conic-gradient, and 3D tilt (±14°).",
              "If webcam is unavailable, a dark gradient fallback is shown — the card still works.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-[10px] font-bold text-orange-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Troubleshooting */}
      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-3">
          {[
            {
              q: "Card is just dark / no webcam effect",
              a: "Browser needs camera permission. Check the address bar for a blocked camera icon. HTTPS is required on non-localhost.",
            },
            {
              q: "SVG filter looks broken in Safari",
              a: "Safari has limited SVG filter support. The card gracefully degrades — the blur and noise still work, but displacement may be less pronounced.",
            },
            {
              q: "Performance is laggy",
              a: "Lower blurStrength and displacementStrength. The SVG filter chain is CPU-intensive. On low-end devices, set blurStrength={6} and displacementStrength={10}.",
            },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/[0.06] bg-zinc-950/50 hover:border-white/[0.1]"
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
    </div>
  );
}
