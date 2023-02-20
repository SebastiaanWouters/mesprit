// mouse.js
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const meta = reactive([])

export const useMeta = async (pubkey) => {
  /* const pubkey = ref(localStorage.getItem('user')); */
  if (!meta.some(event => event.pubkey === pubkey)) {
    const metadata = await fetchMetaData(pubkey)
    meta.push(metadata)
    return metadata
  }
  return meta.find(event => event.pubkey === pubkey)
}
