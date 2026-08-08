export type ApiErrorIssue = {
  path: string[] | number[];
  message: string;
};

export type RequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  _retry?: boolean;
};
