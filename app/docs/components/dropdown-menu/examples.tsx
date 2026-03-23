"use client";

import React from "react";
import { DropdownMenu } from "@/components/flexui/dropdown-menu";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { User, Settings, Keyboard, LogOut, Edit, Trash2, Copy, ChevronDown } from "lucide-react";

const examples = [
  {
    id: "dm-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A basic dropdown menu with text-only items.",
    preview: (
      <DropdownMenu
        trigger={
          <button className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
            Open Menu
          </button>
        }
        items={[
          { label: "Edit profile", onClick: () => {} },
          { label: "Account settings", onClick: () => {} },
          { label: "Keyboard shortcuts", onClick: () => {} },
          { label: "Sign out", onClick: () => {} },
        ]}
      />
    ),
    code: `<DropdownMenu
  trigger={<button className="btn">Open Menu</button>}
  items={[
    { label: "Edit profile", onClick: () => {} },
    { label: "Account settings", onClick: () => {} },
    { label: "Keyboard shortcuts", onClick: () => {} },
    { label: "Sign out", onClick: () => {} },
  ]}
/>`,
    filename: "default.tsx",
  },
  {
    id: "dm-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Menu items with Lucide icons for visual context.",
    preview: (
      <DropdownMenu
        trigger={
          <button className="rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
            Account
          </button>
        }
        items={[
          { label: "Profile", icon: <User className="h-4 w-4" />, onClick: () => {} },
          { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
          { label: "Shortcuts", icon: <Keyboard className="h-4 w-4" />, onClick: () => {} },
          { label: "Sign out", icon: <LogOut className="h-4 w-4" />, onClick: () => {} },
        ]}
      />
    ),
    code: `import { User, Settings, Keyboard, LogOut } from "lucide-react";

<DropdownMenu
  trigger={<button className="btn">Account</button>}
  items={[
    { label: "Profile", icon: <User className="h-4 w-4" />, onClick: () => {} },
    { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
    { label: "Shortcuts", icon: <Keyboard className="h-4 w-4" />, onClick: () => {} },
    { label: "Sign out", icon: <LogOut className="h-4 w-4" />, onClick: () => {} },
  ]}
/>`,
    filename: "with-icons.tsx",
  },
  {
    id: "dm-actions",
    title: "Context Actions",
    tag: "Pattern",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Action-oriented menu for edit/copy/delete workflows.",
    preview: (
      <DropdownMenu
        trigger={
          <button className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white transition-colors hover:bg-zinc-800">
            Actions <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
        }
        items={[
          { label: "Edit", icon: <Edit className="h-4 w-4" />, onClick: () => {} },
          { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: () => {} },
          { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => {} },
        ]}
      />
    ),
    code: `import { Edit, Copy, Trash2, ChevronDown } from "lucide-react";

<DropdownMenu
  trigger={
    <button className="flex items-center gap-1 btn">
      Actions <ChevronDown className="h-3.5 w-3.5" />
    </button>
  }
  items={[
    { label: "Edit", icon: <Edit className="h-4 w-4" />, onClick: () => {} },
    { label: "Duplicate", icon: <Copy className="h-4 w-4" />, onClick: () => {} },
    { label: "Delete", icon: <Trash2 className="h-4 w-4" />, onClick: () => {} },
  ]}
/>`,
    filename: "context-actions.tsx",
  },
  {
    id: "dm-custom-trigger",
    title: "Avatar Trigger",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom avatar trigger element for a user menu pattern.",
    preview: (
      <DropdownMenu
        trigger={
          <div className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm text-white transition-colors hover:bg-zinc-800">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-bold text-white">
              JD
            </div>
            <span>John</span>
          </div>
        }
        items={[
          { label: "My Account", icon: <User className="h-4 w-4" />, onClick: () => {} },
          { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
          { label: "Sign Out", icon: <LogOut className="h-4 w-4" />, onClick: () => {} },
        ]}
        className="min-w-[200px]"
      />
    ),
    code: `<DropdownMenu
  trigger={
    <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1.5 text-sm text-white">
      <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-bold flex items-center justify-center">
        JD
      </div>
      <span>John</span>
    </div>
  }
  items={[
    { label: "My Account", icon: <User className="h-4 w-4" />, onClick: () => {} },
    { label: "Settings", icon: <Settings className="h-4 w-4" />, onClick: () => {} },
    { label: "Sign Out", icon: <LogOut className="h-4 w-4" />, onClick: () => {} },
  ]}
  className="min-w-[200px]"
/>`,
    filename: "avatar-trigger.tsx",
  },
];

export function DropdownMenuExamples() {
  return <ShowcaseGrid items={examples} />;
}
