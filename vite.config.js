import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Safe filtering of environment variables to mimic Create React App
  const processEnv = { NODE_ENV: mode };
  for (const key in env) {
    if (key.startsWith('REACT_APP_')) {
      processEnv[key] = env[key];
    }
  }

  return {
    define: {
      'process.env': processEnv
    },
    server: {
      proxy: {
        '/api': {
          target: processEnv.REACT_APP_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          bypass: (req, res) => {
            // If no backend is explicitly configured via environment variable,
            // intercept the request and return empty JSON to prevent 502 errors 
            // in the console, while still letting useFetchJson fall back gracefully.
            if (!processEnv.REACT_APP_API_URL) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({}));
              return true;
            }
          }
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        api: path.resolve(__dirname, "./src/api"),
        assets: path.resolve(__dirname, "./src/assets"),
        components: path.resolve(__dirname, "./src/components"),
        config: path.resolve(__dirname, "./src/config"),
        data: path.resolve(__dirname, "./src/data"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        utils: path.resolve(__dirname, "./src/utils"),
        variables: path.resolve(__dirname, "./src/variables"),
        views: path.resolve(__dirname, "./src/views"),
        contexts: path.resolve(__dirname, "./src/contexts"),
        "routes.jsx": path.resolve(__dirname, "./src/routes.jsx"),
        "App.jsx": path.resolve(__dirname, "./src/App.jsx"),
      },
    },
  };
});
