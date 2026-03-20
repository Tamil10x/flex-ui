"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Sparkles, ArrowRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  "Purple shimmer button with arrow",
  "Spotlight card with pricing info",
  "Text reveal heading for hero section",
  "Number ticker showing 10,000+ users",
];

const mockResponses: Record<string, { code: string; preview: string }> = {
  button: {
    preview: "ShimmerButton",
    code: `import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { ArrowRight } from "lucide-react";

export default function MyComponent() {
  return (
    <ShimmerButton
      shimmerColor="rgba(168, 85, 247, 0.4)"
      background="rgba(88, 28, 135, 0.8)"
      borderRadius="12px"
      className="px-8 py-3 font-semibold text-white"
    >
      Get Started
      <ArrowRight className="ml-2 h-4 w-4" />
    </ShimmerButton>
  );
}`,
  },
  shimmer: {
    preview: "ShimmerButton",
    code: `import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { ArrowRight } from "lucide-react";

export default function MyComponent() {
  return (
    <ShimmerButton
      shimmerColor="rgba(168, 85, 247, 0.4)"
      background="rgba(88, 28, 135, 0.8)"
      borderRadius="12px"
      className="px-8 py-3 font-semibold text-white"
    >
      Get Started
      <ArrowRight className="ml-2 h-4 w-4" />
    </ShimmerButton>
  );
}`,
  },
  card: {
    preview: "SpotlightCard",
    code: `import { SpotlightCard } from "@/components/flexui/spotlight-card";

export default function MyComponent() {
  return (
    <SpotlightCard
      className="max-w-sm p-8"
      spotlightColor="rgba(59, 130, 246, 0.15)"
    >
      <h3 className="mb-2 text-xl font-bold text-white">Pro Plan</h3>
      <p className="mb-4 text-zinc-400">Everything you need to scale.</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">$49</span>
        <span className="text-zinc-500">/month</span>
      </div>
      <ul className="space-y-2 text-sm text-zinc-300">
        <li>Unlimited components</li>
        <li>Priority support</li>
        <li>Custom themes</li>
      </ul>
    </SpotlightCard>
  );
}`,
  },
  spotlight: {
    preview: "SpotlightCard",
    code: `import { SpotlightCard } from "@/components/flexui/spotlight-card";

export default function MyComponent() {
  return (
    <SpotlightCard
      className="max-w-sm p-8"
      spotlightColor="rgba(59, 130, 246, 0.15)"
    >
      <h3 className="mb-2 text-xl font-bold text-white">Pro Plan</h3>
      <p className="mb-4 text-zinc-400">Everything you need to scale.</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">$49</span>
        <span className="text-zinc-500">/month</span>
      </div>
      <ul className="space-y-2 text-sm text-zinc-300">
        <li>Unlimited components</li>
        <li>Priority support</li>
        <li>Custom themes</li>
      </ul>
    </SpotlightCard>
  );
}`,
  },
  text: {
    preview: "TextReveal",
    code: `import { TextReveal } from "@/components/flexui/text-reveal";

export default function MyComponent() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <TextReveal
        text="Build beautiful interfaces with FlexUI"
        className="text-4xl font-bold"
      />
    </div>
  );
}`,
  },
  reveal: {
    preview: "TextReveal",
    code: `import { TextReveal } from "@/components/flexui/text-reveal";

export default function MyComponent() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <TextReveal
        text="Build beautiful interfaces with FlexUI"
        className="text-4xl font-bold"
      />
    </div>
  );
}`,
  },
  number: {
    preview: "NumberTicker",
    code: `import { NumberTicker } from "@/components/flexui/number-ticker";

export default function MyComponent() {
  return (
    <div className="flex items-center gap-1 text-5xl font-bold text-white">
      <NumberTicker value={10000} direction="up" delay={0.2} />
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">+</span>
      <span className="ml-3 text-lg font-medium text-zinc-400">active users</span>
    </div>
  );
}`,
  },
  ticker: {
    preview: "NumberTicker",
    code: `import { NumberTicker } from "@/components/flexui/number-ticker";

export default function MyComponent() {
  return (
    <div className="flex items-center gap-1 text-5xl font-bold text-white">
      <NumberTicker value={10000} direction="up" delay={0.2} />
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">+</span>
      <span className="ml-3 text-lg font-medium text-zinc-400">active users</span>
    </div>
  );
}`,
  },
};

