import { request } from '@/utils'
import { CommonRes } from '@/utils/types'

export interface User {
  id: string
  username: string
  isValid: boolean
  updateDate: string
  createDate: string
  token: string
}

export interface UserLoginParams {
  username: string
  password: string
}

export const system = {
  login(params: UserLoginParams) {
    return request.post<User>('/login', params)
  },
}

export const user = {
  getUserById(userId: string) {
    return request.get(`/user/${userId}`)
  },
}
