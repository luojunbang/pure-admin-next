import _prisma from '../prisma'
import { handleError } from '@/utils/server'
import md5 from 'crypto-js/md5'
import { User } from '@prisma/client'
const password = md5(process.env.DEFAULT_PASSWORD as string).toString()
import { z } from 'zod'

export const userInput = z.object({
  username: z
    .string({
      required_error: 'username is required',
      invalid_type_error: 'username must be a string',
    })
    .min(2, 'less letter is 2. ')
    .max(50, 'max letter is 50.'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .min(8, 'less letter is 8. ')
    .max(50, 'max letter is 50'),
  updateDate: z.date(),
  isValid: z.boolean(),
})

const prisma = _prisma.$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = userInput.passthrough().parse(args.data)
        return query(args)
      },
      update({ args, query }) {
        args.data = userInput.partial().parse(args.data)
        return query(args)
      },
    },
  },
})

/**
 * add user
 * @param user
 * @returns
 */
export async function userAdd(user: User) {
  try {
    const data = await prisma.user.create({
      data: user,
    })
    return data
  } catch (e) {
    handleError(e)
  }
}

/**
 * get user info by username
 * @param username
 * @returns
 */
export async function userInfo(username: string): Promise<User> {
  const data = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  if (!data) throw `can' t find the record. `
  return data
}

/**
 * update user by username
 * @param username
 * @param user
 * @returns
 */
export async function userUpdate(username: string, user: User) {
  try {
    const data = await prisma.user.update({
      where: {
        username,
      },
      data: user,
    })
    return data
  } catch (e) {
    handleError(e)
  }
}

/**
 * delete user by username
 * @param username
 * @returns
 */
export async function userDelete(username: string) {
  try {
    const data = await prisma.user.delete({
      where: {
        username,
      },
    })
    return data
  } catch (e) {
    handleError(e)
  }
}

/**
 * init user admin
 * @returns
 */
export function initUserAdmin() {
  return prisma.user
    .create({
      data: {
        username: 'admin',
        password,
        isValid: true,
        updateDate: new Date(),
        profile: {
          create: {
            name: 'admin',
            email: 'admin@admin.com',
            contact: '12345678910',
          },
        },
        role: {
          create: {
            name: 'admin',
          },
        },
      },
    })
    .then(res => {
      console.log('init user admin done. ')
    })
    .catch(err => {
      console.log(`init admin user fail. \n${err}`)
    })
}
