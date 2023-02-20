import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const drafts = await prisma.draft.findMany({
    where: {
      author: event.context.params.pubkey
    }
  })
  return { events: drafts }
})
