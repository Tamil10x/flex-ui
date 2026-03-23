"use client";

import React, { useState } from "react";
import { GlitchTransition } from "@/components/flexui/glitch-transition";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "trigger",
    label: "Trigger",
    control: {
      type: "select" as const,
      options: ["hover", "click", "always", "manual"],
    },
    defaultValue: "hover",
  },
  {
    name: "intensity",
    label: "Intensity",
    control: { type: "range" as const, min: 0, max: 1, step: 0.1 },
    defaultValue: 0.5,
  },
  {
    name: "duration",
    label: "Duration (ms)",
    control: { type: "range" as const, min: 100, max: 1000, step: 50 },
    defaultValue: 300,
  },
  {
    name: "active",
    label: "Active (manual mode)",
    control: { type: "boolean" as const },
    defaultValue: false,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.trigger !== "hover") props.push(`trigger="${values.trigger}"`);
  if (values.intensity !== 0.5) props.push(`intensity={${values.intensity}}`);
  if (values.duration !== 300) props.push(`duration={${values.duration}}`);
  if (values.trigger === "manual" && values.active)
    props.push(`active={${values.active}}`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { GlitchTransition } from "@/components/flexui/glitch-transition";

export function Demo() {
  return (
    <GlitchTransition${propsStr}>
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-8 text-center">
        <h3 className="text-2xl font-bold text-white">Glitch Me</h3>
        <p className="mt-2 text-zinc-400">Hover or interact to trigger</p>
      </div>
    </GlitchTransition>
  );
}`;
}

export function GlitchTransitionPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    trigger: "hover",
    intensity: 0.5,
    duration: 300,
    active: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center py-12">
            <GlitchTransition
              trigger={values.trigger as "hover" | "click" | "always" | "manual"}
              intensity={values.intensity as number}
              duration={values.duration as number}
              active={values.active as boolean}
            >
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-8 text-center">
                <h3 className="text-2xl font-bold text-white">Glitch Me</h3>
                <p className="mt-2 text-zinc-400">
                  Hover or interact to trigger
                </p>
              </div>
            </GlitchTransition>
          </div>
        }
        code={generateCode(values)}
        filename="glitch-transition-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
