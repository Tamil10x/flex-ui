"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { FadeOnScroll } from "@/components/flexui/fade-on-scroll";

const code = `import { FadeOnScroll } from "@/components/flexui/fade-on-scroll";

export function Demo() {
  return (
    <div className="space-y-8">
      <FadeOnScroll direction="up">
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
          <h3 className="text-lg font-bold text-white">Fade Up</h3>
          <p className="mt-2 text-sm text-zinc-400">
            This element fades in from below.
          </p>
        </div>
      </FadeOnScroll>
      <FadeOnScroll direction="left" delay={0.2}>
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
          <h3 className="text-lg font-bold text-white">Fade Left</h3>
          <p className="mt-2 text-sm text-zinc-400">
            This element slides in from the right.
          </p>
        </div>
      </FadeOnScroll>
      <FadeOnScroll direction="right" delay={0.4}>
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
          <h3 className="text-lg font-bold text-white">Fade Right</h3>
          <p className="mt-2 text-sm text-zinc-400">
            This element slides in from the left.
          </p>
        </div>
      </FadeOnScroll>
    </div>
  );
}`;

export function FadeOnScrollPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-6 p-8">
            <FadeOnScroll direction="up">
              <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
                <h3 className="text-lg font-bold text-white">Fade Up</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  This element fades in from below.
                </p>
              </div>
            </FadeOnScroll>
            <FadeOnScroll direction="left" delay={0.2}>
              <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
                <h3 className="text-lg font-bold text-white">Fade Left</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  This element slides in from the right.
                </p>
              </div>
            </FadeOnScroll>
            <FadeOnScroll direction="right" delay={0.4}>
              <div className="rounded-xl border border-white/[0.08] bg-zinc-900 p-6">
                <h3 className="text-lg font-bold text-white">Fade Right</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  This element slides in from the left.
                </p>
              </div>
            </FadeOnScroll>
          </div>
        }
        code={code}
        filename="fade-on-scroll-demo.tsx"
      />
    </div>
  );
}
