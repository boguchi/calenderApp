<script setup lang="ts">
import { computed, ref, watch, useCssModule, onMounted } from 'vue'
import type { EventItemType } from '../utils/types/event'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import ExpandItem from './ExpandItem.vue'

interface Props {
  event?: EventItemType
}
const { event } = defineProps<Props>()

const $style = useCssModule()

const dialog = ref(false)
const isOneDay = ref(false)

const eventTitle = ref()
const eventStartDate = ref(new Date())
const eventEndDate = ref(new Date())
const eventStartTime = ref('0:00')
const eventEndTime = ref('1:00')
const eventLabelColor = ref('red')
const eventMemo = ref()

onMounted(() => {
  if (event) {
    eventTitle.value = event.title
    eventStartDate.value = event.startDate
    eventEndDate.value = event.endDate
    eventStartTime.value = event.startTime ? event.startTime : ''
    eventEndTime.value = event.endTime ? event.endTime : ''
    eventLabelColor.value = event.labelColor
    eventMemo.value = event.memo
    isOneDay.value = eventStartTime.value.length === 0 && eventEndTime.value.length === 0
  }
})

watch(
  () => eventStartDate.value,
  (newVal) => {
    if (newVal > eventEndDate.value) {
      eventEndDate.value = newVal
    }
  }
)

const isShowVTimePickerStart = ref(false)
const isShowVTimePickerEnd = ref(false)
const isShowVDatePickerStart = ref(false)
const isShowVDatePickerEnd = ref(false)
const showPickers = (
  picker: 'VTimePickerStart' | 'VTimePickerEnd' | 'VDatePickerStart' | 'VDatePickerEnd'
) => {
  if (picker === 'VTimePickerStart') {
    isShowVTimePickerEnd.value = false
    isShowVDatePickerEnd.value = false
    isShowVDatePickerStart.value = false
    isShowVTimePickerStart.value = !isShowVTimePickerStart.value
  } else if (picker === 'VTimePickerEnd') {
    isShowVTimePickerStart.value = false
    isShowVDatePickerEnd.value = false
    isShowVDatePickerStart.value = false
    isShowVTimePickerEnd.value = !isShowVTimePickerEnd.value
  } else if (picker === 'VDatePickerStart') {
    isShowVTimePickerStart.value = false
    isShowVTimePickerEnd.value = false
    isShowVDatePickerEnd.value = false
    isShowVDatePickerStart.value = !isShowVDatePickerStart.value
  } else if (picker === 'VDatePickerEnd') {
    isShowVTimePickerStart.value = false
    isShowVTimePickerEnd.value = false
    isShowVDatePickerStart.value = false
    isShowVDatePickerEnd.value = !isShowVDatePickerEnd.value
  }
}

const labelColorText = computed(() => {
  if (eventLabelColor.value === 'blue') {
    return {
      label: 'ブルー',
      color: $style['CreateEventDialog__labelColorText--blue']
    }
  }
  if (eventLabelColor.value === 'green') {
    return {
      label: 'グリーン',
      color: $style['CreateEventDialog__labelColorText--green']
    }
  } else {
    return {
      label: 'レッド',
      color: $style['CreateEventDialog__labelColorText--red']
    }
  }
})
const isShowLabelColor = ref(false)
const showLabelColor = () => {
  isShowLabelColor.value = !isShowLabelColor.value
}

const submitEventDialog = () => {
  console.log(eventTitle.value)
  console.log(eventStartDate.value)
  console.log(eventEndDate.value)
  console.log(eventStartTime.value)
  console.log(eventEndTime.value)
  console.log(eventLabelColor.value)
  console.log(eventMemo.value)
  dialog.value = false
}
</script>

