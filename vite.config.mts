import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "worker" } }),
    redwood(),
    // biome-ignore lint/suspicious/noExplicitAny: typescript bad
    tailwindcss() as any as Plugin,
  ],
});
