import { describe, expect, it, vi } from 'vitest';

import { loginWithEmailAndPassword } from '../login';

describe('useLogin (cookie-based)', () => {
  it('does NOT store the token in localStorage (cookie is HttpOnly)', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            access_token: 'should-not-be-stored',
            data: { id: '1', email: 'a@b.com' },
          }),
          { status: 200 },
        ),
      ),
    );

    await loginWithEmailAndPassword({
      email: 'a@b.com',
      password: 'pw',
    } as any);

    const stored = setItem.mock.calls.some(([k]) =>
      k.includes('educonnect_access_token'),
    );
    expect(stored).toBe(false);
    setItem.mockRestore();
  });
});
