// Use a singleton pattern to ensure a single instance across reloads and prevent multiple
// Prisma Client instances during development, caused by Hot Module Replacement,
// Details: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
	return new PrismaClient()
}

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const db = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") {
	globalThis.prismaGlobal = db
}
