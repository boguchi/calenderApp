import type { Meta, StoryObj } from '@storybook/vue3'
import CalenderTable from './CalenderTable.vue'

const eventList = [
  { year: 2024, monthIndex: 8, dating: 1, name: 'hoge', themeColor: 'red' },
  { year: 2024, monthIndex: 8, dating: 6, name: 'hoge', themeColor: 'green' },
  { year: 2024, monthIndex: 8, dating: 8, name: 'hoge', themeColor: 'blue' },
  { year: 2024, monthIndex: 8, dating: 14, name: 'hoge', themeColor: 'red' },
  { year: 2024, monthIndex: 8, dating: 25, name: 'hoge', themeColor: 'blue' },
  { year: 2024, monthIndex: 8, dating: 25, name: 'hoge', themeColor: 'green' }
]

const meta: Meta<typeof CalenderTable> = {
  title: 'Components/CalenderTable',
  component: CalenderTable
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    year: 2024,
    monthIndex: 8,
    eventList: eventList
  },
  decorators: [
    () => ({
      template:
        '<div style="height: 100vh; display: flex; flex-direction: column;"><story style="flex: 1;"/></div>'
    })
  ]
}
