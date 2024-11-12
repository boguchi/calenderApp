import type { EventItemType } from '../utils/types/event'

const today = new Date()
const thisYear = today.getFullYear()
const thisMonthIndex = today.getMonth()

export const mockEventList: EventItemType[] = [
  {
    id: '1',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 1),
    endDate: new Date(thisYear, thisMonthIndex, 1),
    labelColor: 'red'
  },
  {
    id: '2',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 8),
    endDate: new Date(thisYear, thisMonthIndex, 8),
    labelColor: 'green'
  },
  {
    id: '3',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 13),
    endDate: new Date(thisYear, thisMonthIndex, 13),
    labelColor: 'blue'
  },
  {
    id: '4',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 19),
    endDate: new Date(thisYear, thisMonthIndex, 19),
    labelColor: 'blue'
  },
  {
    id: '5',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 19),
    endDate: new Date(thisYear, thisMonthIndex, 19),
    labelColor: 'green'
  },
  {
    id: '6',
    title: 'hoge',
    startDate: new Date(thisYear, thisMonthIndex, 25),
    endDate: new Date(thisYear, thisMonthIndex, 25),
    labelColor: 'red'
  }
]
