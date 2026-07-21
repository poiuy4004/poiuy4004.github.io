export default function MeshBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden print:hidden"
    >
      <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-purple-300/20 blur-3xl animate-mesh-1 dark:bg-purple-500/25" />
      <div className="absolute -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-purple-400/15 blur-3xl animate-mesh-2 dark:bg-purple-600/20" />
      <div className="absolute left-1/3 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/20 blur-3xl animate-mesh-3 dark:bg-purple-400/15" />
    </div>
  );
}
