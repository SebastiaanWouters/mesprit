import { getEvents, getMostPopular } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const until = event.context.params.until
  const limit = event.context.params.amount
  const pubkey = event.context.params.pubkey
  const events = await getEvents(30023, [pubkey], parseInt(until), parseInt(limit), undefined, 900)
  const popular = await getMostPopular(events.map((event) => event.id))
  const response = events.filter((event) => popular[event.id] >= 0)

  return { events: response }
})
