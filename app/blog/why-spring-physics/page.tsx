import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Spring Physics Makes UI Feel Alive",
  description:
    "Learn how spring-based animations create interfaces that feel responsive, natural, and delightful to interact with.",
};

export default function WhySpringPhysics() {
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
            Why Spring Physics Makes UI Feel Alive
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-zinc-500">
            <span>FlexUI Team</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <time dateTime="2026-03-08">March 8, 2026</time>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span>4 min read</span>
          </div>
        </header>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-zinc-300">
          <p>
            Most CSS transitions rely on fixed-duration easing curves — ease-in,
            ease-out, cubic-bezier. They get the job done, but they feel
            mechanical. A 300ms ease-out always takes exactly 300ms regardless
            of how far the element needs to travel or how fast the user is
            interacting. Spring physics flips this model: instead of specifying
            a duration, you define physical properties like stiffness, damping,
            and mass. The animation then resolves naturally based on its current
            velocity and distance to the target, which means it can overshoot,
            settle, and respond to interruption exactly the way a real physical
            object would.
          </p>

          <p>
            Framer Motion, the animation engine behind every FlexUI component,
            ships with a spring simulator that runs at 60fps on the main thread
            and can be offloaded to the GPU through transform-based properties.
            When you hover over a FlexUI Magnetic Button, the element does not
            slide linearly toward the cursor — it accelerates, overshoots
            slightly, and settles with a subtle bounce. That micro-interaction
            takes milliseconds but it communicates responsiveness and tactility
            that users feel even if they cannot articulate why.
          </p>

          <p>
            Interruptibility is where springs truly outshine duration-based
            animations. If a user hovers and then quickly moves away, a
            traditional ease-out transition has to finish or awkwardly reset.
            A spring animation reverses direction instantly, carrying over the
            current velocity so the reversal itself looks smooth. This makes
            rapid interactions — scrubbing through tabs, hovering across a grid
            of cards, dragging a slider — feel fluid instead of laggy. In FlexUI
            we tune each component with spring configs optimized for its
            interaction pattern: snappy springs for buttons, softer springs for
            page transitions, critically-damped springs for layout shifts.
          </p>

          <p>
            If you are still defaulting to linear or ease-out for every
            animation, try swapping a single transition to a spring with
            stiffness 200 and damping 20. The difference is immediate. Once you
            feel it, fixed-duration easing starts to look robotic. Spring
            physics is not a gimmick — it is the foundation for UI that feels
            alive, and it is baked into every component FlexUI ships.
          </p>
        </div>
      </article>
    </div>
  );
}
