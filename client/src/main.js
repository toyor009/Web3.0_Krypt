import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";

import "/@src/css/main.css";
import "/@src/globals";

const app = createApp(App);
const components = import.meta.globEager("./components/*.vue");

Object.entries(components).forEach(([path, definition]) => {
  // Get component name based on filename
  const componentName = path
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");

  // Register component globally
  app.component(componentName, definition.default);
});

app.component("FontAwesomeIcon", FontAwesomeIcon);
app.use(router);
app.mount("#app");
