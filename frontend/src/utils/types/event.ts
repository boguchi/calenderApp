export type EventItemType = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  startTime?: string
  endTime?: string
  labelColor: 'red' | 'blue' | 'green'
  memo?: string
}
