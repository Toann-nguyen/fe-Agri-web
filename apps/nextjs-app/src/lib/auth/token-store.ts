'use client';

import { create } from 'zustand';

type TokenState = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clear: () => void;
};

const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  clear: () => set({ accessToken: null }),
}));

export const getToken = (): string | null =>
  useTokenStore.getState().accessToken;

export const setToken = (token: string | null) => {
  useTokenStore.getState().setAccessToken(token);
};

export const clearToken = () => {
  useTokenStore.getState().clear();
};
