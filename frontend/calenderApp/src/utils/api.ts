export const getEventList = async () => {
  try {
    const response = await fetch('http://localhost:3000/calenderEventList')
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`)
    }
    const json = await response.json()
    return JSON.parse(json)
  } catch (error) {
    console.error(error)
  }
}
