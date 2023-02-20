import { Author } from 'nostr-relaypool-fork'
import { pool, relays } from './relay.js'

export async function getEvents (
  kind = 1,
  pubkeys = null,
  until = null,
  limit = 20,
  category = null,
  delay = 700
) {
  let allEvents = []
  const count = 0
  const unsub = pool.subscribe(
    [
      {
        kinds: [kind],
        authors: pubkeys || undefined,
        until: until || undefined,
        limit,
        '#t': category ? [category] : undefined
      }
    ],
    relays,
    (event, isAfterEose, relayURL) => {
    },
    undefined,
    (events, relayURL) => {
      allEvents = allEvents.concat(events)
    }
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      unsub()
      const sorted = allEvents.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
      const unique = sorted.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
      const sliced = unique.slice(0, limit)
      resolve(sliced)
    }, delay)
  })
}

export async function getMostPopular (ids, delay = 700) {
  const popular = []
  const reactionCount = {}
  const count = 0
  const finished = false
  const unsub = pool.subscribe(
    [
      {
        kinds: [7, 1],
        '#e': ids
      }
    ],
    relays,
    (event, isAfterEose, relayURL) => {
      for (const tag of event.tags) {
        if (ids.includes(tag[1])) {
          if (reactionCount[tag[1]]) {
            reactionCount[tag[1]] += 1
          } else {
            reactionCount[tag[1]] = 1
          }
        }
      }
    },
    undefined,
    (events, relayURL) => {}
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      unsub()
      resolve(reactionCount)
    }, delay)
  })
}

export async function getReactionsOnEvent (id, delay = 500) {
  const reactions = []
  let reactionCount = 0
  const count = 0
  const finished = false
  const unsub = pool.subscribe(
    [
      {
        kinds: [7, 1],
        '#e': [id]
      }
    ],
    relays,
    (event, isAfterEose, relayURL) => {
      reactions.push(event)
      reactionCount += 1
    },
    undefined,
    (events, relayURL) => {}
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      unsub()
      resolve(reactionCount)
    }, delay)
  })
}

export async function getReactionsOnPubkey (pubkey, delay = 500) {
  const reactions = []
  let reactionCount = 0
  const count = 0
  const finished = false
  const unsub = pool.subscribe(
    [
      {
        kinds: [7, 1],
        '#p': [pubkey]
      }
    ],
    relays,
    (event, isAfterEose, relayURL) => {
      reactions.push(event)
      reactionCount += 1
    },
    undefined,
    (events, relayURL) => {}
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      unsub()
      resolve(reactionCount)
    }, delay)
  })
}

export async function getFollowing (pubkey, delay = 300) {
  const following = []
  const author = new Author(pool, relays, pubkey)
  author.followsPubkeys(processFollow, 0)

  function processFollow (pubkeys) {
    for (const pubkey of pubkeys) {
      following.push(pubkey)
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(following)
    }, delay)
  })
}

export async function getMetadata (pubkey, delay = 300) {
  let meta = { pubkey }
  const author = new Author(pool, relays, pubkey)
  author.metaData(processMeta, 0)

  function processMeta (event) {
    meta = { ...meta, ...event }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(meta)
    }, delay)
  })
}

export async function getEvent (id) {
  let data = {}

  const unsub = pool.subscribe(
    [
      {
        ids: [id]
      }
    ],
    relays,
    (event, isAfterEose, relayURL) => {
      data = event
    },
    undefined,
    (events, relayURL) => {}
  )

  return new Promise((resolve) => {
    setTimeout(() => {
      unsub()
      resolve(data)
    }, 300)
  })
}

export async function publishEvent (event) {
  const result = await pool.publish(event, relays)
  console.log(result)
  return result
}

export function addAndSort (arr, val, propertyName) {
  arr.push(val)
  let i = arr.length - 1
  const item = arr[i]
  while (i > 0 && item[propertyName] > arr[i - 1][propertyName]) {
    arr[i] = arr[i - 1]
    i -= 1
  }
  arr[i] = item
  return arr
}
