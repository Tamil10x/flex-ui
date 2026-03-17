import type { Metadata } from "next";
import { ComponentCards } from "./component-cards";

export const metadata: Metadata = {
  title: "Components — FlexUI",
  description: "Browse all FlexUI components.",
};

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-blue-400">Library</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Components
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Browse all FlexUI components. Each card shows a live preview —
          click to interact, then visit the full docs for code, API
          reference, and customization patterns.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <ComponentCards />
    </div>
  );
}
