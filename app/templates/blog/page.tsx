import type { Metadata } from "next";
import { Blog } from "@/components/flexui/pages/blog";

export const metadata: Metadata = { title: "Blog — FlexUI Templates" };

export default function BlogTemplate() {
  return <Blog />;
}
