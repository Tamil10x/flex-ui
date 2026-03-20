"use client";

import React from "react";
import { Marquee } from "@/components/flexui/marquee";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const logos = ["Next.js", "React", "Tailwind", "Framer", "Vercel", "TypeScript"];

function LogoPill({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-300">
      {name}
    </div>
  );
}

const examples = [
  {
    id: "mq-default",
    title: "Default (Left)",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Default left-scrolling marquee with fade masks on both edges.",
    preview: (
      <Marquee>
        {logos.map((l) => (
          <LogoPill key={l} name={l} />
        ))}
      </Marquee>
    ),
    code: `<Marquee>
  {logos.map((l) => (
    <LogoPill key={l} name={l} />
  ))}
</Marquee>`,
    filename: "default.tsx",
  },
  {
    id: "mq-right",
    title: "Right Direction",
    tag: "Config",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Scroll in the opposite direction by setting direction to right.",
    preview: (
      <Marquee direction="right" speed={20}>
        {logos.map((l) => (
          <LogoPill key={l} name={l} />
        ))}
      </Marquee>
    ),
    code: `<Marquee direction="right" speed={20}>
  {logos.map((l) => (
    <LogoPill key={l} name={l} />
  ))}
</Marquee>`,
    filename: "right.tsx",
  },
  {
    id: "mq-pause",
    title: "Pause on Hover",
    tag: "Interact",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Hover over the marquee to pause the animation.",
    preview: (
      <Marquee pauseOnHover speed={25}>
        {logos.map((l) => (
          <LogoPill key={l} name={l} />
        ))}
      </Marquee>
    ),
    code: `<Marquee pauseOnHover speed={25}>
  {logos.map((l) => (
    <LogoPill key={l} name={l} />
  ))}
</Marquee>`,
    filename: "pause-on-hover.tsx",
  },
  {
    id: "mq-fast",
    title: "Fast Speed",
    tag: "Style",
    tagColor: "bg-green-500/10 text-green-400",
    description: "A faster marquee with a 10-second cycle.",
    preview: (
      <Marquee speed={10}>
        {logos.map((l) => (
          <LogoPill key={l} name={l} />
        ))}
      </Marquee>
    ),
    code: `<Marquee speed={10}>
  {logos.map((l) => (
    <LogoPill key={l} name={l} />
  ))}
</Marquee>`,
    filename: "fast.tsx",
  },
];

export function MarqueeExamples() {
  return <ShowcaseGrid items={examples} />;
}
