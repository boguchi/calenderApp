import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { EventItemType } from '../utils/types/event'

const parseEventList = (eventList: EventItemType[]) => {
  return eventList.map((event) => {
    return {
      ...event,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate)
    }
  })
}

export const useEventList = defineStore('eventList', () => {
  const eventList = ref<EventItemType[]>([])
  const addEventList = (value: EventItemType[]) => {
    eventList.value = parseEventList(value)
  }
  const editEvent = (value: EventItemType) => {
    eventList.value.forEach((event, index) => {
      if (event.id === value.id) eventList.value[index] = value
    })
  }
  const addNewEvent = (value: EventItemType) => {
    eventList.value.push(value)
  }

  return { eventList, addEventList, editEvent, addNewEvent }
})
