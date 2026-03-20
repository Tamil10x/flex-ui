import type { Metadata } from "next";
import { CodeBlock } from "@/components/ui/code-block";
import { DocSection, DocSubSection } from "@/components/docs/doc-section";
import { ApiTable } from "@/components/docs/api-table";
import { InstallTabs } from "@/components/docs/install-tabs";
import { OTPInputPlayground } from "./playground";
import { OTPInputExamples } from "./examples";

export const metadata: Metadata = {
  title: "OTP Input — FlexUI",
  description:
    "An animated OTP/verification code input with auto-focus, paste support, and spring animations.",
};

const otpInputSource = `"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  className?: string;
  accentColor?: string;
}

export function OTPInput({
  length = 6,
  onComplete,
  className,
  accentColor = "#3b82f6",
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(
    new Set()
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setValues(Array(length).fill(""));
    setCompletedIndices(new Set());
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < (inputRefs.current?.length ?? 0)) {
      inputRefs.current[index]?.focus();
    }
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      const char = value.slice(-1);
      if (char && !/^[0-9]$/.test(char)) return;

      const newValues = [...values];
      newValues[index] = char;
      setValues(newValues);

      if (char) {
        setCompletedIndices((prev) => new Set(prev).add(index));
        if (index < length - 1) focusInput(index + 1);
        const code = newValues.join("");
        if (code.length === length && newValues.every((v) => v !== "")) {
          onComplete?.(code);
        }
      }
    },
    [values, length, focusInput, onComplete]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValues = [...values];
        if (values[index]) {
          newValues[index] = "";
          setValues(newValues);
          setCompletedIndices((prev) => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
        } else if (index > 0) {
          newValues[index - 1] = "";
          setValues(newValues);
          setCompletedIndices((prev) => {
            const next = new Set(prev);
            next.delete(index - 1);
            return next;
          });
          focusInput(index - 1);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    },
    [values, length, focusInput]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .replace(/\\D/g, "")
        .slice(0, length);
      if (!pastedData) return;

      const newValues = [...values];
      const newCompleted = new Set(completedIndices);
      for (let i = 0; i < pastedData.length; i++) {
        newValues[i] = pastedData[i];
        newCompleted.add(i);
      }
      setValues(newValues);
      setCompletedIndices(newCompleted);
      const nextIndex = Math.min(pastedData.length, length - 1);
      focusInput(nextIndex);

      if (pastedData.length >= length && newValues.every((v) => v !== "")) {
        onComplete?.(newValues.join(""));
      }
    },
    [values, length, completedIndices, focusInput, onComplete]
  );

  return (
    <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
      {Array.from({ length }).map((_, index) => {
        const isActive = activeIndex === index;
        const isFilled = values[index] !== "";
        const justCompleted = completedIndices.has(index) && isFilled;

        return (
          <motion.div
            key={index}
            className="relative"
            animate={justCompleted ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25, duration: 0.3 }}
          >
            {isActive && (
              <motion.div
                layoutId="otp-focus-glow"
                className="absolute -inset-[2px] rounded-xl"
                style={{
                  boxShadow: \\\`0 0 20px \\\${accentColor}40, 0 0 40px \\\${accentColor}20\\\`,
                  border: \\\`2px solid \\\${accentColor}\\\`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={values[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              className={cn(
                "relative z-10 h-12 w-10 sm:h-14 sm:w-12 rounded-lg text-center text-lg sm:text-xl font-semibold",
                "outline-none transition-all duration-200",
                "backdrop-blur-xl bg-white/[0.05] text-white border",
                isActive ? "border-transparent" : isFilled ? "border-white/[0.15]" : "border-white/[0.08]",
                !isActive && "hover:border-white/[0.12] hover:bg-white/[0.08]"
              )}
              aria-label={\\\`Digit \\\${index + 1} of \\\${length}\\\`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}`;

