import { type Meta, type StoryObj } from '@storybook/vue3'
import { expect, userEvent, waitFor, within, screen } from '@storybook/test'
import CreateEventDialog from './CreateEventDialog.vue'
import { mockEventList } from '../mock/eventList'

const meta: Meta<typeof CreateEventDialog> = {
  title: 'Components/CreateEventDialog',
  component: CreateEventDialog,
  render: (args) => ({
    setup() {
      return { args }
    },
    components: { CreateEventDialog },
    template: `
    <CreateEventDialog>
      open dialog
    </CreateEventDialog>
    `
  })
}

const playTemplate = (expectText: string) => {
  return async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText('open dialog')

    waitFor(async () => {
      await userEvent.click(trigger)
      const bottomSheet = screen.getByRole('dialog')
      const element = bottomSheet.getElementsByClassName('v-toolbar-title__placeholder')[0]
        .innerHTML
      expect(element).toMatch(expectText)
    })
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { event: mockEventList[0] },
  play: playTemplate('編集')
}

export const 新規作成: Story = {
  args: { newEventDate: new Date() },
  play: playTemplate('追加')
}
