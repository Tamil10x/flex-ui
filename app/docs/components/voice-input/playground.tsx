"use client";

import React, { useState } from "react";
import { VoiceInput } from "@/components/flexui/voice-input";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "placeholder",
    label: "Placeholder",
    control: { type: "text" as const },
    defaultValue: "Tap the mic and speak…",
  },
  {
    name: "continuous",
    label: "Continuous",
    control: { type: "boolean" as const },
    defaultValue: false,
  },
  {
    name: "showWaveform",
    label: "Show Waveform",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
  {
    name: "size",
    label: "Size",
    control: {
      type: "select" as const,
      options: ["sm", "md", "lg"],
    },
    defaultValue: "md",
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.placeholder !== "Tap the mic and speak…")
    props.push(`placeholder="${values.placeholder}"`);
  if (values.continuous) props.push("continuous");
  if (!values.showWaveform) props.push("showWaveform={false}");
  if (values.size !== "md") props.push(`size="${values.size}"`);

  const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n  ` : " ";
  return `import { VoiceInput } from "@/components/flexui/voice-input";

export function Demo() {
  return (
    <VoiceInput${propsStr}onTranscript={(text) => console.log(text)}
      onFinal={(text) => console.log("Final:", text)}
    />
  );
}`;
}

export function VoiceInputPlayground() {
  const [values, setValues] = useState<Record<string, string | number | boolean>>({
    placeholder: "Tap the mic and speak…",
    continuous: false,
    showWaveform: true,
    size: "md",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Click the mic button and speak — your voice will be transcribed in
        real time with a cinematic waveform visualization.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex w-full max-w-md mx-auto items-center justify-center">
            <VoiceInput
              placeholder={values.placeholder as string}
              continuous={values.continuous as boolean}
              showWaveform={values.showWaveform as boolean}
              size={values.size as "sm" | "md" | "lg"}
              onTranscript={(text) => console.log(text)}
            />
          </div>
        }
        code={generateCode(values)}
        filename="voice-input-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
