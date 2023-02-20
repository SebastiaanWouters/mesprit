<template>
  <MainLayout>
    <div class="w-full flex flex-col gap-6">
      <event-tabs :data="{recent, trending}" ></event-tabs>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '~~/layouts/MainLayout.vue'
import { getRecentFromCategory, getTrendingFromCategory } from '~~/utils/fetch'

definePageMeta({ middleware: 'auth' })

const { params } = useRoute()
const recent = ref([])
const trending = ref([])

onMounted(async () => {
  recent.value = await getRecentFromCategory(params.category)
  trending.value = await getTrendingFromCategory(params.category)
})

</script>

<style lang="scss" scoped>

</style>
