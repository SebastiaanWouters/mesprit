<template>
  <div  class="flex flex-col gap-4 w-full px-6">
  <HeaderComponent :title="title"></HeaderComponent>
  <div v-if="events && events.length > 0" class="bg-transparent w-full pb-4 flex flex-wrap gap-6">
    <EventPreview :key="event.id" v-for="event in events" :event="event" mode="full"></EventPreview>
  </div>
</div>
</template>

<script setup>
const props = defineProps(['title', 'events'])

</script>
<style lang="scss" scoped>

</style>
