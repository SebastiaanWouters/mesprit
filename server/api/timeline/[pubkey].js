import { getEvents, getFollowing } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const pubkeys = await getFollowing(event.context.params.pubkey, 300)
  const events = await getEvents(30023, pubkeys, undefined, 50, undefined, 800)
  events.sort((a, b) => { return a.created_at - b.created_at ? 1 : -1 })
  for (const event of events) {
    console.log(event.pubkey)
  }
  return { events }
})
