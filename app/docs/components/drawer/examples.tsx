"use client";

import React, { useState } from "react";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Drawer } from "@/components/flexui/drawer";

// ─── Wrapper for interactive examples ────────────────────────────────────────

function DrawerDemo({
  side,
  label,
}: {
  side: "bottom" | "right" | "left";
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
      >
        Open {label}
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} side={side}>
        <h2 className="mb-3 text-lg font-bold text-white">{label}</h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          This drawer opens from the {side} with spring-animated transitions.
          Press ESC or click the overlay to dismiss.
        </p>
        <div className="mt-6">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </Drawer>
    </>
  );
}

const examples = [
  {
    id: "drawer-bottom",
    title: "Bottom Drawer",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Slides up from the bottom, ideal for mobile action sheets.",
    preview: <DrawerDemo side="bottom" label="Bottom Drawer" />,
    code: `<Drawer open={open} onClose={() => setOpen(false)} side="bottom">
  <h2>Bottom Drawer</h2>
  <p>Content here...</p>
</Drawer>`,
    filename: "bottom.tsx",
  },
  {
    id: "drawer-right",
    title: "Right Drawer",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Slides in from the right, great for detail panels or settings.",
    preview: <DrawerDemo side="right" label="Right Drawer" />,
    code: `<Drawer open={open} onClose={() => setOpen(false)} side="right">
  <h2>Right Drawer</h2>
  <p>Content here...</p>
</Drawer>`,
    filename: "right.tsx",
  },
  {
    id: "drawer-left",
    title: "Left Drawer",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Slides in from the left, commonly used for navigation menus.",
    preview: <DrawerDemo side="left" label="Left Drawer" />,
    code: `<Drawer open={open} onClose={() => setOpen(false)} side="left">
  <h2>Left Drawer</h2>
  <p>Content here...</p>
</Drawer>`,
    filename: "left.tsx",
  },
];

export function DrawerExamples() {
  return <ShowcaseGrid items={examples} />;
}
