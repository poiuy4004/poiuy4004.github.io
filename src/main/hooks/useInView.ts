import { useEffect, useState } from "react";

type UseInViewOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInView<T extends Element>(options: UseInViewOptions = {}) {
  const { rootMargin = "0px 0px -10% 0px", threshold = 0.1, once = true } = options;
  const [node, setNode] = useState<T | null>(null);
  // Default to visible when IntersectionObserver is unavailable (no flash / SSR-safe).
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin, threshold, once]);

  return { ref: setNode, inView };
}
