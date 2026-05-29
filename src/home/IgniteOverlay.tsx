type IgniteOverlayProps = {
  originX: number;
  originY: number;
};

export default function IgniteOverlay({ originX, originY }: IgniteOverlayProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50 h-6 w-6 rounded-full animate-ignite-bloom"
      style={{
        left: originX,
        top: originY,
        willChange: "transform, background-color",
      }}
    />
  );
}
