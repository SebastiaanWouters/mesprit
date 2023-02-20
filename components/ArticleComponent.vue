<template>
<div v-if="article" class="w-full flex-col flex gap-4 justify-start items-center p-2 px-4 h-full">
  <AuthorPreview :pubkey="article.pubkey"></AuthorPreview>
  <div class="max-w-2xl mx-auto w-[97%] overflow-hidden prose-invert prose " v-if="title"><h1> {{ title }}</h1></div>
  <div v-html="html" class="prose mx-auto w-[97%] overflow-hidden prose-invert max-w-2xl h-full">
  </div>
</div>
</template>

<script setup>
import { marked } from 'marked'
const props = defineProps(['id'])

const article = ref(null)
let title = null
let image = null

onMounted(async () => {
  const event = await fetchData('/api/' + props.id)
  article.value = event
  const meta = getArticleMetadata(event)
  title = meta.title
  image = meta.image
})

const html = computed(() => {
  if (article.value && article.value.content) {
    return marked(article.value.content)
  } else {
    return ''
  }
})

</script>

<style lang="scss" scoped>

</style>
