import redis from '@/db/redis'
console.log(' process.env.KV_URL:', process.env.KV_URL)
;(async () => {
  const value = await redis.get('user_1_session')
  console.log('value:', value)
})()
