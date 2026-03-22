"use client";

import React from "react";
import { Popover } from "@/components/flexui/popover";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Settings, User, HelpCircle } from "lucide-react";

const examples = [
  {
    id: "po-default",
    title: "Default Popover",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A basic bottom-positioned popover triggered by a button click.",
    preview: (
      <div className="flex items-center justify-center">
        <Popover
          trigger={
            <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
              Click to open
            </button>
          }
          side="bottom"
        >
          <div className="w-48">
            <p className="font-medium text-white">Hello!</p>
            <p className="mt-1 text-xs text-zinc-400">
              This is a basic popover that appears below the trigger.
            </p>
          </div>
        </Popover>
      </div>
    ),
    code: `<Popover
  trigger={
    <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
      Click to open
    </button>
  }
  side="bottom"
>
  <div className="w-48">
    <p className="font-medium text-white">Hello!</p>
    <p className="mt-1 text-xs text-zinc-400">
      This is a basic popover.
    </p>
  </div>
</Popover>`,
    filename: "default.tsx",
  },
  {
    id: "po-sides",
    title: "All Four Sides",
    tag: "Props",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Position the popover on any side of the trigger element.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {(["top", "bottom", "left", "right"] as const).map((side) => (
          <Popover
            key={side}
            trigger={
              <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 capitalize transition-colors hover:bg-white/[0.08]">
                {side}
              </button>
            }
            side={side}
          >
            <div className="w-40">
              <p className="text-xs font-medium text-white capitalize">{side} popover</p>
              <p className="mt-1 text-[10px] text-zinc-500">Positioned on the {side} side.</p>
            </div>
          </Popover>
        ))}
      </div>
    ),
    code: `<Popover trigger={<button>Top</button>} side="top">
  <p>Appears above the trigger</p>
</Popover>

<Popover trigger={<button>Bottom</button>} side="bottom">
  <p>Appears below the trigger</p>
</Popover>

<Popover trigger={<button>Left</button>} side="left">
  <p>Appears to the left</p>
</Popover>

<Popover trigger={<button>Right</button>} side="right">
  <p>Appears to the right</p>
</Popover>`,
    filename: "sides.tsx",
  },
  {
    id: "po-rich",
    title: "Rich Content",
    tag: "Compose",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Popovers can contain complex content like menus, forms, and user profiles.",
    preview: (
      <div className="flex items-center justify-center gap-6">
        <Popover
          trigger={
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
              <User className="h-4 w-4" /> Profile
            </button>
          }
          side="bottom"
        >
          <div className="w-56">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                JD
              </div>
              <div>
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-[10px] text-zinc-500">john@example.com</p>
              </div>
            </div>
            <div className="mt-3 border-t border-white/[0.06] pt-3 space-y-1">
              {["View Profile", "Settings", "Sign Out"].map((item) => (
                <div key={item} className="rounded-md px-2 py-1.5 text-xs text-zinc-400 cursor-pointer hover:bg-white/[0.04] hover:text-white transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Popover>
        <Popover
          trigger={
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
              <HelpCircle className="h-4 w-4" /> Help
            </button>
          }
          side="bottom"
        >
          <div className="w-52">
            <p className="text-sm font-medium text-white">Need help?</p>
            <p className="mt-1 text-xs text-zinc-400">
              Press <kbd className="rounded bg-zinc-800 px-1 py-0.5 text-[10px] font-mono">Esc</kbd> to close this popover.
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Click outside or press Escape to dismiss.
            </p>
          </div>
        </Popover>
      </div>
    ),
    code: `import { User, HelpCircle } from "lucide-react";

<Popover
  trigger={
    <button className="flex items-center gap-2">
      <User className="h-4 w-4" /> Profile
    </button>
  }
  side="bottom"
>
  <div className="w-56">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
      <div>
        <p className="text-sm font-medium text-white">John Doe</p>
        <p className="text-[10px] text-zinc-500">john@example.com</p>
      </div>
    </div>
    <div className="mt-3 border-t border-white/[0.06] pt-3 space-y-1">
      {["View Profile", "Settings", "Sign Out"].map((item) => (
        <div key={item} className="px-2 py-1.5 text-xs text-zinc-400 hover:text-white">
          {item}
        </div>
      ))}
    </div>
  </div>
</Popover>`,
    filename: "rich-content.tsx",
  },
  {
    id: "po-styled",
    title: "Custom Styled Panel",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Override the popover panel styles with custom classes.",
    preview: (
      <div className="flex items-center justify-center">
        <Popover
          trigger={
            <button className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300 transition-colors hover:bg-purple-500/20">
              <Settings className="h-4 w-4" /> Settings
            </button>
          }
          side="bottom"
          className="w-64 rounded-xl border-purple-500/20 bg-zinc-900 p-5"
        >
          <h3 className="font-bold text-white">Settings</h3>
          <p className="mt-2 text-xs text-zinc-400">
            Configure your preferences here. This panel uses custom border and background styling.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-md bg-purple-500/20 px-3 py-1 text-xs text-purple-300 hover:bg-purple-500/30 transition-colors">
              Save
            </button>
            <button className="rounded-md bg-white/[0.04] px-3 py-1 text-xs text-zinc-400 hover:bg-white/[0.08] transition-colors">
              Cancel
            </button>
          </div>
        </Popover>
      </div>
    ),
    code: `import { Settings } from "lucide-react";

<Popover
  trigger={
    <button className="flex items-center gap-2 border-purple-500/20 bg-purple-500/10 text-purple-300">
      <Settings className="h-4 w-4" /> Settings
    </button>
  }
  side="bottom"
  className="w-64 rounded-xl border-purple-500/20 bg-zinc-900 p-5"
>
  <h3 className="font-bold text-white">Settings</h3>
  <p className="mt-2 text-xs text-zinc-400">
    Configure your preferences here.
  </p>
  <div className="mt-3 flex gap-2">
    <button className="bg-purple-500/20 text-purple-300">Save</button>
    <button className="bg-white/[0.04] text-zinc-400">Cancel</button>
  </div>
</Popover>`,
    filename: "styled.tsx",
  },
];

export function PopoverExamples() {
  return <ShowcaseGrid items={examples} />;
}
