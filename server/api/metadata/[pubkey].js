import { getEvents, getMetadata } from '~~/utils/data'
import redis from '~~/server/utils/redis'

export default defineEventHandler(async (event) => {
  const _cacheHit = await redis.get(`metadata/${event.context.params.pubkey}`)
  const cacheHit = JSON.parse(_cacheHit)
  if (cacheHit) {
    console.log('   :found in cache')
    return { metadata: cacheHit }
  } else {
    try {
      const meta = await getMetadata(event.context.params.pubkey, 400)
      const data = JSON.parse(meta.content)
      const response = { ...data, pubkey: event.context.params.pubkey }
      redis.setex(`metadata/${event.context.params.pubkey}`, 1800, JSON.stringify(response))
      return { metadata: response }
    } catch {
      return { metadata: { pubkey: event.context.params.pubkey } }
    }
  }
})
