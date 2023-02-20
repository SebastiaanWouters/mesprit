import {
  getEvents,
  getMostPopular,
  getFollowing
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const trending = []
  const events = await getEvents(30023, undefined, 0, undefined, event.context.params.category, 700)
  const popular = await getMostPopular(events.map((event) => event.id))

  return { events: events.filter((event) => popular[event.id] >= 4) }
})
