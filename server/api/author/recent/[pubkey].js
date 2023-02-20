import { getEvents, getFollowing } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const events = await getEvents(30023, [event.context.params.pubkey], undefined, undefined, undefined, 500)
  return { events }
})
