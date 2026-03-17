import { Navbar } from "@/components/marketing/navbar";
import { DocsSidebar } from "@/components/docs/sidebar";
import { MobileSidebar } from "@/components/docs/mobile-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="mx-auto flex max-w-7xl px-6 pt-16">
        <DocsSidebar />
        <main className="min-w-0 flex-1 py-8 lg:pl-10">
          <MobileSidebar />
          <article className="prose-invert max-w-3xl">{children}</article>
        </main>
      </div>
    </div>
  );
}
