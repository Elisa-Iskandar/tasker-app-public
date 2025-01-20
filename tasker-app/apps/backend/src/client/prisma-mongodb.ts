import { PrismaClient } from "@prisma/client"

async function prismaInstance() {
  const prisma = new PrismaClient()
  prisma.$connect()
  return prisma
}

declare const globalThis: {
  prismaGlobal: PrismaClient
} & typeof global

const dbClient = globalThis.prismaGlobal ?? prismaInstance()

export default dbClient
