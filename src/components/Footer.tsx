export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-neutral-200 py-10 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <p>© {year} Code.Min</p>
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
        Yong-Min, Jang
      </p>
    </footer>
  );
}
