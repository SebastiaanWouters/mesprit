export async function fetchData (url, method = 'GET', body = null) {
  let data = null
  if (method === 'GET') {
    data = await fetch(url)
  } else if (method === 'POST') {
    data = await fetch(url, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
  const json = await data.json()
  return json
}

export async function getRecentFromAuthor (pubkey) {
  const recent = await fetchData('/api/author/recent/' + pubkey)
  return recent.events
}
export async function getTrendingFromAuthor (pubkey) {
  const recent = await fetchData('/api/author/trending/' + pubkey)
  return recent.events
}

export async function fetchMetaData (pubkey) {
  const data = await fetchData('/api/metadata/' + pubkey)
  return data.metadata
}

export async function getRecentFromCategory (category) {
  const recent = await fetchData('/api/timeline/category/' + category)
  return recent.events
}
export async function getTrendingFromCategory (category) {
  const data = await fetchData('/api/foryou/category/' + category)
  return data.events
}

export function getArticleMetadata (event) {
  let title; let image; let summary
  if (event.tags) {
    for (const tag of event.tags) {
      if (tag[0] === 'title') {
        title = tag[1]
      } else if (tag[0] === 'summary') {
        summary = tag[1]
      } else if (tag[0] === 'image') {
        image = tag[1]
      }
    }
  }
  return { image, summary, title }
}
