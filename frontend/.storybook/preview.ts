import type { Preview } from '@storybook/vue3'
import { initialize, mswDecorator, mswLoader } from 'msw-storybook-addon'
import { setup } from '@storybook/vue3'
import { withVuetifyTheme } from './withVeutifyTheme.decorator'
import vuetify from '../plugins/vuetify'
import { createPinia } from 'pinia'

import 'ress'
import '../src/assets/main.css'
import '../src/assets/base.css'

setup((app) => {
  app.use(createPinia())
  app.use(vuetify)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'fullscreen'
  },
  loaders: [mswLoader]
}

export default preview

export const decorators = [withVuetifyTheme, mswDecorator]

const options =
  location.hostname !== 'boguchi.github.io'
    ? {}
    : {
        serviceWorker: {
          url: '/calenderApp/mockServiceWorker.js'
        }
      }
initialize(options)
