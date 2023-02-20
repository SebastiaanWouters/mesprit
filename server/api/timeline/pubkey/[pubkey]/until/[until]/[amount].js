import { getEvents } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const until = event.context.params.until
  const limit = event.context.params.amount
  const pubkey = event.context.params.pubkey
  const events = await getEvents(30023, [pubkey], parseInt(until), parseInt(limit), undefined, 800)
  return { events }
})
