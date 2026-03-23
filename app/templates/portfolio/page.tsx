import type { Metadata } from "next";
import { Portfolio } from "@/components/flexui/pages/portfolio";

export const metadata: Metadata = { title: "Portfolio — FlexUI Templates" };

export default function PortfolioTemplate() {
  return <Portfolio />;
}
