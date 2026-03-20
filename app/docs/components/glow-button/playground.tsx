"use client";

import React, { useState } from "react";
import { GlowButton } from "@/components/flexui/glow-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Glow Button",
  },
  {
    name: "glowColor",
    label: "Glow Color",
    control: {
      type: "select" as const,
      options: [
        "rgba(56,189,248,0.5)",
        "rgba(139,92,246,0.5)",
        "rgba(236,72,153,0.5)",
        "rgba(16,185,129,0.5)",
        "rgba(234,179,8,0.5)",
      ],
    },
    defaultValue: "rgba(56,189,248,0.5)",
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
  if (values.glowColor !== "rgba(56,189,248,0.5)")
    props.push(`glowColor="${values.glowColor}"`);
  if (values.disabled) props.push("disabled");

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { GlowButton } from "@/components/flexui/glow-button";

export function Demo() {
  return (
    <GlowButton${propsStr}>
      ${values.label}
    </GlowButton>
  );
}`;
}

export function GlowButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Glow Button",
    glowColor: "rgba(56,189,248,0.5)",
    disabled: false,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <GlowButton
            glowColor={values.glowColor as string}
            disabled={values.disabled as boolean}
          >
            {values.label as string}
          </GlowButton>
        }
        code={generateCode(values)}
        filename="glow-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
