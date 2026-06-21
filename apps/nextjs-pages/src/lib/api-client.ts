import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';

import { getToken, setToken } from './token-store';

const API_URL = env.API_URL;

export const api = Axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token as string);
    }
  });
  failedQueue = [];
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.withCredentials = true;
  if (config.headers) {
    config.headers.Accept = 'application/json';
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest?.url !== '/auth/refresh'
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await Axios.create({
          baseURL: API_URL,
        }).post('/auth/refresh', {}, { withCredentials: true });

        const { access_token } = response.data;
        setToken(access_token);
        processQueue(null, access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setToken(null);
        if (typeof window !== 'undefined') {
          const searchParams = new URLSearchParams();
          const redirectTo =
            searchParams.get('redirectTo') || window.location.pathname;
          window.location.href = paths.auth.login.getHref(redirectTo);
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message || error.message || 'An error occurred';
    useNotifications.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);

export const attachCookie = (
  cookie?: string,
  headers?: Record<string, string>,
) => {
  return {
    headers: {
      ...headers,
      ...(cookie ? { Cookie: cookie } : {}),
    },
  };
};
