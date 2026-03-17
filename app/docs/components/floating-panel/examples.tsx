"use client";

import React from "react";
import {
  FloatingPanelRoot,
  FloatingPanelTrigger,
  FloatingPanelContent,
  FloatingPanelForm,
  FloatingPanelTextarea,
  FloatingPanelFooter,
  FloatingPanelCloseButton,
  FloatingPanelSubmitButton,
  FloatingPanelBody,
  FloatingPanelButton,
} from "@/components/flexui/floating-panel";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import {
  Plus,
  Palette,
  Zap,
  MessageSquare,
  Image,
  Star,
  Flag,
  Send,
  FileText,
  Upload,
} from "lucide-react";

const examples = [
  {
    id: "fp-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Standard floating panel with form, textarea, and submit.",
    preview: (
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Add Note">
          <Plus className="h-4 w-4" /> Add Note
        </FloatingPanelTrigger>
        <FloatingPanelContent>
          <FloatingPanelForm>
            <FloatingPanelTextarea placeholder="Write your note..." />
            <FloatingPanelFooter>
              <FloatingPanelCloseButton />
              <FloatingPanelSubmitButton />
            </FloatingPanelFooter>
          </FloatingPanelForm>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    ),
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Add Note">
    <Plus className="h-4 w-4" /> Add Note
  </FloatingPanelTrigger>
  <FloatingPanelContent>
    <FloatingPanelForm>
      <FloatingPanelTextarea placeholder="Write your note..." />
      <FloatingPanelFooter>
        <FloatingPanelCloseButton />
        <FloatingPanelSubmitButton />
      </FloatingPanelFooter>
    </FloatingPanelForm>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "default.tsx",
  },
  {
    id: "fp-color",
    title: "Choose Color",
    tag: "Picker",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Color picker panel with palette options.",
    preview: (
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Choose Color">
          <Palette className="h-4 w-4" /> Choose Color
        </FloatingPanelTrigger>
        <FloatingPanelContent>
          <FloatingPanelBody>
            <div className="grid grid-cols-5 gap-2">
              {[
                "bg-red-500",
                "bg-orange-500",
                "bg-amber-500",
                "bg-yellow-500",
                "bg-lime-500",
                "bg-green-500",
                "bg-emerald-500",
                "bg-teal-500",
                "bg-cyan-500",
                "bg-sky-500",
                "bg-blue-500",
                "bg-indigo-500",
                "bg-violet-500",
                "bg-purple-500",
                "bg-fuchsia-500",
                "bg-pink-500",
                "bg-rose-500",
                "bg-zinc-100",
                "bg-zinc-500",
                "bg-zinc-900",
              ].map((color) => (
                <button
                  key={color}
                  className={`h-8 w-8 rounded-lg ${color} transition-transform hover:scale-110 hover:ring-2 hover:ring-white/20 hover:ring-offset-2 hover:ring-offset-zinc-900`}
                />
              ))}
            </div>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton>Apply</FloatingPanelSubmitButton>
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    ),
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Choose Color">
    <Palette className="h-4 w-4" /> Choose Color
  </FloatingPanelTrigger>
  <FloatingPanelContent>
    <FloatingPanelBody>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className={\`h-8 w-8 rounded-lg \${color} hover:scale-110\`}
          />
        ))}
      </div>
    </FloatingPanelBody>
    <FloatingPanelFooter>
      <FloatingPanelCloseButton />
      <FloatingPanelSubmitButton>Apply</FloatingPanelSubmitButton>
    </FloatingPanelFooter>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "choose-color.tsx",
  },
  {
    id: "fp-actions",
    title: "Quick Actions",
    tag: "Menu",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Action list panel with icon buttons.",
    preview: (
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Quick Actions">
          <Zap className="h-4 w-4" /> Quick Actions
        </FloatingPanelTrigger>
        <FloatingPanelContent>
          <FloatingPanelBody>
            <FloatingPanelButton>
              <FileText className="h-4 w-4 text-blue-400" />
              New File
            </FloatingPanelButton>
            <FloatingPanelButton>
              <Upload className="h-4 w-4 text-emerald-400" />
              Upload Image
            </FloatingPanelButton>
            <FloatingPanelButton>
              <Palette className="h-4 w-4 text-purple-400" />
              Edit Colors
            </FloatingPanelButton>
            <FloatingPanelButton>
              <Star className="h-4 w-4 text-amber-400" />
              Add to Favorites
            </FloatingPanelButton>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    ),
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Quick Actions">
    <Zap className="h-4 w-4" /> Quick Actions
  </FloatingPanelTrigger>
  <FloatingPanelContent>
    <FloatingPanelBody>
      <FloatingPanelButton>
        <FileText className="h-4 w-4 text-blue-400" />
        New File
      </FloatingPanelButton>
      <FloatingPanelButton>
        <Upload className="h-4 w-4 text-emerald-400" />
        Upload Image
      </FloatingPanelButton>
      <FloatingPanelButton>
        <Palette className="h-4 w-4 text-purple-400" />
        Edit Colors
      </FloatingPanelButton>
      <FloatingPanelButton>
        <Star className="h-4 w-4 text-amber-400" />
        Add to Favorites
      </FloatingPanelButton>
    </FloatingPanelBody>
    <FloatingPanelFooter>
      <FloatingPanelCloseButton />
    </FloatingPanelFooter>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "quick-actions.tsx",
  },
  {
    id: "fp-feedback",
    title: "Send Feedback",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    description: "Feedback panel with custom submit button.",
    preview: (
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Send Feedback">
          <MessageSquare className="h-4 w-4" /> Feedback
        </FloatingPanelTrigger>
        <FloatingPanelContent>
          <FloatingPanelForm>
            <FloatingPanelTextarea placeholder="How can we improve?" />
            <FloatingPanelFooter>
              <FloatingPanelCloseButton />
              <FloatingPanelSubmitButton>
                <Send className="h-3 w-3" /> Send
              </FloatingPanelSubmitButton>
            </FloatingPanelFooter>
          </FloatingPanelForm>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    ),
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Send Feedback">
    <MessageSquare className="h-4 w-4" /> Feedback
  </FloatingPanelTrigger>
  <FloatingPanelContent>
    <FloatingPanelForm>
      <FloatingPanelTextarea placeholder="How can we improve?" />
      <FloatingPanelFooter>
        <FloatingPanelCloseButton />
        <FloatingPanelSubmitButton>
          <Send className="h-3 w-3" /> Send
        </FloatingPanelSubmitButton>
      </FloatingPanelFooter>
    </FloatingPanelForm>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "feedback.tsx",
  },
  {
    id: "fp-preview",
    title: "Preview Image",
    tag: "Media",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Image preview panel with placeholder.",
    span: "2" as const,
    preview: (
      <FloatingPanelRoot>
        <FloatingPanelTrigger title="Preview Image">
          <Image className="h-4 w-4" /> Preview Image
        </FloatingPanelTrigger>
        <FloatingPanelContent className="w-[380px]">
          <FloatingPanelBody>
            <div className="flex h-[200px] items-center justify-center rounded-lg bg-zinc-800">
              <Image className="h-10 w-10 text-zinc-600" />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              preview-image.png &middot; 1920 &times; 1080 &middot; 2.4 MB
            </p>
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton>
              <Upload className="h-3 w-3" /> Upload
            </FloatingPanelSubmitButton>
          </FloatingPanelFooter>
        </FloatingPanelContent>
      </FloatingPanelRoot>
    ),
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Preview Image">
    <Image className="h-4 w-4" /> Preview Image
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-[380px]">
    <FloatingPanelBody>
      <div className="flex h-[200px] items-center justify-center rounded-lg bg-zinc-800">
        <Image className="h-10 w-10 text-zinc-600" />
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        preview-image.png · 1920 × 1080 · 2.4 MB
      </p>
    </FloatingPanelBody>
    <FloatingPanelFooter>
      <FloatingPanelCloseButton />
      <FloatingPanelSubmitButton>
        <Upload className="h-3 w-3" /> Upload
      </FloatingPanelSubmitButton>
    </FloatingPanelFooter>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "preview-image.tsx",
  },
];

export function FloatingPanelExamples() {
  return <ShowcaseGrid items={examples} />;
}
