import type { Preview } from '@storybook/vue3'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { setup } from '@storybook/vue3'
import { withVuetifyTheme } from './withVeutifyTheme.decorator'
import vuetify from '../plugins/vuetify'

import 'ress'

initialize()

setup((app) => {
  app.use(vuetify)
})

export const decorators = [withVuetifyTheme]

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
