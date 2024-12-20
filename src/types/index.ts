export type ApiResponse<T> = {
  statusCode?: number;
  message: string;
  success: boolean;
  data?: T;
  error?: unknown;
  stack?: unknown;
};
