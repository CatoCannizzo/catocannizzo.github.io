import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import tunnel from "astro-tunnel";
import sitemap from "@astrojs/sitemap";

// !!! remove tunnel?

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    tunnel(),
    sitemap(),
  ],
  site: "https://catocannizzo.github.io/",
  base: "",
});
