import type { Meta, StoryObj } from '@storybook/vue3'
import { getHttpResponse } from '../../.storybook/utils'
import HomeView from './HomeView.vue'

import { mockEventList } from '../mock/eventList'

const jsonMockData = JSON.stringify(mockEventList)

const meta: Meta<typeof HomeView> = {
  title: 'Pages/HomeView',
  component: HomeView
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    msw: {
      handlers: getHttpResponse('http://localhost:3000/calenderEventList', jsonMockData)
    }
  }
}
