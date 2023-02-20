import { getEvents, getMetadata } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  try {
    const meta = await getMetadata(event.context.params.pubkey, 80)
    const data = JSON.parse(meta.content)
    if (Object.keys(data).length <= 1) {
      return { metadata: {} }
    }
    const response = { ...data, pubkey: event.context.params.pubkey }
    return { metadata: response }
  } catch {
    return { metadata: {} }
  }
})
