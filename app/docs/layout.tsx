import { Navbar } from "@/components/marketing/navbar";
import { DocsSidebar } from "@/components/docs/sidebar";
import { MobileSidebar } from "@/components/docs/mobile-sidebar";
import { CommandPalette } from "@/components/docs/command-palette";
import { TableOfContents } from "@/components/docs/toc";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <CommandPalette />
      <div className="mx-auto flex max-w-7xl px-6 pt-16">
        <DocsSidebar />
        <main className="min-w-0 flex-1 py-8 lg:pl-10">
          <MobileSidebar />
          <div className="flex gap-8">
            <article className="prose-invert min-w-0 max-w-3xl flex-1">
              {children}
            </article>
            <TableOfContents />
          </div>
        </main>
      </div>
    </div>
  );
}
