import { createApp } from "vue";
import App from "./App.vue";
import initGlobalComponents from "./components/_globals";
import { characterStore } from "./character.store";

const app = createApp(App);

initGlobalComponents(app);

app.use(characterStore).mount("#app");
