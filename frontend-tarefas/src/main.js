// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ícones

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark' // Opcional: modo escuro fica bonito
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Adiciona Vuetify

app.mount('#app')