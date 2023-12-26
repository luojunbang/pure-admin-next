import { SignJWT, jwtVerify } from 'jose'
import { appName } from '.'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)
const alg = 'HS256'

export function genToken(data, expiresIn = '1s') {
  return new SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(appName)
    .sign(JWT_SECRET)
}

export async function validateToken(token) {
  let data, err
  try {
    data = await jwtVerify(token, JWT_SECRET, { issuer: appName })
  } catch (e) {
    err = e
  }
  return [err, data]
}
