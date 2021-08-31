import { createApp } from 'vue'
/* Router */
import { router } from '@/router'
import '@/router/beforeRouter'
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
/* vue form multiple select css */
import '@vueform/multiselect/themes/default.css'
/* Store */
import { store } from '@/store'

/* Dayjs plugins */
import { initDayjsPlugins } from '@/utils/libs/dayjs'
initDayjsPlugins()

/* Remove after set firebase */
import { initDummyData } from '@/dummy'
initDummyData()

const app = createApp(App)

app
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app')
