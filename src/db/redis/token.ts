import { kv } from '@vercel/kv'
import { log } from '@/utils'
const timeout = parseInt(process.env.TOKEN_TIMEOUT ?? '1200')
const username = 'admin'
const token = 'test token'
const lockTimeout = 5

export async function setLock(key): Promise<Boolean> {
  const currLockTime = ~~(Date.now() / 1000) + timeout + 1
  // 检查是不是有锁
  const setLockRet = await kv.set(key, currLockTime, {
    nx: true,
    ex: lockTimeout,
  })
  if (setLockRet) return true
  const oldLockTime = (await kv.get(key)) as string
  if (currLockTime - +oldLockTime > lockTimeout) {
    log('UserId {} lock time out. ', key)
    const _oldLockTime = await kv.getset(key, currLockTime.toString())
    if (_oldLockTime === oldLockTime && oldLockTime) {
      return true
    }
  }
  return false
}

export async function setToken(key, value) {
  const lockName = `${key}.lock`
  if (await setLock(lockName)) {
    // 有锁
    log('UserId {} add lock. update token expired time. ', key)
    return await kv.set(`${key}.token`, value, {
      ex: timeout,
    })
  }
  log('UserId {} has lock. do nothing. ', key)
}

export async function getToken(key: string) {
  const ret: string | null = await kv.get(`${key}.token`)
  return ret
}

// const quene = new Array(10)
//   .fill(0)
//   .reduce((rs, i, idx) => {
//     return rs.then(
//       _ =>
//         new Promise<void>(rs => {
//           setTimeout(() => {
//             console.log('process', idx)
//             setToken(username, token).then(res => rs())
//           }, 1 * 1000)
//         })
//     )
//   }, Promise.resolve())
//   .then(res => {
//     setInterval(async () => {
//       console.log(await redis.get(username))
//     }, 1.5 * 1000)
//   })
