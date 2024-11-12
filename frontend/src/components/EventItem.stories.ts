import { type Meta, type StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import EventItem from './EventItem.vue'

import { mockEventList } from '../mock/eventList'

const meta: Meta<typeof EventItem> = {
  title: 'Components/EventItem',
  component: EventItem
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { EventItem },
    template: `
      <EventItem />
    `
  }),
  args: {
    eventList: mockEventList,
    onOnClickEventItem: fn()
  }
}
