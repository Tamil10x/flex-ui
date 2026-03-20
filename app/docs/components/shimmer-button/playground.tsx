"use client";

import React, { useState } from "react";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "label",
    label: "Button Label",
    control: { type: "text" as const },
    defaultValue: "Shimmer Button",
  },
  {
    name: "shimmerColor",
    label: "Shimmer Color",
    control: {
      type: "select" as const,
      options: ["#ffffff", "#c084fc", "#60a5fa", "#34d399", "#fbbf24"],
    },
    defaultValue: "#ffffff",
  },
  {
    name: "borderRadius",
    label: "Border Radius",
    control: {
      type: "select" as const,
      options: ["8px", "12px", "16px", "9999px"],
    },
    defaultValue: "12px",
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
      options: ["default", "gradient", "outline"],
    },
    defaultValue: "default",
  },
];

const variantClasses: Record<string, string> = {
  default: "",
  gradient:
    "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/20",
  outline:
    "bg-transparent border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
};

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.shimmerColor !== "#ffffff")
    props.push(`shimmerColor="${values.shimmerColor}"`);
  if (values.borderRadius !== "12px")
    props.push(`borderRadius="${values.borderRadius}"`);
  if (values.disabled) props.push("disabled");
  if (values.variant !== "default")
    props.push(`className="${variantClasses[values.variant as string]}"`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { ShimmerButton } from "@/components/flexui/shimmer-button";

export function Demo() {
  return (
    <ShimmerButton${propsStr}>
      ${values.label}
    </ShimmerButton>
  );
}`;
}

export function ShimmerButtonPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    label: "Shimmer Button",
    shimmerColor: "#ffffff",
    borderRadius: "12px",
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
          <ShimmerButton
            shimmerColor={values.shimmerColor as string}
            borderRadius={values.borderRadius as string}
            disabled={values.disabled as boolean}
            className={variantClasses[values.variant as string]}
          >
            {values.label as string}
          </ShimmerButton>
        }
        code={generateCode(values)}
        filename="shimmer-button-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
