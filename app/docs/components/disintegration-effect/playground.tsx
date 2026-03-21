"use client";

import React, { useState } from "react";
import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "particleCount",
    label: "Particle Count",
    control: {
      type: "select" as const,
      options: ["30", "50", "80", "120"],
    },
    defaultValue: "50",
  },
  {
    name: "duration",
    label: "Duration (ms)",
    control: {
      type: "select" as const,
      options: ["800", "1500", "2500"],
    },
    defaultValue: "1500",
  },
];

function generateCode(values: Record<string, string | number | boolean>, triggered: boolean) {
  const props: string[] = [];
  if (values.particleCount !== "50")
    props.push(`particleCount={${values.particleCount}}`);
  if (values.duration !== "1500")
    props.push(`duration={${values.duration}}`);
  props.push(`trigger={${triggered}}`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";

export function Demo() {
  const [snap, setSnap] = useState(false);

  return (
    <>
      <button onClick={() => setSnap(!snap)}>
        {snap ? "Reassemble" : "Snap!"}
      </button>
      <DisintegrationEffect${propsStr}>
        <div className="rounded-xl bg-zinc-800 p-6 text-white">
          I don't feel so good...
        </div>
      </DisintegrationEffect>
    </>
  );
}`;
}

export function DisintegrationEffectPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    particleCount: "50",
    duration: "1500",
  });
  const [triggered, setTriggered] = useState(false);

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex flex-col items-center gap-6">
            <DisintegrationEffect
              particleCount={Number(values.particleCount)}
              duration={Number(values.duration)}
              trigger={triggered}
              onComplete={() => {}}
            >
              <div className="rounded-xl border border-white/[0.08] bg-zinc-900 px-8 py-6 text-center">
                <p className="text-lg font-semibold text-white">
                  I don&apos;t feel so good...
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Click the button below
                </p>
              </div>
            </DisintegrationEffect>
            <button
              onClick={() => setTriggered((prev) => !prev)}
              className="rounded-lg border border-white/[0.08] bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/[0.15] hover:bg-zinc-800"
            >
              {triggered ? "Reassemble" : "Snap!"}
            </button>
          </div>
        }
        code={generateCode(values, triggered)}
        filename="disintegration-effect-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
