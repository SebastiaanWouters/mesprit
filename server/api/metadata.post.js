import { getEvents } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  try {
    const collection = await getEvents(0, body, 0, undefined, undefined, 500)
    return { metadata: collection }
  } catch {
    return { metadata: {} }
  }
})
