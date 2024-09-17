import type { Preview } from '@storybook/vue3'
import { initialize, mswLoader } from 'msw-storybook-addon'

import 'ress'

initialize()

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
