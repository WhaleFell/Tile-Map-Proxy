import "virtual:uno.css"

// load vue core
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

// Vuetify
import vuetify from "@/plugins/vuetify"

// leaflet map
// solve the vue-leaflet issue:
// https://github.com/vue-leaflet/vue-leaflet/issues/278
import "leaflet/dist/leaflet.css"
import "leaflet"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount("#app")
