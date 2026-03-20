import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { ThreeHoverCardPlayground } from "./playground";
import { ThreeHoverCardExamples } from "./examples";

export const metadata: Metadata = {
  title: "3D Hover Card — FlexUI",
  description:
    "A premium card that reveals a lazy-loaded Three.js 3D scene on hover.",
};

export default function ThreeHoverCardDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Tier 3
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            React Three Fiber
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          3D Hover Card
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A premium card component that reveals a live Three.js 3D scene with a
          rotating icosahedron, orbiting ring, and particle field on hover. The
          WebGL canvas is lazy-loaded for zero performance cost at rest.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <ThreeHoverCardPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <ThreeHoverCardExamples />
      </DocSection>

      {/* Installation — CLI / Manual tabs */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/three-hover-card"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Auto-installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  three
                </code>
                ,{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  @react-three/fiber
                </code>
                ,{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  @react-three/drei
                </code>
                , and{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                .
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
                  code="npm install three @react-three/fiber @react-three/drei framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy both component files
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <code className="text-xs text-zinc-400">
                        components/flexui/
                      </code>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      three-hover-card.tsx
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600">
                      Card wrapper + hover logic
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      <code className="text-xs text-zinc-400">
                        components/flexui/
                      </code>
                    </div>
                    <p className="mt-1 text-sm font-medium text-white">
                      three-hover-card-scene.tsx
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600">
                      3D scene (lazy-loaded)
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
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

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "0",
              label: "Zero-cost Lazy Load",
              desc: "Canvas mounts only on hover via React.lazy() — no JS or GPU cost at rest.",
            },
            {
              icon: "3D",
              label: "Mouse-reactive Scene",
              desc: "Icosahedron rotation responds to cursor position in real-time.",
            },
            {
              icon: "o",
              label: "Orbiting Ring + Particles",
              desc: "Animated torus ring and 40 floating particles for depth.",
            },
            {
              icon: "~",
              label: "Distort Material",
              desc: "MeshDistortMaterial creates organic, morphing metallic surfaces.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-[10px] font-bold text-cyan-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`// Main card wrapper
import { ThreeHoverCard } from "@/components/flexui/three-hover-card";

// 3D scene (internal, auto-lazy-loaded)
import { ThreeHoverCardScene } from "@/components/flexui/three-hover-card-scene";`}
            filename="Exports"
          />
        </DocSubSection>

        <DocSubSection id="props" title="ThreeHoverCard Props">
          <ApiTable
            rows={[
              {
                name: "title",
                type: "string",
                default: '"Interactive 3D"',
                description: "Heading text displayed on the card.",
              },
              {
                name: "description",
                type: "string",
                default: '"Hover to reveal..."',
                description: "Subtitle text below the heading.",
              },
              {
                name: "className",
                type: "string",
                default: "—",
                description:
                  "Additional Tailwind classes for the card container.",
              },
              {
                name: "children",
                type: "React.ReactNode",
                default: "—",
                description:
                  "Extra content rendered inside the card overlay.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="scene-props" title="ThreeHoverCardScene Props">
          <ApiTable
            rows={[
              {
                name: "mouse",
                type: "{ x: number; y: number }",
                default: "—",
                description:
                  "Normalized mouse position (-1 to 1) for mesh rotation.",
                required: true,
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-size" title="Change Card Dimensions">
          <CodeBlock
            code={`<ThreeHoverCard className="h-[500px] w-full max-w-lg" />`}
            filename="Custom size"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-content" title="Add Custom Content Overlay">
          <CodeBlock
            code={`<ThreeHoverCard title="Premium Plan" description="$99/month">
  <div className="mt-4">
    <button className="rounded-lg bg-purple-500 px-4 py-2 text-sm text-white">
      Subscribe
    </button>
  </div>
</ThreeHoverCard>`}
            filename="With CTA"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="swap-geometry" title="Replace the 3D Geometry">
          <p className="text-sm text-zinc-400">
            Edit{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              three-hover-card-scene.tsx
            </code>{" "}
            to swap geometry:
          </p>
          <CodeBlock
            code={`import { Torus, MeshDistortMaterial, Float } from "@react-three/drei";

<Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
  <Torus ref={meshRef} args={[1, 0.4, 32, 64]}>
    <MeshDistortMaterial
      color="#ff6b6b"
      roughness={0.2}
      metalness={0.8}
      distort={0.4}
      speed={3}
    />
  </Torus>
</Float>`}
            filename="three-hover-card-scene.tsx"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-material" title="Change Material & Colors">
          <CodeBlock
            code={`<MeshDistortMaterial
  color="#00ff88"     // Neon green
  roughness={0.1}     // More reflective
  metalness={1.0}     // Full metal
  distort={0.5}       // More warping
  speed={5}           // Faster distortion
/>`}
            filename="Material customization"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Canvas lazy-loaded via React.lazy() — zero JS cost until first hover.",
              "Conditionally rendered (mount/unmount), not CSS hidden — frees GPU memory at rest.",
              "React.Suspense caches the scene after first load for instant subsequent hovers.",
              "Single Icosahedron (4 subdivisions) + 40 point particles — minimal geometry.",
              "Uses dpr={[1,2]} for crisp rendering without overdraw on low-DPI screens.",
              "Add will-change: transform to parent for smoother compositing transitions.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "The 3D scene is decorative — screen readers skip <canvas>.",
              "Gradient scrim ensures WCAG AA contrast for overlay text.",
              "Add role='region' and aria-label for interactive card content.",
              "Consider onFocus to trigger scene for keyboard-only users.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
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
              q: "Canvas does not render / blank white area",
              a: "Ensure three, @react-three/fiber, and @react-three/drei are installed. Version mismatches cause silent failures. Run: npm ls three @react-three/fiber",
            },
            {
              q: '"Cannot use import statement outside a module"',
              a: "Three.js needs client-side bundling. Don't add it to serverExternalPackages in next.config.ts.",
            },
            {
              q: "3D scene flickers on fast hover/unhover",
              a: "Add a state flag to keep canvas mounted after first hover, or switch to CSS opacity.",
            },
            {
              q: "Performance drops with multiple cards",
              a: "Each canvas = separate WebGL context. Limit 1-2 active per viewport. Use IntersectionObserver.",
            },
            {
              q: "Distort material looks flat / no lighting",
              a: "MeshDistortMaterial needs lights. Check ambientLight + directionalLight are in scene.",
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
    </div>
  );
}
