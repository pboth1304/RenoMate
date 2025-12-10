import { describe, expect, it, vi } from 'vitest';

const queryMock = vi.hoisted(() => vi.fn());

vi.mock('@prisma/client', () => {
  class PrismaClient {
    $queryRaw = queryMock;
  }
  return { PrismaClient };
});

// eslint-disable-next-line import/first
import { ensureDatabaseConnection } from './db.js';

describe('ensureDatabaseConnection', () => {
  it('should resolve when the database is reachable', async () => {
    queryMock.mockResolvedValueOnce([{ '?column?': 1 }]);

    await expect(ensureDatabaseConnection()).resolves.toBeUndefined();
    expect(queryMock).toHaveBeenCalled();
  });

  it('should reject when the database is unreachable', async () => {
    queryMock.mockRejectedValueOnce(new Error('db down'));

    await expect(ensureDatabaseConnection()).rejects.toThrow('db down');
    expect(queryMock).toHaveBeenCalled();
  });
});
