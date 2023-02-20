import {
  getEvents,
  getMostPopular,
  getFollowing
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const trending = []
  const pubkeys = await getFollowing(event.context.params.pubkey, 300)
  const events = await getEvents(30023, pubkeys, 0, undefined, undefined, 1000)
  const popular = await getMostPopular(events.map((event) => event.id))

  return { events: events.filter((event) => popular[event.id] >= 4) }
})
