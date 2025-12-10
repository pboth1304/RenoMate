import { describe, expect, it, vi } from 'vitest';

const listenMock = vi.hoisted(() =>
  vi.fn((_port: number, cb?: () => void) => {
    cb?.();
    return { close: vi.fn() };
  }),
);

vi.mock('./app.js', () => ({
  default: {
    listen: listenMock,
  },
}));

const ensureMock = vi.hoisted(() => vi.fn());
vi.mock('./db.js', () => ({
  ensureDatabaseConnection: ensureMock,
}));

// eslint-disable-next-line import/first
import { startServer } from './index.js';

describe('startServer', () => {
  it('should start the server after DB readiness', async () => {
    ensureMock.mockResolvedValueOnce(undefined);

    await startServer(0);

    expect(ensureMock).toHaveBeenCalled();
    expect(listenMock).toHaveBeenCalled();
  });

  it('should propagate failure when DB readiness fails', async () => {
    ensureMock.mockRejectedValueOnce(new Error('db not ready'));

    await expect(startServer(0)).rejects.toThrow('db not ready');
    expect(listenMock).not.toHaveBeenCalled();
  });
});
