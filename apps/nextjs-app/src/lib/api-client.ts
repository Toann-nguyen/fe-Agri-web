import toast from 'react-hot-toast';

import { env } from '@/config/env';

import { getToken, setToken } from './token-store';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  _retry?: boolean;
};

const API_URL = env.API_URL;

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

function buildUrlWithParams(
  url: string,
  params?: RequestOptions['params'],
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString();
  return `${url}?${queryString}`;
}

export function getServerCookies() {
  if (typeof window !== 'undefined') return '';

  return import('next/headers').then(({ cookies }) => {
    try {
      const cookieStore = cookies();
      return cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');
    } catch (error) {
      console.error('Failed to access cookies:', error);
      return '';
    }
  });
}

async function doFetch<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    cookie,
    params,
    cache = 'no-store',
    next,
  } = options;

  let cookieHeader = cookie;
  if (typeof window === 'undefined' && !cookie) {
    cookieHeader = await getServerCookies();
  }

  const token = getToken();
  const fullUrl = buildUrlWithParams(`${API_URL}${url}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache,
    next,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || response.statusText;

    if (
      response.status === 401 &&
      typeof window !== 'undefined' &&
      url !== '/auth/refresh' &&
      !options._retry
    ) {
      return handleRefresh<T>(url, options);
    }

    if (typeof window !== 'undefined') {
      toast.error(message);
    }
    throw new Error(message);
  }

  return response.json();
}

async function handleRefresh<T>(
  originalUrl: string,
  originalOptions: RequestOptions,
): Promise<T> {
  if (isRefreshing) {
    return new Promise<T>((resolve, reject) => {
      failedQueue.push({
        resolve: (token) => {
          originalOptions.headers = {
            ...originalOptions.headers,
            Authorization: `Bearer ${token}`,
          };
          resolve(doFetch<T>(originalUrl, originalOptions));
        },
        reject,
      });
    });
  }

  isRefreshing = true;
  originalOptions = { ...originalOptions, _retry: true };

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Refresh failed');
    }

    const data = await res.json();
    setToken(data.access_token);
    processQueue(null, data.access_token);

    originalOptions.headers = {
      ...originalOptions.headers,
      Authorization: `Bearer ${data.access_token}`,
    };
    return doFetch<T>(originalUrl, originalOptions);
  } catch (error) {
    processQueue(error, null);
    setToken(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
    throw error;
  } finally {
    isRefreshing = false;
  }
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'POST', body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'PUT', body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'PATCH', body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'DELETE' });
  },
};
