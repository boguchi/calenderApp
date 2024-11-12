<script setup lang="ts">
import { nextTick } from 'vue'

interface Props {
  isShow: boolean
}

const { isShow = false } = defineProps<Props>()

const onBeforeEnter = (el: any) => {
  el.style.height = '0px' // 初期値を0に設定
}
const onEnter = (el: any) => {
  const height = el.scrollHeight + 'px' // コンテンツの実際の高さを取得
  el.style.height = height
}
const onAfterEnter = (el: any) => {
  el.style.height = 'auto' // アニメーション後にheightをautoに戻す
}
const onBeforeLeave = (el: any) => {
  el.style.height = el.scrollHeight + 'px' // 高さを設定
  nextTick(() => {
    el.style.height = '0px' // アニメーション開始時に0pxに変更
  })
}
const onAfterLeave = (el: any) => {
  el.style.height = 'auto' // アニメーションが終わった後にautoに戻す
}
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
  >
    <div v-show="isShow" :class="$style.ExpandItem">
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" module>
.ExpandItem {
  overflow: hidden;
  transition: height 0.1s ease;
}
</style>
