<template>
  <div class="relative flex rounded-md p-3 px-5 items-center justify-between hover:bg-gray-100">
    <NuxtLink :to="'/article/' + event.id" class="flex gap-2">
    <NuxtLink :to="'/author/' + event.pubkey"><img :src="authorMeta ? authorMeta.picture ? authorMeta.picture : 'https://api.dicebear.com/5.x/adventurer/svg?seed=' + authorMeta.pubkey : 'https://api.dicebear.com/5.x/adventurer/svg?seed=' + event.pubkey" class="w-10 h-10 rounded-full"/></NuxtLink>
    <div class="flex flex-col justify-center">
      <h3 class="text-sm font-medium leading-4 md:leading-3">
      {{ articleMeta ? articleMeta.title ? articleMeta.title : event.content?.slice(0,20) : event.content?.slice(0,20) }}
      </h3>

      <ul class="mt-1 flex space-x-1 text-xs font-normal leading-3 text-gray-500">
        <li>{{ fromNow(event?.created_at * 1000) }}</li>
        <li>&middot;</li>
        <li>{{ 1 }} comments</li>
        <li>&middot;</li>
        <li>{{ 2 }} shares</li>
      </ul>
    </div>
    </NuxtLink>
    <div v-if="bookmarks.filter(e => e.id === event.id).length === 0" to='#' class="cursor-pointer flex jitems-center">
          <BookmarkIcon @click="addBookmark(useAuth().pubkey, event.id)" class="w-5 h-7 hover:scale-110 transition-all ease-in-out"></BookmarkIcon>
    </div>
    <div v-else to='#' class="cursor-pointer flex items-center ">
          <DeleteBookmarkIcon @click="deleteBookmark(useAuth().pubkey, event.id)" class="w-5 h-7 hover:scale-110 transition-all ease-in-out"></DeleteBookmarkIcon>
    </div>
  </div>
</template>

<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue'
import DeleteBookmarkIcon from './icons/DeleteBookmarkIcon.vue'
const props = defineProps(['event'])
const { addBookmark, deleteBookmark } = useData()

const authorMeta = ref(null)
const articleMeta = ref(null)
const data = useData()
const bookmarks = toRef(data, 'bookmarks')

onMounted(async () => {
  articleMeta.value = getArticleMetadata(props.event)
  authorMeta.value = await useMeta(props.event.pubkey)
})

</script>

<style lang="scss" scoped>

</style>
