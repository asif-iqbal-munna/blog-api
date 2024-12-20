export type ApiResponse<T> = {
  statusCode?: number;
  message: string;
  success: boolean;
  data?: T;
  error?: unknown;
  stack?: unknown;
};

export const API_ACCESS_CONTROLS = {
  user: 'user',
  admin: 'admin',
  public: 'public',
} as const;

export type TAccessControl = keyof typeof API_ACCESS_CONTROLS;
