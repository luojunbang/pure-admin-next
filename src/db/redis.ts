import { RedisClientType, createClient } from 'redis'

let redis: RedisClientType

if (process.env.NODE_ENV === 'production') {
  redis = createClient({
    url: process.env.KV_URL,
    socket: {
      tls: true,
    },
  })
} else {
  if (!global.redis)
    global.redis = createClient({
      url: process.env.KV_URL,
      socket: {
        tls: true,
      },
    })
  redis = global.redis
}
redis.on('error', err => console.log('Redis Client Error', err))
await redis.connect()

export default redis
