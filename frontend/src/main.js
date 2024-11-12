import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { usePlaceStore } from './stores/placeStore'
// import { useItineraryStore } from './stores/itineraryStore'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { loadGoogleApi } from './plugins/loadGoogleApi'
import router from '@/routes/index.js'

const pinia = createPinia()
const app = createApp(App)
const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY;

async function main() {
    loadFonts()
    await loadGoogleApi(apiKey)
    app.use(pinia);
    app.use(vuetify);
    app.use(router);
    await usePlaceStore().fetchPlaces();
    // await useItineraryStore().fetchItineraries();
    app.mount('#app');
}

main()
