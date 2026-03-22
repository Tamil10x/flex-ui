export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400" />
        <p className="text-sm text-zinc-600">Loading...</p>
      </div>
    </div>
  );
}
