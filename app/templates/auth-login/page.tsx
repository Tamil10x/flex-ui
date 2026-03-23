import type { Metadata } from "next";
import { AuthLogin } from "@/components/flexui/pages/auth-login";

export const metadata: Metadata = { title: "Auth Login — FlexUI Templates" };

export default function AuthLoginTemplate() {
  return <AuthLogin />;
}
