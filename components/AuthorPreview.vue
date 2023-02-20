<template>
  <div v-if="meta" class="pb-3 flex flex-col px-6 justify-start items-center w-full self-stretch flex-grow-0 flex-shrink-0 overflow-hidden gap-2">
        <div class="flex justify-center items-center relative">
          <img :src="meta.picture ?  meta.picture : 'https://api.dicebear.com/5.x/adventurer/svg?seed=' + meta.pubkey" class="w-[56px] h-[56px] rounded-full" />
        </div>
        <div class="flex flex-col justify-center items-center self-stretch flex-grow relative overflow-hidden">
          <p class="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-zinc-200">
            {{ meta.name ?  meta.name : meta.pubkey.slice(0,10) }}
          </p>
        </div>
        <div v-if="followingKeys && followingKeys.includes(meta.pubkey)" class="flex justify-center items-center self-stretch flex-grow relative">
          <button @click="data.deleteFollow(meta.pubkey)" class="rounded-lg py-1.5 px-2.5 font-medium bg-[#ED9DEF]/90 hover:bg-[#ED9DEF]/60 transition-all ease-in-out">Following</button>
        </div>
        <div v-else class="flex justify-center items-center self-stretch flex-grow relative">
          <button @click="data.addFollow(meta.pubkey)" class="rounded-lg py-1.5 px-2.5  font-medium bg-[#aaa] hover:bg-[#ccc] transition-all ease-in-out">Follow</button>
        </div>
  </div>
</template>

<script setup>
import FollowIcon from './icons/FollowIcon.vue'
import { fromNow } from '~~/utils/time'
import { follow } from '~~/utils/post'
const { addFollow, deleteFollow } = useData()

const props = defineProps(['pubkey'])
const meta = ref({ pubkey: props.pubkey })
const data = useData()
const followingKeys = toRef(data, 'followingKeys')

onMounted(async () => {
  meta.value = await useMeta(props.pubkey)
})

watch(data, (updated) => {
  console.log(updated.followingKeys)
})

/* const followingKeys = computed(() => {
  console.log(data.followingKeys)
  return data.followingKeys
}) */

</script>

<style lang="scss" scoped>

</style>
