"use client";

import React, { useState } from "react";
import { Stepper } from "@/components/flexui/stepper";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Preferences", description: "Choose your settings" },
  { label: "Complete", description: "All done!" },
];

const demoCode = `import { useState } from "react";
import { Stepper } from "@/components/flexui/stepper";

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Preferences", description: "Choose your settings" },
  { label: "Complete", description: "All done!" },
];

export function Demo() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex flex-col items-center gap-8">
      <Stepper steps={steps} currentStep={current} className="w-full max-w-xl" />
      <div className="flex gap-3">
        <button onClick={() => setCurrent((s) => Math.max(0, s - 1))}>Back</button>
        <button onClick={() => setCurrent((s) => Math.min(steps.length - 1, s + 1))}>Next</button>
      </div>
    </div>
  );
}`;

function StepperPreview() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Stepper steps={steps} currentStep={current} className="w-full max-w-xl" />
      <div className="flex gap-3">
        <button
          onClick={() => setCurrent((s) => Math.max(0, s - 1))}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white hover:bg-white/10"
        >
          Back
        </button>
        <button
          onClick={() => setCurrent((s) => Math.min(steps.length - 1, s + 1))}
          className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-medium text-black hover:bg-cyan-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<StepperPreview />}
      code={demoCode}
      filename="stepper-demo.tsx"
    />
  );
}
