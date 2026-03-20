import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flexui.dev"),
  title: {
    template: "FlexUI — %s",
    default: "FlexUI — Cinematic React Components",
  },
  description:
    "Premium animated components with Framer Motion and Three.js. Copy-paste ready for your Next.js app.",
  keywords: [
    "React",
    "Next.js",
    "UI Components",
    "Framer Motion",
    "Three.js",
    "Tailwind CSS",
    "Animated Components",
    "FlexUI",
  ],
  openGraph: {
    title: "FlexUI — Cinematic React Components",
    description:
      "Premium animated components with Framer Motion and Three.js. Copy-paste ready for your Next.js app.",
    url: "https://flexui.dev",
    siteName: "FlexUI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexUI — Cinematic React Components",
    description:
      "Premium animated components with Framer Motion and Three.js. Copy-paste ready for your Next.js app.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
