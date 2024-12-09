<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import type { EventItemType } from '../utils/types/event'

interface Props {
  dating: number
  isToday: boolean
  dayType?: 'saturday' | 'holiday'
  eventList?: EventItemType[]
  isFocused: boolean
}

const { dating, isToday, dayType, eventList, isFocused = false } = defineProps<Props>()
defineEmits(['calenderItemOnClick'])

const $style = useCssModule()

const modifierCalenderItemClass = computed(() => {
  return isFocused ? $style['CalenderItem--isFocused'] : undefined
})
const modifierDatingClass = computed(() => {
  let styleList = []
  if (isToday) {
    if (dayType) {
      dayType === 'saturday'
        ? styleList.push($style['CalenderItem__dating--todayAndSaturday'])
        : undefined
      dayType === 'holiday'
        ? styleList.push($style['CalenderItem__dating--todayAndHoliday'])
        : undefined
    } else {
      isToday ? styleList.push($style['CalenderItem__dating--today']) : undefined
    }
  } else {
    dayType === 'saturday' ? styleList.push($style['CalenderItem__dating--saturday']) : undefined
    dayType === 'holiday' ? styleList.push($style['CalenderItem__dating--holiday']) : undefined
  }
  return styleList
})

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
</script>

<template>
  <div
    :class="[$style.CalenderItem, modifierCalenderItemClass]"
    @click="$emit('calenderItemOnClick')"
  >
    <div :class="[$style.CalenderItem__dating, modifierDatingClass]">{{ dating }}</div>
    <div :class="$style.CalenderItem__contentsWrap">
      <div
        v-for="(event, index) in eventList"
        :key="index"
        :class="$style.CalenderItem__event"
        :style="{ 'background-color': computedLabelColor(event.labelColor) }"
      >
        {{ event.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.CalenderItem {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 4px 2px;

  &--isFocused {
    background-color: #ededed;
  }

  &__dating {
    font-family: monospace;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 4px;

    &--today {
      color: #fff;
      background-color: #000;
    }

    &--saturday {
      color: #297bff;
    }

    &--holiday {
      color: #ff2121;
    }

    &--todayAndSaturday {
      color: #fff;
      background-color: #297bff;
    }

    &--todayAndHoliday {
      color: #fff;
      background-color: #ff2121;
    }
  }

  &__contentsWrap {
    width: 100%;
    margin-top: 8px;
    overflow: scroll;
  }

  &__event {
    font-size: 10px;
    text-align: center;
    border-radius: 4px;
    color: #fff;

    &:not(:first-of-type) {
      margin-top: 4px;
    }
  }
}
</style>
