"use client";

import React, { useState } from "react";
import { InteractiveGlobe } from "@/components/flexui/interactive-globe";
import type { GlobeTheme } from "@/components/flexui/interactive-globe";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "theme",
    label: "Theme",
    control: {
      type: "select" as const,
      options: ["ocean", "nebula", "forest", "sunset"],
    },
    defaultValue: "ocean",
  },
  {
    name: "heading",
    label: "Heading",
    control: { type: "text" as const },
    defaultValue: "Connected Worldwide",
  },
  {
    name: "subtitle",
    label: "Subtitle",
    control: { type: "text" as const },
    defaultValue: "Real-time data flows across the globe with live animated arcs.",
  },
  {
    name: "showLabel",
    label: "Show Label",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
  {
    name: "arcTime",
    label: "Arc Duration (ms)",
    control: { type: "range" as const, min: 500, max: 3000, step: 100 },
    defaultValue: 1000,
  },
  {
    name: "autoRotateSpeed",
    label: "Rotation Speed",
    control: { type: "range" as const, min: 0.1, max: 2, step: 0.1 },
    defaultValue: 0.5,
  },
  {
    name: "atmosphereAltitude",
    label: "Atmosphere Altitude",
    control: { type: "range" as const, min: 0, max: 0.5, step: 0.01 },
    defaultValue: 0.1,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.theme !== "ocean") props.push(`theme="${values.theme}"`);
  if (values.heading !== "Connected Worldwide")
    props.push(`heading="${values.heading}"`);
  if (
    values.subtitle !==
    "Real-time data flows across the globe with live animated arcs."
  )
    props.push(`subtitle="${values.subtitle}"`);
  if (values.showLabel === false) props.push("showLabel={false}");
  if (values.arcTime !== 1000) props.push(`arcTime={${values.arcTime}}`);
  if (values.autoRotateSpeed !== 0.5)
    props.push(`autoRotateSpeed={${values.autoRotateSpeed}}`);
  if (values.atmosphereAltitude !== 0.1)
    props.push(`atmosphereAltitude={${values.atmosphereAltitude}}`);

  const propsStr =
    props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
  return `import { InteractiveGlobe } from "@/components/flexui/interactive-globe";

export function Demo() {
  return (
    <InteractiveGlobe${propsStr}/>
  );
}`;
}

export function InteractiveGlobePlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    theme: "ocean",
    heading: "Connected Worldwide",
    subtitle:
      "Real-time data flows across the globe with live animated arcs.",
    showLabel: true,
    arcTime: 1000,
    autoRotateSpeed: 0.5,
    atmosphereAltitude: 0.1,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="w-full max-w-2xl mx-auto">
            <InteractiveGlobe
              theme={values.theme as GlobeTheme}
              heading={values.heading as string}
              subtitle={values.subtitle as string}
              showLabel={values.showLabel as boolean}
              arcTime={values.arcTime as number}
              autoRotateSpeed={values.autoRotateSpeed as number}
              atmosphereAltitude={values.atmosphereAltitude as number}
            />
          </div>
        }
        code={generateCode(values)}
        filename="interactive-globe-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
