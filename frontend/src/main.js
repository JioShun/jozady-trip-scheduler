import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
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
    app.mount('#app');
}

main()
