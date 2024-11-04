<script setup lang="ts">
import { computed, useCssModule } from 'vue'
import type { EventItemType } from '../utils/types/event'
import { getDayString } from '../utils/date'
import CreateEventDialog from './CreateEventDialog.vue'

interface Props {
  event: EventItemType
}

const { event } = defineProps<Props>()
const emit = defineEmits(['closeEventDetail'])

const cssModule = useCssModule
const $style = cssModule()

const closeEventDetail = () => {
  emit('closeEventDetail')
}

const isOneDay = computed(() => {
  return !event.startTime && !event.endTime
})

const computedLabelColor = computed(() => {
  let color
  switch (event.labelColor) {
    case 'red':
      color = '#f66'
      break
    case 'blue':
      color = '#668aff'
      break
    case 'green': {
      color = '#66ffab'
      break
    }
  }
  return color
})
const labelColorText = computed(() => {
  if (event.labelColor === 'blue') {
    return {
      label: 'ブルー',
      color: $style['EventDetail__labelColorText--blue']
    }
  }
  if (event.labelColor === 'green') {
    return {
      label: 'グリーン',
      color: $style['EventDetail__labelColorText--green']
    }
  } else {
    return {
      label: 'レッド',
      color: $style['EventDetail__labelColorText--red']
    }
  }
})

const computedStartDate = computed(() => {
  const startDate = event.startDate
  return {
    year: startDate.getFullYear(),
    month: startDate.getMonth() + 1,
    date: startDate.getDate(),
    day: getDayString(startDate.getDay())
  }
})
const computedEndDate = computed(() => {
  const endDate = event.endDate
  return {
    year: endDate.getFullYear(),
    month: endDate.getMonth() + 1,
    date: endDate.getDate(),
    day: getDayString(endDate.getDay())
  }
})
</script>

<template>
  <div :class="$style.EventDetail">
    <v-toolbar color="#fff">
      <v-btn icon="mdi-close" @click="closeEventDetail"></v-btn>
      <v-toolbar-title>イベントの詳細</v-toolbar-title>
      <v-toolbar-items :class="$style.EventDetail__editButton">
        <CreateEventDialog :event="event" @submitEventDialog="closeEventDetail">
          編集
        </CreateEventDialog>
      </v-toolbar-items>
    </v-toolbar>

    <div :class="$style.EventDetail__detail">
      <p :class="$style.EventDetail__title">
        {{ event.title }}
      </p>

      <div :class="$style.EventDetail__dateDetail">
        <div :class="$style.EventDetail__dateContainer">
          <p :class="$style.EventDetail__dateHeader">
            {{ computedStartDate.year }}年<span v-if="!isOneDay">
              {{ computedStartDate.month }}月{{ computedStartDate.date }}日({{
                computedStartDate.day
              }})
            </span>
          </p>
          <p :class="$style.EventDetail__dateBody">
            <span v-if="isOneDay">
              {{ computedStartDate.month }}月{{ computedStartDate.date }}日({{
                computedStartDate.day
              }})
            </span>
            <span v-else>{{ event.startTime }}</span>
          </p>
        </div>

        <div
          :style="`color: ${computedLabelColor}`"
          :class="$style.EventDetail__dliCaretRight"
        ></div>

        <div :class="$style.EventDetail__dateContainer">
          <p :class="$style.EventDetail__dateHeader">
            {{ computedEndDate.year }}年<span v-if="!isOneDay">
              {{ computedEndDate.month }}月{{ computedEndDate.date }}日({{ computedEndDate.day }})
            </span>
          </p>
          <p :class="$style.EventDetail__dateBody">
            <span v-if="isOneDay">
              {{ computedEndDate.month }}月{{ computedEndDate.date }}日({{ computedEndDate.day }})
            </span>
            <span v-else>{{ event.endTime }}</span>
          </p>
        </div>
      </div>

      <div :class="$style.EventDetail__eventLabelColor">
        <p>ラベル色</p>
        <p :class="[$style.EventDetail__labelColorText, labelColorText.color]">
          {{ labelColorText.label }}
        </p>
      </div>

      <p :class="$style.EventDetail__memo">{{ event.memo }}</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.EventDetail {
  &__editButton {
    align-items: center;
  }

  &__detail {
    padding: 0 12px;
    margin-top: 12px;
  }

  &__title {
    font-size: 24px;
  }

  &__dateDetail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  &__dateContainer {
    display: flex;
    flex-direction: column;
  }

  &__dateHeader {
    font-size: 12px;
  }

  &__dateBody {
    font-size: 20px;
  }

  &__dliCaretRight {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    border-width: 0.375em 0.64952em;
    border-left-color: currentColor;
    border-right: 0;
  }

  &__eventLabelColor {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  &__labelColorText {
    font-weight: bold;

    &--red {
      color: #f66;
    }

    &--blue {
      color: #668aff;
    }

    &--green {
      color: #66ffab;
    }
  }

  &__memo {
    border-top: 1px solid #eee;
    padding: 8px 4px 0;
    margin-top: 8px;
  }
}
</style>
