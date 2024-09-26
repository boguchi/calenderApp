<script setup lang="ts">
import { ref, computed, onMounted, useCssModule, watch } from 'vue'
import CalenderItem from './CalenderItem.vue'
import { getFirstDate, getLastDate, getFirstSunday, getItemQuantity } from '../utils/date'

interface Props {
  year: number
  monthIndex: number
  eventList: any[]
}

const { year, monthIndex, eventList } = defineProps<Props>()

const $style = useCssModule()

const days = computed(() => {
  return ['日', '月', '火', '水', '木', '金', '土']
})
const calenderItemColumns = computed(() => {
  return getItemQuantity(year, monthIndex) / 7
})

// 指定の年月のカレンダー情報を取得
const calenderItemListBase = computed(() => {
  const firstDate = getFirstDate(year, monthIndex)
  const lastDate = getLastDate(year, monthIndex)
  const firstSunday = getFirstSunday(year, monthIndex)
  const itemQuantity = getItemQuantity(year, monthIndex)
  const listBase = [...Array(itemQuantity).keys()].map((key) => {
    return { key } as any
  })

  return listBase.map((item, i) => {
    let date
    if (i < firstDate.getDay()) {
      date = new Date(year, monthIndex - 1, firstSunday.getDate() + i)
    } else if (i >= firstDate.getDay() + lastDate.getDate()) {
      date = new Date(year, monthIndex + 1, i - (firstDate.getDay() + lastDate.getDate()) + 1)
    } else {
      date = new Date(year, monthIndex, i - firstDate.getDay() + 1)
    }
    return {
      ...item,
      date: date,
      dating: date.getDate(),
      isToday: date.toDateString() === new Date().toDateString(),
      dayType: date.getDay() === 0 ? 'holiday' : date.getDay() === 6 ? 'saturday' : undefined
    }
  })
})

// カレンダーにイベントやフォーカスの情報を追加
const calenderItemList = computed(() => {
  if (calenderItemListBase.value) {
    return calenderItemListBase.value.map((item) => {
      const filteredEventList = eventList.filter((event: any) => {
        return (
          item.date.toDateString() ===
          new Date(event.year, event.monthIndex, event.dating).toDateString()
        )
      })
      return {
        ...item,
        eventList: filteredEventList,
        isFocused: item.key === focusedItem.value
      }
    })
  } else {
    return []
  }
})

const focusedItem = ref<number | undefined>()
const setFocusedItem = () => {
  const today = new Date()
  if (today.getFullYear() === year && today.getMonth() === monthIndex) {
    focusedItem.value = today.getDate() - 1
  } else {
    focusedItem.value = getFirstDate(year, monthIndex).getDay()
  }
}
// 年月変更時にfocusedItemを初期化
watch(() => [year, monthIndex], setFocusedItem)

const calenderItemOnClick = (item: any) => {
  if (item.isFocused) {
    console.log('focused')
  } else {
    focusedItem.value = item.key
  }
}

onMounted(() => {
  setFocusedItem()
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
        :isFocused="item.isFocused"
        :class="$style.CalenderTable__calenderItem"
        @calenderItemOnClick="calenderItemOnClick(item)"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.CalenderTable {
  display: flex;
  flex-direction: column;
  height: 100%;

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
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, calc(100% / 7));
    grid-template-rows: repeat(
      v-bind(calenderItemColumns),
      calc(100% / v-bind(calenderItemColumns))
    );
    border-top: 1px solid #eee;
  }

  &__calenderItem {
    flex: 1;
  }
}
</style>
