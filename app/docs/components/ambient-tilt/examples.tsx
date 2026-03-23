"use client";

import React from "react";
import { AmbientTilt } from "@/components/flexui/ambient-tilt";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "at-subtle",
    title: "Subtle Tilt",
    tag: "Default",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Default 8-degree tilt with standard spring settings.",
    preview: (
      <div className="flex items-center justify-center py-10">
        <AmbientTilt maxAngle={8}>
          <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/20 p-8 text-center">
            <h3 className="text-xl font-bold text-white">Subtle Tilt</h3>
            <p className="mt-1 text-sm text-zinc-400">Gentle 3D follow</p>
          </div>
        </AmbientTilt>
      </div>
    ),
    code: `<AmbientTilt maxAngle={8}>
  <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/20 p-8">
    <h3 className="text-xl font-bold text-white">Subtle Tilt</h3>
    <p className="mt-1 text-sm text-zinc-400">Gentle 3D follow</p>
  </div>
</AmbientTilt>`,
    filename: "subtle-tilt.tsx",
  },
  {
    id: "at-dramatic",
    title: "Dramatic Tilt",
    tag: "Custom",
    tagColor: "bg-purple-500/10 text-purple-400",
    description:
      "Exaggerated 16-degree tilt with low damping for dramatic effect.",
    preview: (
      <div className="flex items-center justify-center py-10">
        <AmbientTilt maxAngle={16} damping={10} stiffness={150}>
          <div className="rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 p-8 text-center">
            <h3 className="text-xl font-bold text-white">Dramatic</h3>
            <p className="mt-1 text-sm text-zinc-400">Big angle, low damping</p>
          </div>
        </AmbientTilt>
      </div>
    ),
    code: `<AmbientTilt maxAngle={16} damping={10} stiffness={150}>
  <div className="rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/20 p-8">
    <h3 className="text-xl font-bold text-white">Dramatic</h3>
    <p className="mt-1 text-sm text-zinc-400">Big angle, low damping</p>
  </div>
</AmbientTilt>`,
    filename: "dramatic-tilt.tsx",
  },
  {
    id: "at-smooth",
    title: "Smooth & Slow",
    tag: "Spring",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description:
      "High damping with low stiffness for a smooth, lagging follow effect.",
    preview: (
      <div className="flex items-center justify-center py-10">
        <AmbientTilt maxAngle={6} stiffness={40} damping={30}>
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 p-8 text-center">
            <h3 className="text-xl font-bold text-white">Smooth</h3>
            <p className="mt-1 text-sm text-zinc-400">Lazy spring follow</p>
          </div>
        </AmbientTilt>
      </div>
    ),
    code: `<AmbientTilt maxAngle={6} stiffness={40} damping={30}>
  <div className="rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 p-8">
    <h3 className="text-xl font-bold text-white">Smooth</h3>
    <p className="mt-1 text-sm text-zinc-400">Lazy spring follow</p>
  </div>
</AmbientTilt>`,
    filename: "smooth-tilt.tsx",
  },
];

export function AmbientTiltExamples() {
  return <ShowcaseGrid items={examples} />;
}
