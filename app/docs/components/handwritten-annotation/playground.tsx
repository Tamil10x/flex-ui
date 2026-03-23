"use client";

import React, { useState } from "react";
import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";

export default function HandwrittenAnnotationDemo() {
  return (
    <div className="flex flex-col items-center gap-10 p-8">
      <h1 className="text-3xl font-bold">
        This is{" "}
        <HandwrittenAnnotation type="circle" color="#EF4444">
          important
        </HandwrittenAnnotation>{" "}
        text
      </h1>

      <p className="text-xl">
        We need to{" "}
        <HandwrittenAnnotation type="underline" color="#3B82F6">
          focus on this
        </HandwrittenAnnotation>{" "}
        part of the sentence.
      </p>

      <p className="text-xl">
        <HandwrittenAnnotation type="highlight" color="#FBBF24">
          Highlighted phrase
        </HandwrittenAnnotation>{" "}
        stands out from the rest.
      </p>

      <p className="text-xl">
        <HandwrittenAnnotation type="strikethrough" color="#EF4444">
          Removed text
        </HandwrittenAnnotation>{" "}
        replaced with new text.
      </p>
    </div>
  );
}`;

type AnnotationType = "circle" | "underline" | "highlight" | "bracket" | "arrow" | "strikethrough";

export function HandwrittenAnnotationPlayground() {
  const [annotationType, setAnnotationType] = useState<AnnotationType>("circle");
  const [color, setColor] = useState("#EF4444");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [duration, setDuration] = useState(0.8);
  const [key, setKey] = useState(0);

  const colorPresets = [
    { label: "Red", value: "#EF4444" },
    { label: "Blue", value: "#3B82F6" },
    { label: "Green", value: "#10B981" },
    { label: "Yellow", value: "#FBBF24" },
    { label: "Purple", value: "#8B5CF6" },
    { label: "Orange", value: "#F97316" },
  ];

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-8">
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {(["circle", "underline", "highlight", "bracket", "arrow", "strikethrough"] as AnnotationType[]).map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setAnnotationType(t);
                      setKey((k) => k + 1);
                    }}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                      annotationType === t
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/[0.06] bg-white/[0.03] text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {t}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {colorPresets.map((cp) => (
                <button
                  key={cp.value}
                  onClick={() => {
                    setColor(cp.value);
                    setKey((k) => k + 1);
                  }}
                  className={`h-6 w-6 rounded-full border-2 transition-transform ${
                    color === cp.value ? "scale-110 border-white" : "border-transparent"
                  }`}
                  style={{ backgroundColor: cp.value }}
                  title={cp.label}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-zinc-500">
                Stroke
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={strokeWidth}
                  onChange={(e) => {
                    setStrokeWidth(Number(e.target.value));
                    setKey((k) => k + 1);
                  }}
                  className="w-20"
                />
                <span className="text-zinc-400">{strokeWidth}px</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-zinc-500">
                Duration
                <input
                  type="range"
                  min={0.3}
                  max={2}
                  step={0.1}
                  value={duration}
                  onChange={(e) => {
                    setDuration(Number(e.target.value));
                    setKey((k) => k + 1);
                  }}
                  className="w-20"
                />
                <span className="text-zinc-400">{duration}s</span>
              </label>
              <button
                onClick={() => setKey((k) => k + 1)}
                className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
              >
                Replay
              </button>
            </div>

            {/* Demo text */}
            <div className="text-center" key={key}>
              <h2 className="text-3xl font-bold text-white">
                This is{" "}
                <HandwrittenAnnotation
                  type={annotationType}
                  color={color}
                  strokeWidth={strokeWidth}
                  duration={duration}
                  once={false}
                >
                  really important
                </HandwrittenAnnotation>{" "}
                text
              </h2>
            </div>
          </div>
        }
        code={code}
        filename="handwritten-annotation-demo.tsx"
      />
    </div>
  );
}
