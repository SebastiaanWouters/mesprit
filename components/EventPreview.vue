<template>
  <NuxtLink :to="'/article/' + event.id"
    v-if="mode === 'simple'" class="flex justify-between items-center flex-auto relative overflow-hidden gap-2 px-2 rounded-md bg-[#eee] hover:bg-[#fff] cursor-pointer"
    >
  <div class="flex justify-start items-center gap-2">
    <div
      class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2"
    >
      <img :src="meta ? JSON.parse(meta.content).picture : 'https://api.dicebear.com/5.x/adventurer/svg?seed=Zoey'" class="flex-grow-0 rounded-full flex-shrink-0 w-[60px] h-[60px] object-cover" />
    </div>
    <p class="flex-grow-0 flex-shrink-0 text-xl md:text-3xl font-bold capitalize text-left text-[#222]">
      {{ event.content ? event.content.slice(0, Math.floor(Math.random() * 30)) : 'title' }}
    </p>
  </div>

    <div
      class="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-1 p-2.5"
    >
      <div
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5"
      >
        <BookmarkIcon></BookmarkIcon>
      </div>
      <div
        class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2.5 p-2.5"
      >
        <FireIcon></FireIcon>
      </div>
    </div>
  </NuxtLink>

  <div class="flex-auto shadow bg-cover bg-[#111]/20 rounded-md border-[#888] overflow-hidden border-2 hover:border-[#ddd] hover:bg-[#111]/40">
  <NuxtLink :to="'/article/' + event.id" v-if="mode === 'full'"  class="h-full overflow-hidden rounded cursor-pointer flex flex-col justify-between items-start flex-auto px-2 py-2 ">
      <div class="flex w-full flex-col gap-3 items-start justify-start">
      <NuxtLink :to="'/author/' + event.pubkey" class="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5">
        <div class="flex justify-center items-center relative gap-2.5">
          <img :src="meta.picture ? meta.picture : 'https://api.dicebear.com/5.x/adventurer/svg?seed=' + meta.pubkey" class="w-[56px] h-[56px] rounded-full" />
        </div>
        <div class="flex flex-col justify-center items-start self-stretch flex-grow relative overflow-hidden">
          <p class="flex-grow-0 flex-shrink-0 text-xl font-semibold text-left text-zinc-200/95">
            {{ meta.name ? meta.name : meta.pubkey.slice(0,10) }}
          </p>
          <p class="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-zinc-400/70">
            {{ fromNow(event.created_at * 1000) }}
          </p>
        </div>
        <NuxtLink v-if="bookmarks.filter(e => e.id === event.id).length === 0" to='#' class="flex justify-end items-start self-stretch flex-grow relative gap-2.5 py-2">
          <BookmarkIcon @click="addBookmark(useAuth().pubkey, event.id)" class="w-8 h-10 hover:scale-110 transition-all ease-in-out"></BookmarkIcon>
        </NuxtLink>
        <NuxtLink v-else to='#' class="flex justify-end items-start self-stretch flex-grow relative gap-2.5 py-2">
          <DeleteBookmarkIcon @click="deleteBookmark(useAuth().pubkey, event.id)" class="w-8 h-10 hover:scale-110 transition-all ease-in-out"></DeleteBookmarkIcon>
        </NuxtLink>
      </NuxtLink>
      <div class="flex flex-col w-11/12 max-w-3xl xl:max-w-5xl justify-start items-start self-stretch gap-1.5 flex-grow-0 flex-shrink-0 relative overflow-hidde px-2.5 pb-2">
        <p class="self-stretch flex-grow- break-all flex-shrink-0 w-full text-[1.8rem] leading-8 font-bold text-left text-zinc-200">
          {{ event.content.slice(0,40) }}
        </p>
        <p class="self-stretch flex-grow-0 break-all flex-shrink-0 w-11/12 text-base text-left text-zinc-300/60">
          {{ event.content.slice(0,90) }}
        </p>
      </div>
      </div>
      <div class="flex justify-start items-end self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2.5 p-2.5">
      <div class="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-2">
        <NuxtLink to="/category/technology" class="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-2.5">
          <div
            class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2 py-1 rounded-2xl uppercase hover:bg-violet-700 bg-[#ED9DEF]"
          >
            <p class="flex-grow-0 flex-shrink-0 text-xs font-bold text-left text-zinc-900">Tech</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/category/bitcoin" class="flex justify-center items-center flex-grow-0 flex-shrink-0 gap-2.5">
          <div
            class="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 py-1 px-2 rounded-2xl uppercase hover:bg-teal-700 bg-[#FFD84F]"
          >
            <p class="flex-grow-0 flex-shrink-0 text-xs text-left font-bold text-zinc-900">Bitcoin</p>
          </div>
        </NuxtLink>
      </div>
      <div
        class="flex justify-end items-center self-stretch flex-grow relative overflow-hidden gap-2.5 px-0.5"
      >
      <FireIcon class="w-8 h-10 hover:scale-110 transition-all ease-in-out"></FireIcon>
      </div>
    </div>
  </NuxtLink>
  </div>

</template>

<script setup>
import BookmarkIcon from './icons/BookmarkIcon.vue'
import FireIcon from './icons/FireIcon.vue'
import { fromNow } from '~~/utils/time'
import DeleteBookmarkIcon from './icons/DeleteBookmarkIcon.vue'
import { fetchMetaData } from '~~/utils/fetch'

const props = defineProps(['event', 'mode'])
const { addBookmark, deleteBookmark } = useData()
const data = useData()
const bookmarks = toRef(data, 'bookmarks')
const meta = ref({ pubkey: props.event.pubkey })

onMounted(async () => {
  meta.value = await useMeta(props.event.pubkey)
})

</script>

<style lang="scss" scoped>

</style>
