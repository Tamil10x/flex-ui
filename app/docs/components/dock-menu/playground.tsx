"use client";

import React, { useState } from "react";
import { DockMenu } from "@/components/flexui/dock-menu";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";
import {
  Home,
  Search,
  Mail,
  Calendar,
  Settings,
  Music,
} from "lucide-react";

const dockItems = [
  { icon: <Home className="h-full w-full" />, label: "Home" },
  { icon: <Search className="h-full w-full" />, label: "Search" },
  { icon: <Mail className="h-full w-full" />, label: "Mail" },
  { icon: <Calendar className="h-full w-full" />, label: "Calendar" },
  { icon: <Settings className="h-full w-full" />, label: "Settings" },
  { icon: <Music className="h-full w-full" />, label: "Music" },
];

const propDefs = [
  {
    name: "iconSize",
    label: "Icon Size",
    control: {
      type: "select" as const,
      options: ["36", "48", "56", "64"],
    },
    defaultValue: "48",
  },
  {
    name: "magnification",
    label: "Magnification",
    control: {
      type: "select" as const,
      options: ["56", "64", "72", "80", "96"],
    },
    defaultValue: "72",
  },
  {
    name: "distance",
    label: "Distance",
    control: {
      type: "select" as const,
      options: ["100", "150", "200", "250"],
    },
    defaultValue: "150",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.iconSize !== "48") props.push(`iconSize={${values.iconSize}}`);
  if (values.magnification !== "72")
    props.push(`magnification={${values.magnification}}`);
  if (values.distance !== "150") props.push(`distance={${values.distance}}`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { DockMenu } from "@/components/flexui/dock-menu";
import { Home, Search, Mail, Calendar, Settings, Music } from "lucide-react";

const items = [
  { icon: <Home className="h-full w-full" />, label: "Home" },
  { icon: <Search className="h-full w-full" />, label: "Search" },
  { icon: <Mail className="h-full w-full" />, label: "Mail" },
  { icon: <Calendar className="h-full w-full" />, label: "Calendar" },
  { icon: <Settings className="h-full w-full" />, label: "Settings" },
  { icon: <Music className="h-full w-full" />, label: "Music" },
];

export function Demo() {
  return <DockMenu items={items}${propsStr} />;
}`;
}

export function DockMenuPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    iconSize: "48",
    magnification: "72",
    distance: "150",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] items-end justify-center pb-6">
            <DockMenu
              items={dockItems}
              iconSize={Number(values.iconSize)}
              magnification={Number(values.magnification)}
              distance={Number(values.distance)}
            />
          </div>
        }
        code={generateCode(values)}
        filename="dock-menu-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
