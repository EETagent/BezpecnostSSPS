import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "safari12",
    polyfillDynamicImport: false,
  },
  server: {
    proxy: {
      "/backend": "http://localhost:8000",
    },
  },
});
