import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import store from './store'
import router from './router'
import VueAxios from 'vue-axios'
import axios from './axios'
import Notifications from '@kyvg/vue3-notification'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import { createI18n } from 'vue-i18n'
import Translations from './translations'
const i18n = createI18n(Translations)
createApp(App)
  .use(store)
  .use(router)
  .component('EasyDataTable', Vue3EasyDataTable)
  .use(Notifications)
  .use(VueAxios, axios)
  .use(i18n)
  .mount('#app')