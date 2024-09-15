<script setup lang="ts">
import { computed, onMounted, useCssModule } from 'vue'
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

const calenderItemList = computed(() => {
  const firstDate = getFirstDate(year, monthIndex)
  const lastDate = getLastDate(year, monthIndex)
  const firstSunday = getFirstSunday(year, monthIndex)
  const itemQuantity = getItemQuantity(year, monthIndex)
  const calenderItemListBase = [...Array(itemQuantity).keys()].map((key) => {
    return { key } as any
  })
  const previousMonthDays = firstDate.getDay() - firstSunday.getDay()

  return calenderItemListBase.map((item, i) => {
    let dating
    if (i < firstDate.getDay()) {
      dating = firstSunday.getDate() + i
    } else if (i >= previousMonthDays + lastDate.getDate()) {
      dating = i - (previousMonthDays + lastDate.getDate()) + 1
    } else {
      dating = i - previousMonthDays + 1
    }
    return {
      ...item,
      dating: dating
    }
  })
})

onMounted(() => {
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
