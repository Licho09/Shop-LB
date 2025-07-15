import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/Shop-LB/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
}))
