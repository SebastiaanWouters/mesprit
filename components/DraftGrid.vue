<template>
  <div v-if="events" class="flex flex-col gap-4 w-full px-6">
  <HeaderComponent :title="title"></HeaderComponent>
  <div class="bg-transparent w-full pb-4 flex flex-wrap gap-6">
    <EventPreview :key="event.id" v-for="event in events" :event="event" mode="full"></EventPreview>
  </div>
</div>
</template>

<script setup>
const props = defineProps(['title', 'pubkey'])
const events = ref(null)
const meta = ref(null)

onMounted(async () => {
  const data = await fetchData('/api/drafts/' + props.pubkey)
  console.log(data.events)
  events.value = data.events
  if (events.value && events.value.length > 0) {
    const data2 = await fetchData('/api/metadata', 'POST', events.value.map(event => event.pubkey))
    meta.value = data2.metadata
  }
})

</script>

<style lang="scss" scoped>

</style>
