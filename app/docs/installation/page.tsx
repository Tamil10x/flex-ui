import { CodeBlock } from "@/components/ui/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation — FlexUI",
  description: "Set up your project to use FlexUI components with shadcn CLI.",
};

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <p className="text-sm font-medium text-purple-400">Getting Started</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Installation
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          Get FlexUI components into your project in under a minute. No packages
          to install — just the shadcn CLI.
        </p>
      </div>

      <div className="h-px bg-white/[0.06]" />

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Prerequisites</h2>
        <p className="leading-relaxed text-zinc-400">
          Make sure your project has the following set up before adding FlexUI
          components:
        </p>
        <ul className="space-y-2 text-zinc-400">
          {[
            "Next.js 14+ with App Router",
            "Tailwind CSS v4 configured",
            "TypeScript enabled",
            "shadcn/ui initialized (npx shadcn@latest init)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Step 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Step 1: Initialize shadcn/ui
        </h2>
        <p className="leading-relaxed text-zinc-400">
          If you haven&apos;t already, initialize shadcn/ui in your project:
        </p>
        <CodeBlock code="npx shadcn@latest init" filename="Terminal" />
        <p className="leading-relaxed text-zinc-400">
          This creates a <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">components.json</code> file
          and sets up the <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">cn()</code> utility
          at <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-300">@/lib/utils</code>.
        </p>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Step 2: Add a FlexUI Component
        </h2>
        <p className="leading-relaxed text-zinc-400">
          Use the shadcn CLI with our registry namespace to add any component:
        </p>
        <CodeBlock
          code="npx shadcn@latest add @flexui/magnetic-button"
          filename="Terminal"
        />
        <p className="leading-relaxed text-zinc-400">
          This will:
        </p>
        <ul className="space-y-2 text-zinc-400">
          {[
            "Fetch the component JSON from the FlexUI registry",
            "Install required dependencies (e.g., framer-motion)",
            "Write the .tsx file into your components/flexui/ directory",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Step 3 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Step 3: Use the Component
        </h2>
        <p className="leading-relaxed text-zinc-400">
          Import and use the component just like any other React component:
        </p>
        <CodeBlock
          code={`import { MagneticButton } from "@/components/flexui/magnetic-button";

export default function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <MagneticButton className="px-8 py-4 text-lg">
        Get Started
      </MagneticButton>
    </section>
  );
}`}
          filename="app/page.tsx"
          language="tsx"
        />
      </section>

      {/* Available components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">
          Available Components
        </h2>
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-zinc-950">
                <th className="px-4 py-3 text-left font-medium text-zinc-400">
                  Component
                </th>
                <th className="px-4 py-3 text-left font-medium text-zinc-400">
                  Command
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-zinc-400 sm:table-cell">
                  Dependencies
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="px-4 py-3 font-medium text-white">
                  Magnetic Button
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs text-purple-400">
                    @flexui/magnetic-button
                  </code>
                </td>
                <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">
                  framer-motion
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">
                  3D Hover Card
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs text-purple-400">
                    @flexui/three-hover-card
                  </code>
                </td>
                <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">
                  three, @react-three/fiber, @react-three/drei
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Troubleshooting</h2>

        <div className="space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5">
            <h3 className="text-sm font-semibold text-white">
              &quot;Cannot find module @/lib/utils&quot;
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              Make sure you have initialized shadcn/ui with{" "}
              <code className="text-zinc-300">npx shadcn@latest init</code>. This
              creates the <code className="text-zinc-300">cn()</code> utility that
              all FlexUI components depend on.
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-zinc-950 p-5">
            <h3 className="text-sm font-semibold text-white">
              Three.js peer dependency warnings
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500">
              For WebGL components (Tier 3), the CLI automatically installs{" "}
              <code className="text-zinc-300">three</code>,{" "}
              <code className="text-zinc-300">@react-three/fiber</code>, and{" "}
              <code className="text-zinc-300">@react-three/drei</code>. If you see
              peer dependency warnings, run{" "}
              <code className="text-zinc-300">npm install</code> to resolve them.
            </p>
          </div>
        </div>
      </section>

      {/* Next step */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/[0.04] p-6">
        <p className="text-sm text-zinc-400">
          Want to integrate FlexUI with AI tools?{" "}
          <a
            href="/docs/mcp-server"
            className="font-medium text-purple-400 underline underline-offset-4 hover:text-purple-300"
          >
            Learn about our MCP Server →
          </a>
        </p>
      </div>
    </div>
  );
}
