import { publishEvent } from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = publishEvent(body)
  return { response }
})
