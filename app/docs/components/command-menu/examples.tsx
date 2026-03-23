"use client";

import React from "react";
import { CommandMenu } from "@/components/flexui/command-menu";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Search, Settings, FileText, LogOut, Plus, Moon, Sun, Palette } from "lucide-react";

const basicItems = [
  { label: "Search files...", shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Toggle theme", shortcut: "Ctrl+T", onSelect: () => {} },
  { label: "Open settings", shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "Sign out", onSelect: () => {} },
];

const iconItems = [
  { label: "Search files", icon: <Search className="h-4 w-4" />, shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Open settings", icon: <Settings className="h-4 w-4" />, shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "New document", icon: <FileText className="h-4 w-4" />, shortcut: "Ctrl+N", onSelect: () => {} },
  { label: "Sign out", icon: <LogOut className="h-4 w-4" />, onSelect: () => {} },
];

const creatorItems = [
  { label: "New project", icon: <Plus className="h-4 w-4" />, shortcut: "Ctrl+N", onSelect: () => {} },
  { label: "New document", icon: <FileText className="h-4 w-4" />, shortcut: "Ctrl+D", onSelect: () => {} },
  { label: "Toggle dark mode", icon: <Moon className="h-4 w-4" />, shortcut: "Ctrl+Shift+D", onSelect: () => {} },
  { label: "Toggle light mode", icon: <Sun className="h-4 w-4" />, onSelect: () => {} },
  { label: "Change theme", icon: <Palette className="h-4 w-4" />, onSelect: () => {} },
];

const examples = [
  {
    id: "cm-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A basic command menu with text labels and optional keyboard shortcuts.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-zinc-400">
          Press <kbd className="rounded border border-white/10 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+K</kbd> to open
        </p>
        <CommandMenu items={basicItems} placeholder="Type a command..." />
      </div>
    ),
    code: `const items = [
  { label: "Search files...", shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Toggle theme", shortcut: "Ctrl+T", onSelect: () => {} },
  { label: "Open settings", shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "Sign out", onSelect: () => {} },
];

<CommandMenu items={items} placeholder="Type a command..." />`,
    filename: "default.tsx",
  },
  {
    id: "cm-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Command items with Lucide icons for visual clarity.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-zinc-400">
          Press <kbd className="rounded border border-white/10 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+K</kbd> to open
        </p>
        <CommandMenu items={iconItems} placeholder="Search commands..." />
      </div>
    ),
    code: `import { Search, Settings, FileText, LogOut } from "lucide-react";

const items = [
  { label: "Search files", icon: <Search className="h-4 w-4" />, shortcut: "Ctrl+P", onSelect: () => {} },
  { label: "Open settings", icon: <Settings className="h-4 w-4" />, shortcut: "Ctrl+,", onSelect: () => {} },
  { label: "New document", icon: <FileText className="h-4 w-4" />, shortcut: "Ctrl+N", onSelect: () => {} },
  { label: "Sign out", icon: <LogOut className="h-4 w-4" />, onSelect: () => {} },
];

<CommandMenu items={items} placeholder="Search commands..." />`,
    filename: "with-icons.tsx",
  },
  {
    id: "cm-wide",
    title: "Wide Layout",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A wider command menu with custom placeholder for creator workflows.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-zinc-400">
          Press <kbd className="rounded border border-white/10 bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">Ctrl+K</kbd> to open
        </p>
        <CommandMenu items={creatorItems} placeholder="Search actions, pages, settings..." className="max-w-2xl" />
      </div>
    ),
    code: `<CommandMenu
  items={creatorItems}
  placeholder="Search actions, pages, settings..."
  className="max-w-2xl"
/>`,
    filename: "wide-layout.tsx",
  },
];

export function CommandMenuExamples() {
  return <ShowcaseGrid items={examples} />;
}
