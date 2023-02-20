<template>
  <MainLayout>
    <div v-if="params.pubkey" class="w-full flex flex-col gap-6">
      <AuthorPreview :pubkey="params.pubkey"></AuthorPreview>
      <event-tabs :data="{recent, trending}" ></event-tabs>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'
import { getRecentFromAuthor, getTrendingFromAuthor } from '~~/utils/fetch'

definePageMeta({ middleware: 'auth' })

const { params } = useRoute()
const recent = ref([])
const trending = ref([])

onMounted(async () => {
  recent.value = await getRecentFromAuthor(params.pubkey)
  trending.value = await getTrendingFromAuthor(params.pubkey)
  console.log(recent.value)
})

</script>

<style lang="scss" scoped>

</style>
