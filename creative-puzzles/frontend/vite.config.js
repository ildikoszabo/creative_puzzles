import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

export default defineConfig(() => {
  return {
    base: "./",
    publicDir: "public",
    build: {
      outDir: "build",
      copyPublicDir: true,
    },
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
      alias: [
        { find: "@", replacement: path.resolve(process.cwd(), "src") },
        {
          find: "common",
          replacement: path.resolve(process.cwd(), "src/common"),
        },
        {
          find: "pages",
          replacement: path.resolve(process.cwd(), "src/pages"),
        },
        {
          find: "assets",
          replacement: path.resolve(process.cwd(), "src/assets"),
        },
      ],
    },
    server: {
      open: true, // open the app in browser on its own, no manual intervention
      port: 3000,
    },
  };
});
