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
          <label class="form-item__label">autoSize: </label>
          <input
            type="checkbox"
            v-model="config.autoSize"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierColor: </label>
          <input
            type="text"
            v-model="config.magnifierColor"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierSizeRatio: </label>
          <input
            type="number"
            v-model="config.magnifierSizeRatio"
            :max="1"
            :min="0"
            :step="0.1"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierBorderColor: </label>
          <input
            type="color"
            v-model="config.magnifierBorderColor"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierBorderWidth: </label>
          <input
            type="text"
            v-model="config.magnifierBorderWidth"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierBorderStyle: </label>
          <input
            type="text"
            v-model="config.magnifierBorderStyle"
            @change="handleConfigChange"
            class="form-item__control"
          />
        </div>
        <div class="form-item">
          <label class="form-item__label">magnifierCursor: </label>
          <input
            type="text"
            v-model="config.magnifierCursor"
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
  magnifierColor: 'rgba(255, 255, 255, 0.2)',
  magnifierSizeRatio: 0.5,
  magnifierBorderWidth: '1px',
  magnifierBorderStyle: 'solid',
  magnifierBorderColor: '#bbbbbb',
  magnifierCursor: 'crosshair',
  autoSize: false,
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
    min-width: 180px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 14px;
  }

  &__control {
    flex: 1;
  }
}
</style>
