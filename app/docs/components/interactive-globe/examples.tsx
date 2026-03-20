"use client";

import React from "react";
import { InteractiveGlobe } from "@/components/flexui/interactive-globe";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "ig-ocean",
    title: "Ocean Theme",
    tag: "Theme",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "The default deep ocean blue globe with cyan arc connections.",
    preview: (
      <div className="w-full">
        <InteractiveGlobe theme="ocean" showLabel={false} />
      </div>
    ),
    code: `<InteractiveGlobe theme="ocean" />`,
    filename: "ocean-theme.tsx",
  },
  {
    id: "ig-nebula",
    title: "Nebula Theme",
    tag: "Theme",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Deep purple nebula globe with pink and violet arc colors.",
    preview: (
      <div className="w-full">
        <InteractiveGlobe theme="nebula" showLabel={false} />
      </div>
    ),
    code: `<InteractiveGlobe theme="nebula" />`,
    filename: "nebula-theme.tsx",
  },
  {
    id: "ig-forest",
    title: "Forest Theme",
    tag: "Theme",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Lush green earth globe with emerald arc connections.",
    preview: (
      <div className="w-full">
        <InteractiveGlobe theme="forest" showLabel={false} />
      </div>
    ),
    code: `<InteractiveGlobe theme="forest" />`,
    filename: "forest-theme.tsx",
  },
  {
    id: "ig-sunset",
    title: "Sunset Theme",
    tag: "Theme",
    tagColor: "bg-orange-500/10 text-orange-400",
    description: "Warm sunset globe with orange, red, and amber arcs.",
    preview: (
      <div className="w-full">
        <InteractiveGlobe theme="sunset" showLabel={false} />
      </div>
    ),
    code: `<InteractiveGlobe theme="sunset" />`,
    filename: "sunset-theme.tsx",
  },
  {
    id: "ig-with-label",
    title: "With Label",
    tag: "Content",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Globe with heading and subtitle overlay.",
    span: "2" as const,
    preview: (
      <div className="w-full">
        <InteractiveGlobe
          theme="ocean"
          showLabel={true}
          heading="Global Data Network"
          subtitle="Connecting 195 countries with real-time encrypted links."
        />
      </div>
    ),
    code: `<InteractiveGlobe
  theme="ocean"
  showLabel={true}
  heading="Global Data Network"
  subtitle="Connecting 195 countries with real-time encrypted links."
/>`,
    filename: "with-label.tsx",
  },
];

export function InteractiveGlobeExamples() {
  return <ShowcaseGrid items={examples} />;
}
