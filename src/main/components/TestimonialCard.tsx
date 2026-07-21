import Card from "./Card";

type TestimonialCardProps = {
  quote: string;
  author: string;
};

export default function TestimonialCard({ quote, author }: TestimonialCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col">
      <span
        aria-hidden
        className="mb-2 text-3xl leading-none text-purple-400/70 dark:text-purple-300/70"
      >
        “
      </span>
      <blockquote className="flex flex-1 flex-col">
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
          {quote}
        </p>
        <footer className="mt-4 text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          — {author}
        </footer>
      </blockquote>
    </Card>
  );
}
