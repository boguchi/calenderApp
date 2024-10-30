import { type Meta, type StoryObj } from '@storybook/vue3'
import EventDetail from './EventDetail.vue'

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
    event: {
      title: 'タイトル',
      startDate: new Date(),
      endDate: new Date(),
      // startTime?: string,
      // endTime?: string,
      labelColor: 'red',
      memo: 'メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ'
    }
  }
}
