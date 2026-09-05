import { UserManager, WebStorageStateStore, type UserManagerSettings } from 'oidc-client-ts';

import { env } from '@/config/env';

/**
 * T4.1 PKCE — In-memory token store (never localStorage/cookie).
 * oidc-client-ts will keep User + access_token in memory via custom store.
 */

class MemoryWebStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

const memoryStorage = new MemoryWebStorage();

// Single memory store shared by userStore + stateStore so PKCE state/code_verifier also in memory
const memoryStore = new WebStorageStateStore({ store: memoryStorage as unknown as Storage, prefix: 'oidc.' });

const oidcSettings: UserManagerSettings = {
  authority: env.OIDC_AUTHORITY,
  client_id: env.OIDC_CLIENT_ID,
  redirect_uri: env.OIDC_REDIRECT_URI,
  post_logout_redirect_uri: env.OIDC_POST_LOGOUT_REDIRECT_URI,
  silent_redirect_uri: env.OIDC_SILENT_REDIRECT_URI,
  scope: env.OIDC_SCOPE,
  response_type: 'code',
  // PKCE is automatic in oidc-client-ts when response_type=code (code_challenge)
  automaticSilentRenew: true,
  silentRequestTimeoutInSeconds: 10,
  // Renew 60s before expiry
  accessTokenExpiringNotificationTimeInSeconds: 60,
  // In-memory — no localStorage/sessionStorage leak
  userStore: memoryStore,
  stateStore: memoryStore,
  // Validate sub and use secure defaults

  loadUserInfo: true,
  monitorSession: false,
};

export const userManager = new UserManager(oidcSettings);

// Expose memory helpers for axios interceptor & tests
let currentUser: import('oidc-client-ts').User | null = null;

userManager.events.addUserLoaded((user) => {
  currentUser = user;
});

userManager.events.addUserUnloaded(() => {
  currentUser = null;
});

userManager.events.addSilentRenewError(() => {
  // Silent renew failure -> clear in-memory user and redirect to login on next 401
  currentUser = null;
});

userManager.events.addAccessTokenExpired(() => {
  currentUser = null;
});

export const getAccessToken = async (): Promise<string | null> => {
  // Prefer in-memory currentUser, fallback to getUser()
  if (currentUser?.access_token && !currentUser.expired) return currentUser.access_token;
  const user = await userManager.getUser();
  if (user && !user.expired) {
    currentUser = user;
    return user.access_token;
  }
  // Try silent renew before giving up
  try {
    const renewed = await userManager.signinSilent();
    if (renewed && !renewed.expired) {
      currentUser = renewed;
      return renewed.access_token;
    }
  } catch {
    // silent renew failed
  }
  return null;
};

export const getUser = () => userManager.getUser();

export const login = (redirectTo?: string) => userManager.signinRedirect({ state: redirectTo ?? '/' });

export const logout = () => userManager.signoutRedirect();

export const handleCallback = () => userManager.signinRedirectCallback();

export const handleSilentCallback = () => userManager.signinSilentCallback();

export { MemoryWebStorage };
export { memoryStorage, memoryStore };
