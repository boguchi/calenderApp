<script setup lang="ts">
import type { EventItemType } from '../utils/types/event'

interface Props {
  eventList: EventItemType[]
}

const { eventList } = defineProps<Props>()
const emit = defineEmits(['onClickEventItem'])

const computedLabelColor = (value: EventItemType['labelColor']) => {
  switch (value) {
    case 'red':
      return '#f66'
    case 'blue':
      return '#668aff'
    case 'green': {
      return '#66ffab'
    }
  }
}

const onClickEventItem = (event: EventItemType) => {
  emit('onClickEventItem', event)
}
</script>

<template>
  <div
    v-for="(event, index) in eventList"
    :key="index"
    :class="$style.EventItem"
    @click="onClickEventItem(event)"
  >
    <div :class="$style.EventItem__time">
      <template v-if="event.startTime && event.endTime">
        <p>{{ event.startTime }}</p>
        <p>{{ event.endTime }}</p>
      </template>
      <template v-else>
        <p>終日</p>
      </template>
    </div>
    <div
      :class="$style.EventItem__label"
      :style="`background-color: ${computedLabelColor(event.labelColor)}`"
    ></div>
    <div :class="$style.EventItem__title">{{ event.title }}</div>
  </div>
</template>

<style lang="scss" module>
.EventItem {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px;
  cursor: pointer;

  &__time {
    font-size: 10px;
    min-width: 24px;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
  }

  &__label {
    width: 2px;
    min-height: 35px;
  }

  &__title {
    flex: 1;
  }
}
</style>
