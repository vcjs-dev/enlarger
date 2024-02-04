import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import DemoifyUI from 'demoify'

import 'demoify/lib/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(DemoifyUI)
app.use(createPinia())
app.use(router)

app.mount('#app')
