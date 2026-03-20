"use client";

import React, { useState } from "react";
import { ConfettiButton } from "@/components/flexui/confetti-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Confetti!",
  },
  {
    name: "particleCount",
    label: "Particle Count",
    control: {
      type: "select" as const,
      options: ["10", "20", "30", "40"],
    },
    defaultValue: "20",
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
  if (values.particleCount !== "20")
    props.push(`particleCount={${values.particleCount}}`);
  if (values.disabled) props.push("disabled");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { ConfettiButton } from "@/components/flexui/confetti-button";

export function Demo() {
  return (
    <ConfettiButton${propsStr}>
      ${values.label}
    </ConfettiButton>
  );
}`;
}

export function ConfettiButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Confetti!",
    particleCount: "20",
    disabled: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <ConfettiButton
            particleCount={Number(values.particleCount)}
            disabled={values.disabled as boolean}
          >
            {values.label as string}
          </ConfettiButton>
        }
        code={generateCode(values)}
        filename="confetti-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
