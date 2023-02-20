<template>
  <MainLayout>
    <dynamic-grid :data="{timeline: dynamicData.timeline, trending: dynamicData.trending}"></dynamic-grid>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'

definePageMeta({ middleware: 'auth' })
const dynamicData = toRef(useData(), 'global')

</script>

<style lang="scss" scoped>

</style>
