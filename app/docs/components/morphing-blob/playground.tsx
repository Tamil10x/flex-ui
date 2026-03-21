"use client";

import React, { useState } from "react";
import { MorphingBlob } from "@/components/flexui/morphing-blob";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "color",
    label: "Color",
    control: {
      type: "select" as const,
      options: ["#8B5CF6", "#EC4899", "#10B981", "#F43F5E", "#6366F1"],
    },
    defaultValue: "#8B5CF6",
  },
  {
    name: "accentColor",
    label: "Accent Color",
    control: {
      type: "select" as const,
      options: ["#389CFD", "#F59E0B", "#06B6D4", "#8B5CF6", "#A855F7"],
    },
    defaultValue: "#389CFD",
  },
  {
    name: "size",
    label: "Size (px)",
    control: {
      type: "select" as const,
      options: ["120", "160", "200", "250", "300"],
    },
    defaultValue: "200",
  },
  {
    name: "speed",
    label: "Speed (seconds)",
    control: {
      type: "select" as const,
      options: ["2", "3", "4", "6", "8"],
    },
    defaultValue: "4",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.color !== "#8B5CF6") props.push(`color="${values.color}"`);
  if (values.accentColor !== "#389CFD")
    props.push(`accentColor="${values.accentColor}"`);
  if (String(values.size) !== "200") props.push(`size={${values.size}}`);
  if (String(values.speed) !== "4") props.push(`speed={${values.speed}}`);

  const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
  return `import { MorphingBlob } from "@/components/flexui/morphing-blob";

export function Demo() {
  return <MorphingBlob${propsStr} />;
}`;
}

export function MorphingBlobPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    color: "#8B5CF6",
    accentColor: "#389CFD",
    size: "200",
    speed: "4",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex items-center justify-center py-4">
            <MorphingBlob
              color={values.color as string}
              accentColor={values.accentColor as string}
              size={Number(values.size)}
              speed={Number(values.speed)}
            />
          </div>
        }
        code={generateCode(values)}
        filename="morphing-blob-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
