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
    </div>
  );
}
