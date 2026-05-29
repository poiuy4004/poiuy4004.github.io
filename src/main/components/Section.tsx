import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl text-left">
        {(eyebrow || title || description) && (
          <Reveal as="header" className="mb-10 md:mb-12">
            {eyebrow && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-purple-500 dark:text-purple-300">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="!mt-0 !mb-2 !text-3xl !leading-tight md:!text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
