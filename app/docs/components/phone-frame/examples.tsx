"use client";

import React from "react";
import { PhoneFrame } from "@/components/flexui/phone-frame";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── App screen demo ────────────────────────────────────────────────────────
function AppScreenDemo() {
  return (
    <PhoneFrame>
      <div className="flex h-full flex-col bg-zinc-950 p-5 pt-8">
        <h3 className="text-sm font-semibold text-white">Messages</h3>
        <div className="mt-4 space-y-3">
          {[
            { name: "Alice", msg: "Hey! Are you coming?", time: "2m" },
            { name: "Bob", msg: "Check out this link", time: "15m" },
            { name: "Charlie", msg: "Meeting at 3pm", time: "1h" },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white">{item.name}</p>
                <p className="truncate text-[11px] text-zinc-500">{item.msg}</p>
              </div>
              <span className="text-[10px] text-zinc-600">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── No status bar ──────────────────────────────────────────────────────────
function NoStatusBarDemo() {
  return (
    <PhoneFrame showStatusBar={false}>
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/50 to-zinc-950 p-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20">
            <span className="text-2xl">&#9734;</span>
          </div>
          <p className="text-sm font-medium text-white">Full Screen Mode</p>
          <p className="mt-1 text-[11px] text-zinc-500">No status bar</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

const examples = [
  {
    id: "pf-app",
    title: "App Screen",
    tag: "Mockup",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    description: "A messaging app screen inside the phone frame.",
    preview: <AppScreenDemo />,
    code: `<PhoneFrame>
  <div className="flex h-full flex-col bg-zinc-950 p-5 pt-8">
    <h3 className="text-sm font-semibold text-white">Messages</h3>
    <div className="mt-4 space-y-3">
      {messages.map((item) => (
        <div key={item.name} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-blue-400">
            {item.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white">{item.name}</p>
            <p className="truncate text-[11px] text-zinc-500">{item.msg}</p>
          </div>
          <span className="text-[10px] text-zinc-600">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
</PhoneFrame>`,
    filename: "app-screen.tsx",
  },
  {
    id: "pf-nostatusbar",
    title: "No Status Bar",
    tag: "Minimal",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Phone frame without the status bar for full-screen content.",
    preview: <NoStatusBarDemo />,
    code: `<PhoneFrame showStatusBar={false}>
  <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-900/50 to-zinc-950 p-6">
    <div className="text-center">
      <p className="text-sm font-medium text-white">Full Screen Mode</p>
      <p className="mt-1 text-[11px] text-zinc-500">No status bar</p>
    </div>
  </div>
</PhoneFrame>`,
    filename: "no-status-bar.tsx",
  },
];

export function PhoneFrameExamples() {
  return <ShowcaseGrid items={examples} />;
}
