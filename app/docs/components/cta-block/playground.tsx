"use client";

import React, { useState } from "react";
import { CTABlock } from "@/components/flexui/cta-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { PropsConfigurator } from "@/components/docs/props-configurator";

const propDefs = [
  {
    name: "heading",
    label: "Heading",
    control: { type: "text" as const },
    defaultValue: "Ready to get started?",
  },
  {
    name: "description",
    label: "Description",
    control: { type: "text" as const },
    defaultValue:
      "Start building beautiful interfaces with FlexUI components today.",
  },
  {
    name: "showPrimary",
    label: "Show Primary CTA",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
  {
    name: "showSecondary",
    label: "Show Secondary CTA",
    control: { type: "boolean" as const },
    defaultValue: true,
  },
];

function generateCode(values: Record<string, string | number | boolean>) {
  const props: string[] = [];
  props.push(`heading="${values.heading}"`);
  if (values.description) props.push(`description="${values.description}"`);
  if (values.showPrimary)
    props.push(
      `primaryCta={{ label: "Get Started", href: "/docs/installation" }}`
    );
  if (values.showSecondary)
    props.push(`secondaryCta={{ label: "Learn More", href: "/docs" }}`);

  return `import { CTABlock } from "@/components/flexui/cta-block";

export function Demo() {
  return (
    <CTABlock
      ${props.join("\n      ")}
    />
  );
}`;
}

export function CTABlockPlayground() {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>
  >({
    heading: "Ready to get started?",
    description:
      "Start building beautiful interfaces with FlexUI components today.",
    showPrimary: true,
    showSecondary: true,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="-mx-6 -my-6">
            <CTABlock
              heading={values.heading as string}
              description={values.description as string}
              primaryCta={
                values.showPrimary
                  ? { label: "Get Started", href: "#" }
                  : undefined
              }
              secondaryCta={
                values.showSecondary
                  ? { label: "Learn More", href: "#" }
                  : undefined
              }
            />
          </div>
        }
        code={generateCode(values)}
        filename="cta-block-demo.tsx"
      />
      <PropsConfigurator
        propDefs={propDefs}
        values={values}
        onChange={handleChange}
      />
    </div>
  );
}
