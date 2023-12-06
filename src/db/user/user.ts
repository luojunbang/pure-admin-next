import _prisma from '../prisma'

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
    .max(50, 'max letter is 50'),
  updateDate: z.string().datetime(),
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

export function userAdd(user: User) {
  return prisma.user.create({
    data: user,
  })
}

export function userInfo(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

export function userUpdate(username: string, user: User) {
  return prisma.user.update({
    where: {
      username,
    },
    data: user,
  })
}

export function userDelete(username: string) {
  return prisma.user.delete({
    where: {
      username,
    },
  })
}

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
    .then((res) => {
      console.log('init user admin done. ')
    })
    .catch((err) => {
      console.log(`init admin user fail. \n${err}`)
    })
}
