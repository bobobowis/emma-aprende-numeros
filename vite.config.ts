import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/emma-aprende-numeros/",
  plugins: [react(), ghPages()],
});
