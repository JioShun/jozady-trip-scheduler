import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { usePlaceStore } from './stores/placeStore';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
await usePlaceStore().fetchPlaces();
app.mount('#app');

