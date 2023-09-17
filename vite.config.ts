import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // client
      "@components": path.resolve(__dirname, "src/client/components"),
      "@stores": path.resolve(__dirname, "src/client/stores"),
      "@apis": path.resolve(__dirname, "src/client/apis"),
      // server
      "@shared": path.resolve(__dirname, "src/shared"),
      "@controllers": path.resolve(__dirname, "src/server/controllers"),
      "@services": path.resolve(__dirname, "src/server/services"),
    },
  },
});
