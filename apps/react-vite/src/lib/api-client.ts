import Axios, { InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

import { env } from '@/config/env';
import { paths } from '@/config/paths';

import { getAccessToken, userManager } from './oidc';

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  // No withCredentials — Bearer PKCE uses Authorization header only
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(async (config) => {
  const cfg = authRequestInterceptor(config as InternalAxiosRequestConfig);
  const token = await getAccessToken();
  if (token && cfg.headers) {
    // AxiosHeaders has set method
    (cfg.headers as unknown as { set: (k: string, v: string) => void }).set?.('Authorization', `Bearer ${token}`);
    // Fallback for plain object headers
    if (!(cfg.headers as Record<string, unknown>)['Authorization']) {
      (cfg.headers as Record<string, unknown>)['Authorization'] = `Bearer ${token}`;
    }
  }
  return cfg;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Silent renew single-flight on 401
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              (originalRequest.headers as Record<string, unknown>)['Authorization'] = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const user = await userManager.signinSilent();
        const newToken = user?.access_token ?? (await getAccessToken());
        processQueue(null, newToken);
        if (newToken && originalRequest.headers) {
          (originalRequest.headers as Record<string, unknown>)['Authorization'] = `Bearer ${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        toast.error(message);
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get('redirectTo') || window.location.pathname;
        window.location.href = paths.auth.login.getHref(redirectTo);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);
