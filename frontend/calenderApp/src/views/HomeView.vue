<template>
  <div>
    <button @click="testGetRequest()">Test Get Request</button>
    <button @click="testPostRequest()">Test Post Request</button>
  </div>
</template>

<script setup lang="ts">
const testGetRequest = async () => {
  try {
    const response = await fetch('http://localhost:3000/test')
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`)
    }
    const json = await response.json()
    console.log(json.text)
  } catch (error) {
    console.error(error)
  }
}

const testPostRequest = async () => {
  try {
    const response = await fetch('http://localhost:3000/test', {
      method: 'POST',
      body: JSON.stringify({ text: 'POST Success!' }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`)
    }
    const json = await response.json()
    console.log(json.message)
  } catch (error) {
    console.error(error)
  }
}
</script>
1
