import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

/**
 * Ensures we can reach the database before starting the server.
 * Throws if the connection check fails.
 */
export async function ensureDatabaseConnection(): Promise<void> {
  await prisma.$queryRaw`SELECT 1`;
}
