<script setup lang="ts">
import { computed, onMounted } from 'vue'

type option = {
  title: string
  value: any
}
interface Props {
  options: option[]
  defaultValue?: any
}

const { options, defaultValue } = defineProps<Props>()

const internalSelectedValue = defineModel()
const selectedValue = computed({
  get() {
    return internalSelectedValue.value
  },
  set(newVal) {
    internalSelectedValue.value = newVal
  }
})

onMounted(() => {
  const defaultSelectedValue = options.find((option) => {
    return option.value === defaultValue
  })
  if (defaultSelectedValue) {
    selectedValue.value = defaultSelectedValue.value
  } else {
    selectedValue.value = options[0].value
  }
})
</script>

<template>
  <div :class="$style.SelectBox">
    <div :class="$style.SelectBox__slotContents">
      <slot />
    </div>
    <select v-model="selectedValue" :class="$style.SelectBox__select">
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" module>
.SelectBox {
  position: relative;

  &__slotContents {
    pointer-events: none;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  &__select {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
