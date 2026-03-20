"use client";

import React, { useState } from "react";
import { GradientBorderButton } from "@/components/flexui/gradient-border-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Gradient Border",
  },
  {
    name: "speed",
    label: "Rotation Speed (s)",
    control: {
      type: "select" as const,
      options: ["2", "3", "5", "8"],
    },
    defaultValue: "3",
  },
  {
    name: "borderWidth",
    label: "Border Width",
    control: {
      type: "select" as const,
      options: ["1", "1.5", "2", "3"],
    },
    defaultValue: "1.5",
  },
  {
    name: "disabled",
    label: "Disabled",
    control: { type: "boolean" as const },
    defaultValue: false,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.speed !== "3") props.push(`speed={${values.speed}}`);
  if (values.borderWidth !== "1.5")
    props.push(`borderWidth={${values.borderWidth}}`);
  if (values.disabled) props.push("disabled");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { GradientBorderButton } from "@/components/flexui/gradient-border-button";

export function Demo() {
  return (
    <GradientBorderButton${propsStr}>
      ${values.label}
    </GradientBorderButton>
  );
}`;
}

export function GradientBorderButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Gradient Border",
    speed: "3",
    borderWidth: "1.5",
    disabled: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <GradientBorderButton
            speed={Number(values.speed)}
            borderWidth={Number(values.borderWidth)}
            disabled={values.disabled as boolean}
          >
            {values.label as string}
          </GradientBorderButton>
        }
        code={generateCode(values)}
        filename="gradient-border-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
