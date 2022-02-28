import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",

      "/@src/": `${path.resolve(__dirname, "src")}/`,
      "/@components/": `${path.resolve(__dirname, "src")}/components/`,
      "/@views/": `${path.resolve(__dirname, "src")}/views/`,
      "/@images/": `${path.resolve(__dirname, "src")}/assets/images/`,
      "/@utils/": `${path.resolve(__dirname, "src")}/utils/`,
      "/@context/": `${path.resolve(__dirname, "src")}/context/`,
    },
  },
});
