// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.js",
    globals: true, // Hier sicherstellen, dass 'globals' auf true gesetzt ist
  },
});
