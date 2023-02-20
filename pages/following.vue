<template>
  <MainLayout>
    <div class="flex w-full flex-col gap-6">
      <event-tabs :data="{recent:data.timeline, trending:data.trending}" ></event-tabs>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'

const data = toRef(useData(), 'following')
definePageMeta({ middleware: 'auth' })

</script>

<style lang="scss" scoped>

</style>
