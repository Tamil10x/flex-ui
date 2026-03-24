"use client";

import React, { useState } from "react";
import { VoiceCommand } from "@/components/flexui/voice-command";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";
import { Sun, Moon, Search, Volume2 } from "lucide-react";

const propDefs = [
  {
    name: "showPalette",
    label: "Show Palette",
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
  if (!values.showPalette) props.push("showPalette={false}");
  if (values.size !== "md") props.push(`size="${values.size}"`);

  return `import { VoiceCommand } from "@/components/flexui/voice-command";

const commands = [
  { phrase: "hello", label: "Say Hello", action: () => alert("Hello!") },
  { phrase: "search", label: "Open Search", action: () => openSearch() },
  { phrase: "dark mode", label: "Dark Mode", action: () => setDark(true) },
];

export function Demo() {
  return (
    <VoiceCommand
      commands={commands}${props.length > 0 ? "\n      " + props.join("\n      ") : ""}
      onCommandMatch={(phrase) => console.log("Matched:", phrase)}
    />
  );
}`;
}

export function VoiceCommandPlayground() {
  const [values, setValues] = useState<Record<string, string | number | boolean>>({
    showPalette: true,
    size: "md",
  });
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const demoCommands = [
    { phrase: "hello", label: "Say Hello", icon: <Volume2 className="h-3.5 w-3.5 text-purple-400" />, action: () => setLastAction("Hello! Voice command recognized.") },
    { phrase: "search", label: "Open Search", icon: <Search className="h-3.5 w-3.5 text-purple-400" />, action: () => setLastAction("Search opened via voice!") },
    { phrase: "light mode", label: "Light Mode", icon: <Sun className="h-3.5 w-3.5 text-purple-400" />, action: () => setLastAction("Switching to light mode...") },
    { phrase: "dark mode", label: "Dark Mode", icon: <Moon className="h-3.5 w-3.5 text-purple-400" />, action: () => setLastAction("Switching to dark mode...") },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Click the mic and say one of the commands: &quot;hello&quot;, &quot;search&quot;,
        &quot;light mode&quot;, or &quot;dark mode&quot;.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex flex-col items-center gap-6 min-h-[300px] justify-center">
            <VoiceCommand
              commands={demoCommands}
              showPalette={values.showPalette as boolean}
              size={values.size as "sm" | "md" | "lg"}
              onNoMatch={() => setLastAction("No matching command found.")}
            />
            {lastAction && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                {lastAction}
              </div>
            )}
          </div>
        }
        code={generateCode(values)}
        filename="voice-command-demo.tsx"
      />
      <PropsConfigurator propDefs={propDefs} values={values} onChange={handleChange} />
    </div>
  );
}
