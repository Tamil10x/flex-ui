import type { Metadata } from "next";
import { Dashboard } from "@/components/flexui/pages/dashboard";

export const metadata: Metadata = { title: "Dashboard — FlexUI Templates" };

export default function DashboardTemplate() {
  return <Dashboard />;
}
