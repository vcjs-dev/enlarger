<template>
  <main>
    <div ref="enlargerContainer"></div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createEnlarger, Enlarger } from '@/lib/main'
import demoURL from '@/assets/demo.webp'

const enlargerContainer = ref()
const enlarger = ref<Enlarger>()
const init = () => {
  if (enlargerContainer.value) {
    enlarger.value = createEnlarger({
      container: enlargerContainer.value,
      src: demoURL,
      // width: 600,
      // height: 822,
      // maskWidth: 150,
      // maskHeight: 220,
    })
  }
}

onMounted(() => {
  init()
})
</script>
