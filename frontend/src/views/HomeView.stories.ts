import type { Meta, StoryObj } from '@storybook/vue3'
import { screen, userEvent, within, expect, waitFor } from '@storybook/test'
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

export const Test: Story = {
  parameters: {
    msw: {
      handlers: getHttpResponse('http://localhost:3000/calenderEventList', jsonMockData)
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('New Event')

    waitFor(async () => {
      await userEvent.click(trigger)

      const element = screen.getByRole('dialog')
      const form = element.getElementsByClassName('v-form')[0]
      const title = form.getElementsByTagName('input')[0]
      await userEvent.type(title, 'タイトル')

      const button = element.getElementsByTagName('button')[1]
      await userEvent.click(button)

      const createdEvent = canvas.getByText('タイトル')
      expect(createdEvent).toBeInTheDocument()
    })
  }
}
