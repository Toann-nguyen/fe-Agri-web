import { describe, expect, it, vi, beforeEach } from 'vitest';

import { __resetRefreshForTests, refreshSession } from '../refresh-manager';

describe('refresh-manager single-flight lock', () => {
  beforeEach(() => {
    __resetRefreshForTests();
    vi.restoreAllMocks();
  });

  it('dedups concurrent refresh calls into one fetch', async () => {
    let calls = 0;
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        calls++;
        await new Promise((r) => setTimeout(r, 30));
        return { ok: true } as Response;
      }),
    );

    const p1 = refreshSession();
    const p2 = refreshSession();
    const p3 = refreshSession();

    expect(p1).toBe(p2);
    expect(p2).toBe(p3);

    await Promise.all([p1, p2, p3]);
    expect(calls).toBe(1);
  });

  it('allows a new refresh after the previous one settles (success)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true }) as Response),
    );
    await refreshSession();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true }) as Response),
    );
    const second = refreshSession();
    await expect(second).resolves.toBe(true);
  });

  it('clears lock on failure so a retry can run', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false }) as Response),
    );
    await expect(refreshSession()).rejects.toThrow('Refresh failed');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true }) as Response),
    );
    await expect(refreshSession()).resolves.toBe(true);
  });
});
