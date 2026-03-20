"use client";

import React from "react";
import { DockMenu } from "@/components/flexui/dock-menu";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import {
  Home,
  Search,
  Mail,
  Calendar,
  Settings,
  Music,
  MessageSquare,
  Camera,
  Bell,
} from "lucide-react";

const defaultItems = [
  { icon: <Home className="h-full w-full" />, label: "Home" },
  { icon: <Search className="h-full w-full" />, label: "Search" },
  { icon: <Mail className="h-full w-full" />, label: "Mail" },
  { icon: <Calendar className="h-full w-full" />, label: "Calendar" },
  { icon: <Settings className="h-full w-full" />, label: "Settings" },
  { icon: <Music className="h-full w-full" />, label: "Music" },
];

const examples = [
  {
    id: "dm-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description:
      "Six icons with default magnification. Hover across to see the macOS-style zoom effect.",
    preview: (
      <div className="flex min-h-[160px] items-end justify-center pb-4">
        <DockMenu items={defaultItems} />
      </div>
    ),
    code: `import { DockMenu } from "@/components/flexui/dock-menu";
import { Home, Search, Mail, Calendar, Settings, Music } from "lucide-react";

const items = [
  { icon: <Home className="h-full w-full" />, label: "Home" },
  { icon: <Search className="h-full w-full" />, label: "Search" },
  { icon: <Mail className="h-full w-full" />, label: "Mail" },
  { icon: <Calendar className="h-full w-full" />, label: "Calendar" },
  { icon: <Settings className="h-full w-full" />, label: "Settings" },
  { icon: <Music className="h-full w-full" />, label: "Music" },
];

<DockMenu items={items} />`,
    filename: "default.tsx",
  },
  {
    id: "dm-custom-sizes",
    title: "Custom Sizes",
    tag: "Config",
    tagColor: "bg-blue-500/10 text-blue-400",
    description:
      "Larger base icons (56px) with stronger magnification (96px) and wider effect radius.",
    preview: (
      <div className="flex min-h-[180px] items-end justify-center pb-4">
        <DockMenu
          items={defaultItems}
          iconSize={56}
          magnification={96}
          distance={200}
        />
      </div>
    ),
    code: `<DockMenu
  items={items}
  iconSize={56}
  magnification={96}
  distance={200}
/>`,
    filename: "custom-sizes.tsx",
  },
  {
    id: "dm-callbacks",
    title: "With Callbacks",
    tag: "Interactive",
    tagColor: "bg-amber-500/10 text-amber-400",
    description:
      "Each icon triggers an onClick callback. Open the console to see click events.",
    preview: (
      <div className="flex min-h-[160px] items-end justify-center pb-4">
        <DockMenu
          items={[
            {
              icon: <MessageSquare className="h-full w-full" />,
              label: "Messages",
              onClick: () => console.log("Messages clicked"),
            },
            {
              icon: <Camera className="h-full w-full" />,
              label: "Camera",
              onClick: () => console.log("Camera clicked"),
            },
            {
              icon: <Bell className="h-full w-full" />,
              label: "Notifications",
              onClick: () => console.log("Notifications clicked"),
            },
          ]}
        />
      </div>
    ),
    code: `<DockMenu
  items={[
    {
      icon: <MessageSquare className="h-full w-full" />,
      label: "Messages",
      onClick: () => console.log("Messages clicked"),
    },
    {
      icon: <Camera className="h-full w-full" />,
      label: "Camera",
      onClick: () => console.log("Camera clicked"),
    },
    {
      icon: <Bell className="h-full w-full" />,
      label: "Notifications",
      onClick: () => console.log("Notifications clicked"),
    },
  ]}
/>`,
    filename: "with-callbacks.tsx",
  },
];

export function DockMenuExamples() {
  return <ShowcaseGrid items={examples} />;
}
