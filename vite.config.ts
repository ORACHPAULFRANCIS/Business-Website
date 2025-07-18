import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// You can import the componentTagger if it's a local file or installed
// import { componentTagger } from './path/to/your/componentTagger-plugin'; // Adjust path if needed

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({ // Added { mode } parameter for conditional config
  base: "/Business-Website/", // Crucial for GitHub Project Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Conditionally load plugins based on mode
    mode === 'development' && componentTagger(), // Ensure componentTagger is imported or defined
  ].filter(Boolean), // Filter out 'false' values if a plugin isn't loaded
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
