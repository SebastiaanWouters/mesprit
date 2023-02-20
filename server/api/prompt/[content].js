import { processPrompt } from '~~/utils/ai'
const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const decoded = decodeURI(event.context.params.content)
  const data = await processPrompt(decoded, config.public.apiKey)
  return data
})