const defaultResponse = {
  preview: "MagneticButton",
  code: `import { MagneticButton } from "@/components/flexui/magnetic-button";

export default function MyComponent() {
  return (
    <MagneticButton
      className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 font-semibold text-white transition-shadow hover:shadow-lg hover:shadow-blue-500/25"
    >
      Click Me
    </MagneticButton>
  );
}`,
};

function getResponseForPrompt(prompt: string): { code: string; preview: string } {
  const lower = prompt.toLowerCase();
  const keywords = Object.keys(mockResponses);
  for (const keyword of keywords) {
    if (lower.includes(keyword)) {
      return mockResponses[keyword];
    }
  }
  return defaultResponse;
}

export function AIStudio() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setGeneratedCode(null);

    setTimeout(() => {
      const response = getResponseForPrompt(prompt);
      setGeneratedCode(response.code);
      setIsGenerating(false);
      setActiveTab("code");
    }, 2000);
  }, [prompt, isGenerating]);

  const handleCopy = useCallback(() => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCode]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="flex min-h-screen pt-16">
        {/* Left column - Prompt area */}
        <div className="flex w-full flex-col border-r border-white/[0.06] p-8 lg:w-1/2">
          <div className="mx-auto w-full max-w-lg flex-1">
            {/* Heading */}
            <div className="mb-8 mt-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-1 ring-white/[0.08]">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </div>
                <h1 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                    AI Component Studio
                  </span>
                </h1>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">
                Describe a component and AI will generate FlexUI code
              </p>
            </div>

            {/* Prompt card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your component... e.g., 'A purple shimmer button with an arrow icon'"
                rows={4}
                className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-blue-500/30 focus:bg-white/[0.04]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleGenerate();
                  }
                }}
              />

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className={cn(
                  "mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all",
                  prompt.trim() && !isGenerating
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/25"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                )}
              >
                {isGenerating ? (
                  <>
                    <span className="flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
                      <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
                    </span>
                    <span className="ml-2">Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate
                  </>
                )}
              </button>
            </div>

            {/* Suggestion pills */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
                Try these
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Output area */}
        <div className="hidden w-1/2 flex-col p-8 lg:flex">
          <div className="mx-auto w-full max-w-lg flex-1 mt-8">
            {/* Tab switcher */}
            <div className="mb-6 flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
              <button
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "preview"
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === "code"
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Code
              </button>
            </div>

            {/* Output panel */}
            <div className="min-h-[400px] rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              {/* Empty state */}
              {!isGenerating && !generatedCode && (
                <div className="flex h-full min-h-[350px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
                    <Sparkles className="h-8 w-8 text-zinc-700" />
                  </div>
                  <p className="text-sm text-zinc-600">
                    Your component will appear here
                  </p>
                </div>
              )}

              {/* Loading state */}
              {isGenerating && (
                <div className="flex h-full min-h-[350px] flex-col items-center justify-center">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:0ms]" />
                    <span className="inline-block h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
                    <span className="inline-block h-2.5 w-2.5 animate-bounce rounded-full bg-blue-400 [animation-delay:300ms]" />
                  </div>
                  <p className="text-sm text-zinc-500">
                    Generating your component...
                  </p>
                  <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  </div>
                </div>
              )}

              {/* Generated output */}
              {!isGenerating && generatedCode && (
                <>
                  {activeTab === "preview" && (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-white/[0.04] bg-white/[0.02] p-8">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ring-1 ring-white/[0.1]">
                        <Sparkles className="h-6 w-6 text-cyan-400" />
                      </div>
                      <p className="mb-1 text-sm font-medium text-white">
                        Component Generated
                      </p>
                      <p className="text-xs text-zinc-500">
                        Switch to the Code tab to see the source
                      </p>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div className="relative">
                      <button
                        onClick={handleCopy}
                        className="absolute right-3 top-3 rounded-lg border border-white/[0.06] bg-white/[0.04] p-2 text-zinc-500 transition-colors hover:bg-white/[0.08] hover:text-white"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <pre className="overflow-x-auto rounded-xl bg-black/50 p-4 text-sm leading-relaxed">
                        <code className="text-zinc-300">{generatedCode}</code>
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
