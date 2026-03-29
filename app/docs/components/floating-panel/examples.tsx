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
  FloatingPanelLabel,
} from "@/components/flexui/floating-panel";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Palette,
  Zap,
  Image as ImageIcon,
  Paintbrush,
  FileText,
  Upload,
  Star,
  Send,
  MessageSquare,
} from "lucide-react";

// ─── Add Note (form with label) ─────────────────────────────────────────────
function AddNotePanel() {
  const handleSubmit = (note: string) => {
    console.log("Submitted note:", note);
  };

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Add Note"
        className="flex items-center space-x-2 px-4 py-2"
      >
        <Plus className="h-4 w-4" /> Add Note
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="note-input">Note</FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

// ─── Color Picker ────────────────────────────────────────────────────────────
function ColorPickerPanel() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33F1",
    "#33FFF1",
    "#F1FF33",
  ];

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Choose Color">
        <Palette className="h-4 w-4" /> Choose Color
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-64">
        <FloatingPanelBody>
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {colors.map((color) => (
                <motion.button
                  key={color}
                  className="h-12 w-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: color }}
                  onClick={() => console.log(`Selected color: ${color}`)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </AnimatePresence>
          </div>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

// ─── Quick Actions ───────────────────────────────────────────────────────────
function QuickActionsPanel() {
  const actions = [
    {
      icon: <FileText className="h-4 w-4 text-blue-400" />,
      label: "New File",
    },
    {
      icon: <Upload className="h-4 w-4 text-emerald-400" />,
      label: "Upload Image",
    },
    {
      icon: <Paintbrush className="h-4 w-4 text-purple-400" />,
      label: "Edit Colors",
    },
    {
      icon: <Star className="h-4 w-4 text-amber-400" />,
      label: "Add to Favorites",
    },
  ];

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Quick Actions">
        <Zap className="h-4 w-4" /> Quick Actions
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-56">
        <FloatingPanelBody>
          <AnimatePresence>
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: index * 0.1 }}
              >
                <FloatingPanelButton
                  onClick={() => console.log(action.label)}
                >
                  {action.icon}
                  <span>{action.label}</span>
                </FloatingPanelButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

// ─── Send Feedback ───────────────────────────────────────────────────────────
function FeedbackPanel() {
  const handleSubmit = (note: string) => {
    console.log("Feedback:", note);
  };

  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Send Feedback">
        <MessageSquare className="h-4 w-4" /> Feedback
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={handleSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="feedback-input">
              Your Feedback
            </FloatingPanelLabel>
            <FloatingPanelTextarea
              id="feedback-input"
              placeholder="How can we improve?"
              className="min-h-[100px]"
            />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton>
              <Send className="h-3 w-3" /> Send
            </FloatingPanelSubmitButton>
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

// ─── Image Preview ───────────────────────────────────────────────────────────
function ImagePreviewPanel() {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger title="Preview Image">
        <ImageIcon className="h-4 w-4" /> Preview Image
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelBody>
          <motion.div
            className="flex h-[200px] items-center justify-center rounded-lg bg-zinc-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ImageIcon className="h-10 w-10 text-zinc-600" />
          </motion.div>
          <motion.p
            className="mt-3 text-xs text-zinc-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            preview-image.png &middot; 1920 &times; 1080 &middot; 2.4 MB
          </motion.p>
        </FloatingPanelBody>
        <FloatingPanelFooter>
          <FloatingPanelCloseButton />
          <FloatingPanelSubmitButton>
            <Upload className="h-3 w-3" /> Upload
          </FloatingPanelSubmitButton>
        </FloatingPanelFooter>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}

// ─── Showcase items ──────────────────────────────────────────────────────────
const examples = [
  {
    id: "fp-note",
    title: "Add Note",
    tag: "Form",
    tagColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    description: "Form panel with label, textarea, and submit button.",
    preview: <AddNotePanel />,
    code: `const handleSubmit = (note: string) => {
  console.log("Submitted note:", note);
};

<FloatingPanelRoot>
  <FloatingPanelTrigger title="Add Note">
    <Plus className="h-4 w-4" /> Add Note
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-80">
    <FloatingPanelForm onSubmit={handleSubmit}>
      <FloatingPanelBody>
        <FloatingPanelLabel htmlFor="note-input">Note</FloatingPanelLabel>
        <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
      </FloatingPanelBody>
      <FloatingPanelFooter>
        <FloatingPanelCloseButton />
        <FloatingPanelSubmitButton />
      </FloatingPanelFooter>
    </FloatingPanelForm>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "add-note.tsx",
  },
  {
    id: "fp-color",
    title: "Color Picker",
    tag: "Picker",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    description: "Animated color swatch grid with spring interactions.",
    preview: <ColorPickerPanel />,
    code: `const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33F1", "#33FFF1", "#F1FF33"];

<FloatingPanelRoot>
  <FloatingPanelTrigger title="Choose Color">
    <Palette className="h-4 w-4" /> Choose Color
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-64">
    <FloatingPanelBody>
      <div className="grid grid-cols-3 gap-2">
        <AnimatePresence>
          {colors.map((color) => (
            <motion.button
              key={color}
              className="h-12 w-12 rounded-full"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            />
          ))}
        </AnimatePresence>
      </div>
    </FloatingPanelBody>
    <FloatingPanelFooter>
      <FloatingPanelCloseButton />
    </FloatingPanelFooter>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "color-picker.tsx",
  },
  {
    id: "fp-actions",
    title: "Quick Actions",
    tag: "Menu",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Staggered action list with animated entries.",
    preview: <QuickActionsPanel />,
    code: `const actions = [
  { icon: <FileText className="h-4 w-4 text-blue-400" />, label: "New File" },
  { icon: <Upload className="h-4 w-4 text-emerald-400" />, label: "Upload Image" },
  { icon: <Paintbrush className="h-4 w-4 text-purple-400" />, label: "Edit Colors" },
  { icon: <Star className="h-4 w-4 text-amber-400" />, label: "Add to Favorites" },
];

<FloatingPanelRoot>
  <FloatingPanelTrigger title="Quick Actions">
    <Zap className="h-4 w-4" /> Quick Actions
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-56">
    <FloatingPanelBody>
      <AnimatePresence>
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FloatingPanelButton onClick={() => console.log(action.label)}>
              {action.icon}
              <span>{action.label}</span>
            </FloatingPanelButton>
          </motion.div>
        ))}
      </AnimatePresence>
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
    description: "Feedback form with custom submit button content.",
    preview: <FeedbackPanel />,
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Send Feedback">
    <MessageSquare className="h-4 w-4" /> Feedback
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-80">
    <FloatingPanelForm onSubmit={handleSubmit}>
      <FloatingPanelBody>
        <FloatingPanelLabel htmlFor="feedback-input">
          Your Feedback
        </FloatingPanelLabel>
        <FloatingPanelTextarea
          id="feedback-input"
          placeholder="How can we improve?"
          className="min-h-[100px]"
        />
      </FloatingPanelBody>
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
    title: "Image Preview",
    tag: "Media",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Animated image preview with upload action.",
    span: "2" as const,
    preview: <ImagePreviewPanel />,
    code: `<FloatingPanelRoot>
  <FloatingPanelTrigger title="Preview Image">
    <ImageIcon className="h-4 w-4" /> Preview Image
  </FloatingPanelTrigger>
  <FloatingPanelContent className="w-80">
    <FloatingPanelBody>
      <motion.div
        className="flex h-[200px] items-center justify-center rounded-lg bg-zinc-800"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <ImageIcon className="h-10 w-10 text-zinc-600" />
      </motion.div>
      <motion.p
        className="mt-3 text-xs text-zinc-500"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        preview-image.png · 1920 × 1080 · 2.4 MB
      </motion.p>
    </FloatingPanelBody>
    <FloatingPanelFooter>
      <FloatingPanelCloseButton />
      <FloatingPanelSubmitButton>
        <Upload className="h-3 w-3" /> Upload
      </FloatingPanelSubmitButton>
    </FloatingPanelFooter>
  </FloatingPanelContent>
</FloatingPanelRoot>`,
    filename: "image-preview.tsx",
  },
];

export function FloatingPanelExamples() {
  return <ShowcaseGrid items={examples} />;
}
