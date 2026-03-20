"use client";

import React, { useState } from "react";
import { SearchSpotlight } from "@/components/flexui/search-spotlight";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";
import {
  FileText,
  Settings,
  Users,
  Home,
  Zap,
  Bell,
} from "lucide-react";

const demoItems = [
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
  {
    id: "6",
    title: "Notifications",
    description: "View recent notifications",
    icon: <Bell className="h-4 w-4" />,
    category: "Actions",
  },
];

const propDefs = [
  {
    name: "placeholder",
    label: "Placeholder",
    control: { type: "text" as const },
    defaultValue: "Search...",
  },
  {
    name: "shortcut",
    label: "Shortcut Label",
    control: {
      type: "select" as const,
      options: ["\u2318K", "Ctrl+K", "/"],
    },
    defaultValue: "\u2318K",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  props.push("items={items}");
  if (values.placeholder !== "Search...")
    props.push(`placeholder="${values.placeholder}"`);
  if (values.shortcut !== "\u2318K")
    props.push(`shortcut="${values.shortcut}"`);

  return `import { SearchSpotlight } from "@/components/flexui/search-spotlight";

const items = [
  { id: "1", title: "Home", description: "Go to the homepage", category: "Pages" },
  { id: "2", title: "Settings", description: "Manage preferences", category: "Actions" },
];

export function Demo() {
  return <SearchSpotlight ${props.join(" ")} />;
}`;
}

export function SearchSpotlightPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    placeholder: "Search...",
    shortcut: "\u2318K",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center py-8">
            <SearchSpotlight
              items={demoItems}
              placeholder={values.placeholder as string}
              shortcut={values.shortcut as string}
            />
          </div>
        }
        code={generateCode(values)}
        filename="search-spotlight-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
