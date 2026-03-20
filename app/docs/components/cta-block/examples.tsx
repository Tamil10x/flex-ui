"use client";

import React from "react";
import { CTABlock } from "@/components/flexui/cta-block";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "cta-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A centered call-to-action with both primary and secondary buttons.",
    preview: (
      <div className="-mx-4 -my-4">
        <CTABlock
          heading="Ready to get started?"
          description="Start building beautiful interfaces with FlexUI components today."
          primaryCta={{ label: "Get Started", href: "#" }}
          secondaryCta={{ label: "Learn More", href: "#" }}
        />
      </div>
    ),
    code: `<CTABlock
  heading="Ready to get started?"
  description="Start building beautiful interfaces with FlexUI components today."
  primaryCta={{ label: "Get Started", href: "/docs/installation" }}
  secondaryCta={{ label: "Learn More", href: "/docs" }}
/>`,
    filename: "default.tsx",
  },
  {
    id: "cta-minimal",
    title: "Minimal — Heading Only",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A minimal CTA with just a heading and a single button.",
    preview: (
      <div className="-mx-4 -my-4">
        <CTABlock
          heading="Join the community"
          primaryCta={{ label: "Sign Up Free", href: "#" }}
        />
      </div>
    ),
    code: `<CTABlock
  heading="Join the community"
  primaryCta={{ label: "Sign Up Free", href: "/signup" }}
/>`,
    filename: "minimal.tsx",
  },
  {
    id: "cta-rich",
    title: "Rich Description",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A CTA block with longer description text and dual buttons.",
    preview: (
      <div className="-mx-4 -my-4">
        <CTABlock
          heading="Ship faster with FlexUI"
          description="50+ production-ready animated components. Copy, paste, and customize. No lock-in, no bloat."
          primaryCta={{ label: "Browse Components", href: "#" }}
          secondaryCta={{ label: "View on GitHub", href: "#" }}
        />
      </div>
    ),
    code: `<CTABlock
  heading="Ship faster with FlexUI"
  description="50+ production-ready animated components. Copy, paste, and customize. No lock-in, no bloat."
  primaryCta={{ label: "Browse Components", href: "/docs/components" }}
  secondaryCta={{ label: "View on GitHub", href: "https://github.com/..." }}
/>`,
    filename: "rich.tsx",
  },
];

export function CTABlockExamples() {
  return <ShowcaseGrid items={examples} />;
}
