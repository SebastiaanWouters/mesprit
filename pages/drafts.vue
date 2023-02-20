<template>
  <MainLayout>
    <div class="flex w-full flex-col gap-6">
      <DraftGrid title="Drafts" :pubkey='1234'></DraftGrid>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'

definePageMeta({ middleware: 'auth' })

const { pubkey } = useAuth()

</script>

<style lang="scss" scoped>

</style>
