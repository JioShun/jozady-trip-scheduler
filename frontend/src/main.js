import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { usePlaceStore } from './stores/placeStore'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

const pinia = createPinia()
const app = createApp(App)

loadFonts()

app.use(pinia);
await usePlaceStore().fetchPlaces();
app.use(vuetify);
app.mount('#app');
