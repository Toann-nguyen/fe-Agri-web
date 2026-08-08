import { ApiErrorIssue } from './types';

type StandardApiErrorParams = {
  message: string;
  status?: number;
  issues?: ApiErrorIssue[];
  data?: unknown;
};

export class StandardApiError extends Error {
  status?: number;
  issues: ApiErrorIssue[];
  data?: unknown;

  constructor({ message, status, issues = [], data }: StandardApiErrorParams) {
    super(message);
    this.name = 'StandardApiError';
    this.status = status;
    this.issues = issues;
    this.data = data;
  }
}

export const isStandardApiError = (
  error: unknown,
): error is StandardApiError => {
  return error instanceof StandardApiError;
};

export const toStandardApiError = (
  error: unknown,
  fallbackMessage = 'Request failed',
): StandardApiError => {
  if (error instanceof StandardApiError) {
    return error;
  }
  if (error instanceof Error) {
    return new StandardApiError({ message: error.message });
  }
  return new StandardApiError({ message: fallbackMessage });
};

export const getErrorMessage = (error: unknown): string => {
  if (isStandardApiError(error) && error.message) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export const parseErrorPayload = (payload: any): StandardApiError => {
  const message = payload?.message || payload?.error || 'Request failed';
  const issues = Array.isArray(payload?.issues)
    ? payload.issues
    : Array.isArray(payload?.errors)
      ? Object.entries(payload.errors).map(([path, message]) => ({
          path: [path],
          message: String(message),
        }))
      : [];
  return new StandardApiError({
    message,
    status: payload?.statusCode ?? payload?.status,
    issues,
    data: payload,
  });
};
