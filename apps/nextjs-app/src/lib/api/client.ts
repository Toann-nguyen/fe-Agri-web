import toast from 'react-hot-toast';

import { env } from '@/config/env';

import { parseErrorPayload } from './error';
import { RequestConfig } from './types';

const API_URL = env.API_URL;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (ok: boolean) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, ok: boolean) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(ok);
    }
  });
  failedQueue = [];
}

function buildUrlWithParams(
  url: string,
  params?: RequestConfig['params'],
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

async function doFetch<T>(
  url: string,
  options: RequestConfig = {},
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    cache = 'no-store',
    next,
  } = options;

  const fullUrl = buildUrlWithParams(
    // Same-origin BFF routes (app/api/*) must NOT be prefixed with API_URL.
    url.startsWith('/api/') ? url : `${API_URL}${url}`,
    params,
  );

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    // The HttpOnly session cookie is sent automatically by the browser.
    // We never read or attach a token from JS.
    credentials: 'include',
    cache,
    next,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || response.statusText;
    const error = parseErrorPayload({
      ...errorData,
      statusCode: response.status,
      message,
    });

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
    throw error;
  }

  return response.json();
}

async function handleRefresh<T>(
  originalUrl: string,
  originalOptions: RequestConfig,
): Promise<T> {
  if (isRefreshing) {
    return new Promise<T>((resolve, reject) => {
      failedQueue.push({
        resolve: (ok) => {
          if (ok) {
            resolve(doFetch<T>(originalUrl, originalOptions));
          } else {
            reject(new Error('Refresh failed'));
          }
        },
        reject,
      });
    });
  }

  isRefreshing = true;
  originalOptions = { ...originalOptions, _retry: true };

  try {
    // Relies on the HttpOnly session cookie being sent with credentials: include.
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Refresh failed');
    }

    processQueue(null, true);

    return doFetch<T>(originalUrl, originalOptions);
  } catch (error) {
    processQueue(error, false);
    if (typeof window !== 'undefined') {
      window.location.href = '/edu/login';
    }
    throw error;
  } finally {
    isRefreshing = false;
  }
}

export const api = {
  get<T>(url: string, options?: RequestConfig): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, body?: any, options?: RequestConfig): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'POST', body });
  },
  put<T>(url: string, body?: any, options?: RequestConfig): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'PUT', body });
  },
  patch<T>(url: string, body?: any, options?: RequestConfig): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'PATCH', body });
  },
  delete<T>(url: string, options?: RequestConfig): Promise<T> {
    return doFetch<T>(url, { ...options, method: 'DELETE' });
  },
};
