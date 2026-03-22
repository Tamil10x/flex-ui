"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-start gap-0", className)}>
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-1 flex-col items-center">
          <div className="flex w-full items-center">
            {i > 0 && (
              <div className="relative h-0.5 flex-1 bg-zinc-800">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: i <= currentStep ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
            )}
            <motion.div
              className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                i < currentStep && "border-cyan-400 bg-cyan-400 text-black",
                i === currentStep && "border-cyan-400 bg-transparent text-cyan-400",
                i > currentStep && "border-zinc-700 bg-transparent text-zinc-500"
              )}
              initial={false}
              animate={{ scale: i === currentStep ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {i < currentStep ? "✓" : i + 1}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="relative h-0.5 flex-1 bg-zinc-800">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cyan-400"
                  initial={{ width: "0%" }}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className={cn("text-xs font-medium", i <= currentStep ? "text-white" : "text-zinc-500")}>
              {step.label}
            </p>
            {step.description && (
              <p className="mt-0.5 text-[10px] text-zinc-500">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
