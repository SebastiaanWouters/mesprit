import { prisma } from '../../utils/prisma'
import {
  getEvent
} from '~~/utils/data'

export default defineEventHandler(async (event) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      owner: event.context.params.pubkey
    }
  })
  const events = []
  for (const bookmark of bookmarks) {
    const data = await getEvent(bookmark.id)
    events.push(data)
  }
  return { events }
})
