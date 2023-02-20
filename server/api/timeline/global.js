import { getEvents } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const since = Math.round(Date.now() / 1000) - 1200
  const now = Math.round(Date.now() / 1000)
  const events = await getEvents(30023, undefined, undefined, 20, undefined, 900)
  return { events }
})