<template>
  <div class="text-center pa-4" :class="$style.CreateEventDialog">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <div v-bind="activatorProps" :class="$style.CreateEventDialog__activator">
          <slot />
        </div>
      </template>

      <v-card>
        <v-toolbar color="#fff">
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
          <v-toolbar-title>
            イベントの<span v-if="event">編集</span><span v-else>追加</span>
          </v-toolbar-title>
          <v-toolbar-items>
            <v-btn text="保存" variant="text" @click="submitEventDialog"></v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form @submit.prevent>
          <v-text-field
            v-model="eventTitle"
            label="タイトル"
            variant="underlined"
            clearable
            :class="$style.CreateEventDialog__vTextField"
          ></v-text-field>

          <v-switch
            v-model="isOneDay"
            color="primary"
            label="終日"
            :class="$style.CreateEventDialog__vSwitch"
          ></v-switch>

          <div :class="$style.CreateEventDialog__dateSelector">
            <span>開始</span>
            <div>
              <button
                @click="showPickers('VDatePickerStart')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ eventStartDate.getFullYear() }}年{{ eventStartDate.getMonth() + 1 }}月{{
                  eventStartDate.getDate()
                }}日
              </button>
              <button
                v-show="!isOneDay"
                @click="showPickers('VTimePickerStart')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ eventStartTime }}
              </button>
            </div>
          </div>
          <ExpandItem :is-show="isShowVDatePickerStart">
            <v-date-picker
              v-model="eventStartDate"
              hide-header
              :class="$style.CreateEventDialog__vDatePicker"
            ></v-date-picker>
          </ExpandItem>
          <ExpandItem :is-show="isShowVTimePickerStart">
            <v-time-picker v-model="eventStartTime"></v-time-picker>
          </ExpandItem>

          <div :class="$style.CreateEventDialog__dateSelector">
            <span>終了</span>
            <div>
              <button
                @click="showPickers('VDatePickerEnd')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ eventEndDate.getFullYear() }}年{{ eventEndDate.getMonth() + 1 }}月{{
                  eventEndDate.getDate()
                }}日
              </button>
              <button
                v-show="!isOneDay"
                @click="showPickers('VTimePickerEnd')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ eventEndTime }}
              </button>
            </div>
          </div>
          <ExpandItem :is-show="isShowVDatePickerEnd">
            <v-date-picker
              v-model="eventEndDate"
              hide-header
              :class="$style.CreateEventDialog__vDatePicker"
            ></v-date-picker>
          </ExpandItem>
          <ExpandItem :is-show="isShowVTimePickerEnd">
            <v-time-picker
              v-model="eventEndTime"
              :class="$style.CreateEventDialog__vTimePicker"
            ></v-time-picker>
          </ExpandItem>

          <button :class="$style.CreateEventDialog__eventLabelColor" @click="showLabelColor">
            <p>ラベル色</p>
            <p :class="[$style.CreateEventDialog__labelColorText, labelColorText.color]">
              {{ labelColorText.label }}
            </p>
          </button>
          <ExpandItem :is-show="isShowLabelColor">
            <v-radio-group v-model="eventLabelColor" :class="$style.CreateEventDialog__vRadioGroup">
              <v-radio color="#f66" label="レッド" value="red"></v-radio>
              <v-radio color="#668aff" label="ブルー" value="blue"></v-radio>
              <v-radio color="#66ffab" label="グリーン" value="green"></v-radio>
            </v-radio-group>
          </ExpandItem>

          <v-textarea
            v-model="eventMemo"
            label="メモ"
            variant="outlined"
            :class="$style.CreateEventDialog__vTextArea"
          ></v-textarea>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<style module lang="scss">
.CreateEventDialog {
  &__activator {
    cursor: pointer;
  }

  &__vTextField {
    padding: 0 12px;
  }

  &__vSwitch {
    padding: 0 16px;
  }

  &__dateSelector {
    display: flex;
    justify-content: space-between;
    padding: 4px 20px;
  }

  &__dateSelectorButton {
    background-color: #e9e9e9;
    border-radius: 8px;
    padding: 2px 8px;

    &:not(:first-of-type) {
      margin-left: 8px;
    }
  }

  &__transitionWrapper {
    display: flex;
  }

  &__vDatePicker {
    width: 100%;
    transform: scale(0.9);
    height: auto;
  }

  &__vTimePicker {
    margin: auto;
  }

  &__eventLabelColor {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 4px 28px 4px 20px;
    margin-top: 8px;
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

  &__vRadioGroup {
    margin: 0 20px;
  }

  &__vTextArea {
    padding: 4px 20px;
    margin-top: 8px;
  }
}
</style>
