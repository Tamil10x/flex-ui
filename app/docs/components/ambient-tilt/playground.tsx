"use client";

import React, { useState } from "react";
import { AmbientTilt } from "@/components/flexui/ambient-tilt";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "maxAngle",
    label: "Max Angle",
    control: { type: "range" as const, min: 1, max: 20, step: 1 },
    defaultValue: 8,
  },
  {
    name: "perspective",
    label: "Perspective",
    control: { type: "range" as const, min: 400, max: 2000, step: 100 },
    defaultValue: 1000,
  },
  {
    name: "stiffness",
    label: "Spring Stiffness",
    control: { type: "range" as const, min: 20, max: 300, step: 10 },
    defaultValue: 100,
  },
  {
    name: "damping",
    label: "Spring Damping",
    control: { type: "range" as const, min: 5, max: 50, step: 5 },
    defaultValue: 20,
  },
  {
    name: "useGyroscope",
    label: "Use Gyroscope",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.maxAngle !== 8) props.push(`maxAngle={${values.maxAngle}}`);
  if (values.perspective !== 1000) props.push(`perspective={${values.perspective}}`);
  if (values.stiffness !== 100) props.push(`stiffness={${values.stiffness}}`);
  if (values.damping !== 20) props.push(`damping={${values.damping}}`);
  if (values.useGyroscope === false) props.push("useGyroscope={false}");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { AmbientTilt } from "@/components/flexui/ambient-tilt";

export function Demo() {
  return (
    <AmbientTilt${propsStr}>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-10 text-center shadow-2xl">
        <h3 className="text-2xl font-bold text-white">Tilt Card</h3>
        <p className="mt-2 text-zinc-400">Move your cursor around the page</p>
      </div>
    </AmbientTilt>
  );
}`;
}

export function AmbientTiltPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    maxAngle: 8,
    perspective: 1000,
    stiffness: 100,
    damping: 20,
    useGyroscope: true,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center py-16">
            <AmbientTilt
              maxAngle={values.maxAngle as number}
              perspective={values.perspective as number}
              stiffness={values.stiffness as number}
              damping={values.damping as number}
              useGyroscope={values.useGyroscope as boolean}
            >
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-10 text-center shadow-2xl">
                <h3 className="text-2xl font-bold text-white">Tilt Card</h3>
                <p className="mt-2 text-zinc-400">
                  Move your cursor around the page
                </p>
              </div>
            </AmbientTilt>
          </div>
        }
        code={generateCode(values)}
        filename="ambient-tilt-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
