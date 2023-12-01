import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany()
  return allUsers[0] ?? {}
}

async function getUser(username: string) {
  return main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

export default async function Dashboard({
  params: { username },
}: {
  params: { username: string }
}) {
  const ret = await getUser(username)
  return <div>Dashboard-{ret.username ?? ''}</div>
}
