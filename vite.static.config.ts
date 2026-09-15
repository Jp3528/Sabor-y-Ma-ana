import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const projectRoot = import.meta.dirname;

function makePublicImagesRelative(): Plugin {
  const publicImage = /(["'])\/([^"'\n]+\.(?:avif|gif|jpe?g|png|webp))\1/g;

  return {
    name: "relative-public-images",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("/app/") && !id.includes("\\app\\")) return null;

      const transformed = code.replace(
        publicImage,
        (_match, quote: string, imagePath: string) => `${quote}./${imagePath}${quote}`,
      );

      return transformed === code ? null : { code: transformed, map: null };
    },
  };
}

export default defineConfig({
  root: resolve(projectRoot, "static-src"),
  base: "./",
  publicDir: resolve(projectRoot, "public"),
  plugins: [makePublicImagesRelative(), react()],
  build: {
    outDir: resolve(projectRoot, "live-server"),
    emptyOutDir: true,
  },
});
