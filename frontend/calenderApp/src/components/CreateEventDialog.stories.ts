import { ref } from 'vue'
import { type Meta, type StoryObj } from '@storybook/vue3'
import { userEvent, within } from '@storybook/test'
import CreateEventDialog from './CreateEventDialog.vue'
import { mockEventList } from '../mock/eventList'

const meta: Meta<typeof CreateEventDialog> = {
  title: 'Components/CreateEventDialog',
  component: CreateEventDialog
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    setup() {
      const selectedValue = ref()
      return { args, selectedValue }
    },
    components: { CreateEventDialog },
    template: `
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    `
  }),
  args: {
    event: mockEventList[0]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('open dialog')
    await userEvent.click(trigger)
  }
}

export const 新規作成: Story = {
  render: (args) => ({
    setup() {
      const selectedValue = ref()
      return { args, selectedValue }
    },
    components: { CreateEventDialog },
    template: `
    <CreateEventDialog v-model="selectedValue">
      open dialog
    </CreateEventDialog>
    `
  }),
  args: {
    newEventDate: new Date()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('open dialog')
    await userEvent.click(trigger)
  }
}
