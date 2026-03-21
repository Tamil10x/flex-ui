"use client";

import React, { useState } from "react";
import { LiquidButton } from "@/components/flexui/liquid-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Liquid Button",
  },
  {
    name: "color",
    label: "Color",
    control: {
      type: "select" as const,
      options: ["#8B5CF6", "#EC4899", "#10B981", "#38BDF8", "#F59E0B"],
    },
    defaultValue: "#8B5CF6",
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
  if (values.color !== "#8B5CF6") props.push(`color="${values.color}"`);
  if (values.disabled) props.push("disabled");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { LiquidButton } from "@/components/flexui/liquid-button";

export function Demo() {
  return (
    <LiquidButton${propsStr}>
      ${values.label}
    </LiquidButton>
  );
}`;
}

export function LiquidButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Liquid Button",
    color: "#8B5CF6",
    disabled: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <LiquidButton
            color={values.color as string}
            disabled={values.disabled as boolean}
          >
            {values.label as string}
          </LiquidButton>
        }
        code={generateCode(values)}
        filename="liquid-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
