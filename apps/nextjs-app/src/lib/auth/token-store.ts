'use client';

import { create } from 'zustand';

const STORAGE_KEY = 'educonnect_access_token';

const isClient = typeof window !== 'undefined';

function readStoredToken(): string | null {
  if (!isClient) return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredToken(token: string | null) {
  if (!isClient) return;
  try {
    if (token === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, token);
    }
  } catch {
    // localStorage unavailable (private mode/quota) — fallback to in-memory
  }
}

type TokenState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clear: () => void;
};

const useTokenStore = create<TokenState>((set) => ({
  accessToken: readStoredToken(),
  setAccessToken: (accessToken) => {
    writeStoredToken(accessToken);
    set({ accessToken });
  },
  clear: () => {
    writeStoredToken(null);
    set({ accessToken: null });
  },
}));

export const getToken = (): string | null =>
  useTokenStore.getState().accessToken;

export const setToken = (token: string | null) => {
  useTokenStore.getState().setAccessToken(token);
};

export const clearToken = () => {
  useTokenStore.getState().clear();
};
