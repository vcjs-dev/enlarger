<template>
  <main class="home-main">
    <div class="demo-container">
      <div class="demo-container__result">
        <div ref="enlargerContainer"></div>
      </div>
      <div class="demo-container__config">
        <div class="form-item">
          <label class="form-item__label">src: </label>
          <input
            type="text"
            v-model="config.src"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">width: </label>
          <input
            type="number"
            v-model="config.width"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">resizeable: </label>
          <input
            type="checkbox"
            v-model="config.resizeable"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskColor: </label>
          <input
            type="text"
            v-model="config.maskColor"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskTimesSmallerThanImage: </label>
          <input
            type="number"
            v-model="config.maskTimesSmallerThanImage"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskBorderColor: </label>
          <input
            type="color"
            v-model="config.maskBorderColor"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskBorderWidth: </label>
          <input
            type="text"
            v-model="config.maskBorderWidth"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskBorderStyle: </label>
          <input
            type="text"
            v-model="config.maskBorderStyle"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">maskCursor: </label>
          <input
            type="text"
            v-model="config.maskCursor"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createEnlarger, Enlarger } from '@/lib/main'
import type { EnlargerOptions } from '@/lib/interfaces/core'
import demoURL from '@/assets/demo.webp'

const enlargerContainer = ref()
const enlarger = ref<Enlarger>()

const config = ref<EnlargerOptions>({
  container: '',
  width: 600,
  src: demoURL,
  maskColor: 'rgba(255, 255, 255, 0.2)',
  maskTimesSmallerThanImage: 2,
  maskBorderWidth: '1px',
  maskBorderStyle: 'solid',
  maskBorderColor: '#bbbbbb',
  maskCursor: 'crosshair',
  resizeable: false,
})

const init = () => {
  if (enlargerContainer.value) {
    enlarger.value = createEnlarger({
      ...config.value,
      container: enlargerContainer.value,
    })

    console.log('init:', enlarger.value)
  }
}

const handleConfigChange = () => {
  enlarger.value?.setOptions(config.value)

  console.log(enlarger.value)
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.home-main {
  max-width: 1080px;
  margin: 0 auto;
  padding: 16px 0;
}

.demo-container {
  display: flex;
  &__result {
    margin-right: 16px;
  }

  &__config {
    flex: 1;
    padding: 16px;
  }
}

.form-item {
  display: flex;
  margin-bottom: 15px;
  color: #606266;

  &__label {
    display: flex;
    align-items: center;
    min-width: 140px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 14px;
    text-align: right;
  }

  &__control {
    flex: 1;
  }
}
</style>
