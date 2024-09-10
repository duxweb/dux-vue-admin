import { Dux } from 'dux-vue-admin'
import { createApp } from 'vue'
import App from './App.vue'
import '../src/style.css'

const app = createApp(App)

app.use(Dux)

app.mount('#app')
