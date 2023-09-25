import { defineConfig, UserConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import Narrat from "vite-plugin-narrat";

function viteGodotCorsPlugin() {
  return {
    name: "configure-response-headers",
    configureServer: (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        next();
      });
    },
  };
}
function addGodotToConfig(conf: UserConfig) {
  console.log("building a godot game, using special config");
  conf.plugins!.push(viteGodotCorsPlugin());
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const conf: UserConfigExport = {
    base: "",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [vue(), Narrat()],
  };
  addGodotToConfig(conf);
  return conf;
});
