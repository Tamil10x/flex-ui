"use client";

import React, { useState } from "react";
import { Marquee } from "@/components/flexui/marquee";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "direction",
    label: "Direction",
    control: {
      type: "select" as const,
      options: ["left", "right"],
    },
    defaultValue: "left",
  },
  {
    name: "speed",
    label: "Speed (seconds)",
    control: {
      type: "select" as const,
      options: ["10", "20", "30", "50"],
    },
    defaultValue: "30",
  },
  {
    name: "pauseOnHover",
    label: "Pause on Hover",
    control: { type: "boolean" as const },
    defaultValue: false,
  },
  {
    name: "repeat",
    label: "Repeat Count",
    control: {
      type: "select" as const,
      options: ["2", "4", "6"],
    },
    defaultValue: "4",
  },
];

const items = ["Next.js", "React", "Tailwind", "Framer", "Vercel", "TypeScript"];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.direction !== "left") props.push(`direction="${values.direction}"`);
  if (values.speed !== "30") props.push(`speed={${values.speed}}`);
  if (values.pauseOnHover) props.push("pauseOnHover");
  if (values.repeat !== "4") props.push(`repeat={${values.repeat}}`);

  const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
  return `import { Marquee } from "@/components/flexui/marquee";

export function Demo() {
  return (
    <Marquee${propsStr}>
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-white/[0.08] bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300">
          {item}
        </div>
      ))}
    </Marquee>
  );
}`;
}

export function MarqueePlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    direction: "left",
    speed: "30",
    pauseOnHover: false,
    repeat: "4",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <Marquee
            direction={values.direction as "left" | "right"}
            speed={Number(values.speed)}
            pauseOnHover={values.pauseOnHover as boolean}
            repeat={Number(values.repeat)}
          >
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-900/80 px-4 py-2 text-sm font-medium text-zinc-300"
              >
                {item}
              </div>
            ))}
          </Marquee>
        }
        code={generateCode(values)}
        filename="marquee-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
