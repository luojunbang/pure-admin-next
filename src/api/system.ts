import { request } from '@/utils'

export const system = {
  login(params) {
    return request.get('/login', params)
  },
}

export const user = {
  getUserById(userId: string) {
    return request.get(`/user/${userId}`)
  },
}
