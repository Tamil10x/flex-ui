"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { RotatingText } from "@/components/flexui/rotating-text";

const code = `import { RotatingText } from "@/components/flexui/rotating-text";

export function Demo() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-4xl font-bold text-white">
        We make it{" "}
        <RotatingText
          words={["simple", "beautiful", "fast", "fun"]}
          duration={2000}
          className="text-blue-400"
        />
      </h2>
      <p className="text-lg text-zinc-400">
        Powered by{" "}
        <RotatingText
          words={["React", "Framer Motion", "Tailwind"]}
          duration={2500}
          direction="down"
          className="font-semibold text-white"
        />
      </p>
    </div>
  );
}`;

export function RotatingTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-6">
            <h2 className="text-4xl font-bold text-white">
              We make it{" "}
              <RotatingText
                words={["simple", "beautiful", "fast", "fun"]}
                duration={2000}
                className="text-blue-400"
              />
            </h2>
            <p className="text-lg text-zinc-400">
              Powered by{" "}
              <RotatingText
                words={["React", "Framer Motion", "Tailwind"]}
                duration={2500}
                direction="down"
                className="font-semibold text-white"
              />
            </p>
          </div>
        }
        code={code}
        filename="rotating-text-demo.tsx"
      />
    </div>
  );
}
