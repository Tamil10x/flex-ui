import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { EvolutionHeroPlayground } from "./playground";

export const metadata: Metadata = {
  title: "Evolution Hero — FlexUI",
  description: "Cinematic hero section with AI-generated evolution scene background, parallax, holographic code overlays, and scanning effects.",
};

export default function EvolutionHeroDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-400">Tier 3</span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">Cinematic</span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">Evolution Hero</h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A cinematic hero section combining an AI-generated evolution scene background with live interactive overlays — mouse parallax, floating code snippets, scanning lines, gradient energy beams, and stage labels. Perfect for AI/SaaS landing pages.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <p className="mb-4 text-sm text-zinc-500">Move your mouse over the scene to see the parallax effect.</p>
        <EvolutionHeroPlayground />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="props" title="EvolutionHero Props">
          <ApiTable rows={[
            { name: "imageSrc", type: "string", default: "—", description: "URL of the background image (AI-generated evolution scene).", required: true },
            { name: "headline", type: "string", default: '"Evolution Unleashed"', description: "Main headline text with gradient styling." },
            { name: "subtitle", type: "string", default: '"From Primal Roots..."', description: "Subtitle text below headline." },
            { name: "stages", type: "string[]", default: '["Primal Ape", "Early Human", ...]', description: "Labels shown at the bottom of the scene." },
            { name: "children", type: "ReactNode", default: "—", description: "Content (CTAs, etc.) rendered in the center." },
            { name: "className", type: "string", default: "—", description: "Additional classes on the container." },
          ]} />
        </DocSubSection>
      </DocSection>

      <DocSection id="usage" title="How to Use">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 space-y-3 text-sm text-zinc-400">
          <p><strong className="text-zinc-200">Step 1:</strong> Generate your evolution scene image using Midjourney, DALL-E, or similar AI tool with this prompt:</p>
          <code className="block rounded-lg bg-zinc-900 p-3 text-xs text-cyan-400">
            A cinematic 3D evolution scene showing transformation from monkey to early human to modern programmer to glowing cyber skull with digital circuits, dark background with neon blue and purple lighting, WebGL style, ultra realistic, premium SaaS design
          </code>
          <p><strong className="text-zinc-200">Step 2:</strong> Save the image to <code className="text-violet-400">/public/evolution-scene.png</code></p>
          <p><strong className="text-zinc-200">Step 3:</strong> Use the component:</p>
          <code className="block rounded-lg bg-zinc-900 p-3 text-xs text-zinc-300">
            {`<EvolutionHero imageSrc="/evolution-scene.png" />`}
          </code>
        </div>
      </DocSection>

      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Mouse Parallax", desc: "Background image responds to cursor movement with spring-based parallax for depth." },
            { icon: "o", label: "Floating Code Snippets", desc: "Holographic code fragments float and pulse around the scene for a futuristic vibe." },
            { icon: "#", label: "Scanning Lines", desc: "Subtle animated scan lines overlay the scene for a cyberpunk/matrix aesthetic." },
            { icon: "+", label: "Energy Beams", desc: "SVG gradient lines animate across the bottom of the hero with path-drawing transitions." },
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
        <DocSubSection id="custom-headline" title="Custom Headline and Stages">
          <CodeBlock code={`<EvolutionHero
  imageSrc="/evolution-scene.png"
  headline="AI Revolution"
  subtitle="Transforming the future of development."
  stages={["Manual", "Automated", "Intelligent", "Autonomous"]}
/>`} filename="custom.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="with-cta" title="With CTA Children">
          <CodeBlock code={`<EvolutionHero imageSrc="/evolution-scene.png">
  <div className="flex gap-4">
    <a href="/signup" className="rounded-lg bg-white px-6 py-3 font-semibold text-black">
      Get Started
    </a>
    <a href="/demo" className="rounded-lg border border-white/20 px-6 py-3 text-white">
      Watch Demo
    </a>
  </div>
</EvolutionHero>`} filename="cta.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["The background image includes an alt attribute describing the scene for screen readers.", "All decorative overlays (code snippets, scan lines, energy beams) use pointer-events-none to avoid blocking interactions.", "Headline and subtitle use semantic h1 and p tags for proper document structure.", "Stage labels are rendered as visible text, accessible to all users regardless of visual capabilities."].map((note, i) => (
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
