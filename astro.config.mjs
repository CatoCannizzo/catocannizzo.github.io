import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import tunnel from "astro-tunnel";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";

// !!! remove tunnel?

// https://astro.build/config
// Make sure playformCompress is last
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    tunnel(),
    sitemap(),
    playformCompress({ Image: false }),
  ],
  site: "https://catocannizzo.github.io/",
  base: "",
});
