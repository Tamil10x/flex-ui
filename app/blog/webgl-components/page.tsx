import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Building WebGL Components for React: Shaders, Globes & Beyond",
  description:
    "Three.js and React Three Fiber open up a world of 3D possibilities inside React apps. Learn how FlexUI ships GPU-accelerated components that stay accessible and performant.",
};

export default function WebGLComponents() {
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
            Building WebGL Components for React: Shaders, Globes & Beyond
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
            <span>FlexUI Team</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <time dateTime="2026-02-28">February 28, 2026</time>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>6 min read</span>
          </div>
        </header>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            The web platform has come a long way from flat rectangles and box
            shadows. With WebGL2 supported in every major browser and
            React Three Fiber providing a declarative React binding for Three.js,
            developers can now embed fully interactive 3D scenes inside their
            component trees without leaving the React mental model. FlexUI takes
            advantage of this by shipping several WebGL-powered components — the
            Interactive Globe, the Particle Field background, and the Mesh
            Gradient — that integrate as cleanly as a button or a card.
          </p>

          <p>
            The hardest part of shipping WebGL in a component library is not
            writing the shader code — it is managing the lifecycle. A Three.js
            renderer allocates GPU memory, creates a canvas context, and runs a
            render loop that can easily conflict with React&apos;s reconciliation
            cycle. FlexUI solves this by wrapping each WebGL component in a
            lazy-loaded boundary that only initializes the renderer when the
            component enters the viewport. When the component unmounts or leaves
            the viewport, we dispose of geometries, materials, and textures
            explicitly to avoid GPU memory leaks. On devices that report no
            WebGL support or low GPU tier via the gpu-detect heuristic, we fall
            back to a CSS-only approximation so the page still looks good.
          </p>

          <p>
            Shader authoring is another area where the developer experience
            matters. FlexUI uses GLSL fragment shaders for effects like the
            aurora background and the mesh gradient. Each shader is kept under
            50 lines, parameterized through uniforms that map to React props,
            and annotated with inline comments explaining the math. We publish
            the raw shader source alongside the component so advanced users can
            fork and customize without reverse-engineering minified code. For
            the Interactive Globe specifically, we use a custom sphere geometry
            with a dot-matrix texture, raycasting for hover detection, and
            arc geometries for connection lines — all driven by a simple array
            of latitude/longitude coordinates passed as props.
          </p>

          <p>
            Performance best practices for WebGL in React boil down to three
            rules: render only when visible, dispose aggressively on unmount,
            and keep draw calls low. FlexUI enforces all three by default. The
            result is components that look stunning on capable hardware and
            degrade gracefully everywhere else. If you have been hesitant to add
            3D to your React app because of complexity or performance concerns,
            FlexUI&apos;s WebGL components are designed to remove those barriers and
            let you ship immersive experiences with a single import.
          </p>
        </div>
      </article>
    </div>
  );
}
