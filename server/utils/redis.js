import { Redis } from 'ioredis'
const config = useRuntimeConfig()
console.log(config.redisURL)

const redis = new Redis(config.redisURL)

export default redis
