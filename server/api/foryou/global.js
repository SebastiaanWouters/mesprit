import {
  getEvents,
  getMostPopular
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const trending = []
  const events = await getEvents(30023, undefined, undefined, 20, undefined, 900)
  const popular = await getMostPopular(events.map((event) => event.id))
  const response = events.filter((event) => popular[event.id] >= 0)
  return { events: response }
})
