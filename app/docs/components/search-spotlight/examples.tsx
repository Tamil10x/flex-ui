"use client";

import React from "react";
import { SearchSpotlight } from "@/components/flexui/search-spotlight";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import {
  FileText,
  Settings,
  Users,
  Home,
  Zap,
  Bell,
  Palette,
  Code,
} from "lucide-react";

const basicItems = [
  {
    id: "1",
    title: "Home",
    description: "Go to the homepage",
    icon: <Home className="h-4 w-4" />,
    category: "Pages",
  },
  {
    id: "2",
    title: "Documentation",
    description: "Read the docs",
    icon: <FileText className="h-4 w-4" />,
    category: "Pages",
  },
  {
    id: "3",
    title: "Components",
    description: "Browse all components",
    icon: <Zap className="h-4 w-4" />,
    category: "Pages",
  },
  {
    id: "4",
    title: "Settings",
    description: "Manage your preferences",
    icon: <Settings className="h-4 w-4" />,
    category: "Actions",
  },
  {
    id: "5",
    title: "Team Members",
    description: "View and manage team",
    icon: <Users className="h-4 w-4" />,
    category: "Actions",
  },
];

const designItems = [
  {
    id: "d1",
    title: "Color Palette",
    description: "View brand colors",
    icon: <Palette className="h-4 w-4" />,
    category: "Design",
  },
  {
    id: "d2",
    title: "Typography",
    description: "Font styles and scales",
    icon: <FileText className="h-4 w-4" />,
    category: "Design",
  },
  {
    id: "d3",
    title: "Code Snippets",
    description: "Reusable code blocks",
    icon: <Code className="h-4 w-4" />,
    category: "Dev",
  },
  {
    id: "d4",
    title: "API Reference",
    description: "Endpoint documentation",
    icon: <Zap className="h-4 w-4" />,
    category: "Dev",
  },
  {
    id: "d5",
    title: "Notifications",
    description: "Alert preferences",
    icon: <Bell className="h-4 w-4" />,
    category: "Settings",
  },
];

const examples = [
  {
    id: "ss-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description:
      "A search spotlight with grouped results, keyboard navigation, and spring animations.",
    preview: (
      <div className="flex items-center justify-center py-4">
        <SearchSpotlight items={basicItems} />
      </div>
    ),
    code: `<SearchSpotlight
  items={[
    { id: "1", title: "Home", description: "Go to the homepage", icon: <Home />, category: "Pages" },
    { id: "2", title: "Settings", description: "Manage preferences", icon: <Settings />, category: "Actions" },
  ]}
/>`,
    filename: "default.tsx",
  },
  {
    id: "ss-custom-placeholder",
    title: "Custom Placeholder & Shortcut",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Custom placeholder text and shortcut display.",
    preview: (
      <div className="flex items-center justify-center py-4">
        <SearchSpotlight
          items={designItems}
          placeholder="Type a command..."
          shortcut="/"
        />
      </div>
    ),
    code: `<SearchSpotlight
  items={items}
  placeholder="Type a command..."
  shortcut="/"
/>`,
    filename: "custom.tsx",
  },
  {
    id: "ss-many-categories",
    title: "Multiple Categories",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Results organized into multiple category groups.",
    preview: (
      <div className="flex items-center justify-center py-4">
        <SearchSpotlight
          items={[...basicItems, ...designItems]}
          placeholder="Search everything..."
        />
      </div>
    ),
    code: `<SearchSpotlight
  items={[...pageItems, ...designItems, ...devItems]}
  placeholder="Search everything..."
/>`,
    filename: "categories.tsx",
  },
];

export function SearchSpotlightExamples() {
  return <ShowcaseGrid items={examples} />;
}
