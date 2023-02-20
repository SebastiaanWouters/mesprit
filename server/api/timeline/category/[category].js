import { getEvents, getFollowing } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const events = await getEvents(30023, undefined, 0, undefined, event.context.params.category, 600)
  return { events }
})
