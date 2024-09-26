import { ref } from 'vue'
import { type Meta, type StoryObj } from '@storybook/vue3'
import SelectBox from './SelectBox.vue'

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    setup() {
      const selectedValue = ref()
      return { args, selectedValue }
    },
    components: { SelectBox },
    template: `
    <SelectBox v-model="selectedValue">
      selected: {{ selectedValue }}
    </SelectBox>
    `
  }),
  args: {
    options: [
      {
        title: 'title1',
        value: 'value1'
      },
      {
        title: 'title2',
        value: 'value2'
      },
      {
        title: 'title3',
        value: 'value3'
      }
    ],
    defaultValue: 'value2'
  }
}
