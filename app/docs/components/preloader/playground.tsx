"use client";

import React, { useState } from "react";
import { Preloader, PreloaderTrigger } from "@/components/flexui/preloader";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const demoImages = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop&q=90", alt: "Portrait 1" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&q=90", alt: "Portrait 2" },
  { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1000&fit=crop&q=90", alt: "Portrait 3" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=1000&fit=crop&q=90", alt: "Portrait 4" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1000&fit=crop&q=90", alt: "Portrait 5" },
];

const propDefs = [
  {
    name: "sweepDuration",
    label: "Sweep Duration (s)",
    control: {
      type: "select" as const,
      options: ["1.5", "2.4", "3.5"],
    },
    defaultValue: "2.4",
  },
  {
    name: "scaleDuration",
    label: "Scale Duration (s)",
    control: {
      type: "select" as const,
      options: ["1.0", "1.8", "2.5"],
    },
    defaultValue: "1.8",
  },
  {
    name: "showProgress",
    label: "Show Progress",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  if (values.sweepDuration !== "2.4") props.push(`sweepDuration={${values.sweepDuration}}`);
  if (values.scaleDuration !== "1.8") props.push(`scaleDuration={${values.scaleDuration}}`);
  if (!values.showProgress) props.push("showProgress={false}");

  const propsStr = props.length > 0 ? `\n      ${props.join("\n      ")}\n      ` : "\n      ";
  return `import { useState } from "react";
import { Preloader, PreloaderTrigger } from "@/components/flexui/preloader";

const images = [
  { src: "/images/portrait-1.jpg", alt: "Portrait 1" },
  { src: "/images/portrait-2.jpg", alt: "Portrait 2" },
  { src: "/images/portrait-3.jpg", alt: "Portrait 3" },
  { src: "/images/portrait-4.jpg", alt: "Portrait 4" },
  { src: "/images/portrait-5.jpg", alt: "Portrait 5" },
];

export function Demo() {
  const [show, setShow] = useState(false);

  return (
    <>
      <PreloaderTrigger onClick={() => setShow(true)} />
      {show && (
        <Preloader
          images={images}${propsStr}onComplete={() => setShow(false)}
        />
      )}
    </>
  );
}`;
}

export function PreloaderPlayground() {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState<Record<string, string | number | boolean>>({
    sweepDuration: "2.4",
    scaleDuration: "1.8",
    showProgress: true,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Click the trigger below to launch a fullscreen preloader. The kinetic image
        strip sweeps across with deceleration, converges on the hero image, then
        scales it to fill the viewport. The overlay auto-closes when complete.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center">
            <PreloaderTrigger onClick={() => setShow(true)} />
            {/* Preloader portals to document.body — escapes any container */}
            {show && (
              <Preloader
                images={demoImages}
                sweepDuration={parseFloat(values.sweepDuration as string)}
                scaleDuration={parseFloat(values.scaleDuration as string)}
                showProgress={values.showProgress as boolean}
                onComplete={() => setShow(false)}
              />
            )}
          </div>
        }
        code={generateCode(values)}
        filename="preloader-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
