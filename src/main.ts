import { createApp } from 'vue'
/* Router */
import { router } from '@/router'
/* App */
import App from './App.vue'
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
/* Tailwind */
import '@/styles/tailwind.scss'
import i18n from '@/locales'
/* index scss */
import '@/styles/index.scss'

const app = createApp(App)

app
  .use(i18n)
  .use(router)
  .mount('#app')
