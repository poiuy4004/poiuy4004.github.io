import { useEffect } from "react";

type PageMetaOptions = {
  title?: string;
  description?: string;
  canonicalPath?: string;
};

function setMetaContent(selector: string, content: string): string | null {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) return null;
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return prev;
}

function setLinkHref(selector: string, href: string): string | null {
  const el = document.querySelector<HTMLLinkElement>(selector);
  if (!el) return null;
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
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

    const prevDesc = description
      ? setMetaContent('meta[name="description"]', description)
      : null;
    const prevOgTitle = title
      ? setMetaContent('meta[property="og:title"]', title)
      : null;
    const prevOgDesc = description
      ? setMetaContent('meta[property="og:description"]', description)
      : null;
    const prevTwTitle = title
      ? setMetaContent('meta[name="twitter:title"]', title)
      : null;
    const prevTwDesc = description
      ? setMetaContent('meta[name="twitter:description"]', description)
      : null;

    let prevCanonical: string | null = null;
    let prevOgUrl: string | null = null;
    if (canonicalPath) {
      const fullUrl = `${window.location.origin}${canonicalPath}`;
      prevCanonical = setLinkHref('link[rel="canonical"]', fullUrl);
      prevOgUrl = setMetaContent('meta[property="og:url"]', fullUrl);
    }

    return () => {
      if (title) document.title = prevTitle;
      if (description && prevDesc !== null) {
        setMetaContent('meta[name="description"]', prevDesc);
      }
      if (title && prevOgTitle !== null) {
        setMetaContent('meta[property="og:title"]', prevOgTitle);
      }
      if (description && prevOgDesc !== null) {
        setMetaContent('meta[property="og:description"]', prevOgDesc);
      }
      if (title && prevTwTitle !== null) {
        setMetaContent('meta[name="twitter:title"]', prevTwTitle);
      }
      if (description && prevTwDesc !== null) {
        setMetaContent('meta[name="twitter:description"]', prevTwDesc);
      }
      if (canonicalPath) {
        if (prevCanonical !== null) {
          setLinkHref('link[rel="canonical"]', prevCanonical);
        }
        if (prevOgUrl !== null) {
          setMetaContent('meta[property="og:url"]', prevOgUrl);
        }
      }
    };
  }, [title, description, canonicalPath]);
}
