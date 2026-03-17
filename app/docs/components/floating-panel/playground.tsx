"use client";

import React, { useState } from "react";
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelTextarea,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
} from "@/components/flexui/floating-panel";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Plus } from "lucide-react";

const code = `import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelTextarea,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
} from "@/components/flexui/floating-panel";
import { Plus } from "lucide-react";

export function Demo() {
  const handleSubmit = (note: string) => {
    console.log("Submitted:", note);
  };

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Add Note">
        <Plus className="h-4 w-4" /> Add Note
      </FloatingPanelTrigger>
      <FloatingPanelContent>
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelTextarea placeholder="Write your note..." />
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}`;

export function FloatingPanelPlayground() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleSubmit = (note: string) => {
    setSubmitted(note);
    setTimeout(() => setSubmitted(null), 3000);
  };

  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] items-start justify-center pt-8">
            <div className="flex flex-col items-center gap-4">
              <FloatingPanelRoot>
                <FloatingPanelTrigger title="Add Note">
                  <Plus className="h-4 w-4" /> Add Note
                </FloatingPanelTrigger>
                <FloatingPanelContent>
                  <FloatingPanelForm onSubmit={handleSubmit}>
                    <FloatingPanelTextarea placeholder="Write your note..." />
                    <FloatingPanelFooter>
                      <FloatingPanelCloseButton />
                      <FloatingPanelSubmitButton />
                    </FloatingPanelFooter>
                  </FloatingPanelForm>
                </FloatingPanelContent>
              </FloatingPanelRoot>
              {submitted && (
                <p className="text-xs text-emerald-400">
                  Submitted: &ldquo;{submitted}&rdquo;
                </p>
              )}
            </div>
          </div>
        }
        code={code}
        filename="floating-panel-demo.tsx"
      />
    </div>
  );
}
