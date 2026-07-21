import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { buildStructuredData } from "./src/main/data/structuredData";

/** `<` is escaped so a value can never terminate the script element early. */
function toJsonLdScript(data: object): string {
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Keeps JSON-LD generated from src/main/data instead of hand-maintained
      // in index.html, so it can never drift from the rendered portfolio.
      name: "structured-data",
      transformIndexHtml(html) {
        const scripts = buildStructuredData().map(toJsonLdScript).join("\n");
        return html.replace("</head>", `${scripts}\n</head>`);
      },
    },
    {
      name: "spa-404-fallback",
      apply: "build",
      closeBundle() {
        const src = resolve("dist/index.html");
        const dest = resolve("dist/404.html");
        if (existsSync(src)) {
          copyFileSync(src, dest);
        }
      },
    },
  ],
});
