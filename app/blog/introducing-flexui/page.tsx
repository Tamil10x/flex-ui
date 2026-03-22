import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Introducing FlexUI: 90+ Cinematic React Components",
  description:
    "We launched FlexUI to give developers a library of production-ready, cinematic components built with Framer Motion, Three.js, and Tailwind CSS.",
};

export default function IntroducingFlexUI() {
  return (
    <div className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/blog"
          className="text-sm text-zinc-500 transition-colors hover:text-white"
        >
          &larr; Back to Blog
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Introducing FlexUI: 90+ Cinematic React Components
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
            <span>FlexUI Team</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <time dateTime="2026-03-15">March 15, 2026</time>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>5 min read</span>
          </div>
        </header>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            After months of development and real-world testing across dozens of
            production applications, we are thrilled to release FlexUI — an
            open-source library of over 90 cinematic React components designed
            for developers who refuse to compromise between performance and
            visual impact. Every component ships with Framer Motion animations,
            Tailwind CSS styling, and full TypeScript support, so you can
            copy-paste them directly into any Next.js or React project and have
            them working in seconds.
          </p>

          <p>
            The library spans ten categories: animated buttons with magnetic
            fields and shimmer effects, glassmorphic cards with 3D hover
            transforms, text animations ranging from typewriter reveals to
            gradient scrambles, immersive background effects powered by WebGL
            shaders, scroll-driven parallax and sticky reveals, cursor-following
            blobs and spotlights, complete layout primitives like docks and
            floating panels, polished input components, full-page hero and
            pricing blocks, and data-visualization widgets including sparkline
            charts and progress rings. Each component is self-contained,
            tree-shakeable, and designed to integrate without pulling in a
            sprawling dependency graph.
          </p>

          <p>
            Performance was a first-class concern from the start. Every
            animation is GPU-accelerated through CSS transforms and opacity
            rather than layout-triggering properties. Three.js components like
            the Interactive Globe lazy-load their WebGL context and
            automatically fall back to a static image on devices that do not
            support hardware acceleration. We benchmark every component against
            Lighthouse budgets and ship bundle-size snapshots in CI so
            regressions are caught before they reach you.
          </p>

          <p>
            We built FlexUI because we kept rebuilding the same polished UI
            patterns across client projects — magnetic buttons, spotlight cards,
            aurora backgrounds — and wanted a single, well-tested source of
            truth. Now that source of truth is open to everyone. Browse the docs
            at flexui.dev, explore the interactive playground in FlexUI Studio,
            and start building interfaces that feel as good as they look.
          </p>
        </div>
      </article>
    </div>
  );
}
