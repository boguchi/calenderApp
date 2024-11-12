import type { Meta, StoryObj } from '@storybook/vue3'
import CalenderTable from './CalenderTable.vue'
import { fn } from '@storybook/test'

import { mockEventList } from '../mock/eventList'

const meta: Meta<typeof CalenderTable> = {
  title: 'Components/CalenderTable',
  component: CalenderTable
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: new Date().getFullYear(),
    monthIndex: new Date().getMonth(),
    eventList: mockEventList,
    onCalenderItemOnClick: fn()
  },
  decorators: [
    () => ({
      template:
        '<div style="height: 100vh; display: flex; flex-direction: column;"><story style="flex: 1;"/></div>'
    })
  ]
}
