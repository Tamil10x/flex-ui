import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { SearchSpotlightPlayground } from "./playground";
import { SearchSpotlightExamples } from "./examples";

export const metadata: Metadata = {
  title: "Search Spotlight — FlexUI",
  description:
    "A macOS Spotlight / Raycast-style search dialog with keyboard navigation, category grouping, and spring animations.",
};

const searchSpotlightSource = `"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  onSelect?: () => void;
}

interface SearchSpotlightProps {
  items: SearchItem[];
  placeholder?: string;
  className?: string;
  shortcut?: string;
}

// Full source: npx shadcn@latest add @flexui/search-spotlight`;

export default function SearchSpotlightDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Search Spotlight
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A macOS Spotlight / Raycast-style search dialog with keyboard
          navigation, category grouping, glass-morphic styling, and spring
          animations. Open with Cmd+K.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <DocSection id="preview" title="Preview">
        <SearchSpotlightPlayground />
      </DocSection>

      <DocSection id="examples" title="Examples">
        <SearchSpotlightExamples />
      </DocSection>

      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/search-spotlight"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>
                {" and "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  lucide-react
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/search-spotlight.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependencies
                </p>
                <CodeBlock
                  code="npm install framer-motion lucide-react"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={searchSpotlightSource}
                  filename="components/flexui/search-spotlight.tsx"
                  language="tsx"
                />
              </div>
            </div>
          }
        />
      </DocSection>

      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { SearchSpotlight } from "@/components/flexui/search-spotlight";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="search-spotlight-props" title="SearchSpotlightProps">
          <ApiTable
            rows={[
              {
                name: "items",
                type: "SearchItem[]",
                default: "\u2014",
                description:
                  "Array of searchable items with id, title, description, icon, category, and onSelect callback.",
                required: true,
              },
              {
                name: "placeholder",
                type: "string",
                default: '"Search..."',
                description: "Placeholder text for the search input.",
              },
              {
                name: "shortcut",
                type: "string",
                default: '"\u2318K"',
                description:
                  "Keyboard shortcut label displayed on the trigger button.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description:
                  "Additional Tailwind classes for the trigger button.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="search-item" title="SearchItem">
          <ApiTable
            rows={[
              {
                name: "id",
                type: "string",
                default: "\u2014",
                description: "Unique identifier for the item.",
                required: true,
              },
              {
                name: "title",
                type: "string",
                default: "\u2014",
                description: "Display title for the search result.",
                required: true,
              },
              {
                name: "description",
                type: "string",
                default: "\u2014",
                description: "Optional description shown below the title.",
              },
              {
                name: "icon",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Optional icon displayed to the left.",
              },
              {
                name: "category",
                type: "string",
                default: '"Results"',
                description: "Category for grouping results.",
              },
              {
                name: "onSelect",
                type: "() => void",
                default: "\u2014",
                description:
                  "Callback fired when the item is selected via click or Enter.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "~", label: "Keyboard Navigation", desc: "Arrow keys, Enter, and Escape for full keyboard-driven search and selection." },
            { icon: "o", label: "Category Grouping", desc: "Results are automatically grouped by category with section headers." },
            { icon: "#", label: "Cmd+K Shortcut", desc: "Built-in keyboard shortcut listener toggles the dialog open and closed." },
            { icon: "+", label: "Spring Animation", desc: "Dialog enters with scale and fade spring animation for a polished feel." },
          ].map((item) => (
            <div key={item.label} className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">{item.icon}</div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* Customization Patterns */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-items" title="Custom Items with Icons">
          <CodeBlock code={`<SearchSpotlight
  items={[
    { id: "1", title: "Dashboard", description: "View analytics", category: "Pages", icon: <LayoutIcon className="h-4 w-4" /> },
    { id: "2", title: "Settings", description: "Manage account", category: "Pages", icon: <GearIcon className="h-4 w-4" /> },
    { id: "3", title: "Dark Mode", category: "Actions", onSelect: () => toggleTheme() },
  ]}
  placeholder="Type a command..."
  shortcut="Ctrl+K"
/>`} filename="items.tsx" language="tsx" />
        </DocSubSection>
        <DocSubSection id="custom-trigger" title="Custom Trigger Styling">
          <CodeBlock code={`<SearchSpotlight
  items={items}
  className="w-64 rounded-full border-white/10"
  placeholder="Search docs..."
/>`} filename="trigger.tsx" language="tsx" />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {["Dialog uses role=\"dialog\" with aria-modal and aria-label for screen reader identification.", "Search input has aria-autocomplete=\"list\" and results use role=\"listbox\" with role=\"option\" items.", "Trigger button uses aria-haspopup=\"dialog\" and aria-expanded to communicate state.", "Active result is tracked with aria-selected and scrolled into view for keyboard users."].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
