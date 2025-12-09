import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./testSetup.js",
    },
    base: "/",
  };

  if (command !== "serve") {
    config.base = "/ghibliArchive/";
  }

  return config;
});
