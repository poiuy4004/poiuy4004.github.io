export default function IntroAmbient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -left-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-purple-300/15 blur-3xl animate-mesh-1 dark:bg-purple-500/20" />
      <div className="absolute -right-24 top-1/3 h-[18rem] w-[18rem] rounded-full bg-purple-400/10 blur-3xl animate-mesh-2 dark:bg-purple-600/15" />
    </div>
  );
}
