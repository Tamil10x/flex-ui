"use client";

import React, { useState } from "react";
import { ThreeHoverCard } from "@/components/flexui/three-hover-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "title",
    label: "Title",
    control: { type: "text" as const },
    defaultValue: "Interactive 3D",
  },
  {
    name: "description",
    label: "Description",
    control: { type: "text" as const },
    defaultValue: "Hover to reveal a cinematic glass border with 3D depth effect.",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.title !== "Interactive 3D")
    props.push(`  title="${values.title}"`);
  if (
    values.description !==
    "Hover to reveal a cinematic glass border with 3D depth effect."
  )
    props.push(`  description="${values.description}"`);

  const propsStr = props.length > 0 ? `\n${props.join("\n")}\n` : "";
  return `import { ThreeHoverCard } from "@/components/flexui/three-hover-card";

export function Demo() {
  return (
    <ThreeHoverCard${propsStr} />
  );
}`;
}

export function ThreeHoverCardPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    title: "Interactive 3D",
    description:
      "Hover to reveal a cinematic glass border with 3D depth effect.",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="w-full max-w-md">
            <ThreeHoverCard
              title={values.title as string}
              description={values.description as string}
            />
          </div>
        }
        code={generateCode(values)}
        filename="three-hover-card-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
