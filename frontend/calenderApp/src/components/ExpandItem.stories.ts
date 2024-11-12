import { type Meta, type StoryObj } from '@storybook/vue3'
import ExpandItem from './ExpandItem.vue'
import { ref } from 'vue'

const meta: Meta<typeof ExpandItem> = {
  title: 'Components/ExpandItem',
  component: ExpandItem
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    setup() {
      const isShow = ref(false)
      const click = () => {
        isShow.value = !isShow.value
      }
      return { args, isShow, click }
    },
    components: { ExpandItem },
    template: `
    <Button @click="click">click</button>
    <ExpandItem :is-show="isShow">
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents<br />
      inner contents
    </ExpandItem>
    `
  }),
  args: {
    // isShow: false
  }
}
