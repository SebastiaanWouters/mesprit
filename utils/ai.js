
export async function processPrompt (string, API_KEY) {
  let data = null
  const prompt = `generate a title for the following article: ${string}`
  const url = 'https://api.openai.com/v1/completions'
  const body = { model: 'text-davinci-003', prompt, temperature: 0, max_tokens: 256 }

  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  }

  data = await fetch(url, options)
  const json = await data.json()
  return json
}
