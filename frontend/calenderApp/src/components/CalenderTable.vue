<script setup lang="ts">
import { computed, onMounted, useCssModule } from 'vue'
import CalenderItem from './CalenderItem.vue'

interface Props {
  year: number
  month: number
}

const { year, month } = defineProps<Props>()
defineEmits([])

const $style = useCssModule()

const days = computed(() => {
  return ['日', '月', '火', '水', '木', '金', '土']
})
const computedMonth = computed(() => {
  return month - 1
})
// 月の初日を取得
const firstDate = computed(() => {
  return new Date(year, computedMonth.value)
})
// 月の最終日を取得
const lastDate = computed(() => {
  const date = new Date(year, month)
  date.setDate(date.getDate() - 1)
  return date
})
// 最初の日曜日を取得
const computedFirstSunday = computed(() => {
  const date = new Date(firstDate.value)
  date.setDate(date.getDate() - firstDate.value.getDay())
  return date
})
// 最後の土曜日を取得
const computedLastSaturday = computed(() => {
  const date = new Date(lastDate.value)
  date.setDate(date.getDate() + (7 - lastDate.value.getDay()))
  return date
})
// カレンダーの日付の数を算出
const itemQuantity = computed(() => {
  return (Number(computedLastSaturday.value) - Number(computedFirstSunday.value)) / 86400000
})

const calenderItemListBase = computed(() => {
  return [...Array(itemQuantity.value).keys()].map((key) => {
    return { key } as any
  })
})
const calenderItemList = computed(() => {
  return calenderItemListBase.value.map((item, i) => {
    const previousMonthDays = firstDate.value.getDay() - computedFirstSunday.value.getDay()
    if (i < firstDate.value.getDay()) {
      return {
        ...item,
        dating: computedFirstSunday.value.getDate() + i
      }
    } else if (i >= previousMonthDays + lastDate.value.getDate()) {
      return {
        ...item,
        dating: i - (previousMonthDays + lastDate.value.getDate()) + 1
      }
    } else {
      return {
        ...item,
        dating: i - previousMonthDays + 1
      }
    }
  })
})

onMounted(() => {
  console.log(firstDate.value.getDay(), computedFirstSunday.value.getDate(), calenderItemList.value)

  calenderItemList.value[15].eventList = [
    { name: '旅行', themeColor: 'green' },
    { name: '買い物', themeColor: 'blue' }
  ]
  console.log(calenderItemList.value[15])
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
        :isToday="true"
        :dayType="undefined"
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
}
</style>