export default function OTPInputDoc() {
  return (
    <div className="min-w-0 flex-1 space-y-14">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-purple-400">
            Tier 1
          </span>
          <span className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-500">
            Framer Motion
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white">
          OTP Input
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
          An animated OTP/verification code input with auto-focus between boxes,
          paste support, and spring-physics animations. Glass-morphic styling
          with accent color glow on the active input.
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Preview */}
      <DocSection id="preview" title="Preview">
        <OTPInputPlayground />
      </DocSection>

      {/* Examples */}
      <DocSection id="examples" title="Examples">
        <OTPInputExamples />
      </DocSection>

      {/* Installation */}
      <DocSection id="installation" title="Installation">
        <InstallTabs
          cli={
            <div className="space-y-3">
              <CodeBlock
                code="npx shadcn@latest add @flexui/otp-input"
                filename="Terminal"
              />
              <p className="text-sm text-zinc-500">
                Installs{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  framer-motion
                </code>{" "}
                and writes the component to{" "}
                <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  components/flexui/otp-input.tsx
                </code>
                .
              </p>
            </div>
          }
          manual={
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  1. Install dependency
                </p>
                <CodeBlock
                  code="npm install framer-motion"
                  filename="Terminal"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  2. Copy component source
                </p>
                <CodeBlock
                  code={otpInputSource}
                  filename="components/flexui/otp-input.tsx"
                  language="tsx"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-300">
                  3. Requires{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    cn()
                  </code>{" "}
                  utility at{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                    @/lib/utils
                  </code>
                </p>
              </div>
            </div>
          }
        />
      </DocSection>

      {/* What You Get */}
      <DocSection id="what-you-get" title="What You Get">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              icon: "->",
              label: "Auto-Focus Navigation",
              desc: "Automatically moves focus to the next input on entry and to the previous on backspace.",
            },
            {
              icon: "//",
              label: "Paste Support",
              desc: "Paste a full code and it distributes characters across all boxes instantly.",
            },
            {
              icon: "~",
              label: "Spring Animations",
              desc: "Active input glow slides with layoutId spring physics. Filled inputs pop with scale animation.",
            },
            {
              icon: "#",
              label: "Glass-Morphic Styling",
              desc: "Backdrop-blur inputs with subtle borders that intensify on hover and focus.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group/card rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-zinc-900/40"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-sm font-bold text-blue-400">
                {item.icon}
              </div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </DocSection>

      {/* API Reference */}
      <DocSection id="api-reference" title="API Reference">
        <DocSubSection id="exports" title="Exports">
          <CodeBlock
            code={`import { OTPInput } from "@/components/flexui/otp-input";`}
            filename="Named export"
          />
        </DocSubSection>

        <DocSubSection id="props" title="Props">
          <ApiTable
            rows={[
              {
                name: "length",
                type: "number",
                default: "6",
                description:
                  "Number of OTP input boxes to render.",
              },
              {
                name: "onComplete",
                type: "(code: string) => void",
                default: "\u2014",
                description: "Callback fired when all boxes are filled.",
              },
              {
                name: "accentColor",
                type: "string",
                default: '"#3b82f6"',
                description:
                  "CSS color for the active input glow border and shadow.",
              },
              {
                name: "className",
                type: "string",
                default: "\u2014",
                description: "Additional Tailwind classes merged via cn() on the wrapper.",
              },
            ]}
          />
        </DocSubSection>
      </DocSection>

      {/* Customization */}
      <DocSection id="customization" title="Customization Patterns">
        <DocSubSection id="custom-length" title="Custom Length">
          <CodeBlock
            code={`{/* 4-digit PIN */}
<OTPInput length={4} onComplete={(pin) => console.log(pin)} />

{/* 8-character code */}
<OTPInput length={8} onComplete={(code) => verify(code)} />`}
            filename="Length examples"
            language="tsx"
          />
        </DocSubSection>

        <DocSubSection id="custom-color" title="Custom Accent Color">
          <CodeBlock
            code={`{/* Green accent */}
<OTPInput accentColor="#22c55e" />

{/* Purple accent */}
<OTPInput accentColor="#a855f7" />`}
            filename="Color examples"
            language="tsx"
          />
        </DocSubSection>
      </DocSection>

      {/* Performance */}
      <DocSection id="performance" title="Performance Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              "layoutId glow indicator uses Framer Motion FLIP for zero-layout-shift animation between inputs.",
              "Scale pop animation on completion uses spring physics for a natural feel.",
              "Each input is an uncontrolled native input for maximum performance with minimal re-renders.",
              "No external dependencies beyond framer-motion.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-500/10 text-[10px] font-bold text-green-400">
                  {i + 1}
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      {/* Accessibility */}
      <DocSection id="accessibility" title="Accessibility Notes">
        <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-5">
          <ul className="space-y-3 text-sm text-zinc-400">
            {[
              'Each input has an aria-label describing its position (e.g., "Digit 1 of 6").',
              "inputMode='numeric' ensures mobile devices show a number keypad.",
              "Arrow keys navigate between inputs for keyboard-only users.",
              "autoComplete='one-time-code' enables browser autofill from SMS codes.",
            ].map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>
    </div>
  );
}
