<template>
  <DemoHeader
    logo-text="EN"
    title="Enlarger"
    title-link="https://github.com/vcjs-dev/enlarger"
    :right-links="[
      {
        href: 'https://github.com/vcjs-dev/enlarger',
        title: 'Documentation',
      },
      {
        href: 'https://github.com/vcjs-dev/enlarger/blob/main/CHANGELOG.md',
        title: 'Changelog',
      },
      { href: 'https://github.com/vcjs-dev/enlarger', title: 'Github' },
    ]"
  />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
