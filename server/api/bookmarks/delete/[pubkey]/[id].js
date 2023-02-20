import { prisma } from '~~/server/utils/prisma'
import {
  getEvent
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const newUser = await prisma.bookmark.deleteMany({
    where: {
      id: event.context.params.id,
      owner: event.context.params.pubkey
    }
  })
  return { newUser }
})
