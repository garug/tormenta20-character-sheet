import { createApp } from 'vue'
import App from './App.vue';
import initGlobalComponents from './components/_globals';

const app = createApp(App);

initGlobalComponents(app);

app.mount('#app');