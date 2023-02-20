import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useData = defineStore('data', () => {
  /* const pubkey = ref(localStorage.getItem('user')); */
  const bookmarks = ref([])
  const global = reactive({ timeline: [], trending: [] })
  const globalDynamic = reactive({ recent: [], trending: [] })
  const following = reactive({ timeline: [], trending: [] })
  const followingKeys = ref([])
  const lastUpdated = ref(0)
  const auth = useAuth()
  const updating = reactive({ globalTimeline: false, globalTrending: false })

  watch(auth, (newAuth) => {
    console.log(newAuth.pubkey)
    if (newAuth.pubkey !== undefined && lastUpdated.value === 0) {
      console.log(newAuth.pubkey)
      updateData()
    }
  })

  onMounted(() => {
    if (auth.pubkey !== undefined && lastUpdated.value === 0) {
      console.log(auth.pubkey)
      updateData()
    }
  })

  async function updateBookmarks () {
    const bookmarkData = await fetchData('/api/bookmarks/' + auth.pubkey)
    bookmarks.value = bookmarkData.events
  }

  async function updateGlobalTimeline (amount) {
    if (!updating.globalTimeline) {
      updating.globalTimeline = true
      const latest = global.timeline.length > 0 ? global.timeline[global.timeline.length - 1].created_at - 1 : new Date() / 1000
      const newGlobalData = await fetchData('/api/timeline/until/' + latest + '/' + amount)
      for (const event of newGlobalData.events) {
        global.timeline.push(event)
      }
      console.log(newGlobalData.events.length)
      updating.globalTimeline = false
    }
  }

  async function updateGlobalTrending (amount) {
    if (!updating.globalTrending) {
      updating.value = true
      const latest = global.trending.length > 0 ? global.trending[global.trending.length - 1].created_at - 1 : new Date() / 1000
      const newGlobalData = await fetchData('/api/foryou/until/' + latest + '/' + amount)
      for (const event of newGlobalData.events) {
        global.trending.push(event)
      }
      console.log(newGlobalData.events.length)
      updating.globalTrending = false
    }
  }

  async function updateFollowing (local = false, pubkeys = []) {
    if (local) {
      followingKeys.value = pubkeys
      console.log(followingKeys.value)
      return
    }
    const followingPubkeys = await fetchData('/api/following/' + auth.pubkey)
    console.log(followingPubkeys)
    followingKeys.value = followingPubkeys.pubkeys
  }

  async function updateData () {
    lastUpdated.value = new Date()
    console.log('updating... ' + auth.pubkey)
    updateFollowing()
    updateBookmarks()
    updateGlobalTimeline(15)
    updateGlobalTrending(15)
    const followingRecent = await fetchData('/api/timeline/' + auth.pubkey)
    following.timeline = followingRecent.events
    const followingTrending = await fetchData('/api/foryou/' + auth.pubkey)
    following.trending = followingTrending.events
  }

  async function deleteBookmark (pubkey, id) {
    await deleteBM(pubkey, id)
    await updateBookmarks()
  }

  async function addBookmark (pubkey, id) {
    await addBM(pubkey, id)
    await updateBookmarks()
  }

  async function deleteFollow (pubkey) {
    const follows = await unfollow(pubkey, auth.pubkey)
    await updateFollowing(true, follows)
  }

  async function addFollow (pubkey) {
    const follows = await follow(pubkey, auth.pubkey)
    console.log(follows)
    await updateFollowing(true, follows)
  }

  return { bookmarks, deleteBookmark, addBookmark, addFollow, deleteFollow, updateGlobalTimeline, updateGlobalTrending, globalDynamic, global, following, followingKeys }
})
