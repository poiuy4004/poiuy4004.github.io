import { useEffect } from "react";

type PageMetaOptions = {
  title?: string;
  description?: string;
  canonicalPath?: string;
};

type Target = [selector: string, attr: "content" | "href", value: string];

function apply([sel, attr, val]: Target): string | null {
  const el = document.querySelector(sel);
  if (!el) return null;
  const prev = el.getAttribute(attr);
  el.setAttribute(attr, val);
  return prev;
}

export function usePageMeta({
  title,
  description,
  canonicalPath,
}: PageMetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;
    const url = canonicalPath ? `${window.location.origin}${canonicalPath}` : "";

    const targets = [
      title && ['meta[property="og:title"]', "content", title],
      title && ['meta[name="twitter:title"]', "content", title],
      description && ['meta[name="description"]', "content", description],
      description && ['meta[property="og:description"]', "content", description],
      description && ['meta[name="twitter:description"]', "content", description],
      canonicalPath && ['link[rel="canonical"]', "href", url],
      canonicalPath && ['meta[property="og:url"]', "content", url],
    ].filter(Boolean) as Target[];

    const prev = targets.map(apply);
    return () => {
      if (title) document.title = prevTitle;
      targets.forEach(([sel, attr], i) => {
        const v = prev[i];
        if (v !== null) document.querySelector(sel)?.setAttribute(attr, v);
      });
    };
  }, [title, description, canonicalPath]);
}
