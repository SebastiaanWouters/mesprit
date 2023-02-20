import { getFollowing } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const pubkeys = await getFollowing(event.context.params.pubkey, 400)
  return { pubkeys }
})
