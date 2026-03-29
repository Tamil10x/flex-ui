"use client";

import React from "react";
import { Breadcrumb } from "@/components/flexui/breadcrumb";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { ChevronRight, Dot } from "lucide-react";

const examples = [
  {
    id: "breadcrumb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard breadcrumb trail with slash separators and the last item as current page.",
    preview: (
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Docs", href: "#" },
          { label: "Components", href: "#" },
          { label: "Breadcrumb" },
        ]}
      />
    ),
    code: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumb" },
  ]}
/>`,
    filename: "default.tsx",
  },
  {
    id: "breadcrumb-chevron",
    title: "Chevron Separator",
    tag: "Prop",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom separator using a Lucide ChevronRight icon.",
    preview: (
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "#" },
          { label: "Projects", href: "#" },
          { label: "FlexUI", href: "#" },
          { label: "Settings" },
        ]}
        separator={<ChevronRight className="h-3.5 w-3.5 text-zinc-600" />}
      />
    ),
    code: `import { ChevronRight } from "lucide-react";

<Breadcrumb
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "FlexUI", href: "/projects/flexui" },
    { label: "Settings" },
  ]}
  separator={<ChevronRight className="h-3.5 w-3.5 text-zinc-600" />}
/>`,
    filename: "chevron.tsx",
  },
  {
    id: "breadcrumb-dot",
    title: "Dot Separator",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Minimal dot separator for a cleaner, softer navigation trail.",
    preview: (
      <Breadcrumb
        items={[
          { label: "Store", href: "#" },
          { label: "Electronics", href: "#" },
          { label: "Headphones" },
        ]}
        separator={<Dot className="h-4 w-4 text-zinc-600" />}
      />
    ),
    code: `import { Dot } from "lucide-react";

<Breadcrumb
  items={[
    { label: "Store", href: "/store" },
    { label: "Electronics", href: "/store/electronics" },
    { label: "Headphones" },
  ]}
  separator={<Dot className="h-4 w-4 text-zinc-600" />}
/>`,
    filename: "dot.tsx",
  },
  {
    id: "breadcrumb-with-icon",
    title: "With Home Icon",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Replace the Home text label with a Lucide Home icon for a compact look.",
    preview: (
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Account", href: "#" },
          { label: "Profile" },
        ]}
        separator={<ChevronRight className="h-3.5 w-3.5 text-zinc-600" />}
      />
    ),
    code: `import { ChevronRight } from "lucide-react";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Account", href: "/account" },
    { label: "Profile" },
  ]}
  separator={<ChevronRight className="h-3.5 w-3.5 text-zinc-600" />}
/>`,
    filename: "with-icon.tsx",
  },
];

export function BreadcrumbExamples() {
  return <ShowcaseGrid items={examples} />;
}
