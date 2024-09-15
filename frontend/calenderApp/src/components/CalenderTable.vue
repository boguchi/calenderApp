<script setup lang="ts">
import { ref, computed, onMounted, useCssModule } from 'vue'
import CalenderItem from './CalenderItem.vue'
import { getFirstDate, getLastDate, getFirstSunday, getItemQuantity } from '../utils/date'

interface Props {
  year: number
  monthIndex: number
}

const { year, monthIndex } = defineProps<Props>()
defineEmits([])

const $style = useCssModule()

const days = computed(() => {
  return ['日', '月', '火', '水', '木', '金', '土']
})

const eventList = ref<any>([])
const calenderItemList = computed(() => {
  const firstDate = getFirstDate(year, monthIndex)
  const lastDate = getLastDate(year, monthIndex)
  const firstSunday = getFirstSunday(year, monthIndex)
  const itemQuantity = getItemQuantity(year, monthIndex)
  const calenderItemListBase = [...Array(itemQuantity).keys()].map((key) => {
    return { key } as any
  })

  return calenderItemListBase.map((item, i) => {
    let date
    if (i < firstDate.getDay()) {
      date = new Date(year, monthIndex - 1, firstSunday.getDate() + i)
    } else if (i >= firstDate.getDay() + lastDate.getDate()) {
      date = new Date(year, monthIndex + 1, i - (firstDate.getDay() + lastDate.getDate()) + 1)
    } else {
      date = new Date(year, monthIndex, i - firstDate.getDay() + 1)
    }

    const filteredEventList = eventList.value.filter((item: any) => {
      return (
        date.toDateString() === new Date(item.year, item.monthIndex, item.dating).toDateString()
      )
    })

    return {
      ...item,
      date: date,
      dating: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString(),
      dayType: date.getDay() === 0 ? 'holiday' : date.getDay() === 6 ? 'saturday' : undefined,
      eventList: filteredEventList
    }
  })
})

const getEventList = async () => {
  try {
    const response = await fetch('http://localhost:3000/calenderEventList')
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`)
    }
    const json = await response.json()
    eventList.value = JSON.parse(json)
  } catch (error) {
    console.error(error)
  }
}

;(async () => {
  await getEventList()
})()

onMounted(() => {
  // console.log(new Date(2024, 8, 15).toDateString === new Date().toDateString)
})
</script>

<template>
  <div :class="$style.CalenderTable">
    <ul :class="$style.CalenderTable__dayHeader">
      <li v-for="day in days" :key="day" :class="$style.CalenderTable__day">{{ day }}</li>
    </ul>
    <div :class="$style.CalenderTable__calenderItemWrap">
      <CalenderItem
        v-for="item in calenderItemList"
        :key="item.key"
        :dating="item.dating"
        :isToday="item.isToday"
        :dayType="item.dayType"
        :eventList="item.eventList"
        :isFocused="false"
        :class="$style.CalenderTable__calenderItem"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.CalenderTable {
  display: flex;
  flex-direction: column;

  &__dayHeader {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__day {
    flex: 1;
    text-align: center;
  }

  &__calenderItemWrap {
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));
  }

  &__calenderItem {
    flex: 1;
  }
}
</style>
