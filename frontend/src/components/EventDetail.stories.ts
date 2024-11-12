import { type Meta, type StoryObj } from '@storybook/vue3'
import EventDetail from './EventDetail.vue'
import { mockEventList } from '../mock/eventList'

const meta: Meta<typeof EventDetail> = {
  title: 'Components/EventDetail',
  component: EventDetail
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { EventDetail },
    template: `
      <EventDetail />
    `
  }),
  args: {
    event: mockEventList[0]
  }
}
