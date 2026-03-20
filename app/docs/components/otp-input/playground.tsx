"use client";

import React, { useState } from "react";
import { OTPInput } from "@/components/flexui/otp-input";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "length",
    label: "Length",
    control: {
      type: "select" as const,
      options: ["4", "5", "6", "8"],
    },
    defaultValue: "6",
  },
  {
    name: "accentColor",
    label: "Accent Color",
    control: {
      type: "select" as const,
      options: ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#ef4444"],
    },
    defaultValue: "#3b82f6",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.length !== "6") props.push(`length={${values.length}}`);
  if (values.accentColor !== "#3b82f6")
    props.push(`accentColor="${values.accentColor}"`);
  props.push(`onComplete={(code) => console.log("OTP:", code)}`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { OTPInput } from "@/components/flexui/otp-input";

export function Demo() {
  return (
    <OTPInput${propsStr}/>
  );
}`;
}

export function OTPInputPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    length: "6",
    accentColor: "#3b82f6",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <OTPInput
            key={`${values.length}-${values.accentColor}`}
            length={Number(values.length)}
            accentColor={values.accentColor as string}
            onComplete={(code) => console.log("OTP:", code)}
          />
        }
        code={generateCode(values)}
        filename="otp-input-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
