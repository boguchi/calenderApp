<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import SelectBox from '../components/SelectBox.vue'
import CalenderTable from '../components/CalenderTable.vue'
import CreateEventDialog from '../components/CreateEventDialog.vue'
import ExpandItem from '../components/ExpandItem.vue'
import EventItem from '../components/EventItem.vue'
import EventDetail from '../components/EventDetail.vue'

import type { EventItemType } from '../utils/types/event'
import { getEventList } from '../utils/api'
import { useEventList } from '../stores/eventList'

const store = useEventList()

const selectedYear = ref()
const thisYear = computed(() => {
  return new Date().getFullYear()
})
const yearList = computed(() => {
  const yearList = []
  for (let i = thisYear.value - 10; i <= thisYear.value + 10; i++) {
    yearList.push({
      title: `${i}年`,
      value: i
    })
  }
  return yearList
})

const selectedMonth = ref()
const thisMonth = computed(() => {
  return new Date().getMonth() + 1
})
const monthList = computed(() => {
  let monthList = []
  for (let i = 1; i <= 12; i++) {
    monthList.push({
      title: `${i}月`,
      value: i
    })
  }
  return monthList
})

const eventList = ref<EventItemType[]>([])
;(async () => {
  const fetchedEventList = await getEventList()
  store.addEventList(fetchedEventList)
  eventList.value = store.eventList
})()

const isDetailShown = ref(false)
const detailEventList = ref([])
const openDetail = (value: any) => {
  isDetailShown.value = true
  detailEventList.value = value.eventList
}
const closeDetail = () => {
  isDetailShown.value = false
  detailEventList.value = []
}

const isShowEventDetail = ref(false)
const detailEditEvent = ref()
const onClickEventItem = (value: any) => {
  isShowEventDetail.value = true
  detailEditEvent.value = value
}

const closeEventDetail = () => {
  isDetailShown.value = false
  isShowEventDetail.value = false
}

watch(
  () => isShowEventDetail.value,
  () => {
    eventList.value = store.eventList
  }
)

const focusedDate = ref(new Date())
const calenderItemOnFocused = (value: any) => {
  focusedDate.value = value.date
}

const submitEventDialog = () => {
  eventList.value = store.eventList
  isDetailShown.value = false
}
</script>

<template>
  <v-main :class="$style.HomeView">
    <Transition
      :enter-from-class="$style['eventDetail-enter-from']"
      :leave-to-class="$style['eventDetail-leave-to']"
    >
      <EventDetail
        v-if="isShowEventDetail"
        :event="detailEditEvent"
        @closeEventDetail="closeEventDetail"
        :class="$style.HomeView__eventDetail"
      />
    </Transition>

    <Transition
      :enter-from-class="$style['calenderContents-enter-from']"
      :leave-to-class="$style['calenderContents-leave-to']"
    >
      <div v-if="!isShowEventDetail" :class="$style.HomeView__calenderContents">
        <v-toolbar color="#fff" :class="$style.HomeView__vToolbar">
          <SelectBox
            v-model="selectedYear"
            :options="yearList"
            :default-value="thisYear"
            :class="$style.HomeView__selectBox"
          >
            <div :class="$style.HomeView__selectBoxInner">{{ selectedYear }}年</div>
          </SelectBox>
          <SelectBox
            v-model="selectedMonth"
            :options="monthList"
            :default-value="thisMonth"
            :class="$style.HomeView__selectBox"
          >
            <div :class="$style.HomeView__selectBoxInner">{{ selectedMonth }}月</div>
          </SelectBox>

          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>

        <div :class="$style.HomeView__contents">
          <CalenderTable
            :year="selectedYear"
            :month-index="selectedMonth - 1"
            :event-list="eventList"
            :class="$style.HomeView__calenderTable"
            @calenderItemOnClick="openDetail"
            @calenderItemOnFocused="calenderItemOnFocused"
          />
          <ExpandItem :is-show="isDetailShown">
            <div :class="$style.HomeView__detail">
              <button :class="$style.HomeView__detailButton" @click="closeDetail">▼</button>
              <EventItem :event-list="detailEventList" @onClickEventItem="onClickEventItem" />
            </div>
          </ExpandItem>
        </div>
      </div>
    </Transition>

    <v-bottom-navigation grow>
      <v-btn>
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn>
        <CreateEventDialog :newEventDate="focusedDate" @submitEventDialog="submitEventDialog">
          <div :class="$style.HomeView__newEventValue">
            <v-icon>mdi-calendar-plus</v-icon>
            <span>New Event</span>
          </div>
        </CreateEventDialog>
      </v-btn>
      <v-btn>
        <v-icon>mdi-menu</v-icon>
        <span>Menu</span>
      </v-btn>
    </v-bottom-navigation>
  </v-main>
</template>

<style module lang="scss">
.HomeView {
  // height: calc(100vh - 56px);
  height: 100%;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;

  .eventDetail-enter-from,
  .eventDetail-leave-to {
    transform: translateX(120%);
  }

  .calenderContents-enter-from,
  .calenderContents-leave-to {
    transform: translateX(-100%);
  }

  &__eventDetail {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.2s ease;
  }

  &__calenderContents {
    flex: 1;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;
    transform: translateX(0);
  }

  &__vToolbar {
    padding-left: 12px;
  }

  &__selectBox {
    margin-right: 4px;
  }

  &__selectBoxInner {
    font-size: 20px;
  }

  &__contents {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__calenderTable {
    flex: 1;
  }

  &__detail {
    height: 30vh;
  }

  &__detailButton {
    width: 100%;
    background-color: #f6f6f6;
    border-bottom: 1px solid #e9e9e9;
  }

  &__newEventValueWrap {
    padding: 0 16px;
  }

  &__newEventValue {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
