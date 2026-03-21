"use client";

import React, { useState } from "react";
import { SplitScreenReveal } from "@/components/flexui/split-screen-reveal";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { useState } from "react";
import { SplitScreenReveal } from "@/components/flexui/split-screen-reveal";

export default function SplitScreenRevealDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SplitScreenReveal
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      leftContent={
        <div className="text-center">
          <p className="text-2xl font-bold text-white">Discover</p>
          <p className="mt-1 text-sm text-zinc-400">Click to reveal</p>
        </div>
      }
      rightContent={
        <div className="text-center">
          <p className="text-2xl font-bold text-white">Explore</p>
          <p className="mt-1 text-sm text-zinc-400">Click to reveal</p>
        </div>
      }
      className="h-[300px] rounded-xl border border-white/[0.08]"
    >
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-600/20 via-zinc-900 to-cyan-600/20">
        <div className="text-center">
          <p className="text-3xl font-bold text-white">Hidden Content</p>
          <p className="mt-2 text-zinc-400">
            The panels split apart to reveal this content
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Close panels
          </button>
        </div>
      </div>
    </SplitScreenReveal>
  );
}`;

export function SplitScreenRevealPlayground() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="w-full">
            <SplitScreenReveal
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
              leftContent={
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">Discover</p>
                  <p className="mt-1 text-sm text-zinc-400">Click to reveal</p>
                </div>
              }
              rightContent={
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">Explore</p>
                  <p className="mt-1 text-sm text-zinc-400">Click to reveal</p>
                </div>
              }
              className="h-[300px] rounded-xl border border-white/[0.08]"
            >
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-600/20 via-zinc-900 to-cyan-600/20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    Hidden Content
                  </p>
                  <p className="mt-2 text-zinc-400">
                    The panels split apart to reveal this content
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                  >
                    Close panels
                  </button>
                </div>
              </div>
            </SplitScreenReveal>
          </div>
        }
        code={code}
        filename="split-screen-reveal-demo.tsx"
      />
    </div>
  );
}
