import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const alg = 'HS256'

export function gentoken(data, expiresIn = '1s') {
  return new SignJWT(data).setProtectedHeader({ alg }).sign(JWT_SECRET)
}

export async function validateToken(token) {
  let data, err
  try {
    data = await jwtVerify(token, JWT_SECRET)
  } catch (e) {
    err = e
  }
  return [err, data]
}

// gentoken({ userId: 'admin' }).then(console.log)
