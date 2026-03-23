import type { Metadata } from "next";
import { Ecommerce } from "@/components/flexui/pages/ecommerce";

export const metadata: Metadata = { title: "E-Commerce — FlexUI Templates" };

export default function EcommerceTemplate() {
  return <Ecommerce />;
}
