import type { Metadata } from "next";
import { Pricing } from "@/components/flexui/pages/pricing";

export const metadata: Metadata = { title: "Pricing — FlexUI Templates" };

export default function PricingTemplate() {
  return <Pricing />;
}
