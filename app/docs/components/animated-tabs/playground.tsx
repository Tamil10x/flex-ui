"use client";

import React, { useState } from "react";
import { AnimatedTabs } from "@/components/flexui/animated-tabs";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "variant",
    label: "Variant",
    control: {
      type: "select" as const,
      options: ["underline", "pill", "bordered"],
    },
    defaultValue: "underline",
  },
  {
    name: "defaultTab",
    label: "Default Tab",
    control: {
      type: "select" as const,
      options: ["tab1", "tab2", "tab3"],
    },
    defaultValue: "tab1",
  },
];

const sampleTabs = [
  {
    id: "tab1",
    label: "Overview",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 text-sm text-zinc-300">
        This is the overview panel. The indicator animates between tabs using spring physics.
      </div>
    ),
  },
  {
    id: "tab2",
    label: "Features",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 text-sm text-zinc-300">
        Three variants, AnimatePresence transitions, and configurable defaults.
      </div>
    ),
  },
  {
    id: "tab3",
    label: "Code",
    content: (
      <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 font-mono text-sm text-zinc-300">
        {"export function Demo() { return <AnimatedTabs tabs={tabs} />; }"}
      </div>
    ),
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.variant !== "underline")
    props.push(`variant="${values.variant}"`);
  if (values.defaultTab !== "tab1")
    props.push(`defaultTab="${values.defaultTab}"`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n  ` : "\n  ";
  return `import { AnimatedTabs } from "@/components/flexui/animated-tabs";

const tabs = [
  { id: "tab1", label: "Overview", content: <p>Overview</p> },
  { id: "tab2", label: "Features", content: <p>Features</p> },
  { id: "tab3", label: "Code", content: <p>Code</p> },
];

export function Demo() {
  return (
    <AnimatedTabs${propsStr}tabs={tabs}
    />
  );
}`;
}

export function AnimatedTabsPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    variant: "underline",
    defaultTab: "tab1",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <AnimatedTabs
            key={`${values.variant}-${values.defaultTab}`}
            tabs={sampleTabs}
            variant={values.variant as "underline" | "pill" | "bordered"}
            defaultTab={values.defaultTab as string}
          />
        }
        code={generateCode(values)}
        filename="animated-tabs-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
