/**
 * 月の初日を取得
 * @param year - 年
 * @param monthIndex - 月
 * @returns 引数の年月の初日（1日）のdateオブジェクト
 */
export const getFirstDate = (year: number, monthIndex: number) => {
  return new Date(year, monthIndex)
}

/**
 * 月の最終日を取得
 * @param year - 年
 * @param monthIndex - 月
 * @returns 引数の年月の最終日のdateオブジェクト
 */
export const getLastDate = (year: number, monthIndex: number) => {
  const date = new Date(year, monthIndex + 1)
  date.setDate(date.getDate() - 1)
  return date
}

/**
 * カレンダー上の最初の日曜日を取得
 * @param year - 年
 * @param monthIndex - 月
 * @returns 引数の年月の最初の日曜日のdateオブジェクト
 */
export const getFirstSunday = (year: number, monthIndex: number) => {
  const date = getFirstDate(year, monthIndex)
  date.setDate(date.getDate() - date.getDay())
  return date
}

/**
 * カレンダー上の最後の土曜日を取得
 * @param year - 年
 * @param monthIndex - 月
 * @returns 引数の年月の最後の土曜日のdateオブジェクト
 */
export const getLastSaturday = (year: number, monthIndex: number) => {
  const date = getLastDate(year, monthIndex)
  date.setDate(date.getDate() + (7 - date.getDay()))
  return date
}

/**
 * カレンダーの日付の数を算出
 * @param year - 年
 * @param monthIndex - 月
 * @returns 引数の年月の日付の数
 */
export const getItemQuantity = (year: number, monthIndex: number) => {
  return (
    (Number(getLastSaturday(year, monthIndex)) - Number(getFirstSunday(year, monthIndex))) /
    86400000
  )
}
