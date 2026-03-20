"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ParallaxScroll } from "@/components/flexui/parallax-scroll";

const code = `import { ParallaxScroll } from "@/components/flexui/parallax-scroll";

export function Demo() {
  return (
    <div className="h-[400px] overflow-hidden">
      <ParallaxScroll speed={0.5} direction="up">
        <div className="flex h-[600px] items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Parallax Content
          </h1>
        </div>
      </ParallaxScroll>
    </div>
  );
}`;

export function ParallaxScrollPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
            <ParallaxScroll speed={0.5} direction="up" className="h-full">
              <div className="flex h-[500px] items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    Parallax Scroll
                  </h2>
                  <p className="mt-2 text-zinc-400">
                    Scroll this section to see the parallax effect.
                  </p>
                </div>
              </div>
            </ParallaxScroll>
          </div>
        }
        code={code}
        filename="parallax-scroll-demo.tsx"
      />
    </div>
  );
}
