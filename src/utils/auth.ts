import jwt from 'jsonwebtoken'

const s = '12345'
var token = jwt.sign({ foo: 'bar' }, s, { expiresIn: 5 })
console.log('token:', token, Date.now())
setTimeout(() => {
  const after = jwt.verify(token, s)
  console.log('after:', after)

  const { exp, iat } = after
  console.log(iat === exp)

  console.log('iat:', new Date(iat * 1000))
  console.log('exp:', new Date(exp * 1000))
}, 1000 * 3)
