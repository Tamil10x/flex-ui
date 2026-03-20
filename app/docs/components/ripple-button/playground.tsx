"use client";

import React, { useState } from "react";
import { RippleButton } from "@/components/flexui/ripple-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Ripple Button",
  },
  {
    name: "rippleColor",
    label: "Ripple Color",
    control: {
      type: "select" as const,
      options: [
        "rgba(255,255,255,0.3)",
        "rgba(139,92,246,0.4)",
        "rgba(56,189,248,0.4)",
        "rgba(236,72,153,0.4)",
      ],
    },
    defaultValue: "rgba(255,255,255,0.3)",
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
  if (values.rippleColor !== "rgba(255,255,255,0.3)")
    props.push(`rippleColor="${values.rippleColor}"`);
  if (values.disabled) props.push("disabled");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { RippleButton } from "@/components/flexui/ripple-button";

export function Demo() {
  return (
    <RippleButton${propsStr}>
      ${values.label}
    </RippleButton>
  );
}`;
}

export function RippleButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Ripple Button",
    rippleColor: "rgba(255,255,255,0.3)",
    disabled: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <RippleButton
            rippleColor={values.rippleColor as string}
            disabled={values.disabled as boolean}
          >
            {values.label as string}
          </RippleButton>
        }
        code={generateCode(values)}
        filename="ripple-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
