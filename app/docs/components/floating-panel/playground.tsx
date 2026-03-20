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
  FloatingPanelBody,
  FloatingPanelButton,
  FloatingPanelLabel,
} from "@/components/flexui/floating-panel";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Palette,
  Zap,
  Image,
  Paintbrush,
  FileText,
  Upload,
  Star,
} from "lucide-react";

const code = `"use client";

import {
  FloatingPanelRoot, FloatingPanelTrigger, FloatingPanelContent,
  FloatingPanelForm, FloatingPanelTextarea, FloatingPanelFooter,
  FloatingPanelCloseButton, FloatingPanelSubmitButton,
  FloatingPanelBody, FloatingPanelButton, FloatingPanelLabel,
} from "@/components/flexui/floating-panel";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Palette, Zap, Image, Paintbrush, FileText, Upload, Star } from "lucide-react";

export default function FloatingPanelExamples() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">FloatingPanel Examples</h1>
      <div className="flex flex-wrap gap-4">
        {/* Add Note */}
        <FloatingPanelRoot>
          <FloatingPanelTrigger title="Add Note">
            <Plus className="h-4 w-4" /> Add Note
          </FloatingPanelTrigger>
          <FloatingPanelContent className="w-80">
            <FloatingPanelForm onSubmit={(note) => console.log(note)}>
              <FloatingPanelBody>
                <FloatingPanelLabel htmlFor="note">Note</FloatingPanelLabel>
                <FloatingPanelTextarea id="note" className="min-h-[100px]" />
              </FloatingPanelBody>
              <FloatingPanelFooter>
                <FloatingPanelCloseButton />
                <FloatingPanelSubmitButton />
              </FloatingPanelFooter>
            </FloatingPanelForm>
          </FloatingPanelContent>
        </FloatingPanelRoot>

        {/* Choose Color */}
        <FloatingPanelRoot>
          <FloatingPanelTrigger title="Choose Color">
            <Palette className="h-4 w-4" /> Choose Color
          </FloatingPanelTrigger>
          <FloatingPanelContent className="w-64">
            <FloatingPanelBody>
              <div className="grid grid-cols-3 gap-2">
                {["#FF5733","#33FF57","#3357FF","#FF33F1","#33FFF1","#F1FF33"].map((c) => (
                  <motion.button key={c} className="h-12 w-12 rounded-full"
                    style={{ backgroundColor: c }}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
                ))}
              </div>
            </FloatingPanelBody>
            <FloatingPanelFooter><FloatingPanelCloseButton /></FloatingPanelFooter>
          </FloatingPanelContent>
        </FloatingPanelRoot>

        {/* Quick Actions */}
        <FloatingPanelRoot>
          <FloatingPanelTrigger title="Quick Actions">
            <Zap className="h-4 w-4" /> Quick Actions
          </FloatingPanelTrigger>
          <FloatingPanelContent className="w-56">
            <FloatingPanelBody>
              {[
                { icon: <FileText className="h-4 w-4 text-blue-400" />, label: "New File" },
                { icon: <Upload className="h-4 w-4 text-emerald-400" />, label: "Upload" },
                { icon: <Paintbrush className="h-4 w-4 text-purple-400" />, label: "Colors" },
                { icon: <Star className="h-4 w-4 text-amber-400" />, label: "Favorite" },
              ].map((a) => (
                <FloatingPanelButton key={a.label}>{a.icon} {a.label}</FloatingPanelButton>
              ))}
            </FloatingPanelBody>
            <FloatingPanelFooter><FloatingPanelCloseButton /></FloatingPanelFooter>
          </FloatingPanelContent>
        </FloatingPanelRoot>

        {/* Preview Image */}
        <FloatingPanelRoot>
          <FloatingPanelTrigger title="Preview Image">
            <Image className="h-4 w-4" /> Preview Image
          </FloatingPanelTrigger>
          <FloatingPanelContent className="w-80">
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
              <FloatingPanelSubmitButton><Upload className="h-3 w-3" /> Upload</FloatingPanelSubmitButton>
            </FloatingPanelFooter>
          </FloatingPanelContent>
        </FloatingPanelRoot>
      </div>
    </div>
  );
}`;

export function FloatingPanelPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[350px] w-full flex-col items-center justify-center gap-6">
            <h2 className="text-3xl font-bold text-white">
              FloatingPanel Examples
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Add Note */}
              <FloatingPanelRoot>
                <FloatingPanelTrigger title="Add Note">
                  Add Note
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-80">
                  <FloatingPanelForm
                    onSubmit={(note) => console.log("Submitted:", note)}
                  >
                    <FloatingPanelBody>
                      <FloatingPanelLabel htmlFor="playground-note">
                        Note
                      </FloatingPanelLabel>
                      <FloatingPanelTextarea
                        id="playground-note"
                        className="min-h-[100px]"
                      />
                    </FloatingPanelBody>
                    <FloatingPanelFooter>
                      <FloatingPanelCloseButton />
                      <FloatingPanelSubmitButton />
                    </FloatingPanelFooter>
                  </FloatingPanelForm>
                </FloatingPanelContent>
              </FloatingPanelRoot>

              {/* Choose Color */}
              <FloatingPanelRoot>
                <FloatingPanelTrigger title="Choose Color">
                  Choose Color
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-64">
                  <FloatingPanelBody>
                    <div className="grid grid-cols-3 gap-2">
                      <AnimatePresence>
                        {[
                          "#FF5733",
                          "#33FF57",
                          "#3357FF",
                          "#FF33F1",
                          "#33FFF1",
                          "#F1FF33",
                        ].map((color) => (
                          <motion.button
                            key={color}
                            className="h-12 w-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            style={{ backgroundColor: color }}
                            onClick={() =>
                              console.log(`Selected color: ${color}`)
                            }
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

              {/* Quick Actions */}
              <FloatingPanelRoot>
                <FloatingPanelTrigger title="Quick Actions">
                  Quick Actions
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-56">
                  <FloatingPanelBody>
                    <AnimatePresence>
                      {[
                        {
                          icon: (
                            <FileText className="h-4 w-4 text-blue-400" />
                          ),
                          label: "New File",
                        },
                        {
                          icon: (
                            <Upload className="h-4 w-4 text-emerald-400" />
                          ),
                          label: "Upload Image",
                        },
                        {
                          icon: (
                            <Paintbrush className="h-4 w-4 text-purple-400" />
                          ),
                          label: "Edit Colors",
                        },
                        {
                          icon: <Star className="h-4 w-4 text-amber-400" />,
                          label: "Add to Favorites",
                        },
                      ].map((action, index) => (
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

              {/* Preview Image */}
              <FloatingPanelRoot>
                <FloatingPanelTrigger title="Preview Image">
                  Preview Image
                </FloatingPanelTrigger>
                <FloatingPanelContent className="w-80">
                  <FloatingPanelBody>
                    <motion.div
                      className="flex h-[200px] items-center justify-center rounded-lg bg-zinc-800"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image className="h-10 w-10 text-zinc-600" />
                    </motion.div>
                    <motion.p
                      className="mt-3 text-xs text-zinc-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      preview-image.png &middot; 1920 &times; 1080 &middot; 2.4
                      MB
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
            </div>
          </div>
        }
        code={code}
        filename="floating-panel-examples.tsx"
      />
    </div>
  );
}
