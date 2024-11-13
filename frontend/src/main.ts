import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from '../plugins/vuetify'

import 'ress'

import { setupWorker } from 'msw';
import { handlers } from './mocks/handlers';

const worker = setupWorker(...handlers);
worker.start({
  serviceWorker: {
    url: '/calenderApp/mockServiceWorker.js',
  },
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
