<template>
  <MainLayout>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'

definePageMeta({ middleware: 'auth' })

</script>

<style lang="scss" scoped>

</style>
