import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import CalenderItem from './CalenderItem.vue'

const meta: Meta<typeof CalenderItem> = {
  title: 'Components/CalenderItem',
  component: CalenderItem
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    dating: 15,
    isToday: false,
    dayType: undefined,
    eventList: [
      { name: '旅行', themeColor: 'green' },
      { name: '買い物', themeColor: 'blue' }
    ],
    isFocused: false,
    onCalenderItemOnClick: fn(),
    onEventOnClick: fn()
  },
  argTypes: {
    dayType: {
      control: 'select',
      options: [undefined, 'saturday', 'holiday']
    }
  },
  decorators: [() => ({ template: '<div style="height: 100vh; display: flex;"><story/></div>' })]
}
