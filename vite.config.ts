import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import solid from "@solidjs/vite-plugin";

export default defineConfig({
  // Turnkey client mode: no index.html and no mount file — the plugin generates
  // the entries around src/App.tsx (wrapped in src/Document.tsx) and `vite build`
  // prerenders the shell into a purely static dist/client.
  plugins: [
    UnoCSS(),
    solid({
      // The dev toolbar holds the post-upload `list` refresh, freezing the
      // page under `vite dev`. It is dev-only; production never includes it.
      start: { nodeServer: true, devtools: false },
      ssr: true,
      serverFunctions: {
        serverSetup: "src/server-functions-setup.ts",
      },
      diagnostics: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    assetsInlineLimit: 0,
  },
});
