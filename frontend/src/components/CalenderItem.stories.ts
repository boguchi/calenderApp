import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import CalenderItem from './CalenderItem.vue'

import { mockEventList } from '../mock/eventList'

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
    eventList: mockEventList,
    isFocused: false,
    onCalenderItemOnClick: fn()
  },
  argTypes: {
    dayType: {
      control: 'select',
      options: [undefined, 'saturday', 'holiday']
    }
  },
  decorators: [() => ({ template: '<div style="height: 100vh; display: flex;"><story/></div>' })]
}
