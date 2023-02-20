import {
  getEvents,
  getMostPopular,
  getFollowing
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const trending = []
  const events = await getEvents(30023, [event.context.params.pubkey], undefined, undefined, undefined, 600)
  const popular = await getMostPopular(events.map((event) => event.id))

  return { events: events.filter((event) => popular[event.id] >= 4) }
})
