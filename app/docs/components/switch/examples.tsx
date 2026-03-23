"use client";

import React, { useState } from "react";
import { Switch } from "@/components/flexui/switch";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function SwitchDefault() {
  const [on, setOn] = useState(false);
  return (
    <label className="flex items-center gap-3">
      <Switch checked={on} onChange={setOn} />
      <span className="text-sm text-zinc-300">{on ? "Enabled" : "Disabled"}</span>
    </label>
  );
}

function SwitchSizes() {
  const [sm, setSm] = useState(true);
  const [md, setMd] = useState(false);
  const [lg, setLg] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3">
        <Switch checked={sm} onChange={setSm} size="sm" />
        <span className="text-xs text-zinc-400">Small</span>
      </label>
      <label className="flex items-center gap-3">
        <Switch checked={md} onChange={setMd} size="md" />
        <span className="text-sm text-zinc-400">Medium</span>
      </label>
      <label className="flex items-center gap-3">
        <Switch checked={lg} onChange={setLg} size="lg" />
        <span className="text-sm text-zinc-400">Large</span>
      </label>
    </div>
  );
}

function SwitchDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3">
        <Switch checked={false} onChange={() => {}} disabled />
        <span className="text-sm text-zinc-500">Disabled Off</span>
      </label>
      <label className="flex items-center gap-3">
        <Switch checked={true} onChange={() => {}} disabled />
        <span className="text-sm text-zinc-500">Disabled On</span>
      </label>
    </div>
  );
}

function SwitchSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  return (
    <div className="w-full max-w-xs space-y-4 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">Notifications</span>
        <Switch checked={notifications} onChange={setNotifications} size="sm" />
      </div>
      <div className="h-px bg-white/[0.04]" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">Dark Mode</span>
        <Switch checked={darkMode} onChange={setDarkMode} size="sm" />
      </div>
      <div className="h-px bg-white/[0.04]" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-white">Analytics</span>
        <Switch checked={analytics} onChange={setAnalytics} size="sm" />
      </div>
    </div>
  );
}

const examples = [
  {
    id: "switch-default",
    title: "Default Toggle",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A basic switch toggle with a label showing its current state.",
    preview: <SwitchDefault />,
    code: `const [on, setOn] = useState(false);

<label className="flex items-center gap-3">
  <Switch checked={on} onChange={setOn} />
  <span>{on ? "Enabled" : "Disabled"}</span>
</label>`,
    filename: "default.tsx",
  },
  {
    id: "switch-sizes",
    title: "Size Variants",
    tag: "Size",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "All three size variants: small, medium, and large.",
    preview: <SwitchSizes />,
    code: `<Switch checked={sm} onChange={setSm} size="sm" />
<Switch checked={md} onChange={setMd} size="md" />
<Switch checked={lg} onChange={setLg} size="lg" />`,
    filename: "sizes.tsx",
  },
  {
    id: "switch-disabled",
    title: "Disabled State",
    tag: "State",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Switches in disabled state, both on and off.",
    preview: <SwitchDisabled />,
    code: `<Switch checked={false} onChange={() => {}} disabled />
<Switch checked={true} onChange={() => {}} disabled />`,
    filename: "disabled.tsx",
  },
  {
    id: "switch-settings",
    title: "Settings Panel",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A realistic settings panel layout with multiple switches.",
    preview: <SwitchSettings />,
    code: `const [notifications, setNotifications] = useState(true);
const [darkMode, setDarkMode] = useState(true);
const [analytics, setAnalytics] = useState(false);

<div className="space-y-4 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
  <div className="flex items-center justify-between">
    <span className="text-sm text-white">Notifications</span>
    <Switch checked={notifications} onChange={setNotifications} size="sm" />
  </div>
  <div className="flex items-center justify-between">
    <span className="text-sm text-white">Dark Mode</span>
    <Switch checked={darkMode} onChange={setDarkMode} size="sm" />
  </div>
  <div className="flex items-center justify-between">
    <span className="text-sm text-white">Analytics</span>
    <Switch checked={analytics} onChange={setAnalytics} size="sm" />
  </div>
</div>`,
    filename: "settings-panel.tsx",
  },
];

export function SwitchExamples() {
  return <ShowcaseGrid items={examples} />;
}
