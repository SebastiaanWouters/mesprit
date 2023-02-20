import { getEvent } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const data = await getEvent(event.context.params.id)
  return data
})
