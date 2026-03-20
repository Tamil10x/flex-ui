import type { Metadata } from "next";
import { AIStudio } from "./ai-studio";

export const metadata: Metadata = {
  title: "AI Studio — FlexUI",
  description: "Generate custom FlexUI components with AI",
};

export default function StudioPage() {
  return <AIStudio />;
}
