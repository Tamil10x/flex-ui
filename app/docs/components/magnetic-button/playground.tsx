"use client";

import React, { useState } from "react";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Hover Me",
  },
  {
    name: "magneticStrength",
    label: "Magnetic Strength",
    control: { type: "range" as const, min: 0, max: 1, step: 0.05 },
    defaultValue: 0.35,
  },
  {
    name: "spotlightSize",
    label: "Spotlight Size",
    control: { type: "range" as const, min: 50, max: 400, step: 10 },
    defaultValue: 200,
  },
  {
    name: "disabled",
    label: "Disabled",
    control: { type: "boolean" as const },
    defaultValue: false,
  },
  {
    name: "variant",
    label: "Variant",
    control: {
      type: "select" as const,
      options: ["default", "outline", "ghost"],
    },
    defaultValue: "default",
  },
];

const variantClasses: Record<string, string> = {
  default: "bg-white text-black",
  outline:
    "bg-transparent text-white border border-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  ghost:
    "bg-white/5 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
};

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.magneticStrength !== 0.35)
    props.push(`magneticStrength={${values.magneticStrength}}`);
  if (values.spotlightSize !== 200)
    props.push(`spotlightSize={${values.spotlightSize}}`);
  if (values.disabled) props.push("disabled");
  if (values.variant !== "default")
    props.push(`className="${variantClasses[values.variant as string]}"`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { MagneticButton } from "@/components/flexui/magnetic-button";

export function Demo() {
  return (
    <MagneticButton${propsStr}>
      ${values.label}
    </MagneticButton>
  );
}`;
}

export function MagneticButtonPlayground() {
  const [values, setValues] = useState<Record<string, string | number | boolean>>({
    label: "Hover Me",
    magneticStrength: 0.35,
    spotlightSize: 200,
    disabled: false,
    variant: "default",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <MagneticButton
            magneticStrength={values.magneticStrength as number}
            spotlightSize={values.spotlightSize as number}
            disabled={values.disabled as boolean}
            className={variantClasses[values.variant as string]}
          >
            {values.label as string}
          </MagneticButton>
        }
        code={generateCode(values)}
        filename="magnetic-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
