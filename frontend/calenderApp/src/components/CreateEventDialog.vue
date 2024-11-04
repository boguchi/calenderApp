<script setup lang="ts">
import { computed, ref, watch, useCssModule, onMounted } from 'vue'
import type { EventItemType } from '../utils/types/event'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import ExpandItem from './ExpandItem.vue'
import { useEventList } from '../stores/eventList'

const store = useEventList()

interface Props {
  event?: EventItemType
}
const { event } = defineProps<Props>()

const cssModule = useCssModule
const $style = cssModule()

const dialog = ref(false)
const isOneDay = ref(false)

const editedEvent = ref()
onMounted(() => {
  if (event) {
    editedEvent.value = event
    isOneDay.value = !editedEvent.value.startTime || !editedEvent.value.endTime
  }
})

watch(
  () => isOneDay.value,
  (newVal) => {
    if (newVal) {
      editedEvent.value.startTime = ''
      editedEvent.value.endTime = ''
    } else {
      editedEvent.value.startTime = '0:00'
      editedEvent.value.endTime = '1:00'
    }
  }
)

watch(
  () => editedEvent.value,
  (newVal) => {
    if (newVal > editedEvent.value.endDate) {
      editedEvent.value.endDate = newVal
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
  if (editedEvent.value.labelColor === 'blue') {
    return {
      label: 'ブルー',
      color: $style['CreateEventDialog__labelColorText--blue']
    }
  }
  if (editedEvent.value.labelColor === 'green') {
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
  store.editEvent(editedEvent.value)
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
            v-model="editedEvent.title"
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
                {{ editedEvent.startDate.getFullYear() }}年{{
                  editedEvent.startDate.getMonth() + 1
                }}月{{ editedEvent.startDate.getDate() }}日
              </button>
              <button
                v-show="!isOneDay"
                @click="showPickers('VTimePickerStart')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ editedEvent.startTime }}
              </button>
            </div>
          </div>
          <ExpandItem :is-show="isShowVDatePickerStart">
            <v-date-picker
              v-model="editedEvent.startDate"
              hide-header
              :class="$style.CreateEventDialog__vDatePicker"
            ></v-date-picker>
          </ExpandItem>
          <ExpandItem :is-show="isShowVTimePickerStart">
            <v-time-picker v-model="editedEvent.startTime"></v-time-picker>
          </ExpandItem>

          <div :class="$style.CreateEventDialog__dateSelector">
            <span>終了</span>
            <div>
              <button
                @click="showPickers('VDatePickerEnd')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ editedEvent.endDate.getFullYear() }}年{{
                  editedEvent.endDate.getMonth() + 1
                }}月{{ editedEvent.endDate.getDate() }}日
              </button>
              <button
                v-show="!isOneDay"
                @click="showPickers('VTimePickerEnd')"
                :class="$style.CreateEventDialog__dateSelectorButton"
              >
                {{ editedEvent.endTime }}
              </button>
            </div>
          </div>
          <ExpandItem :is-show="isShowVDatePickerEnd">
            <v-date-picker
              v-model="editedEvent.endDate"
              hide-header
              :class="$style.CreateEventDialog__vDatePicker"
            ></v-date-picker>
          </ExpandItem>
          <ExpandItem :is-show="isShowVTimePickerEnd">
            <v-time-picker
              v-model="editedEvent.endTime"
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
            <v-radio-group
              v-model="editedEvent.labelColor"
              :class="$style.CreateEventDialog__vRadioGroup"
            >
              <v-radio color="#f66" label="レッド" value="red"></v-radio>
              <v-radio color="#668aff" label="ブルー" value="blue"></v-radio>
              <v-radio color="#66ffab" label="グリーン" value="green"></v-radio>
            </v-radio-group>
          </ExpandItem>

          <v-textarea
            v-model="editedEvent.memo"
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
