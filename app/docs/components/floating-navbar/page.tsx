import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { FloatingNavbarPlayground } from "./playground";
import { FloatingNavbarExamples } from "./examples";

export const metadata: Metadata = {
  title: "Floating Navbar — FlexUI",
  description:
    "A navbar that floats, shrinks, and gets a glassmorphic backdrop on scroll.",
};

const floatingNavbarSource = `"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// NavItem, FloatingNavbarProps interfaces
// Scroll-aware floating navbar with glassmorphic pill transition
// Full source: npx shadcn@latest add @flexui/floating-navbar`;

export default function FloatingNavbarDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Navigation
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          Floating Navbar
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          A navbar that starts full-width and transparent, then shrinks into a
          floating glassmorphic pill centered at the top on scroll. Hides on
          scroll-down, reappears on scroll-up.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <FloatingNavbarPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <FloatingNavbarExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/floating-navbar"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/floating-navbar.tsx
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
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={floatingNavbarSource}
                  filename="components/flexui/floating-navbar.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "~",
              label: "Spring Animations",
              desc: "Smooth spring-physics transitions for width, padding, and position changes as the navbar morphs between states.",
            },
            {
              icon: "\u25C8",
              label: "Glassmorphic Design",
              desc: "Translucent dark background with backdrop-blur, subtle border, and rounded-full pill shape on scroll.",
            },
            {
              icon: "\u2318",
              label: "Scroll-Aware",
              desc: "Detects scroll direction to hide on scroll-down and reveal on scroll-up. Threshold-based state switching.",
            },
            {
              icon: "\u2713",
              label: "Composable",
              desc: "Pass any logo element, nav items with optional icons, and custom className for full control.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { FloatingNavbar } from "@/components/flexui/floating-navbar";`}
            filename="Named exports"
          />
        </DocSubSection>

        <DocSubSection id="navbar-props" title="FloatingNavbar Props">
          <ApiTable
            rows={[
              {
                name: "items",
                type: "NavItem[]",
                default: "\u2014",
                description:
                  "Array of { label, href, icon? } objects for navigation links.",
                required: true,
              },
              {
                name: "logo",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Optional logo element displayed at the start.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional classes for the outer nav container.",
              },
            ]}
          />
        </DocSubSection>

        <DocSubSection id="navitem-type" title="NavItem">
          <ApiTable
            rows={[
              {
                name: "label",
                type: "string",
                default: "\u2014",
                description: "Display text for the nav link.",
                required: true,
              },
              {
                name: "href",
                type: "string",
                default: "\u2014",
                description: "Link destination.",
                required: true,
              },
              {
                name: "icon",
                type: "React.ReactNode",
                default: "\u2014",
                description: "Optional icon displayed before the label.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "Uses semantic <nav> element for screen reader navigation landmarks.",
              "Links use standard <a> elements for keyboard navigation support.",
              "Spring animations respect reduced-motion preferences via Framer Motion defaults.",
              "Passive scroll listener avoids blocking the main thread.",
            ].map((note, i) => (
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
