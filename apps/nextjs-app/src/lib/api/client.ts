import toast from 'react-hot-toast';

import { env } from '@/config/env';
import { refreshSession } from '@/lib/auth/refresh-manager';

import { parseErrorPayload } from './error';
import { RequestConfig } from './types';

const API_URL = env.API_URL;

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

/**
 * 401 handler with single-flight lock (via refresh-manager).
 * All concurrent 401s share the same POST /api/auth/refresh.
 */
async function handleRefresh<T>(
  originalUrl: string,
  originalOptions: RequestConfig,
): Promise<T> {
  const retryOptions = { ...originalOptions, _retry: true } as RequestConfig;
  try {
    // Single-flight: concurrent callers join the same promise.
    await refreshSession();
    return doFetch<T>(originalUrl, retryOptions);
  } catch (error) {
    if (typeof window !== 'undefined') {
      window.location.href = '/edu/login';
    }
    throw error;
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
