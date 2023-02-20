// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: ({
    redisURL: process.env.REDIS_URL,
    apiKey: process.env.OPENAI_API_KEY
  }),
  build: { transpile: ['nostr-relaypool-fork'] },
  modules: [
    // ...
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@@/assets/global.css'
  ]
})
