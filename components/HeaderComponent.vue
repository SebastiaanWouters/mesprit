<template>
    <div class="w-full bg-[#ddd] rounded px-6 py-6 my-4 shadow">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
    </div>
</template>

<script setup>
const props = defineProps(['title'])
</script>

<style lang="scss" scoped>

</style>
