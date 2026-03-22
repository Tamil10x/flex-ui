import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/marketing/navbar";

export const metadata: Metadata = {
  title: "Blog — FlexUI",
  description: "Articles about cinematic UI components, animation techniques, and web development.",
};

const posts = [
  {
    slug: "introducing-flexui",
    title: "Introducing FlexUI: 130+ Cinematic React Components",
    date: "2026-03-15",
    excerpt: "We built FlexUI to give developers a library of production-ready, cinematic components — spring animations, 3D effects, WebGL shaders. Here's what's inside.",
    readTime: "5 min",
    category: "Announcement",
    categoryColor: "bg-violet-500/10 text-violet-400 ring-violet-500/20",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
  },
  {
    slug: "why-spring-physics",
    title: "Why Spring Physics Makes UI Feel Alive",
    date: "2026-03-08",
    excerpt: "Linear easing is predictable. Spring physics is organic. Learn how spring-based animations create interfaces that feel responsive and delightful.",
    readTime: "4 min",
    category: "Engineering",
    categoryColor: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    slug: "webgl-components",
    title: "Building WebGL Components for React",
    date: "2026-02-28",
    excerpt: "Three.js and React Three Fiber open up a world of 3D possibilities. We break down how FlexUI ships GPU-accelerated components that stay performant.",
    readTime: "6 min",
    category: "Deep Dive",
    categoryColor: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Articles & Insights
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            The FlexUI{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-500">
            Cinematic UI, animation engineering, and the future of web interfaces.
          </p>
        </div>

        {/* Featured post (first one) */}
        <Link
          href={`/blog/${posts[0].slug}`}
          className="group mb-12 block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12] hover:shadow-[0_0_40px_-15px_rgba(139,92,246,0.15)]"
        >
          <div className={`relative h-48 bg-gradient-to-br ${posts[0].gradient} sm:h-56`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="FlexUI" width={32} height={32} className="rounded-lg" />
                <span className="text-lg font-bold text-white/40">FlexUI</span>
              </div>
            </div>
            <div className="absolute left-6 top-6">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${posts[0].categoryColor}`}>
                {posts[0].category}
              </span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <time>{new Date(posts[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
              <span>·</span>
              <span>{posts[0].readTime}</span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-violet-400 sm:text-3xl">
              {posts[0].title}
            </h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">{posts[0].excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-400 group-hover:text-violet-300">
              Read article <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>

        {/* Other posts */}
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12] hover:shadow-[0_0_30px_-15px_rgba(56,189,248,0.1)]"
            >
              <div className={`h-32 bg-gradient-to-br ${post.gradient} relative`}>
                <div className="absolute left-4 top-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ring-1 ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                  <time>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-2 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/5 to-cyan-500/5 p-8 text-center sm:p-12">
          <h3 className="text-xl font-bold text-white">Stay in the loop</h3>
          <p className="mt-2 text-sm text-zinc-500">Get notified when we publish new articles and release new components.</p>
          <div className="mt-6 mx-auto flex max-w-md gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/30"
            />
            <button className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
