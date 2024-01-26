import _prisma from '../prisma'
import { handleError } from '@/utils/server'
import md5 from 'crypto-js/md5'
import { User } from '@prisma/client'
const password = md5(process.env.DEFAULT_PASSWORD as string).toString()
import { z } from 'zod'
import { exclude } from 'lo-utils'

const excludeUserInfo = (data) =>
  exclude<User, 'password' | 'isValid'>(data, ['password', 'isValid'])

export const userInput = z.object({
  account: z
    .string({
      required_error: 'account is required',
      invalid_type_error: 'account must be a string',
    })
    .min(2, 'less letter is 2. ')
    .max(50, 'max letter is 50.'),
  username: z
    .string({
      required_error: 'account is required',
      invalid_type_error: 'account must be a string',
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
        args.data = userInput.parse(args.data)
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
    return excludeUserInfo(data)
  } catch (e) {
    handleError(e)
  }
}

/**
 * get user info by account
 * @param account
 * @returns
 */
export async function userInfo({
  account,
  password,
}: {
  account: string
  password: string
}) {
  const data = await prisma.user.findUnique({
    where: {
      account,
      password,
    },
  })
  if (!data) throw `can' t find the record. `
  return excludeUserInfo(data)
}

/**
 * update user by account
 * @param account
 * @param user
 * @returns
 */
export async function userUpdate(account: string, user: User) {
  try {
    const data = await prisma.user.update({
      where: {
        account,
      },
      data: user,
    })
    return data
  } catch (e) {
    handleError(e)
  }
}

/**
 * delete user by account
 * @param account
 * @returns
 */
export async function userDelete(account: string) {
  try {
    const data = await prisma.user.update({
      where: {
        account,
      },
      data: {
        isValid: false,
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
        account: 'admin',
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
    .then((res) => {
      console.log('init user admin done. ')
    })
    .catch((err) => {
      console.log(`init admin user fail. \n${err}`)
    })
}
