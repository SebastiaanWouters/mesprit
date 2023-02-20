import { getEventHash } from 'nostr-tools'

export async function addBM (pubkey, id) {
  const data = await fetch('/api/bookmarks/post/' + pubkey + '/' + id)
  /* const json = await data.json() */
  return data
}

export async function deleteBM (pubkey, id) {
  const data = await fetch('/api/bookmarks/delete/' + pubkey + '/' + id)
  /* const json = await data.json() */
  return data
}

export async function addDraft (pubkey, title, image, content, date) {
  return null
}

export async function publishThis (event) {
  const response = await fetchData('/api/publish', 'POST', event)
}

export async function follow (followee, follower) {
  const following = await fetchData('/api/following/' + follower)
  const tags = [...new Set(following.pubkeys.map(pk => ['p', pk]).concat([['p', followee]]))]
  const event = { kind: 3, pubkey: follower, created_at: Math.floor(Date.now() / 1000), content: '', tags }
  event.id = getEventHash(event)
  const signedEvent = await window.nostr.signEvent(event)
  await publishThis(signedEvent)
  return [...new Set(following.pubkeys.concat([followee]))]
}

export async function unfollow (followee, follower) {
  const following = await fetchData('/api/following/' + follower)
  const tags = following.pubkeys.filter(pk => pk !== followee).map(pk => ['p', pk])
  const event = { kind: 3, pubkey: follower, created_at: Math.floor(Date.now() / 1000), content: '', tags }
  console.log(event)
  event.id = getEventHash(event)
  const signedEvent = await window.nostr.signEvent(event)
  await publishThis(signedEvent)
  return following.pubkeys.filter(pk => pk !== followee)
}
