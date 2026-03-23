"use client";

import React, { useState } from "react";
import { Stepper } from "@/components/flexui/stepper";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function StepperDefault() {
  const [step, setStep] = useState(1);
  const steps = [
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Set up your profile" },
    { label: "Complete", description: "All done!" },
  ];
  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={step} className="w-full" />
      <div className="flex justify-center gap-3">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white hover:bg-white/10">Back</button>
        <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-medium text-black hover:bg-cyan-400">Next</button>
      </div>
    </div>
  );
}

function StepperSimple() {
  const [step, setStep] = useState(2);
  const steps = [
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Done" },
  ];
  return (
    <div className="space-y-6">
      <Stepper steps={steps} currentStep={step} className="w-full" />
      <div className="flex justify-center gap-3">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white hover:bg-white/10">Back</button>
        <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-medium text-black hover:bg-cyan-400">Next</button>
      </div>
    </div>
  );
}

function StepperCompleted() {
  const steps = [
    { label: "Sign Up", description: "Account created" },
    { label: "Verify", description: "Email confirmed" },
    { label: "Complete", description: "Welcome aboard" },
  ];
  return <Stepper steps={steps} currentStep={2} className="w-full" />;
}

const examples = [
  {
    id: "stepper-default",
    title: "Default with Controls",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Interactive stepper with labels and descriptions. Click Next/Back to navigate.",
    preview: <StepperDefault />,
    code: `const [step, setStep] = useState(1);

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Complete", description: "All done!" },
];

<Stepper steps={steps} currentStep={step} />`,
    filename: "default.tsx",
  },
  {
    id: "stepper-simple",
    title: "Simple Labels Only",
    tag: "Variant",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Minimal stepper with only labels, no descriptions. Great for compact forms.",
    preview: <StepperSimple />,
    code: `<Stepper
  steps={[
    { label: "Cart" },
    { label: "Shipping" },
    { label: "Payment" },
    { label: "Done" },
  ]}
  currentStep={2}
/>`,
    filename: "simple.tsx",
  },
  {
    id: "stepper-completed",
    title: "All Steps Complete",
    tag: "State",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Stepper at the final step with all previous steps showing checkmarks.",
    preview: <StepperCompleted />,
    code: `<Stepper
  steps={[
    { label: "Sign Up", description: "Account created" },
    { label: "Verify", description: "Email confirmed" },
    { label: "Complete", description: "Welcome aboard" },
  ]}
  currentStep={2}
/>`,
    filename: "completed.tsx",
  },
];

export function StepperExamples() {
  return <ShowcaseGrid items={examples} />;
}
