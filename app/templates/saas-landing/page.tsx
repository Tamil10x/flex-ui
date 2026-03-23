import type { Metadata } from "next";
import { SaasLanding } from "@/components/flexui/pages/saas-landing";

export const metadata: Metadata = { title: "SaaS Landing — FlexUI Templates" };

export default function SaasLandingTemplate() {
  return <SaasLanding />;
}
