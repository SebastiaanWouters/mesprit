<template>
  <MainLayout>
    <div class="flex w-full flex-col gap-6">
      <event-tabs :data="{saved:data}" ></event-tabs>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'

const data = toRef(useData(), 'bookmarks')
definePageMeta({ middleware: 'auth' })

</script>

<style lang="scss" scoped>

</style>
