import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sambarlien.com",
  // Lists every page for search engines, so nothing has to be discovered by chance.
  integrations: [sitemap()],
});
