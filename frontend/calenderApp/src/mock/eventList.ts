import type { EventItemType } from '../utils/types/event'

const today = new Date()
const thisYear = today.getFullYear()
const thisMonthIndex = today.getMonth()

export const mockEventList: EventItemType[] = [
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 1),
    endDate: new Date(),
    labelColor: 'red'
  },
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 8),
    endDate: new Date(),
    labelColor: 'green'
  },
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 13),
    endDate: new Date(),
    labelColor: 'blue'
  },
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 19),
    endDate: new Date(),
    labelColor: 'blue'
  },
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 19),
    endDate: new Date(),
    labelColor: 'green'
  },
  {
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 25),
    endDate: new Date(),
    labelColor: 'red'
  }
]
