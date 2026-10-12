import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // The browser only ever talks to the dev server; Vite forwards /api/*
      // to the API. Same-origin from the browser's point of view, so no CORS.
      "/api": {
        target: "http://localhost:5277",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
